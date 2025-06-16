import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';

export default function PocketOverviewCard() {
  return (
    <Card sx={{ minWidth: 275, borderRadius: 8 }} variant='outlined'>
      <CardContent sx={{ padding: 0}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, backgroundColor: 'purple.light'}}>
          <Box padding={1} sx={{ padding: 2, backgroundColor: 'purple.main', color: 'white', width: 'fit-content', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon icon="material-symbols:money-bag-outline" style={{ fontSize: 32, color: "white" }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, marginTop: 2 }}>
            <Typography variant="body1" fontWeight={600} component="p">
              Donat Bahagia
            </Typography>

            <Typography variant="body1" component="p">
              Saldo
            </Typography>

            <Typography variant="body1" fontWeight={600} component="p">
              Rp1.000.000
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', px: 2 }}>
          <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }} color="green.main">
            <Typography variant="body2">
              <Icon icon="lets-icons:in" style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 2 }} />
              Pemasukan
            </Typography>

            <Typography variant="body1" fontWeight={600} component="p">
              Rp1.000.000
            </Typography>
          </Box>

          <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }} color="red.main">
            <Typography variant="body2">
              <Icon icon="lets-icons:out" style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 2 }} />
              Pengeluaran
            </Typography>

            <Typography variant="body1" fontWeight={600} component="p">
              Rp1.000.000
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
