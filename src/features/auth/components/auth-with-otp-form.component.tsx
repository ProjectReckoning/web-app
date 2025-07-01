'use client';

import { Box, TextField, Typography, Button, BoxProps } from "@mui/material";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import authStore from "../stores/auth.store";
import { useRouter } from "next/navigation";

export default function AuthWIthOtpForm({ phoneNumber, ...props }: BoxProps & { phoneNumber: string }) {
  const { sessionId, sessionExpiresAt, logout, loginWithOtp, errorMessage, token, isLoading } = authStore();
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const route = useRouter();

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
    }

    if (value && index < otp.length - 1) {
      const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`);
      if (nextInput) {
        setOtp((prev) => {
          const newOtp = [...prev];
          newOtp[index + 1] = '';
          return newOtp;
        });
        (nextInput as HTMLInputElement).focus();
      }
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

      <Box display="flex" width="100%" gap={2} justifyContent="center" mb={3}>
        {otp.map((digit, index) => (
          <TextField
            key={digit}
            name={`otp-${index}`}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            variant="outlined"
            slotProps={{
              htmlInput: {
                maxLength: 1,
                style: { textAlign: 'center' },
              }
            }}
            sx={{
              borderRadius: 2,

              backgroundColor: "gray.light",
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                aspectRatio: 1,
              },
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
        sx={{ mt: 2, textTransform: 'none' }}
        disabled={timer > 0}
      >
        Kembali
      </Button>
    </Box>
  );
}