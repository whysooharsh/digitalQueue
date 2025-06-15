
export interface Patient {
  id: string;
  name: string;
  phone: string;
  check_in_time: string;
  estimated_wait_time: number;
  status: 'waiting' | 'called' | 'in-consultation' | 'completed';
  priority: 'normal' | 'urgent';
  created_at: string;
  updated_at: string;
}

export interface QueueStats {
  totalPatients: number;
  averageWaitTime: number;
  currentlyServing: string | null;
  nextPatient: string | null;
}
