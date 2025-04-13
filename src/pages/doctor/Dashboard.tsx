
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Activity, FileText, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { title: 'My Patients', value: '128', icon: Users, color: 'bg-blue-50 text-medical' },
    { title: 'Today\'s Appointments', value: '8', icon: Calendar, color: 'bg-purple-50 text-purple-600' },
    { title: 'Pending Reports', value: '5', icon: FileText, color: 'bg-yellow-50 text-yellow-600' },
    { title: 'Total Hours', value: '142h', icon: Clock, color: 'bg-green-50 text-green-600' },
  ];

  const upcomingAppointments = [
    { 
      patientName: 'Emma Thompson', 
      patientId: 'P-2030', 
      time: '10:00 AM', 
      type: 'Check-up',
      avatar: '/placeholder.svg',
      status: 'Confirmed'
    },
    { 
      patientName: 'Robert Johnson', 
      patientId: 'P-2029', 
      time: '11:30 AM', 
      type: 'Follow-up',
      avatar: '/placeholder.svg', 
      status: 'Confirmed'
    },
    { 
      patientName: 'Sarah Williams', 
      patientId: 'P-2028', 
      time: '2:00 PM', 
      type: 'Consultation',
      avatar: '/placeholder.svg', 
      status: 'Pending'
    },
    { 
      patientName: 'Michael Brown', 
      patientId: 'P-2027', 
      time: '3:30 PM', 
      type: 'Check-up',
      avatar: '/placeholder.svg', 
      status: 'Confirmed'
    },
  ];

  const recentPatients = [
    { 
      name: 'Emma Thompson', 
      age: 45, 
      diagnosis: 'Hypertension', 
      lastVisit: '2 days ago',
      avatar: '/placeholder.svg',
    },
    { 
      name: 'Robert Johnson', 
      age: 32, 
      diagnosis: 'Diabetes Type 2', 
      lastVisit: '1 week ago',
      avatar: '/placeholder.svg',
    },
    { 
      name: 'Sarah Williams', 
      age: 28, 
      diagnosis: 'Migraine', 
      lastVisit: '3 days ago',
      avatar: '/placeholder.svg',
    },
  ];

  return (
    <MainLayout userRole="doctor">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Dr. Smith!</h1>
            <p className="text-gray-500">Here's what's happening with your patients today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              April 13, 2025
            </Button>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Today's Schedule</CardTitle>
                <Button variant="outline" size="sm" onClick={() => navigate('/doctor/appointments')}>
                  View all
                </Button>
              </div>
              <CardDescription>Your appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                    <div className="flex-shrink-0 mr-4">
                      <Avatar>
                        <AvatarImage src={appointment.avatar} alt={appointment.patientName} />
                        <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{appointment.patientName}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-gray-900">{appointment.time}</span> - {appointment.type}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Patient ID: {appointment.patientId}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Patients */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>Patients you've recently treated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                    <div className="flex-shrink-0 mr-3">
                      <Avatar>
                        <AvatarImage src={patient.avatar} alt={patient.name} />
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <h4 className="font-medium">{patient.name}</h4>
                      <p className="text-sm text-gray-500">
                        {patient.age} years • {patient.diagnosis}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Last visit: {patient.lastVisit}</p>
                    </div>
                  </div>
                ))}
                <Button 
                  className="w-full justify-center text-medical" 
                  variant="link"
                  onClick={() => navigate('/doctor/patients')}
                >
                  View All Patients
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorDashboard;
