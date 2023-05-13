'use client';
import React from 'react';

// utils
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import findMatch from '../../utils/findMatch';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';

// types
import type { children, className, color, floated, shadow, variant } from '../../types/components/card';

export interface CardHeaderProps extends React.ComponentProps<'div'> {
  variant?: variant;
  color?: color;
  shadow?: shadow;
  floated?: floated;
  className?: className;
  children: children;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ variant, color, shadow, floated, className, children, ...rest }, ref) => {
    // 1. init
    const { cardHeader } = useTheme();
    const { defaultProps, styles, valid } = cardHeader;
    const { base, variants } = styles;

    // 2. set default props
    variant = variant ?? defaultProps.variant;
    color = color ?? defaultProps.color;
    shadow = shadow ?? defaultProps.shadow;
    floated = floated ?? defaultProps.floated;
    className = className ?? defaultProps.className;

    // 3. set styles
    const cardHeaderRoot = objectsToString(base.initial);
    const cardHeaderVariant = objectsToString(
      variants[findMatch(valid.variants, variant, 'filled')][findMatch(valid.colors, color, 'white')]
    );
    const classes = twMerge(
      classnames(
        cardHeaderRoot,
        cardHeaderVariant,
        { [objectsToString(base.shadow)]: shadow },
        { [objectsToString(base.floated)]: floated }
      ),
      className
    );

    // 4. return
    return (
      <div {...rest} ref={ref} className={classes}>
        {children}
      </div>
    );
  }
);
CardHeader.displayName = 'BlusteryUi.CardHeader';

export default CardHeader;
