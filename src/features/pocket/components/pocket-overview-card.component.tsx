import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';

export default function PocketOverviewCard() {
  return (
    <Card sx={{ minWidth: 275, borderRadius: 8 }} variant='outlined'>
      <CardContent sx={{ padding: 0}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, backgroundColor: 'purple.light'}}>
          <Box padding={1} sx={{ padding: 2, backgroundColor: 'purple.main', color: 'white', width: 'fit-content', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon style={{ fontSize: 36, }}>
              money_bag
            </Icon>
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
              <Icon style={{ fontSize: "inherit", verticalAlign: 'middle', marginRight: 2 }}>
                edit
              </Icon>
              Pemasukan
            </Typography>

            <Typography variant="body1" fontWeight={600} component="p">
              Rp1.000.000
            </Typography>
          </Box>

          <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }} color="red.main">
            <Typography variant="body2">
              <Icon style={{ fontSize: "inherit", verticalAlign: 'middle', marginRight: 2 }}>
                edit
              </Icon>
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
