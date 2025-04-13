
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Search, PlusCircle, Download, Filter, Calendar, ArrowUpDown, Check, X, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const invoices = [
    { 
      id: 'INV-001', 
      patient: 'Emma Thompson', 
      patientId: 'P-2030',
      date: '2023-03-23', 
      dueDate: '2023-04-07',
      amount: 1200.00, 
      status: 'Paid', 
      service: 'Cardiology Consultation'
    },
    { 
      id: 'INV-002', 
      patient: 'Robert Johnson', 
      patientId: 'P-2029',
      date: '2023-03-22', 
      dueDate: '2023-04-06',
      amount: 890.00, 
      status: 'Pending', 
      service: 'General Check-up'
    },
    { 
      id: 'INV-003', 
      patient: 'Sarah Williams', 
      patientId: 'P-2028',
      date: '2023-03-22', 
      dueDate: '2023-04-06',
      amount: 1400.00, 
      status: 'Paid', 
      service: 'Orthopedic Surgery'
    },
    { 
      id: 'INV-004', 
      patient: 'Michael Brown', 
      patientId: 'P-2027',
      date: '2023-03-21', 
      dueDate: '2023-04-05',
      amount: 650.00, 
      status: 'Overdue', 
      service: 'Lab Tests'
    },
    { 
      id: 'INV-005', 
      patient: 'Jennifer Davis', 
      patientId: 'P-2026',
      date: '2023-03-19', 
      dueDate: '2023-04-03',
      amount: 950.00, 
      status: 'Paid', 
      service: 'Pediatric Consultation'
    },
    { 
      id: 'INV-006', 
      patient: 'David Miller', 
      patientId: 'P-2025',
      date: '2023-03-18', 
      dueDate: '2023-04-02',
      amount: 330.00, 
      status: 'Pending', 
      service: 'Vaccination'
    },
  ];

  const filteredInvoices = invoices.filter(invoice => 
    invoice.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <Check className="h-3.5 w-3.5 mr-1" />
            {status}
          </Badge>
        );
      case 'Pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {status}
          </Badge>
        );
      case 'Overdue':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <X className="h-3.5 w-3.5 mr-1" />
            {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Summary statistics
  const summary = {
    totalBilled: '$5,420.00',
    totalPaid: '$3,550.00',
    overdue: '$650.00',
    pending: '$1,220.00'
  };

  return (
    <MainLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Billing Management</h1>
          <div className="flex gap-3">
            <Button onClick={() => console.log('Create new invoice')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </div>
        </div>

        {/* Billing Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">Total Billed</p>
                <p className="text-2xl font-bold mt-1">{summary.totalBilled}</p>
                <p className="text-xs text-gray-500 mt-2">This month</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">Total Paid</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{summary.totalPaid}</p>
                <p className="text-xs text-gray-500 mt-2">This month</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{summary.overdue}</p>
                <p className="text-xs text-gray-500 mt-2">Total amount</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{summary.pending}</p>
                <p className="text-xs text-gray-500 mt-2">Total amount</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Listing */}
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>Manage patient billing information</CardDescription>
              </div>
              <Tabs defaultValue="all" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="flex gap-3 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Search invoices..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="This Month" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="thisWeek">This Week</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <div className="flex items-center">
                        Invoice ID
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Amount
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{invoice.patient}</div>
                          <div className="text-xs text-gray-500">{invoice.patientId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{invoice.service}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="font-medium">${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredInvoices.length}</span> of{" "}
                <span className="font-medium">{invoices.length}</span> results
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Billing;
