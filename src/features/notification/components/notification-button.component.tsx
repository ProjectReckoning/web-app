import { Box, Dialog, DialogContent, Divider, IconButton, Popover, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import notificationStore from "../stores/notification.store";
import { orange, purple } from "@/lib/custom-color";
import generateShades from "@/lib/generate-shades";
import { getNonWhiteShades } from "@/lib/get-non-white-shades";

export default function NotificationButton({
  color
}: Readonly<{
  color?: string
}>) {
  const {
    notifications,
    unreadNotificationsCount,
    readAllNotifications,
    updateNotifications
  } = notificationStore()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    readAllNotifications()
  };

  const handleClose = () => {
    setAnchorEl(null)
    setTimeout(updateNotifications, 300)
  };
  const colorShades = generateShades(color ?? purple[500])

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const renderNotificationList = (
    <>
      <Typography variant="h6" fontWeight={600} gutterBottom px={2} position="sticky" top={0} pt={2} pb={1} m={0} borderBottom={1} borderColor="border.main" sx={{ backgroundColor: "white" }}>
        Notifikasi
      </Typography>
      {(notifications?.length ?? 0) > 0 ? (
        notifications?.map((item, index) => {
          const hasAction = item.type.includes("need");

          return (
            <React.Fragment key={`${item.id}`}>
              {index > 0 && (
                <Divider sx={{ backgroundColor: "border.light", borderBottomWidth: "1px" }} />
              )}
              <Box
                sx={{
                  bgcolor: item.isRead ? "inherit" : getNonWhiteShades(colorShades),
                  padding: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  {item.description}
                </Typography>
                {hasAction && (
                  <Typography variant="caption" color="textSecondary" display="block" mt={2}>
                    Buka{" "}
                    <Box component="span" fontWeight="bold" color={orange[500]}>
                      wondr
                    </Box>{" "}
                    untuk selengkapnya
                  </Typography>
                )}
              </Box>
            </React.Fragment>
          );
        })
      ) : (
        <>
          <Divider sx={{ backgroundColor: "border.light", borderBottomWidth: "1px" }} />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">Belum ada notifikasi</Typography>
          </Box>
        </>
      )}
    </>
  );

  return (
    <>
      <IconButton
        aria-label="notification"
        sx={{ border: 1, borderColor: "border.main", position: "relative" }}
        aria-describedby={id}
        onClick={handleClick}
      >
        <Icon
          icon={unreadNotificationsCount > 0 ? "eva:bell-fill" : "eva:bell-outline"}
          style={{ color: "black" }}
        />
        {unreadNotificationsCount > 0 && (
          <Typography
            variant="caption"
            position="absolute"
            fontWeight="bold"
            top={0}
            right={0}
            sx={{
              backgroundColor: colorShades[500],
              aspectRatio: 1,
              borderRadius: "50%",
              color: "white",
              height: 24,
              lineHeight: 2,
              translate: "25% -25%",
            }}
          >
            {unreadNotificationsCount}
          </Typography>
        )}
      </IconButton>

      {isMobile ? (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogContent sx={{ p: 0, m: 0 }}>
            {renderNotificationList}
          </DialogContent>
        </Dialog>
      ) : (
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                sx: {
                  width: 460,
                  maxWidth: "80%",
                  maxHeight: "80vh",
                  overflowY: "auto",
                  borderRadius: 6,
                  boxShadow: (theme) => theme.shadows[2],
                },
              },
            }}
          >
          {renderNotificationList}
        </Popover>
      )}
    </>
  );
}