import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import { Icon } from '@iconify/react';
import { gray, tosca } from '@/lib/custom-color';
import { MenuItem, Select, TextField, Typography } from '@mui/material';

interface Data {
  id: string;
  time: string;
  name: number;
  type: number;
  amount: number;
  category: string;
}

const rows = Array.from({ length: 50 }, (_, i) => {
  const isEven = i % 2 === 0;

  const now = new Date();
  const pastDate = new Date(now);
  pastDate.setDate(now.getDate() - Math.floor(Math.random() * 365));

  pastDate.setHours(Math.floor(Math.random() * 24));
  pastDate.setMinutes(Math.floor(Math.random() * 60));
  pastDate.setSeconds(Math.floor(Math.random() * 60));

  return {
    id: (i + 1).toString(),
    time: pastDate.toISOString(),
    name: isEven ? 'Ivanka Larasati' : 'Dimas Aryo',
    type: isEven ? 'Transfer' : 'Debit',
    amount: isEven
      ? 1000000 + i * 10000
      : 750000 + i * 5000,
    category: isEven ? 'Penjualan' : 'Gaji',
  };
});



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof unknown>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: 'Waktu',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Transaksi',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Tipe',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Jumlah',
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: false,
    label: 'Kategori',
  },
];

export default function TransactionTable({
  ...props
}: BoxProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('time');
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedCategory, setSelectedCategory] = React.useState('Semua');
  const [selectedDuration, setSelectedDuration] = React.useState('Hari Ini');

  const handleRequestSort = (
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPage(0);
  };

  const handleSelectedCategoryChanged = (category: string) => {
    setSelectedCategory(category);
    setPage(0);
  };

  const handleSelectedDurationChanged = (duration: string) => {
    setSelectedDuration(duration);
    setPage(0);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = React.useMemo(() => {
    console.log(rows)

    return rows.filter((row) => {
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase()),
      );
    }).filter((row) => {
      return selectedCategory === 'Semua' || row.category === selectedCategory;
    }).filter((row) => {
      if (selectedDuration === 'Hari Ini') {
        const today = new Date()
        today.setHours(0, 0, 0, 0);
        return new Date(row.time) >= today
      } else if (selectedDuration === '30 Hari Terakhir') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return new Date(row.time) >= thirtyDaysAgo;
      } else if (selectedDuration === '1 Tahun Terakhir') {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        return new Date(row.time) >= oneYearAgo;
      }
      return true;
    }
    );
  }, [query, selectedCategory, selectedDuration]);

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, query, selectedCategory, selectedDuration],
  );

  return (
    <Box {...props}>
      <EnhancedTableToolbar
        onSearchChange={handleSearchChange}
        onSelectedCategoryChanged={handleSelectedCategoryChanged}
        onSelectedDurationChanged={handleSelectedDurationChanged}
      />
      <TableContainer sx={{ borderRadius: 8, border: 1, borderColor: "border.main", padding: 2 }}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'medium'}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow
                hover
                tabIndex={-1}
                key={`${row.id}`}
                sx={{ cursor: 'pointer' }}
              >
                {Object.values(row).filter((_, i) => i !== 0).map((value) => (
                  <TableCell key={value} align="right">
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {visibleRows.length === 0 && (
              <TableRow
              >
                <TableCell colSpan={6} >
                  <Typography variant="body2" color="text.secondary" align="center">
                    Tidak ada data yang ditemukan
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage: number) => handleChangePage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

function EnhancedTableHead({
  order,
  orderBy,
  onRequestSort
}: {
  order: Order;
  orderBy: string;
  onRequestSort: (property: keyof Data) => void;
}) {
  const createSortHandler =
    (property: keyof Data) => () => {
      onRequestSort(property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              backgroundColor: tosca[100],
              ...(index === 0 && {
                borderTopLeftRadius: 999,
                borderBottomLeftRadius: 999,
              }),
              ...(index === headCells.length - 1 && {
                borderTopRightRadius: 999,
                borderBottomRightRadius: 999,
              }),
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar({ onSearchChange, onSelectedCategoryChanged, onSelectedDurationChanged }: {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectedCategoryChanged: (category: string) => void;
  onSelectedDurationChanged: (duration: string) => void;
}) {
  const categoryMenuItems = [
    "Semua",
    ...Array.from(new Set(rows.map(row => row.category)))
  ]

  const durationMenuItems = [
    "Hari Ini",
    "30 Hari Terakhir",
    "1 Tahun Terakhir",
  ];

  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <TextField
        onChange={onSearchChange}
        placeholder="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            startAdornment: <Icon icon="mdi:magnify" style={{ color: gray[500], fontSize: 24, marginRight: 8 }} />,
            sx: { borderRadius: 999, bgcolor: 'transparent', },
          }
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Select
          onChange={(event) => onSelectedCategoryChanged(event.target.value as string)}
          defaultValue={categoryMenuItems[0]}
          startAdornment={<Typography mr={1} variant='body2' sx={{ color: "gray.main" }}>Kategori:</Typography>}
          variant="outlined"
          size="small"
          sx={{ borderRadius: 999, bgcolor: 'transparent', }}
        >
          {categoryMenuItems.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>

        <Select
          defaultValue={durationMenuItems[0]}
          onChange={(event) => onSelectedDurationChanged(event.target.value as string)}
          startAdornment={<Typography mr={1} variant='body2' sx={{ color: "gray.main" }}>Durasi:</Typography>}
          variant="outlined"
          size="small"
          sx={{ borderRadius: 999, bgcolor: 'transparent', }}
        >
          {durationMenuItems.map((duration) => (
            <MenuItem key={duration} value={duration}>
              {duration}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Toolbar>
  );
}
