
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, DollarSign, Calendar, Activity, ArrowUpRight, UserPlus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { title: 'Total Patients', value: '2,834', icon: Users, color: 'bg-blue-50 text-medical' },
    { title: 'Appointments', value: '48', icon: Calendar, color: 'bg-purple-50 text-purple-600' },
    { title: 'Today\'s Revenue', value: '$5,249', icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { title: 'Active Staff', value: '122', icon: Activity, color: 'bg-orange-50 text-orange-600' },
  ];

  const recentPatients = [
    { id: 'P-2030', name: 'Emma Thompson', dateAdmitted: '23 Mar 2023', department: 'Cardiology' },
    { id: 'P-2029', name: 'Robert Johnson', dateAdmitted: '22 Mar 2023', department: 'Neurology' },
    { id: 'P-2028', name: 'Sarah Williams', dateAdmitted: '22 Mar 2023', department: 'Orthopedics' },
    { id: 'P-2027', name: 'Michael Brown', dateAdmitted: '21 Mar 2023', department: 'Pediatrics' },
  ];

  const recentTransactions = [
    { id: 'INV-001', patient: 'Emma Thompson', amount: '$1,200', status: 'Paid', date: '23 Mar 2023' },
    { id: 'INV-002', patient: 'Robert Johnson', amount: '$890', status: 'Pending', date: '22 Mar 2023' },
    { id: 'INV-003', patient: 'Sarah Williams', amount: '$1,400', status: 'Paid', date: '22 Mar 2023' },
    { id: 'INV-004', patient: 'Michael Brown', amount: '$650', status: 'Overdue', date: '21 Mar 2023' },
  ];

  return (
    <MainLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              April 13, 2025
            </Button>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add New Patient
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
                <div className="mt-4 flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+8% from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 shadow-sm">
            <Tabs defaultValue="patients">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Activity</CardTitle>
                  <TabsList>
                    <TabsTrigger value="patients">Patients</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>Monitor recent hospital activities</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <TabsContent value="patients" className="m-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 bg-gray-50 p-3 text-sm font-medium text-gray-500">
                      <div>ID</div>
                      <div className="col-span-2">Patient Name</div>
                      <div>Department</div>
                      <div>Date</div>
                    </div>
                    {recentPatients.map((patient) => (
                      <div key={patient.id} className="grid grid-cols-5 p-3 text-sm border-t hover:bg-gray-50 cursor-pointer">
                        <div className="font-medium text-gray-900">{patient.id}</div>
                        <div className="col-span-2">{patient.name}</div>
                        <div>{patient.department}</div>
                        <div className="text-gray-500">{patient.dateAdmitted}</div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="mt-4 w-full text-medical">View All Patients</Button>
                </TabsContent>
                <TabsContent value="transactions" className="m-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 bg-gray-50 p-3 text-sm font-medium text-gray-500">
                      <div>Invoice</div>
                      <div className="col-span-2">Patient</div>
                      <div>Status</div>
                      <div>Amount</div>
                    </div>
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="grid grid-cols-5 p-3 text-sm border-t hover:bg-gray-50 cursor-pointer">
                        <div className="font-medium text-gray-900">{tx.id}</div>
                        <div className="col-span-2">{tx.patient}</div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${tx.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                              tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {tx.status}
                          </span>
                        </div>
                        <div className="font-medium">{tx.amount}</div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="mt-4 w-full text-medical">View All Transactions</Button>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
          
          {/* Quick Actions */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used operations</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button className="justify-start" variant="outline" onClick={() => navigate('/admin/patients/add')}>
                <UserPlus className="mr-2 h-4 w-4" />
                Register New Patient
              </Button>
              <Button className="justify-start" variant="outline" onClick={() => navigate('/admin/appointments/add')}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button className="justify-start" variant="outline" onClick={() => navigate('/admin/billing/new')}>
                <DollarSign className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
              <Button className="justify-start" variant="outline" onClick={() => navigate('/admin/staff/add')}>
                <Users className="mr-2 h-4 w-4" />
                Add Staff Member
              </Button>
              <Button className="justify-start text-medical" variant="link" onClick={() => navigate('/admin/reports')}>
                View All Reports
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
