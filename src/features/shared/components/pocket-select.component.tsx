'use client'

import React from 'react';
import {
  Box,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  SxProps,
  Theme,
} from '@mui/material';
import { purple } from '@/lib/custom-color';
import { Icon } from '@iconify/react';

export interface PocketMenuItem {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface PocketSelectProps {
  pockets: PocketMenuItem[];
  selectedPocketId: string;
  onPocketChange: (event: SelectChangeEvent<string>) => void;
  sx?: SxProps<Theme>;
  isOpen?: boolean;
}

export default function PocketSelect({
  pockets,
  selectedPocketId,
  onPocketChange,
  sx,
  isOpen,
}: PocketSelectProps) {
  const currentSelectedPocket = pockets.find((p) => p.id === selectedPocketId)

  return (
    <MuiSelect
      value={selectedPocketId}
      onChange={onPocketChange}
      sx={{
        marginLeft: isOpen ? 2 : 0,
        marginRight: isOpen ? 2 : 0,
        marginTop: 2,
        width: 'auto',
        borderRadius: 999,
        '.MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
        backgroundColor: isOpen ? currentSelectedPocket?.color : 'transparent',
        '& .MuiBox-root': {
          color: isOpen ? 'white' : currentSelectedPocket?.color,
          fontWeight: 'bold',
        },
        '& .MuiBox-root span': {
          display: isOpen ? 'flex' : 'none',
        },
        '& .MuiInputBase-root': {
          paddingRight: '0 !important',
        },
        '& .MuiSelect-select': {
          paddingRight: '0 !important',
        },
        '& .MuiSvgIcon-root': {
          color: isOpen ? 'white' : currentSelectedPocket?.color,
          '@media (max-width: 600px)': {
            display: 'none',
          },
        },
        ...sx,
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            paddingX: 2,
            paddingY: 1,
            marginTop: 1,
            gap: 12,
            borderRadius: 2,
          },
        },
      }}

      renderValue={(selected) => {
        const pocketToDisplay = pockets.find(p => p.id === selected)

        if (!pocketToDisplay) {
          return (
            <Box display="flex" alignItems="center" gap={1}>
              <Icon icon="mdi:error" style={{ color: purple[500] }} />
              {isOpen && <Box component="span" sx={{ color: purple[500] }}>Pocket not found</Box>}
            </Box>
          );
        }

        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Icon icon={pocketToDisplay.icon} style={{ color: isOpen ? 'white' : pocketToDisplay.color, fontSize: 24 }} />
            {isOpen && (
              <Box component="span" sx={{ color: isOpen ? 'white' : pocketToDisplay.color }}>
                {pocketToDisplay.name}
              </Box>
            )}
          </Box>
        );
      }}
    >
      {pockets.map((pocket) => (
        <MenuItem
          key={pocket.id}
          value={pocket.id}
          sx={(theme) => ({
            borderRadius: 999,
            marginY: theme.spacing(0.5),
            transition: 'background-color 0.2s, color 0.2s',
            fontWeight: 'bold',
            color: pocket.color,

            '& .icon': {
              color: pocket.color,
              transition: 'color 0.2s',
            },
            '& span': {
              color: pocket.color,
              transition: 'color 0.2s',
            },

            '&:hover': {
              backgroundColor: `${pocket.color}!important`,
              color: 'white',
              '& .icon': {
                color: 'white',
              },
              '& span': {
                color: 'white',
              },
            },
          })}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Icon icon={pocket.icon} className="icon" style={{ fontSize: 24 }} />
            <Box component="span">{pocket.name}</Box>
          </Box>
        </MenuItem>

      ))}
    </MuiSelect>
  );
};