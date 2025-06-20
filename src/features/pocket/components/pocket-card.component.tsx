"use client";

import { Box, Typography, BoxProps, IconButton } from "@mui/material";
import { useState } from "react";
import formatCurrency from "@/lib/format-currency";
import DoughnutShape from "@/features/shared/components/doughnut-shape.component";
import { Icon } from "@iconify/react";
import generateShades from "@/lib/generate-shades";
import { purple } from "@/lib/custom-color";
import CustomIcon from "@/features/shared/components/custom-icon.component";

interface PocketCardProps extends BoxProps {
  title: string | undefined;
  accountNumber: string;
  balance: number;
  icon: string;
  showBalance?: boolean;
}

export default function PocketCard({
  title,
  accountNumber,
  balance,
  icon,
  color = purple[500],
  showBalance = true,
  ...props
}: Omit<PocketCardProps, "color"> & { color?: string }) {
  const [showBalanceState, setShowBalanceState] = useState(false);
  const colorShades = generateShades(color);

  return (
    <Box position="relative" overflow="hidden" color="white" {...props}>
      <DoughnutShape
        width={600}
        height={600}
        innerRatio={0.5}
        innerColor={colorShades[500]}
        sx={{
          backgroundColor: colorShades[300],
          position: "absolute",
          top: -300,
          left: -420,
        }}
      />

      <Box
        display="flex"
        position="relative"
        alignItems="center"
        gap={2}
        zIndex={3}
      >
        <Box
          sx={{
            bgcolor: colorShades[500],
            width: 64,
            height: 64,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomIcon name={icon} style={{ fontSize: 32, color: "white" }} />
        </Box>

        {showBalance && (
          <Box flex={1}>
            <Typography color="black" 
            textOverflow="ellipsis"
            sx={{
              wordBreak: "break-word", // atau break-all
              whiteSpace: "normal",
            }}
            >{title} </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography fontWeight="bold" color="black">
                {accountNumber}
              </Typography>
              <IconButton
                onClick={() => navigator.clipboard.writeText(accountNumber)}
                sx={{ padding: 0, color: "black" }}
                aria-label="Copy account number"
              >
                <Icon
                  icon="iconamoon:copy"
                  style={{ fontSize: 16, color: "black" }}
                />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>

      {showBalance ? (
        <Box position="relative" mt={3}>
          <Typography fontSize={14} color="black">
            Saldo
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h5" fontWeight="bold" color="black">
              {showBalanceState ? formatCurrency(balance) : "******"}
            </Typography>

            <IconButton onClick={() => setShowBalanceState(!showBalanceState)}>
              {showBalanceState ? (
                <Icon
                  icon="ion:eye-off-outline"
                  style={{ fontSize: 24, color: "black" }}
                />
              ) : (
                <Icon
                  icon="ion:eye-outline"
                  style={{ fontSize: 24, color: "black" }}
                />
              )}
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box position="relative" mt={3}>
          <Typography
            variant="h5"
            color="black"
            fontWeight="bold"
            textOverflow="ellipsis"
            sx={{
              wordBreak: "break-word", // atau break-all
              whiteSpace: "normal",
            }}
          >
            {title}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontWeight="bold" color="black">
              {accountNumber}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
