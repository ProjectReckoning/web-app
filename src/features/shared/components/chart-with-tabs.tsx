'use client';

import { useState } from 'react';
import { Tabs, Tab, Box, BoxProps } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { limeGreen } from '@/lib/custom-color';

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
}

export default function ChartWithTabs({ data, height, ...props }: Omit<BoxProps, 'children'> & ChartWithTabsProps) {
  const [tab, setTab] = useState(0);
  const currentData = data[tab];

  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        {...props}
      >
        <h1>Loading...</h1>
      </Box>
    );
  }

  return (
    <Box {...props}>
      {data.length > 1 && (
        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          centered
          variant='standard'
          slotProps={
            {
              root: {
                sx: {
                  width: 'fit-content',
                  mx: 'auto',
                  backgroundColor: '#f5f5f5',
                  borderRadius: 999,
                  mb: 4,
                },
              },
              indicator: { style: { display: 'none' } },
            }
          }
        >
          {data.map((item, index) => (
            <Tab
              key={item.label}
              label={item.label}
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
        xAxis={[{ data: currentData.x, scaleType: 'band' }]}
        series={
          Object.entries(currentData.series).map(([key, value]) => ({
            data: value.data,
            label: key,
          }))
        }
        slotProps={{
          legend: {
            position: { vertical: 'bottom', },
          },
        }}
        sx={{
          width: '100%',
          height: height ?? 300,
        }}
      />
    </Box>
  );
}
