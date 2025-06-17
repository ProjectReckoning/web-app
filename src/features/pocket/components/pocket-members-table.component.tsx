'use client';

import React from 'react';
import { Box, Typography, Avatar, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, BoxProps, TextField } from '@mui/material';
import { Icon } from '@iconify/react';

export interface PocketMembersTableRow {
  fullName: string;
  role: string;
  color: string;
  actions?: React.ReactNode;
  iconName?: string
}

export interface PocketMembersTableProps {
  data: PocketMembersTableRow[];
  title: string;
  color?: string;
  useSearch?: boolean;
}

export default function PocketMembersTable({
  title,
  data,
  color = 'tosca.main',
  useSearch,
  ...props
}: BoxProps & PocketMembersTableProps) {
  const [query, setQuery] = React.useState('');

  const filteredData = data.filter(item => item.fullName.toLowerCase().includes(query.toLowerCase()));

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
              {data[0]?.actions && <TableCell></TableCell>}
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
                    <Chip
                      label={item.role}
                      sx={{
                        fontWeight: 700,
                        color: 'black',
                        bgcolor: item.color,
                        borderRadius: '999px',
                        px: 2,
                        py: 1,
                        fontSize: 14,
                      }}
                    />
                  </TableCell>
                  {item.actions && (
                    <TableCell>
                      <Box display="flex" justifyContent="flex-end" gap={1}>
                        {item.actions}
                      </Box>
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