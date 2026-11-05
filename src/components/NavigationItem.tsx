import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { MouseEvent, ReactNode } from 'react';
import { useAppShell } from './AppShellContext.js';

export interface NavigationItemProps {
  label: ReactNode;
  icon?: ReactNode;
  /** Target; rendered through the theme's link component. */
  href?: string;
  /** Marks the current page (`aria-current="page"`). */
  selected?: boolean;
  /** Trailing content such as a count. */
  end?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

/**
 * One entry of the side navigation. Closes the mobile drawer on click.
 */
export function NavigationItem({
  label,
  icon,
  href,
  selected = false,
  end,
  onClick,
}: NavigationItemProps) {
  const shell = useAppShell();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    onClick?.(event);
    shell?.closeNavigation();
  };

  const buttonProps = {
    selected,
    'aria-current': selected ? ('page' as const) : undefined,
    onClick: handleClick,
    sx: { minHeight: 40, paddingInline: 1.5, gap: 0.5 },
  };

  const content = (
    <>
      {icon && (
        <ListItemIcon sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText
        primary={label}
        slotProps={{
          primary: {
            sx: { fontSize: '0.875rem', fontWeight: selected ? 600 : 500 },
          },
        }}
      />
      {end}
    </>
  );

  return (
    <li>
      {href ? (
        <ListItemButton href={href} {...buttonProps}>
          {content}
        </ListItemButton>
      ) : (
        <ListItemButton {...buttonProps}>{content}</ListItemButton>
      )}
    </li>
  );
}
