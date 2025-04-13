
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, FileText, Pill, DollarSign, Clock, ArrowUpRight, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const PatientDashboard = () => {
  const navigate = useNavigate();
  
  const upcomingAppointments = [
    { 
      doctorName: 'Dr. Jane Smith', 
      specialty: 'Cardiology', 
      date: 'April 15, 2025',
      time: '10:00 AM', 
      avatar: '/placeholder.svg',
    },
    { 
      doctorName: 'Dr. Mark Johnson', 
      specialty: 'General Medicine', 
      date: 'April 22, 2025',
      time: '2:30 PM', 
      avatar: '/placeholder.svg',
    },
  ];

  const medications = [
    { 
      name: 'Lisinopril', 
      dosage: '10mg',  
      frequency: 'Once daily',
      timeOfDay: 'Morning',
      refillDate: 'May 5, 2025'
    },
    { 
      name: 'Metformin', 
      dosage: '500mg',  
      frequency: 'Twice daily',
      timeOfDay: 'Morning and evening',
      refillDate: 'April 28, 2025'
    },
    { 
      name: 'Atorvastatin', 
      dosage: '20mg',  
      frequency: 'Once daily',
      timeOfDay: 'Evening',
      refillDate: 'May 12, 2025'
    },
  ];

  const billingHistory = [
    { 
      serviceDate: 'March 15, 2025',
      description: 'General check-up',
      amount: '$150.00',
      status: 'Paid'
    },
    { 
      serviceDate: 'February 22, 2025',
      description: 'Blood work',
      amount: '$85.00',
      status: 'Paid'
    },
    { 
      serviceDate: 'April 10, 2025',
      description: 'Cardiology consultation',
      amount: '$250.00',
      status: 'Pending'
    },
  ];

  return (
    <MainLayout userRole="patient">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, John!</h1>
            <p className="text-gray-500">Here's an overview of your health information.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="flex items-center gap-2" onClick={() => navigate('/patient/appointments/schedule')}>
              <PlusCircle className="h-4 w-4" />
              Schedule Appointment
            </Button>
          </div>
        </div>

        {/* Health Summary */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 lg:w-2/3 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Your Upcoming Appointments</h3>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment, index) => (
                        <div key={index} className="flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                          <div className="flex-shrink-0 mr-4">
                            <Avatar>
                              <AvatarImage src={appointment.avatar} alt={appointment.doctorName} />
                              <AvatarFallback>{appointment.doctorName.split(' ')[1][0]}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{appointment.doctorName}</h4>
                            <p className="text-sm text-gray-500">{appointment.specialty}</p>
                            <div className="flex items-center mt-1 text-sm">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-medical" />
                              <span>{appointment.date}, {appointment.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button 
                        variant="link" 
                        className="text-medical p-0" 
                        onClick={() => navigate('/patient/appointments')}
                      >
                        View All Appointments
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No upcoming appointments scheduled.
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Recent Billing</h3>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 bg-gray-50 p-3 text-sm font-medium text-gray-500">
                      <div>Date</div>
                      <div>Service</div>
                      <div>Amount</div>
                      <div>Status</div>
                    </div>
                    {billingHistory.map((bill, index) => (
                      <div key={index} className="grid grid-cols-4 p-3 text-sm border-t hover:bg-gray-50 cursor-pointer">
                        <div>{bill.serviceDate}</div>
                        <div>{bill.description}</div>
                        <div>{bill.amount}</div>
                        <div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                            ${bill.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {bill.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-right">
                    <Button 
                      variant="link" 
                      className="text-medical p-0" 
                      onClick={() => navigate('/patient/billing')}
                    >
                      View Complete Billing History
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="md:w-1/2 lg:w-1/3 space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Your Medications</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {medications.map((medication, index) => (
                        <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{medication.name} {medication.dosage}</p>
                              <p className="text-xs text-gray-500">{medication.frequency}, {medication.timeOfDay}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              Refill: {medication.refillDate}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="link" 
                      className="text-medical p-0 text-sm" 
                      onClick={() => navigate('/patient/prescriptions')}
                    >
                      View All Medications
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Health Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Blood Pressure</span>
                          <span className="text-sm text-gray-500">120/80</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Heart Rate</span>
                          <span className="text-sm text-gray-500">72 bpm</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Blood Sugar</span>
                          <span className="text-sm text-gray-500">95 mg/dL</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="link" 
                      className="text-medical p-0 text-sm" 
                      onClick={() => navigate('/patient/records')}
                    >
                      View Complete Medical Records
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PatientDashboard;
