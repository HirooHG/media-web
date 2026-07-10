'use client';

import {ReactNode} from 'react';
import {SidebarProvider, SidebarInset, SidebarTrigger} from '../ui/sidebar';
import {AppSidebar} from './app-sidebar';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {setSidebarToggle} from '@/lib/redux/slices/settings-slice';

export const AppSidebarProvider = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.settings.sidebarOpen);

  return (
    <SidebarProvider
      onOpenChange={(v) => {
        dispatch(setSidebarToggle(v));
      }}
      defaultOpen={open}
      open={open}
    >
      <AppSidebar />
      <SidebarInset className={'h-full relative ' + className}>
        <div className="absolute top-3 left-3 z-10">
          <SidebarTrigger />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
