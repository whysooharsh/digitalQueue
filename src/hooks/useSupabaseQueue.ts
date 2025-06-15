import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Patient, QueueStats } from '@/types/queue';
import { useToast } from '@/hooks/use-toast';

export const useSupabaseQueue = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toast } = useToast();

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Fetch patients from Supabase
  const fetchPatients = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('check_in_time', { ascending: true });

      if (error) {
        console.error('Error fetching patients:', error);
        toast({
          title: "Error",
          description: "Failed to fetch patient data.",
          variant: "destructive",
        });
        return;
      }

      console.log('Fetched patients:', data);
      setPatients(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Set up real-time subscription with improved error handling
  useEffect(() => {
    fetchPatients();

    const channel = supabase
      .channel('patients-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'patients'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          // Immediately refetch data to ensure consistency
          fetchPatients();
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to real-time updates');
        } else if (status === 'CHANNEL_ERROR') {
          console.error('Channel error, attempting to resubscribe...');
          setTimeout(() => {
            channel.subscribe();
          }, 1000);
        }
      });

    return () => {
      console.log('Cleaning up subscription');
      supabase.removeChannel(channel);
    };
  }, [fetchPatients]);

  const addPatient = useCallback(async (name: string, phone: string, priority: 'normal' | 'urgent' = 'normal') => {
    try {
      const estimatedWaitTime = calculateEstimatedWaitTime(patients.length, priority);
      
      console.log('Adding patient:', { name, phone, priority, estimatedWaitTime });
      
      const { data, error } = await supabase
        .from('patients')
        .insert([
          {
            name,
            phone,
            priority,
            estimated_wait_time: estimatedWaitTime,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error adding patient:', error);
        toast({
          title: "Error",
          description: "Failed to add patient to queue.",
          variant: "destructive",
        });
        return null;
      }

      console.log('Patient added successfully:', data);
      // Immediately fetch updated patients list
      await fetchPatients();
      return data?.id;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }, [patients.length, toast, fetchPatients]);

  const updatePatientStatus = useCallback(async (patientId: string, status: Patient['status']) => {
    try {
      console.log('Updating patient status:', { patientId, status });
      
      const { error } = await supabase
        .from('patients')
        .update({ status })
        .eq('id', patientId);

      if (error) {
        console.error('Error updating patient status:', error);
        toast({
          title: "Error",
          description: "Failed to update patient status.",
          variant: "destructive",
        });
      } else {
        console.log('Patient status updated successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [toast]);

  const removePatient = useCallback(async (patientId: string) => {
    try {
      console.log('Removing patient:', patientId);
      
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', patientId);

      if (error) {
        console.error('Error removing patient:', error);
        toast({
          title: "Error",
          description: "Failed to remove patient from queue.",
          variant: "destructive",
        });
      } else {
        console.log('Patient removed successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [toast]);

  const getWaitingPatients = useCallback(() => {
    return patients
      .filter(patient => patient.status === 'waiting')
      .sort((a, b) => {
        // Sort by priority first, then by check-in time
        if (a.priority !== b.priority) {
          return a.priority === 'urgent' ? -1 : 1;
        }
        return new Date(a.check_in_time).getTime() - new Date(b.check_in_time).getTime();
      });
  }, [patients]);

  const getCurrentPatient = useCallback(() => {
    return patients.find(patient => patient.status === 'in-consultation');
  }, [patients]);

  const getNextPatient = useCallback(() => {
    const waitingPatients = getWaitingPatients();
    return waitingPatients.length > 0 ? waitingPatients[0] : null;
  }, [getWaitingPatients]);

  const getQueueStats = useCallback((): QueueStats => {
    const waitingPatients = getWaitingPatients();
    const currentPatient = getCurrentPatient();
    const nextPatient = getNextPatient();

    const totalWaitTime = waitingPatients.reduce((acc, patient) => {
      const waitTime = (currentTime.getTime() - new Date(patient.check_in_time).getTime()) / (1000 * 60);
      return acc + waitTime;
    }, 0);

    return {
      totalPatients: waitingPatients.length,
      averageWaitTime: waitingPatients.length > 0 ? Math.round(totalWaitTime / waitingPatients.length) : 0,
      currentlyServing: currentPatient?.name || null,
      nextPatient: nextPatient?.name || null,
    };
  }, [getWaitingPatients, getCurrentPatient, getNextPatient, currentTime]);

  return {
    patients,
    loading,
    addPatient,
    updatePatientStatus,
    removePatient,
    getWaitingPatients,
    getCurrentPatient,
    getNextPatient,
    getQueueStats,
    currentTime,
    refresh: fetchPatients,
  };
};

const calculateEstimatedWaitTime = (queueLength: number, priority: 'normal' | 'urgent'): number => {
  const baseWaitTime = 15; // 15 minutes per patient
  const priorityMultiplier = priority === 'urgent' ? 0.5 : 1;
  return Math.round(queueLength * baseWaitTime * priorityMultiplier);
};
