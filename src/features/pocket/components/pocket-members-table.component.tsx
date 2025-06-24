'use client';

import React from 'react';
import { Box, Typography, Avatar, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, BoxProps, TextField, MenuItem } from '@mui/material';
import { Icon } from '@iconify/react';
import Select from '@/features/shared/components/select.component';
import { limeGreen, tosca } from '@/lib/custom-color';
import generateShades from '@/lib/generate-shades';
import { PocketMemberRole } from '../entities/detail-pocket.entities';
import Skeleton from '@/features/shared/components/skeleton';
import formatCurrency from '@/lib/format-currency';

export interface PocketMembersTableRow {
  key: string;
  fullName: string;
  role: string;
  color: string;
  contribution?: number;
  actions?: React.ReactNode;
  iconName?: string
}

export interface PocketMembersTableProps {
  data: PocketMembersTableRow[];
  title: string;
  color?: string;
  useSearch?: boolean;
  editableKey?: string | null;
  onRoleEdited: (key: string, newRole: PocketMemberRole) => void;
  isLoading?: boolean;
}

const roleColors: Record<string, string> = {
  admin: tosca[300],
  member: limeGreen[300],
};

const DEFAULT_ROWS = 3;

export default function PocketMembersTable({
  title,
  data,
  color = 'tosca.main',
  useSearch,
  editableKey,
  onRoleEdited,
  isLoading = false,
  ...props
}: BoxProps & PocketMembersTableProps) {
  const [query, setQuery] = React.useState('');

  const filteredData = data.filter(item => item.fullName.toLowerCase().includes(query.toLowerCase()));
  const isHaveActions = data.some((it) => it.actions);
  const isHaveContribution = data.some((it) => it.contribution);

  if (isLoading) {
    return (
      <Box {...props}>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: '999px',
            px: 4,
            py: 1,
            mx: 'auto',
            width: 'fit-content',
          }}
        >
          <Skeleton variant="text" width={120} height={32} />
        </Box>

        {useSearch && (
          <Skeleton variant="rectangular" height={56} sx={{ mt: 2, borderRadius: 999 }} />
        )}

        <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 0, border: 1, borderColor: "border.main", mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: color }}>
                <TableCell><Skeleton variant="text" width={60} /></TableCell>
                <TableCell><Skeleton variant="text" width={60} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: DEFAULT_ROWS }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="text" width={120} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 999 }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          backgroundColor: color,
          borderRadius: '999px',
          px: 4,
          py: 1,
          mx: 'auto',
          width: 'fit-content',
          mb: 4,
        }}
      >
        <Typography variant="h6" fontWeight={700} align="center">
          {title}
        </Typography>
      </Box>

      {useSearch && (
        <TextField
          variant="outlined"
          placeholder="Cari..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          slotProps={{
            input: {
              sx: {
                borderRadius: 999,
              },
              startAdornment: (
                <Icon icon="mdi:magnify" width={24} height={24} style={{ marginRight: 8, color: 'grey' }} />
              ),
            },
          }}
        />
      )}
      <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 0, border: 1, borderColor: "border.main", mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: color }}>
              <TableCell><Typography fontWeight={700}>Nama</Typography></TableCell>
              <TableCell><Typography fontWeight={700}>Role</Typography></TableCell>
              {isHaveContribution && <TableCell><Typography fontWeight={700}>Kontribusi</Typography></TableCell>}
              {isHaveActions && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography variant="body2" color="textSecondary">
                    Tidak ada data
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {filteredData.map((item, index) => {
              const isEditing = item.key === editableKey;

              return (
                <TableRow key={index}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: item.color, color: 'black' }}>
                        <Icon icon={item.iconName ?? 'mdi:crown'} width={24} height={24} />
                      </Avatar>
                      <Typography>{item.fullName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <SelectRole defaultValue={item.role} onRoleEdited={(newRole: PocketMemberRole) => onRoleEdited(item.key, newRole)} />
                    ) : (
                      <Chip
                        clickable={false}
                        label={item.role}
                        sx={{
                          pointerEvents: 'none',
                          fontWeight: 700,
                          color: 'black',
                          bgcolor: item.color,
                          borderRadius: '999px',
                          px: 2,
                          py: 1,
                          fontSize: 14,
                        }}
                      />
                    )}
                  </TableCell>
                  {isHaveContribution && (
                    <TableCell>
                      <Typography>{formatCurrency(item.contribution ?? 0)}</Typography>
                    </TableCell>
                  )}

                  {isHaveActions && (
                    <TableCell>
                      {item.actions && (
                        <Box display="flex" justifyContent="flex-end" gap={1}>
                          {item.actions}
                        </Box>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

function SelectRole({
  defaultValue = 'member',
  onRoleEdited
}: {
  defaultValue?: string,
  onRoleEdited: (newRole: PocketMemberRole) => void
}) {
  const [value, setValue] = React.useState(defaultValue);

  const roleMap: Record<string, PocketMemberRole> = {
    admin: PocketMemberRole.Admin,
    member: PocketMemberRole.Member,
  };

  return (
    <Select
      defaultValue={value}
      onChange={(e) => {
        setValue(e.target.value);
        onRoleEdited(roleMap[e.target.value as string]);
      }}
      variant="outlined"
      displayEmpty
      renderValue={(selected) => (
        <Chip
          label={selected as string}
          clickable={false}
          sx={{
            bgcolor: "transparent",
            pointerEvents: 'none',
            fontWeight: 700,
            color: 'black',
            borderRadius: '999px',
            fontSize: 14,
          }}
        />
      )}
      sx={{
        bgcolor: roleColors[value],
        borderRadius: '999px',
        px: 1.5,
        py: 0.25,
        height: 'auto',
        '.MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
          p: 0,
        },
        '& fieldset': {
          border: 'none',
        },
        '& .MuiSelect-select': {
          paddingRight: '8px !important',
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            paddingX: 1,
            borderRadius: 4,
          },
        },
      }}
    >
      {['admin', 'member',].map((role) => (
        <MenuItem key={role} value={role} sx={{ padding: 0, my: 1 }}>
          <Chip
            label={role.charAt(0).toUpperCase() + role.slice(1)}
            sx={{
              bgcolor: roleColors[role],
              pointerEvents: 'none',
              width: '100%',
              color: 'black',
              fontWeight: 'bold',
              borderRadius: '999px',
              "&:hover": {
                bgcolor: generateShades(roleColors[role])[800],
              },
            }}
          />
        </MenuItem>
      ))}
    </Select>
  )
}