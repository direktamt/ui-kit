import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useColorScheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useId, useState, type ReactNode } from 'react';
import {
  CheckIcon,
  DarkModeIcon,
  LightModeIcon,
  SystemModeIcon,
} from '../icons/KitIcons.js';

type Mode = 'light' | 'dark' | 'system';

export interface ColorSchemeToggleLabels {
  button: string;
  light: string;
  dark: string;
  system: string;
}

export interface ColorSchemeToggleProps {
  labels?: Partial<ColorSchemeToggleLabels>;
}

const DEFAULT_LABELS: ColorSchemeToggleLabels = {
  button: 'Colour scheme',
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const ICONS: Record<Mode, ReactNode> = {
  light: <LightModeIcon fontSize="small" />,
  dark: <DarkModeIcon fontSize="small" />,
  system: <SystemModeIcon fontSize="small" />,
};

const MODES: Mode[] = ['light', 'dark', 'system'];

/**
 * Header control to pick the light, dark or system colour scheme.
 */
export function ColorSchemeToggle({ labels }: ColorSchemeToggleProps) {
  const text = { ...DEFAULT_LABELS, ...labels };
  const { mode, setMode } = useColorScheme();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const menuId = useId();
  const current: Mode = mode ?? 'system';

  return (
    <>
      <Tooltip title={text.button}>
        <IconButton
          aria-label={text.button}
          aria-haspopup="menu"
          aria-controls={anchor ? menuId : undefined}
          aria-expanded={anchor ? true : undefined}
          onClick={(event) => setAnchor(event.currentTarget)}
          disabled={!mode}
        >
          {ICONS[current]}
        </IconButton>
      </Tooltip>
      <Menu
        id={menuId}
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {MODES.map((option) => (
          <MenuItem
            key={option}
            selected={option === current}
            onClick={() => {
              setMode(option);
              setAnchor(null);
            }}
            sx={{ minWidth: 160 }}
          >
            <ListItemIcon>{ICONS[option]}</ListItemIcon>
            <ListItemText>{text[option]}</ListItemText>
            {option === current && <CheckIcon fontSize="small" />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
