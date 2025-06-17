import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
import { PocketEntity } from '../entities/pocket.entites';
import formatCurrency from '@/lib/format-currency';
import CustomIcon from '@/features/shared/components/custom-icon.component';

export default function PocketOverviewCard(pocket: PocketEntity) {
  return (
    <Card sx={{ minWidth: 275, borderRadius: 8 }} variant='outlined'>
      <CardContent sx={{ padding: 0}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, backgroundColor: 'purple.light'}}>
          <Box padding={1} sx={{ padding: 2, backgroundColor: pocket.color, color: 'white', width: 'fit-content', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CustomIcon name={pocket.icon} style={{ fontSize: 24, color: 'white' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, marginTop: 2 }}>
            <Typography variant="body1" fontWeight={600} component="p">
              {pocket.name}
            </Typography>

            <Typography variant="body1" component="p">
              Saldo
            </Typography>

            <Typography variant="body1" fontWeight={600} component="p">
              {formatCurrency(pocket.current_balance)}
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
              {formatCurrency(pocket.income)}
            </Typography>
          </Box>

          <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }} color="red.main">
            <Typography variant="body2">
              <Icon icon="lets-icons:out" style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 2 }} />
              Pengeluaran
            </Typography>

            <Typography variant="body1" fontWeight={600} component="p">
              {formatCurrency(pocket.outcome)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
