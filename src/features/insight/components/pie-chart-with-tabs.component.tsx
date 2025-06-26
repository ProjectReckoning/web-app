"use client";

import { useState } from "react";
import { Box, Tabs, Tab, Typography, Stack, BoxProps, IconButton } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import formatCurrency from "@/lib/format-currency";
import { gray } from "@/lib/custom-color";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import pocketStore from "@/features/pocket/stores/pocket.store";
import Skeleton from "@/features/shared/components/skeleton";

export interface PieChartItem {
  label: string;
  value: number;
  backgroundColor?: string;
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
  showAction?: boolean;
  isLoading?: boolean;
}

export default function PieChartWithTabs({
  isLoading = false,
  showAction = true,
  data,
  ...props
}: PieChartWithTabsProps & BoxProps) {
  const [tab, setTab] = useState(0);
  const currentData = data[tab];
  const total = currentData.data.reduce((acc, item) => acc + item.value, 0);
  const route = useRouter();
  const { selectedPocket } = pocketStore()

  if (isLoading) {
    return (
      <Box {...props}>
        {/* Tabs Skeleton */}
        <Box
          sx={{
            width: 'fit-content',
            mx: 'auto',
            backgroundColor: gray[50],
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
              variant="rectangular"
              width={80}
              height={32}
              sx={{ borderRadius: 999 }}
            />
          ))}
        </Box>

        {/* Pie Chart Skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Skeleton variant="circular" width={200} height={200} />
        </Box>

        {/* List Item Skeletons */}
        <Stack spacing={2} mt={2}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Box key={i} display="flex" alignItems="center" gap={2}>
              <Skeleton variant="circular" width={48} height={48} />

              <Box
                flex={1}
                sx={{
                  borderBottom: `2px solid ${gray[100]}`,
                  paddingBottom: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box display="flex" flexDirection="column" gap={0.5} flex={1}>
                  <Skeleton variant="text" width={100} height={24} />
                  <Skeleton variant="text" width={80} height={18} />
                  <Skeleton variant="text" width={120} height={18} />
                </Box>

                <Skeleton variant="text" width={40} height={24} />
                <Skeleton variant="circular" width={24} height={24} />
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    )
  }

  return (
    <Box {...props}>
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        centered
        variant="standard"
        slotProps={{
          root: {
            sx: {
              width: "fit-content",
              mx: "auto",
              backgroundColor: gray[50],
              borderRadius: 999,
              mb: 4,
            },
          },
          indicator: { style: { display: "none" } },
        }}
      >
        {data.map((tabItem, index) => (
          <Tab
            key={tabItem.label}
            label={tabItem.label}
            value={index}
            sx={{
              color: "black",
              textTransform: "none",
              fontWeight: "bold",
              "&.Mui-selected": {
                backgroundColor: "limeGreen.main",
                color: "black",
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
            cx: "50%",
            cy: "50%",
            valueFormatter: (v) => {
              const value = typeof v === "number" ? v : v?.value ?? 0;
              return formatCurrency(value);
            },
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
                bgcolor: item.backgroundColor ?? item.color,
                p: 1.5,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </Box>
            <Box
              flex={1}
              sx={{
                borderBottom: `2px solid ${gray[100]}`,
                paddingBottom: 2,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" flexDirection="column" gap={0.5} flex={1}>
                <Typography fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>
                  {item.label}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {formatCurrency(item.value)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  Dari{" "}
                  <Box component="span" fontWeight="bold">
                    {item.transactionCount}
                  </Box>{" "}
                  Transaksi
                </Typography>
              </Box>

              <Typography fontWeight="bold">
                {((item.value / total) * 100).toFixed(0)}%
              </Typography>
              {showAction && (
                <IconButton
                  onClick={() =>
                    route.push(`/dashboard/${selectedPocket?.id}/transactions?type=${item.label.toLowerCase()}`)
                  }
                >
                  <Icon
                    icon="mdi:chevron-right"
                    style={{
                      color: "text.secondary",
                      cursor: "pointer",
                      fontSize: 24,
                    }}
                  />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
