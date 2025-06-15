import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { UserCheck, UserX, Play, Pause, Trash2, Phone } from 'lucide-react';
import { Patient } from '@/types/queue';
import { useToast } from '@/hooks/use-toast';

interface StaffDashboardProps {
  patients: Patient[];
  onUpdateStatus: (patientId: string, status: Patient['status']) => void;
  onRemovePatient: (patientId: string) => void;
  currentTime: Date;
}

export const StaffDashboard = ({ patients, onUpdateStatus, onRemovePatient, currentTime }: StaffDashboardProps) => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const { toast } = useToast();

  const waitingPatients = patients.filter(p => p.status === 'waiting');
  const currentPatient = patients.find(p => p.status === 'in-consultation');
  const calledPatients = patients.filter(p => p.status === 'called');

  const handleCallNext = () => {
    if (waitingPatients.length === 0) return;
    
    const nextPatient = waitingPatients.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority === 'urgent' ? -1 : 1;
      }
      return new Date(a.check_in_time).getTime() - new Date(b.check_in_time).getTime();
    })[0];

    onUpdateStatus(nextPatient.id, 'called');
    toast({
      title: "Patient Called",
      description: `${nextPatient.name} has been called for consultation.`,
      className: "bg-white border-mono-200",
    });
  };

  const handleStartConsultation = (patientId: string) => {
    onUpdateStatus(patientId, 'in-consultation');
    const patient = patients.find(p => p.id === patientId);
    toast({
      title: "Consultation Started",
      description: `Started consultation with ${patient?.name}.`,
      className: "bg-white border-mono-200",
    });
  };

  const handleCompleteConsultation = (patientId: string) => {
    onUpdateStatus(patientId, 'completed');
    const patient = patients.find(p => p.id === patientId);
    toast({
      title: "Consultation Completed",
      description: `Consultation with ${patient?.name} has been completed.`,
      className: "bg-white border-mono-200",
    });
  };

  const handleRemovePatient = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    onRemovePatient(patientId);
    toast({
      title: "Patient Removed",
      description: `${patient?.name} has been removed from the queue.`,
      className: "bg-white border-mono-200",
    });
  };

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatWaitTime = (checkInTime: string): string => {
    const waitMinutes = Math.floor((currentTime.getTime() - new Date(checkInTime).getTime()) / (1000 * 60));
    if (waitMinutes < 1) return 'Just arrived';
    return `${waitMinutes}m`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Action Bar */}
      <Card className="bg-white border-mono-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-mono-900">Staff Dashboard</h2>
              <p className="text-mono-600">Manage patient queue and consultations</p>
            </div>
            <Button
              onClick={handleCallNext}
              disabled={waitingPatients.length === 0 || !!currentPatient}
              className="bg-mono-900 hover:bg-mono-800 text-white"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Call Next Patient
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Consultation */}
        <Card className="bg-white border-mono-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Current Consultation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentPatient ? (
              <div className="space-y-4">
                <div className="p-4 bg-mono-50 rounded-lg border border-mono-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-mono-900">{currentPatient.name}</h3>
                      <p className="text-mono-600 flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {currentPatient.phone}
                      </p>
                    </div>
                    {currentPatient.priority === 'urgent' && (
                      <Badge variant="destructive">URGENT</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-mono-600">
                    <span>Check-in: {formatTime(currentPatient.check_in_time)}</span>
                    <span>Wait time: {formatWaitTime(currentPatient.check_in_time)}</span>
                  </div>
                </div>
                <Button
                  onClick={() => handleCompleteConsultation(currentPatient.id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Complete Consultation
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Pause className="h-12 w-12 text-mono-400 mx-auto mb-4" />
                <p className="text-mono-600">No active consultation</p>
                <p className="text-mono-500 text-sm">Call the next patient to start</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Called Patients */}
        <Card className="bg-white border-mono-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Called Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            {calledPatients.length === 0 ? (
              <div className="text-center py-8">
                <UserCheck className="h-12 w-12 text-mono-400 mx-auto mb-4" />
                <p className="text-mono-600">No patients called</p>
              </div>
            ) : (
              <div className="space-y-3">
                {calledPatients.map((patient) => (
                  <div key={patient.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-mono-900">{patient.name}</p>
                        <p className="text-sm text-mono-600">Called • {formatWaitTime(patient.check_in_time)} wait</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleStartConsultation(patient.id)}
                        className="bg-mono-900 hover:bg-mono-800 text-white"
                      >
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Waiting Queue Management */}
      <Card className="bg-white border-mono-200">
        <CardHeader>
          <CardTitle>Waiting Queue ({waitingPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {waitingPatients.length === 0 ? (
            <div className="text-center py-8">
              <UserX className="h-12 w-12 text-mono-400 mx-auto mb-4" />
              <p className="text-mono-600">No patients waiting</p>
            </div>
          ) : (
            <div className="space-y-3">
              {waitingPatients
                .sort((a, b) => {
                  if (a.priority !== b.priority) {
                    return a.priority === 'urgent' ? -1 : 1;
                  }
                  return new Date(a.check_in_time).getTime() - new Date(b.check_in_time).getTime();
                })
                .map((patient, index) => (
                  <div key={patient.id} className="p-4 border border-mono-200 rounded-lg hover:bg-mono-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mono-200 text-mono-700 text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-mono-900">{patient.name}</p>
                          <div className="flex items-center gap-4 text-sm text-mono-600">
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {patient.phone}
                            </span>
                            <span>Check-in: {formatTime(patient.check_in_time)}</span>
                            <span>Wait: {formatWaitTime(patient.check_in_time)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {patient.priority === 'urgent' && (
                          <Badge variant="destructive">URGENT</Badge>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove Patient</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove {patient.name} from the queue? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRemovePatient(patient.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
