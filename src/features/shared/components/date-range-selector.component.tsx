'use client';

import { useState } from 'react';
import { Box, TextField, Popover, useTheme, useMediaQuery, Dialog, DialogContent, BoxProps } from '@mui/material';
import { DateRange, RangeKeyDict } from 'react-date-range';
import { format, differenceInDays } from 'date-fns';
import idLocale from 'date-fns/locale/id';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { orange } from '@/lib/custom-color';
import { Icon } from '@iconify/react';

type CustomRange = { startDate: Date; endDate: Date };

type DateRangeSelectorProps = {
  onChange?: (range: CustomRange) => void;
} & Omit<BoxProps, 'onChange'>;

export default function DateRangeSelector({ onChange, ...props }: DateRangeSelectorProps) {
  const today = new Date();
  const aYearAgo = new Date(new Date().setFullYear(today.getFullYear() - 1));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRange, setSelectedRange] = useState({
    startDate: aYearAgo,
    endDate: today,
    key: 'selection',
  });

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;

    const days = differenceInDays(endDate!, startDate!);
    if (days > 365) return;

    setSelectedRange({
      startDate: startDate!,
      endDate: endDate!,
      key: 'selection',
    });
    onChange?.({ startDate: startDate!, endDate: endDate! });
  };

  const open = Boolean(anchorEl);
  const formattedLabel = `${format(selectedRange.startDate!, 'dd MMM yyyy', {
    locale: idLocale,
  })} - ${format(selectedRange.endDate!, 'dd MMM yyyy', {
    locale: idLocale,
  })}`;

  return (
    <Box {...props}>
      <TextField
        fullWidth
        onClick={handleOpen}
        value={formattedLabel}
        variant="outlined"
        slotProps={{
          input: {
            sx: {
              cursor: "pointer"
            },
            readOnly: true,
            endAdornment: <Icon icon="mdi:calendar-month" style={{ marginLeft: 8, fontSize: 32, color: orange[500] }} />,
          }
        }}
        sx={{
          borderRadius: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            fontWeight: 600,
            color: 'gray',
            '& fieldset': {
              borderColor: 'border.main',
            },
          },
          cursor: "pointer"
        }}
      />

      {isMobile ? (
        <Dialog open={open} onClose={handleClose} sx={{ borderRadius: 4 }} slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
            },
          },
        }}>
          <DialogContent sx={{ p: 0 }}>
            <DateRange
              locale={idLocale}
              ranges={[selectedRange]}
              onChange={handleChange}
              moveRangeOnFirstSelection={false}
              direction="vertical"
              months={1}
              minDate={aYearAgo}
              maxDate={today}
              rangeColors={[orange[500]]}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{
            paper: {
              sx: {
                maxWidth: '100vw',
                borderRadius: 4,
              },
            },
          }}
        >
          <DateRange
            locale={idLocale}
            ranges={[selectedRange]}
            onChange={handleChange}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
            minDate={aYearAgo}
            maxDate={today}
            rangeColors={[orange[500]]}
          />
        </Popover>
      )}

    </Box>
  );
}
