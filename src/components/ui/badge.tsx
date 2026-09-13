import * as React from 'react';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'main' | 'neutral' | 'outline';
};

function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  return <span data-slot="badge" data-variant={variant} className={['neo-badge', className].filter(Boolean).join(' ')} {...props} />;
}

export { Badge };
