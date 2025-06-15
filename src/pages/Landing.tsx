import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Clock, 
  Users, 
  Smartphone, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  ChevronDown
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Real-Time Updates",
      description: "Get instant notifications about your queue position and wait times"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Digital Check-In",
      description: "Skip the crowded waiting room with our seamless digital check-in process"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Your medical information is protected with enterprise-grade security"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Reduce waiting times and streamline your clinic visit experience"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Staff Friendly",
      description: "Intuitive dashboard for healthcare staff to manage patient flow efficiently"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Patient Satisfaction",
      description: "Improve patient experience with transparent queue management"
    }
  ];

  const teamMembers = [
    {
      name: "Harsh Sharma",
      role: "Backend Dev",
      image: "https://i.pinimg.com/736x/75/06/b9/7506b94f2ad6a91f0a419db953948228.jpg",
      linkedin: "https://www.linkedin.com/in/harsharma45/",
      isGirl: false
    },
    {
      name: "Harsh Vardhan Tripathi",
      role: "Lead Developer",
      image: "https://i.pinimg.com/736x/7d/e0/7e/7de07ea36d342e8551fff517a23ef4d6.jpg",
      linkedin: "https://www.linkedin.com/in/iamharshvardhantripathi/",
      isGirl: false
    },
    {
      name: "Akshat Srivastava",
      role: "Frontend Developer",
      image: "https://i.pinimg.com/736x/57/33/12/573312ac0d6dcc141d17ef244f340a55.jpg",
      linkedin: "https://www.linkedin.com/in/akshat-srivastava1124",
      isGirl: false
    },
    {
      name: "Jatin Kumar",
      role: "Backend / Infra",
      image: "https://i.pinimg.com/736x/b1/5f/3a/b15f3a504d6ded5e5f0629e8b7076b20.jpg",
      linkedin: "https://www.linkedin.com/in/jatin-kumar-434b86275/",
      isGirl: false
    },
    {
      name: "Arshiya Khan",
      role: "UI/UX Designer",
      image: "https://i.pinimg.com/736x/04/fe/26/04fe269e2a5573b7845a0de456dab681.jpg",
      linkedin: "https://www.linkedin.com/in/arshiya-khan-53a93a252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      isGirl: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-mono-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-mono-200 rounded-full mix-blend-multiply animate-pulse opacity-70"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-mono-300 rounded-full mix-blend-multiply animate-pulse opacity-50 animation-delay-1000"></div>
          <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-mono-200 rounded-full mix-blend-multiply animate-pulse opacity-60 animation-delay-2000"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-8 inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-mono-200 shadow-lg">
              <Heart className="h-5 w-5 text-mono-900 mr-2" />
              <span className="text-sm font-medium text-mono-700">Revolutionizing Healthcare Queues</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-mono-900 mb-6 leading-tight">
              Skip the Wait,
              <br />
              <span className="bg-gradient-to-r from-mono-900 to-mono-600 bg-clip-text text-transparent">
                Start the Care
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-mono-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your clinic experience with our smart digital queue management system. 
              Real-time updates, seamless check-ins, and happier patients.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="bg-mono-900 hover:bg-mono-800 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/queue')}
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-mono-300 hover:bg-mono-100 px-8 py-4 text-lg font-semibold rounded-full"
                onClick={() => scrollToSection('features')}
              >
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-mono-600">No Downloads Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-mono-600">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-mono-600">Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-mono-400" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-mono-900 mb-6">
              Why Choose ClinicQueue?
            </h2>
            <p className="text-xl text-mono-600 max-w-3xl mx-auto">
              Experience the future of healthcare queue management with features designed 
              for both patients and healthcare providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white/80 backdrop-blur-sm border-mono-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:border-mono-300"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-mono-900 rounded-2xl flex items-center justify-center mb-4 text-white">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-mono-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-mono-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-mono-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-mono-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-mono-600 max-w-3xl mx-auto">
              Passionate healthcare technology experts dedicated to improving patient experiences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                className="bg-white border-mono-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
              >
                <CardHeader className="pb-4">
                  <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-mono-200 bg-mono-100">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg font-bold text-mono-900">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-mono-600">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 bg-mono-900 hover:bg-mono-800 text-white rounded-full transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-mono-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Clinic?
          </h2>
          <p className="text-xl text-mono-300 mb-12 max-w-3xl mx-auto">
            Join hundreds of healthcare providers who have already improved their patient experience 
            with ClinicQueue. Get started in minutes, no setup required.
          </p>
          <Button 
            size="lg" 
            className="bg-white hover:bg-mono-100 text-mono-900 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={() => navigate('/queue')}
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-mono-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-mono-900 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-mono-900">ClinicQueue</h3>
                  <p className="text-sm text-mono-600">Smart Queue Management</p>
                </div>
              </div>
              <p className="text-mono-600 max-w-md">
                Streamlining healthcare workflows with innovative digital solutions. 
                Making healthcare more accessible and efficient for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-mono-900 mb-4">Product</h4>
              <ul className="space-y-2 text-mono-600">
                <li><a href="#features" className="hover:text-mono-900 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-mono-900 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-mono-900 transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-mono-900 mb-4">Company</h4>
              <ul className="space-y-2 text-mono-600">
                <li><a href="#team" className="hover:text-mono-900 transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-mono-900 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-mono-900 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-mono-200 pt-8 text-center text-mono-600">
            <p>&copy; 2024 ClinicQueue. All rights reserved. Streamlining healthcare workflows worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
