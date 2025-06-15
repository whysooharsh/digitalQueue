
import { Clock, Users, UserCheck, ArrowRight, TrendingUp, Activity, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Patient, QueueStats } from '@/types/queue';

interface QueueDisplayProps {
  waitingPatients: Patient[];
  currentPatient: Patient | null;
  stats: QueueStats;
  currentTime: Date;
}

export const QueueDisplay = ({ waitingPatients, currentPatient, stats, currentTime }: QueueDisplayProps) => {
  const formatWaitTime = (checkInTime: string): string => {
    const waitMinutes = Math.floor((currentTime.getTime() - new Date(checkInTime).getTime()) / (1000 * 60));
    if (waitMinutes < 1) return 'Just arrived';
    if (waitMinutes === 1) return '1 minute ago';
    return `${waitMinutes} minutes ago`;
  };

  const getPositionSuffix = (position: number): string => {
    if (position === 1) return 'st';
    if (position === 2) return 'nd';
    if (position === 3) return 'rd';
    return 'th';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Enhanced Stats Overview with Vibrant Colors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-700">Patients Waiting</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{stats.totalPatients}</p>
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-700">Avg. Wait Time</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{stats.averageWaitTime}m</p>
                </div>
              </div>
              <Activity className="h-5 w-5 text-emerald-500 animate-bounce" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-100 to-red-100 border-orange-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-700">Currently Serving</p>
                  <p className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent truncate">
                    {stats.currentlyServing || 'None'}
                  </p>
                </div>
              </div>
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse shadow-lg"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Current Patient with Animated Gradient */}
      {currentPatient && (
        <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl animate-gradient-x">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <UserCheck className="h-7 w-7" />
              </div>
              Now Serving
              <div className="ml-auto flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-sm font-medium">LIVE</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold mb-2 text-white drop-shadow-lg">{currentPatient.name}</p>
                <p className="text-white/80 text-lg">
                  Checked in {formatWaitTime(currentPatient.check_in_time)}
                </p>
              </div>
              {currentPatient.priority === 'urgent' && (
                <Badge className="bg-red-500 hover:bg-red-600 animate-pulse px-4 py-2 text-sm font-semibold shadow-lg">
                  🚨 URGENT
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Queue List with Rainbow Colors */}
      <Card className="bg-white/95 backdrop-blur-sm border-2 border-gray-200 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b-2 border-gray-200">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Patient Queue</span>
            <Badge className="ml-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
              {waitingPatients.length} waiting
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {waitingPatients.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-600 text-xl font-medium mb-2">No patients in queue</p>
              <p className="text-gray-500">The queue is currently empty ✨</p>
            </div>
          ) : (
            <div className="space-y-4">
              {waitingPatients.map((patient, index) => (
                <div
                  key={patient.id}
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 ${
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-yellow-300 shadow-xl transform scale-[1.02] animate-pulse-subtle'
                      : index === 1
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 hover:shadow-lg hover:scale-[1.01]'
                      : index === 2
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 hover:shadow-lg hover:scale-[1.01]'
                      : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 hover:shadow-lg hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold shadow-lg ${
                      index === 0 
                        ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white animate-bounce' 
                        : index === 1
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white'
                        : index === 2
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'
                        : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatWaitTime(patient.check_in_time)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {patient.priority === 'urgent' && (
                      <Badge className="bg-red-500 hover:bg-red-600 animate-pulse px-3 py-1 font-semibold shadow-lg">
                        🚨 URGENT
                      </Badge>
                    )}
                    {index === 0 && (
                      <div className="flex items-center text-orange-600 bg-orange-100 px-3 py-1 rounded-full shadow-lg animate-bounce">
                        <span className="text-sm font-semibold mr-2">Next</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {index + 1}{getPositionSuffix(index + 1)} in line
                      </p>
                      <p className="text-xs text-gray-600">
                        ~{patient.estimated_wait_time}m wait
                      </p>
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
