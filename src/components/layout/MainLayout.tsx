
import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  FileText, 
  DollarSign, 
  Calendar, 
  Settings, 
  Menu, 
  LogOut, 
  User,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
  userRole: 'admin' | 'doctor' | 'patient';
}

export const MainLayout = ({ children, userRole }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  // Define menu items based on user role
  const getMenuItems = () => {
    const commonItems = [
      { title: 'Dashboard', icon: Home, url: `/${userRole}/dashboard` },
    ];

    const roleSpecificItems = {
      admin: [
        { title: 'Patients', icon: Users, url: '/admin/patients/add' },
        { title: 'Staff', icon: User, url: '/admin/staff' },
        { title: 'Appointments', icon: Calendar, url: '/admin/appointments' },
        { title: 'Billing', icon: DollarSign, url: '/admin/billing' },
        { title: 'Reports', icon: FileText, url: '/admin/reports' },
        { title: 'Settings', icon: Settings, url: '/admin/settings' },
      ],
      doctor: [
        { title: 'My Patients', icon: Users, url: '/doctor/patients' },
        { title: 'Medical Records', icon: FileText, url: '/doctor/records' },
        { title: 'Appointments', icon: Calendar, url: '/doctor/appointments' },
        { title: 'Reports', icon: Activity, url: '/doctor/reports' },
      ],
      patient: [
        { title: 'My Records', icon: FileText, url: '/patient/records' },
        { title: 'Appointments', icon: Calendar, url: '/patient/appointments' },
        { title: 'Prescriptions', icon: FileText, url: '/patient/prescriptions' },
        { title: 'Billing', icon: DollarSign, url: '/patient/billing' },
      ],
    };

    return [...commonItems, ...roleSpecificItems[userRole]];
  };

  const menuItems = getMenuItems();

  const roleColors = {
    admin: 'bg-purple-100 text-purple-600',
    doctor: 'bg-medical-light text-medical',
    patient: 'bg-green-100 text-green-600',
  };

  const roleBadge = roleColors[userRole];

  const displayName = profile ? `${profile.first_name} ${profile.last_name}` : 'User';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className={cn("border-r border-gray-200 transition-all duration-300 bg-white", 
        collapsed ? "w-[80px]" : "w-[280px]")}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-medical" />
                <span className="font-semibold text-xl">MediCare</span>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-grow overflow-y-auto">
            <div className="p-4">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.title}>
                    <Button
                      variant="ghost"
                      className={cn("w-full justify-start text-gray-600 hover:text-medical hover:bg-gray-100 font-medium", 
                        collapsed ? "px-3" : "px-4")}
                      onClick={() => navigate(item.url)}
                    >
                      <item.icon className={cn("h-5 w-5 mr-3", collapsed && "mr-0")} />
                      {!collapsed && <span>{item.title}</span>}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
              {!collapsed && (
                <>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage alt={displayName} src="/placeholder.svg" />
                      <AvatarFallback>{profile?.first_name?.[0] || userRole[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{displayName}</p>
                      <p className={cn("text-xs px-1.5 py-0.5 rounded-full inline-flex", roleBadge)}>
                        {userRole}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => signOut()}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </>
              )}
              {collapsed && (
                <Avatar className="h-9 w-9">
                  <AvatarImage alt={displayName} src="/placeholder.svg" />
                  <AvatarFallback>{profile?.first_name?.[0] || userRole[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
