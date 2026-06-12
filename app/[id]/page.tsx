import {AppSidebarProvider} from '@/components/shared/app-sidebar-provider';
import {MediaPage} from './components/media-page';
import {SearchDialog} from '@/components/shared/search-dialog';

export default async function HomeMedia({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  return (
    <AppSidebarProvider>
      <SearchDialog />
      <MediaPage id={id} />
    </AppSidebarProvider>
  );
}
