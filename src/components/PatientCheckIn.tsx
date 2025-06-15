
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserPlus, Phone, User, AlertCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PatientCheckInProps {
  onCheckIn: (name: string, phone: string, priority: 'normal' | 'urgent') => Promise<string | null>;
}

export const PatientCheckIn = ({ onCheckIn }: PatientCheckInProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both name and phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const patientId = await onCheckIn(name.trim(), phone.trim(), priority);
      
      if (patientId) {
        toast({
          title: "✅ Check-in Successful",
          description: `${name} has been added to the queue successfully.`,
          className: "bg-white border-green-200 border-l-4 border-l-green-500",
        });
        
        // Reset form
        setName('');
        setPhone('');
        setPriority('normal');
      } else {
        toast({
          title: "Check-in Failed",
          description: "There was an error adding you to the queue. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Check-in Failed",
        description: "There was an error adding you to the queue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="bg-white/90 backdrop-blur-sm border-mono-200 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="text-center pb-6 bg-gradient-to-br from-mono-50 to-white">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-mono-900 to-mono-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-mono-900 mb-2">Patient Check-In</CardTitle>
          <CardDescription className="text-mono-600 text-lg">
            Enter your details to join the digital queue
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-semibold text-mono-700 flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="h-12 bg-white border-mono-300 focus:border-mono-500 focus:ring-2 focus:ring-mono-500/20 rounded-xl text-lg"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone" className="text-sm font-semibold text-mono-700 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="h-12 bg-white border-mono-300 focus:border-mono-500 focus:ring-2 focus:ring-mono-500/20 rounded-xl text-lg"
                required
              />
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-semibold text-mono-700">Priority Level</Label>
              <RadioGroup value={priority} onValueChange={(value: string) => setPriority(value as 'normal' | 'urgent')}>
                <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-mono-200 hover:border-mono-300 hover:bg-mono-50 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="normal" id="normal" className="border-mono-400 text-mono-900" />
                  <Label htmlFor="normal" className="flex-1 cursor-pointer flex items-center gap-3">
                    <Clock className="h-5 w-5 text-mono-600" />
                    <div>
                      <div className="font-semibold text-mono-900">Normal</div>
                      <div className="text-sm text-mono-600">Standard appointment</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="urgent" id="urgent" className="border-orange-400 text-orange-600" />
                  <Label htmlFor="urgent" className="flex-1 cursor-pointer flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="font-semibold text-mono-900">Urgent</div>
                      <div className="text-sm text-orange-700">Requires immediate attention</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-gradient-to-r from-mono-900 to-mono-800 hover:from-mono-800 hover:to-mono-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding to Queue...
                </div>
              ) : (
                'Join Queue'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
