
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientCheckIn } from '@/components/PatientCheckIn';
import { QueueDisplay } from '@/components/QueueDisplay';
import { StaffDashboard } from '@/components/StaffDashboard';
import { useSupabaseQueue } from '@/hooks/useSupabaseQueue';
import { Heart, Users, Settings, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const {
    patients,
    loading,
    addPatient,
    updatePatientStatus,
    removePatient,
    getWaitingPatients,
    getCurrentPatient,
    getQueueStats,
    currentTime,
  } = useSupabaseQueue();

  const [activeTab, setActiveTab] = useState('patient');
  const navigate = useNavigate();

  const waitingPatients = getWaitingPatients();
  const currentPatient = getCurrentPatient();
  const stats = getQueueStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mono-50 via-white to-mono-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-mono-200">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-8 w-8 animate-spin text-mono-900" />
            <div>
              <p className="text-lg font-semibold text-mono-900">Loading ClinicQueue</p>
              <p className="text-sm text-mono-600">Setting up your queue system...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mono-50 via-white to-mono-100">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-mono-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-mono-600 hover:text-mono-900 hover:bg-mono-100"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Button>
              <div className="h-8 w-px bg-mono-200"></div>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-mono-900 to-mono-700 rounded-xl shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-mono-900">ClinicQueue</h1>
                  <p className="text-sm text-mono-600">Smart Queue Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4 text-sm text-mono-600">
                <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-mono-200">
                  <p className="font-medium text-mono-900">{currentTime.toLocaleDateString()}</p>
                  <p className="text-xs">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-mono-600 font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/80 backdrop-blur-sm border border-mono-200 shadow-lg rounded-2xl p-1">
              <TabsTrigger 
                value="patient" 
                className="flex items-center gap-2 data-[state=active]:bg-mono-900 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Patient</span>
              </TabsTrigger>
              <TabsTrigger 
                value="queue" 
                className="flex items-center gap-2 data-[state=active]:bg-mono-900 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
              >
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Queue</span>
              </TabsTrigger>
              <TabsTrigger 
                value="staff" 
                className="flex items-center gap-2 data-[state=active]:bg-mono-900 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Staff</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="animate-fade-in">
            <TabsContent value="patient" className="space-y-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-mono-200 shadow-sm mb-6">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm font-medium text-mono-700">Queue System Active</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-mono-900 mb-4">
                  Welcome to ClinicQueue
                </h2>
                <p className="text-xl text-mono-600 max-w-3xl mx-auto leading-relaxed">
                  Skip the waiting room chaos. Check in digitally and get real-time updates on your queue position.
                  We'll keep you informed every step of the way.
                </p>
              </div>
              <PatientCheckIn onCheckIn={addPatient} />
            </TabsContent>

            <TabsContent value="queue" className="space-y-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-mono-200 shadow-sm mb-6">
                  <Heart className="h-4 w-4 text-mono-700 mr-2" />
                  <span className="text-sm font-medium text-mono-700">Real-time Updates</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-mono-900 mb-4">Live Queue Status</h2>
                <p className="text-xl text-mono-600">
                  Monitor patient flow and wait times in real-time
                </p>
              </div>
              <QueueDisplay
                waitingPatients={waitingPatients}
                currentPatient={currentPatient}
                stats={stats}
                currentTime={currentTime}
              />
            </TabsContent>

            <TabsContent value="staff" className="space-y-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-mono-200 shadow-sm mb-6">
                  <Settings className="h-4 w-4 text-mono-700 mr-2" />
                  <span className="text-sm font-medium text-mono-700">Management Dashboard</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-mono-900 mb-4">Staff Dashboard</h2>
                <p className="text-xl text-mono-600">
                  Manage patient flow and consultations efficiently
                </p>
              </div>
              <StaffDashboard
                patients={patients}
                onUpdateStatus={updatePatientStatus}
                onRemovePatient={removePatient}
                currentTime={currentTime}
              />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-mono-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="p-2 bg-mono-900 rounded-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-mono-900">ClinicQueue</p>
                <p className="text-sm text-mono-600">Streamlining healthcare workflows</p>
              </div>
            </div>
            <div className="text-center text-mono-600">
              <p>&copy; 2024 ClinicQueue. Making healthcare more efficient.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
