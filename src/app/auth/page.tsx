'use client'

import Typography from '@mui/material/Typography';
import authStore from '@/features/auth/stores/auth.store';
import AuthWithCredentialForm from '@/features/auth/components/auth-with-credential-form.component';
import AuthWIthOtpForm from '@/features/auth/components/auth-with-otp-form.component';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function Page() {
  const { phoneNumber: phoneNumberStore, sessionId } = authStore();
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberStore ?? '');

  useEffect(() => {
    if (phoneNumberStore) {
      setPhoneNumber(phoneNumberStore);
    }
  }, [phoneNumberStore]);

  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        fontWeight={600}
        textAlign="center"
      >
        Masuk {' '}
        <Box
          component="span"
          sx={{
            borderBottomColor: "purple.main",
            borderBottomWidth: 4,
            borderBottomStyle: "solid"
          }}>Pocket
        </Box>
      </Typography>

      {sessionId === null
        ? <AuthWithCredentialForm
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          flexDirection="column"
          justifyContent="center"
          sx={{
            mt: {
              xs: 3,
              md: 4,
            }
          }}
        />
        : <AuthWIthOtpForm
          phoneNumber={phoneNumber}
          sx={{
            mt: {
              xs: 3,
              md: 4,
            }
          }}
        />
      }
    </>
  );
}
