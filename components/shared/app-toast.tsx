import {toast} from 'sonner';

export const appToast = (title: string, desc: string) => {
  toast(title, {
    description: <pre className="text-foreground opacity-60">{desc}</pre>,
    position: 'top-center',
    classNames: {
      content: 'flex flex-col gap-2 text-foreground',
    },
    style: {
      '--border-radius': 'calc(var(--radius)  + 4px)',
      'backgroundColor': 'var(--color-background)',
    } as React.CSSProperties,
  });
};
