import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        gap: 2,
      }}
    >
      <Box
        component="img"
        src="/images/dashboard-null-pocket-illustration.png"
        alt="Logo"
        maxWidth='100%'
      />
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography variant="h5" fontWeight={600} component="h2">
          <Box component="span" color="purple.main">Uh-oh! {'\n'}</Box>
          <Box component="span" color="purple">Halaman yang kamu cari {' '}</Box>
          <Box component="span" borderBottom={4} borderColor="tosca.main" borderRadius={1}>tidak ditemukan</Box>
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Hubungi tim dukungan kami jika ini memang masalah.
        </Typography>

        <Link href="/dashboard">
          <Typography variant="body1" color="tosca.main">Kembali ke halaman utama</Typography>
        </Link>

      </Box>
    </Box>
  )
}