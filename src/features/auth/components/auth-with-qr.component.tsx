import { purple } from "@/lib/custom-color";
import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function AuthWithQrCode({
  setLoginWithQr,
}: {
  setLoginWithQr: (value: boolean) => void;
}) {
  const [timeLeft, setTimeLeft] = useState(60); // 60 detik

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setTimeout(() => setLoginWithQr(false), 1000); // auto kembali setelah 1 detik
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [setLoginWithQr]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 250,
        mx: "auto",
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 5,
        borderColor: "border.main",
        borderWidth: 1,
        borderStyle: "solid",
        boxShadow: 0,
      }}
    >
      <CardActionArea disableRipple>
        <CardMedia
          component="img"
          src="/images/qr.png"
          alt="QR Code for Login"
          sx={{ width: "100%", height: "auto" }}
        />
        <CardContent sx={{ padding: 0 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Kode akan kadaluwarsa pada
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#F7931E",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatTime(timeLeft)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          onClick={() => setLoginWithQr(false)}
          startIcon={<Icon icon="mdi:arrow-left-thin" />}
          sx={{ textTransform: "none", color: purple[500] }}
        >
          Kembali
        </Button>
      </CardActions>
    </Card>
  );
}
