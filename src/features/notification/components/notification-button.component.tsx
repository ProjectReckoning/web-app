import { Box, Divider, IconButton, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { Icon } from "@iconify/react";
import notificationStore from "../stores/notification.store";

export default function NotificationButton() {
  const { notifications, unreadNotificationsCount } = notificationStore()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton
        aria-label="notification"
        sx={{ border: 1, borderColor: "border.main", position: "relative" }}
        aria-describedby={id}
        onClick={handleClick}
      >
        <Icon icon={unreadNotificationsCount > 0 ? "eva:bell-fill" : "eva:bell-outline"} style={{ color: "black" }} />
        {unreadNotificationsCount > 0 && (
          <Typography
            variant="caption"
            position="absolute"
            fontWeight="bold"
            top={0}
            right={0}
            sx={{
              backgroundColor: "purple.main",
              aspectRatio: 1,
              borderRadius: "50%",
              color: "white",
              height: 24,
              lineHeight: 2,
              translate: "25% -25%"
            }}
          >{unreadNotificationsCount}</Typography>
        )}
      </IconButton>
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
              maxWidth: 300,
              padding: 2,
              maxHeight: "80vh",
              overflowY: "auto",
              borderRadius: 6,
              boxShadow: (theme) => theme.shadows[3],
            },
          },
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Notifikasi
        </Typography>
        {(notifications?.length ?? 0) > 0 ?
          notifications?.map((item) => (
            <Box key={`${item.title}-${item.description}-${item.type}`} sx={{ marginBottom: 16 }}>
              <Divider sx={{ backgroundColor: "border.light", my: 2, borderBottomWidth: '1px' }} />
              <Typography variant="subtitle1" fontWeight="bold">
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.description}
              </Typography>
            </Box>
          )) : (
            <Box sx={{ marginBottom: 16 }}>
              <Divider sx={{ backgroundColor: "border.light", my: 2, borderBottomWidth: '1px' }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Belum ada notifikasi
              </Typography>
            </Box>
          )}
      </Popover>
    </>
  );
}
