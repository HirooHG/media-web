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
import {Home, LogOut, Settings} from 'lucide-react';
import {AppSidebarHeader} from './app-sidebar-header';
import {usePathname, useRouter} from 'next/navigation';
import {WebsocketsStatus} from './websockets-status';
import ThemeToggle from '../ui/theme-toggle';
import {useSession} from 'next-auth/react';

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
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className="data-[active=true]:bg-primary"
                      onClick={() => push('/')}
                      isActive={path === '/'}
                    >
                      <Home />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className="data-[active=true]:bg-primary"
                      onClick={() => push('/administration')}
                      isActive={path === '/administration'}
                    >
                      <Settings className="text-white" />
                      <span className="text-nowrap font-semibold">Administration</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
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
                  {open && <span className="text-nowrap font-semibold">Log Out</span>}
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
