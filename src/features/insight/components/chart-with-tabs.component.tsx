'use client';

import { useState } from 'react';
import { Tabs, Tab, Box, BoxProps, Typography, Avatar } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { gray, limeGreen } from '@/lib/custom-color';
import Skeleton from '@/features/shared/components/skeleton';
import formatCurrency from '@/lib/format-currency';
import { Icon } from '@iconify/react';

export interface ChartData {
  x: string[];
  label: string;
  series: Record<
    string,
    {
      data: number[];
      color?: string;
    }
  >;
}

export interface ChartWithTabsProps {
  data: ChartData[];
  isLoading?: boolean;
  isDemo?: boolean;
}

export default function ChartWithTabs({
  data,
  height,
  isLoading = false,
  isDemo = false,
  ...props
}: Omit<BoxProps, 'children'> & ChartWithTabsProps) {
  const [tab, setTab] = useState(0);

  if (isLoading || !data) {
    return (
      <Box {...props}>
        {/* Tabs Skeleton */}
        <Box
          sx={{
            width: 'fit-content',
            mx: 'auto',
            backgroundColor: "gray.light",
            borderRadius: 999,
            mb: 4,
            px: 2,
            py: 1,
            display: 'flex',
            gap: 2,
          }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={80}
              height={32}
              sx={{ borderRadius: 999 }}
            />
          ))}
        </Box>

        {/* Chart Skeleton */}
        <Skeleton
          variant="rounded"
          width="100%"
          sx={{ borderRadius: 2, height: height || 400, bgcolor: "gray.light" }}
        />
        <Box display="flex" justifyContent="center" gap={4} mt={2}>
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="text"
              width={120}
              height={32}
              sx={{ borderRadius: 999 }}
            />
          ))}
        </Box>
      </Box>
    );
  }

  const currentData = data[tab];

  if (!currentData) {
    return (
      <Box {...props} height="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Avatar sx={{ bgcolor: 'gray.main', width: 48, height: 48, mt: 1 }}>
          <Icon icon="mdi:clipboard-text-off-outline" width={32} />
        </Avatar>
        <Typography variant="body2" mt={2} color='gray.main' textAlign="center">
          Belum ada data
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      {...props}
    >
      {data.length > 1 && (
        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          variant="scrollable"
          allowScrollButtonsMobile
          slotProps={
            {
              root: {
                sx: {
                  width: "100%",
                  maxWidth: "fit-content",
                  mx: 'auto',
                  backgroundColor: gray[50],
                  borderRadius: 999,
                  mb: 4,
                  ...(isDemo && {
                    filter: "blur(2px)",
                    opacity: 0.6,
                    pointerEvents: "none",
                  }),
                },
              },
              indicator: { style: { display: 'none' } },
            }
          }
        >
          {data.map((item, index) => (
            <Tab
              key={item.label}
              label={item.label.charAt(0).toUpperCase() + item.label.slice(1)}
              value={index}
              color='limeGreen'
              sx={{
                color: 'limeGreen',
                textTransform: 'none',
                fontWeight: 'bold',
                '&.Mui-selected': {
                  backgroundColor: limeGreen[500],
                  color: 'black',
                  borderRadius: 999,
                },
              }}
            />
          ))}
        </Tabs>
      )}

      <LineChart
        localeText={{
          noData: "Belum ada data"
        }}
        xAxis={[{ data: currentData.x, scaleType: 'band' }]}
        series={
          Object.entries(currentData.series).map(([key, value]) => ({
            data: value.data,
            label: key,
            valueFormatter: (v) => {
              const value = typeof v === "number" ? v : v ?? 0;
              return formatCurrency(value);
            },
          }))
        }
        slotProps={{
          legend: {
            position: { vertical: 'bottom', },
            sx: {
              textTransform: "capitalize"
            }
          },
        }}
        sx={{
          ...(isDemo && {
            filter: "blur(1px)",
            opacity: 0.6,
            pointerEvents: "none",
          }),
          width: '100%',
          height: height ?? 300,
        }}
      />

      {isDemo && (
        <Typography variant="body2" display="block" width="100%" textAlign="center" mt={4}>Data masih kosong, grafik keuanganmu akan muncul setelah <Box component="span" fontWeight="bold" whiteSpace="nowrap" borderBottom={4} borderColor="purple.main">7 hari {' '}</Box> setelah transaksi</Typography>
      )}
    </Box>
  );
}
