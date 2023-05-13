'use client';
import React from 'react';

// context
import { useTheme } from '../../context/theme';

// utils
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import objectsToString from '../../utils/objectsToString';

// types
import type { children, className } from '../../types/components/list';

// list components
import { ListItem, ListItemProps } from './ListItem';
import { ListItemPrefix, ListItemPrefixProps } from './ListItemPrefix';
import { ListItemSuffix, ListItemSuffixProps } from './ListItemSuffix';

export interface ListProps extends React.ComponentProps<'div'> {
  className?: className;
  children: children;
}

export const List = React.forwardRef<HTMLDivElement, ListProps>(({ className, children, ...rest }, ref) => {
  // 1. init
  const { list } = useTheme();
  const {
    defaultProps,
    styles: { base },
  } = list;

  // 2. set default props
  className = className ?? defaultProps.className;

  // 3. set styles
  const listClasses = twMerge(classnames(objectsToString(base.list)), className);

  return (
    <nav {...rest} ref={ref} className={listClasses}>
      {children}
    </nav>
  );
});

List.displayName = 'BlusteryUi.List';

export { ListItem, ListItemPrefix, ListItemSuffix };
export type { ListItemPrefixProps, ListItemProps, ListItemSuffixProps };
export default Object.assign(List, { Item: ListItem, ItemPrefix: ListItemPrefix, ItemSuffix: ListItemSuffix });
