import {toast} from 'sonner';

export const appToast = (title: string, desc: string) => {
  toast(title, {
    description: <pre>{desc}</pre>,
    position: 'top-center',
    classNames: {
      content: 'flex flex-col gap-2',
    },
    style: {
      '--border-radius': 'calc(var(--radius)  + 4px)',
    } as React.CSSProperties,
  });
};
