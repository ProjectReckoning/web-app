'use client';

import { Box, Typography, Button, BoxProps } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import authStore from "../stores/auth.store";
import { useRouter } from "next/navigation";
import { gray, purple } from "@/lib/custom-color";

export default function AuthWIthOtpForm({ phoneNumber, ...props }: BoxProps & { phoneNumber: string }) {
  const { sessionId, sessionExpiresAt, logout, loginWithOtp, errorMessage, token, isLoading } = authStore();
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const route = useRouter();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);


  useEffect(() => {
    if (sessionExpiresAt) {
      const expiresIn = Math.max(0, Math.floor((new Date(sessionExpiresAt).getTime() - Date.now()) / 1000));
      setTimer(expiresIn);
    }
  }, [sessionExpiresAt]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (sessionId === null) {
      console.error("Session ID is null, cannot submit OTP");
      return;
    }

    (async () => {
      if (otp.every(digit => digit !== '')) {
        const otpString = otp.join('');

        await loginWithOtp({
          sessionId,
          otp: otpString,
          phoneNumber: phoneNumber,
        });

        if (token) {
          route.replace('/dashboard');
        }
      }
    })();
  }, [otp]);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  return (
    <Box
      {...props}
      sx={{
        borderRadius: 4,
        border: {
          xs: 0,
          lg: 1,
        },
        borderColor: {
          xs: 'transparent',
          lg: 'border.main',
        },
        p: {
          xs: 0,
          lg: 4,
        },
        width: '100%',
        mx: 'auto',
        ...props.sx,
      }}
    >
      <Typography variant="h5" fontWeight={600} mb={1}>
        Verifikasi Kode OTP
      </Typography>
      <Typography mb={1}>
        Kami telah mengirimkan OTP ke{' '}
        <Box component="span" sx={{ fontWeight: "bold", borderBottom: 2, borderColor: "tosca.main" }}>
          +62 {phoneNumber}
        </Box>
      </Typography>
      <Typography mb={3}>
        Masukan 6 digit kode di bawah ini untuk melanjutkan.
      </Typography>

      <Box display="flex" width="100%" gap={1} justifyContent="space-between" mb={3}>
        {otp.map((digit, index) => (
          <input
            key={index}
            name={`otp-${index}`}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            inputMode="numeric"
            pattern="\d*"
            style={{
              width: "100%",
              aspectRatio: 0.9,
              borderRadius: 8,
              outlineColor: gray[500],
              textAlign: "center",
              fontSize: "1.5rem",
              margin: "0 0.25rem",
            }}
          />
        ))}

      </Box>

      {isLoading ? (
        <Typography variant="body2" color="textSecondary" textAlign="center" mb={2}>
          Memverifikasi kode...
        </Typography>
      ) : (
        <Typography variant="body2" component="span" color='red' textAlign="center" mt={2} mb={4} sx={{ display: errorMessage ? "block" : "none" }}>
          {errorMessage}
        </Typography>
      )}

      <Typography>
        Tidak menerima kode?{' '}
        <Box component="span" sx={{ color: 'orange.main', fontWeight: "bold" }}>
          {`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`}
        </Box>
      </Typography>

      <Button
        startIcon={<Icon icon="mdi:arrow-left" width={24} height={24} />}
        onClick={logout}
        variant="text"
        sx={{ mt: 2, textTransform: 'none', color: purple[500] }}
        disabled={timer > 0}
      >
        Kembali
      </Button>
    </Box>
  );
}