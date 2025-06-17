'use client'

import Typography from '@mui/material/Typography';
import { purple } from '@/lib/custom-color';
import authStore from '@/features/auth/stores/auth.store';
import AuthWithCredentialForm from '@/features/auth/components/auth-with-credential-form.component';
import AuthWIthOtpForm from '@/features/auth/components/auth-with-otp-form.component';
import { useEffect, useState } from 'react';

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
      <Typography variant="h4" component="h2" fontWeight={600} textAlign="center">
        Masuk <Typography fontWeight={600} variant="h4" component="span" sx={{ borderBottomColor: purple[500], borderBottomWidth: 4, borderBottomStyle: "solid" }}>
          Pocket
        </Typography>
      </Typography>

      {sessionId === null
        ? <AuthWithCredentialForm phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        : <AuthWIthOtpForm phoneNumber={phoneNumber} />
      }
    </>
  );
}
