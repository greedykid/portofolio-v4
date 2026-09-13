import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

const buttonVariants = cva('neo-button', {
  variants: {
    variant: {
      default: 'neo-button-default',
      noShadow: 'neo-button-no-shadow',
      neutral: 'neo-button-neutral',
      reverse: 'neo-button-reverse',
    },
    size: {
      default: 'neo-button-size-default',
      sm: 'neo-button-size-sm',
      lg: 'neo-button-size-lg',
      icon: 'neo-button-size-icon',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
