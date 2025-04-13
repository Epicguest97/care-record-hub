
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, FileText, PlusCircle } from 'lucide-react';
import { useState } from 'react';

const PatientRecords = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const patients = [
    {
      id: 'P-2030',
      name: 'Emma Thompson',
      age: 45,
      gender: 'Female',
      healthStatus: 'Stable',
      lastVisit: '2023-03-23',
      diagnosis: 'Hypertension',
      doctor: 'Dr. Smith',
      avatar: '/placeholder.svg'
    },
    {
      id: 'P-2029',
      name: 'Robert Johnson',
      age: 32,
      gender: 'Male',
      healthStatus: 'Improving',
      lastVisit: '2023-03-22',
      diagnosis: 'Diabetes Type 2',
      doctor: 'Dr. Smith',
      avatar: '/placeholder.svg'
    },
    {
      id: 'P-2028',
      name: 'Sarah Williams',
      age: 28,
      gender: 'Female',
      healthStatus: 'Good',
      lastVisit: '2023-03-22',
      diagnosis: 'Migraine',
      doctor: 'Dr. Williams',
      avatar: '/placeholder.svg'
    },
    {
      id: 'P-2027',
      name: 'Michael Brown',
      age: 55,
      gender: 'Male',
      healthStatus: 'Critical',
      lastVisit: '2023-03-21',
      diagnosis: 'Congestive Heart Failure',
      doctor: 'Dr. Smith',
      avatar: '/placeholder.svg'
    },
    {
      id: 'P-2026',
      name: 'Jennifer Davis',
      age: 42,
      gender: 'Female',
      healthStatus: 'Stable',
      lastVisit: '2023-03-19',
      diagnosis: 'Asthma',
      doctor: 'Dr. Martinez',
      avatar: '/placeholder.svg'
    },
    {
      id: 'P-2025',
      name: 'David Miller',
      age: 38,
      gender: 'Male',
      healthStatus: 'Good',
      lastVisit: '2023-03-18',
      diagnosis: 'Rhinitis',
      doctor: 'Dr. Smith',
      avatar: '/placeholder.svg'
    },
  ];

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock data for a patient's medical history
  const medicalRecords = [
    {
      date: '2023-03-23',
      type: 'Check-up',
      doctor: 'Dr. Smith',
      notes: 'Patient reports feeling well. Blood pressure is 130/85, slightly elevated. Advised to continue monitoring and maintain current medication.',
      files: ['Blood Test Results', 'Prescription']
    },
    {
      date: '2023-01-15',
      type: 'Emergency',
      doctor: 'Dr. Johnson',
      notes: 'Patient admitted with severe chest pain. ECG showed no abnormalities. Pain likely due to stress and anxiety. Prescribed anxiolytic medication.',
      files: ['ECG Report', 'Prescription']
    },
    {
      date: '2022-11-05',
      type: 'Surgery',
      doctor: 'Dr. Williams',
      notes: 'Appendectomy performed. Surgery went well with no complications. Patient recovered satisfactorily post-op.',
      files: ['Surgery Report', 'Post-op Instructions', 'Prescription']
    },
    {
      date: '2022-08-12',
      type: 'Annual Physical',
      doctor: 'Dr. Smith',
      notes: 'Comprehensive health examination. All vitals normal. Cholesterol slightly elevated. Recommended dietary changes and follow-up in 3 months.',
      files: ['Lab Results', 'Health Assessment']
    },
  ];

  return (
    <MainLayout userRole="doctor">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Patient Records</h1>
          <div className="flex gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search patients..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all-patients">
          <TabsList className="mb-4">
            <TabsTrigger value="all-patients">All Patients</TabsTrigger>
            <TabsTrigger value="my-patients">My Patients</TabsTrigger>
            <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-patients" className="space-y-6">
            <Card className="shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id} className="hover:bg-gray-50 cursor-pointer">
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={patient.avatar} alt={patient.name} />
                              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{patient.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>
                          <Badge variant={
                            patient.healthStatus === 'Critical' ? 'destructive' :
                            patient.healthStatus === 'Stable' ? 'outline' :
                            patient.healthStatus === 'Improving' ? 'secondary' : 'default'
                          }>
                            {patient.healthStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>{patient.diagnosis}</TableCell>
                        <TableCell>{patient.doctor}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost">
                            <FileText className="h-4 w-4 mr-2" />
                            Records
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="my-patients" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">
                  Filtered view of patients assigned to you would appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">
                  Your recently viewed patient records would appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Sample Patient Medical History</h2>
          <Card className="shadow-sm">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt="Emma Thompson" />
                    <AvatarFallback>ET</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Emma Thompson</CardTitle>
                    <div className="text-sm text-gray-500">
                      45 years • Female • Patient ID: P-2030
                    </div>
                    <div className="mt-1 flex gap-2">
                      <Badge variant="outline">Hypertension</Badge>
                      <Badge variant="outline">Allergies</Badge>
                    </div>
                  </div>
                </div>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Record
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {medicalRecords.map((record, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium">{record.type}</h3>
                        <div className="text-sm text-gray-500">
                          {record.date} • {record.doctor}
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{record.notes}</p>
                    <div className="flex flex-wrap gap-2">
                      {record.files.map((file, fileIndex) => (
                        <Badge key={fileIndex} variant="secondary" className="cursor-pointer">
                          <FileText className="h-3 w-3 mr-1" />
                          {file}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default PatientRecords;
