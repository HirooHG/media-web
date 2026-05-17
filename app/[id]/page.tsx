import {AppSidebarProvider} from '@/components/shared/app-sidebar-provider';
import {MediaPage} from './components/media-page';

export default async function HomeMedia({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  return (
    <AppSidebarProvider>
      <MediaPage id={id} />
    </AppSidebarProvider>
  );
}
