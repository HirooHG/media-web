import Image from 'next/image';
import {SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '../ui/sidebar';
import {useRouter} from 'next/navigation';
import AppIcon from '@/assets/app-icon.jpg';

export const AppSidebarHeader = () => {
  const {push} = useRouter();

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            onClick={() => push('/')}
          >
            <Image
              loading="eager"
              alt="app-icon"
              style={{borderRadius: 8}}
              width={32}
              height={32}
              src={AppIcon}
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Media List</span>
              <span className="truncate text-xs">made by HirooHG with ❤️</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
