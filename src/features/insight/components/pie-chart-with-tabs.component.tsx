'use client';

import { useState } from 'react';
import { Box, Tabs, Tab, Typography, Stack, BoxProps } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import formatCurrency from '@/lib/format-currency';
import { ChevronRightRounded } from '@mui/icons-material';
import { gray } from '@/lib/custom-color';

export interface PieChartItem {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
  transactionCount: number;
}

export interface PieChartTabData {
  label: string;
  data: PieChartItem[];
}

export interface PieChartWithTabsProps {
  data: PieChartTabData[];
}

export default function PieChartWithTabs({ data, ...props }: PieChartWithTabsProps & BoxProps) {
  const [tab, setTab] = useState(0);
  const currentData = data[tab];
  const total = currentData.data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Box
      {...props}
    >
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        centered
        variant='standard'
        slotProps={{
          root: {
            sx: {
              width: 'fit-content',
              mx: 'auto',
              backgroundColor: gray[50],
              borderRadius: 999,
              mb: 4,
            },
          },
          indicator: { style: { display: 'none' } },
        }}
      >
        {data.map((tabItem, index) => (
          <Tab
            key={tabItem.label}
            label={tabItem.label}
            value={index}
            sx={{
              color: 'black',
              textTransform: 'none',
              fontWeight: 'bold',
              '&.Mui-selected': {
                backgroundColor: 'limeGreen.main',
                color: 'black',
                borderRadius: 999,
              },
            }}
          />
        ))}
      </Tabs>

      <PieChart
        series={[
          {
            data: currentData.data.map((item, index) => ({
              id: index,
              value: item.value,
              color: item.color,
            })),
            innerRadius: 50,
            outerRadius: 100,
            cx: '50%',
            cy: '50%',
          },
        ]}
        width={200}
        height={200}
      />

      <Stack spacing={2} mt={2}>
        {currentData.data.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                bgcolor: item.color,
                p: 1.5,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </Box>
            <Box flex={1} sx={{ borderBottom: `2px solid ${gray[100]}`, paddingBottom: 2, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }} >
              <Box display="flex" flexDirection="column" gap={0.5} flex={1}>
                <Typography fontWeight="bold" sx={{ whiteSpace: 'nowrap' }}>{item.label}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                  {formatCurrency(item.value)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                  Dari <Box component="span" fontWeight="bold">{item.transactionCount}</Box> Transaksi
                </Typography>
              </Box>
              
              <Typography fontWeight="bold">{((item.value / total) * 100).toFixed(0)}%</Typography>
              <ChevronRightRounded
                sx={{
                  color: 'text.secondary',
                  cursor: 'pointer',
                  '&:hover': { color: 'primary.main' },
                }}
                onClick={() => console.log(`Navigate to details for ${item.label}`)}
              />
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}