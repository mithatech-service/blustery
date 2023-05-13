'use client';
import React from 'react';

// @floating-ui
import { useMergeRefs } from '@floating-ui/react';

// context
import { useSpeedDial } from './index';

// utils
import { twMerge } from 'tailwind-merge';

// type

export interface SpeedDialHandlerProps extends React.HTMLAttributes<HTMLElement> {}

export const SpeedDialHandler = React.forwardRef<HTMLElement, SpeedDialHandlerProps>(({ children, ...rest }, ref) => {
  // 1. init
  const { getReferenceProps, refs } = useSpeedDial();
  const mergedRef = useMergeRefs([ref, refs.setReference]);

  // 2. return
  return React.cloneElement(children as React.ReactElement, {
    ...getReferenceProps({
      ...rest,
      ref: mergedRef,
      className: twMerge((children as React.ReactElement)?.props?.className, rest?.className),
    }),
  });
});

SpeedDialHandler.displayName = 'BlusteryUi.SpeedDialHandler';

export default SpeedDialHandler;
