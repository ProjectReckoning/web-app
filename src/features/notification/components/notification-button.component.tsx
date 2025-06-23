import { Divider, IconButton, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { Icon } from "@iconify/react";

const DATA = [
  {
    id: "1",
    title: "Notifikasi 1",
    description: "Ini adalah deskripsi notifikasi pertama.",
  },
  {
    id: "2",
    title: "Notifikasi 2",
    description: "Ini adalah deskripsi notifikasi kedua.",
  },
  {
    id: "3",
    title: "Notifikasi 3",
    description: "Ini adalah deskripsi notifikasi ketiga.",
  },
];

export default function NotificationButton() {
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
        sx={{ border: 1, borderColor: "border.main" }}
        aria-describedby={id}
        onClick={handleClick}
      >
        <Icon icon="eva:bell-outline" style={{ color: "black" }} />
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
        {DATA.map((item) => (
          <div key={item.id} style={{ marginBottom: 16 }}>
            <Divider sx={{ backgroundColor: "border.light", my: 2, borderBottomWidth: '1px'  }} />
            <Typography variant="subtitle1" fontWeight="bold">
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {item.description}
            </Typography>
          </div>
        ))}
      </Popover>
    </>
  );
}
