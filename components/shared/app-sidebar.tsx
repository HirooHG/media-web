import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import {federatedLogout} from '@/lib/logout';
import {History, Home, LogOut, LucideIcon, Settings} from 'lucide-react';
import {AppSidebarHeader} from './app-sidebar-header';
import {usePathname, useRouter} from 'next/navigation';
import {WebsocketsStatus} from './websockets-status';
import ThemeToggle from '../ui/theme-toggle';
import {useSession} from 'next-auth/react';

type Link = {
  label: string;
  link: string;
  icon: LucideIcon;
};

const LINKS: Link[] = [
  {
    label: 'Home',
    link: '/',
    icon: Home,
  },
  {
    label: 'History',
    link: '/history',
    icon: History,
  },
  {
    label: 'Administration',
    link: '/administration',
    icon: Settings,
  },
];

export const AppSidebar = () => {
  const {status} = useSession();
  const {open} = useSidebar();
  const {push} = useRouter();
  const path = usePathname();

  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />
      {status === 'authenticated' && (
        <>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Pages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {LINKS.map(({label, icon: Icon, link}) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton
                        className="data-[active=true]:bg-primary data-[active=true]:text-white"
                        onClick={() => push(link)}
                        isActive={path === link}
                      >
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Miscellaneous</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem className="flex items-center py-2">
                    <WebsocketsStatus />
                  </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                  <SidebarMenuItem className="flex items-center py-2">
                    <div className="flex items-center gap-4">
                      <ThemeToggle />
                      <span className="text-nowrap">Theme mode</span>
                    </div>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="pb-5">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex justify-center bg-red-500 hover:bg-red-400"
                  onClick={federatedLogout}
                >
                  {open && <span className="text-white text-nowrap font-semibold">Log Out</span>}
                  <LogOut className="text-white" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </>
      )}
    </Sidebar>
  );
};
