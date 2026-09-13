import * as React from 'react';

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'info' | 'error' | 'success';
};

function Alert({ className, variant = 'info', ...props }: AlertProps) {
  return <div data-slot="alert" data-variant={variant} className={['neo-alert', className].filter(Boolean).join(' ')} {...props} />;
}

export { Alert };
