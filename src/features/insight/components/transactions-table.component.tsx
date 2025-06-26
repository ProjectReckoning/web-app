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
import { MenuItem, TextField, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { tosca } from '@/lib/custom-color';
import Select from '@/features/shared/components/select.component';
import Skeleton from '@/features/shared/components/skeleton';
import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from 'react';

export type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (
    typeof a[orderBy] === 'object'
    && typeof b[orderBy] === 'object'
    && a[orderBy] !== null
    && b[orderBy] !== null
    && 'key' in a[orderBy]
    && 'key' in b[orderBy]
  ) {
    if ((b[orderBy] as { key: string | Date }).key < (a[orderBy] as { key: string | Date }).key) return -1;
    if ((b[orderBy] as { key: string | Date }).key > (a[orderBy] as { key: string | Date }).key) return 1;
  }

  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<T extends string>(
  order: Order,
  orderBy: T
): (
  a: Record<string, string | number | ReactNode>,
  b: Record<string, string | number | ReactNode>
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface FilterOption {
  label: string;
  startAdornment?: ReactNode;
  options: string[];
  onFilter: (row: Record<string, string | number | ReactNode>, selected: string) => boolean;
  onChange?: (selected: string) => void;
  defaultValue?: string;
}

interface TransactionTableProps extends Omit<BoxProps, 'children'> {
  data: Record<string, string | number | ReactNode>[];
  filters?: FilterOption[];
  isLoading?: boolean;
}

const DEFAULT_COLUMN_COUNT = 5;

export default function TransactionTable({
  data,
  isLoading = false,
  filters = [],
  ...props
}: Readonly<TransactionTableProps>) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterSelections, setFilterSelections] = useState<Record<string, string>>({});

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    filters.forEach(filter => {
      if (filter.defaultValue) {
        handleFilterChange(filter.label, filter.defaultValue);
      }
    });
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPage(0);
  };

  const handleFilterChange = (label: string, value: string) => {
    setFilterSelections((prev) => ({ ...prev, [label]: value }));
    setPage(0);
  };

  const filteredRows = useMemo(() => {
    return data
      .filter(row => Object.values(row).some(val => String(val).toLowerCase().includes(query.toLowerCase())))
      .filter(row =>
        filters.every(filterFunction => {
          const selected = filterSelections[filterFunction.label] ?? filterFunction.options[0];
          return filterFunction.onFilter(row, selected);
        })
      );
  }, [query, filterSelections, data]);

  const visibleRows = useMemo(
    () => [...filteredRows].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  const headCells = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  if (!data.length && isLoading) {
    return (
      <Box {...props}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 999 }} />
          <Box display="flex" gap={2}>
            <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 999 }} />
            <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 999 }} />
          </Box>
        </Toolbar>

        <TableContainer sx={{ borderRadius: 8, border: 1, borderColor: 'divider', padding: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                {Array.from({ length: DEFAULT_COLUMN_COUNT }).map((_, index) => (
                  <TableCell key={index} sx={{
                    backgroundColor: tosca[100],
                    ...(index === 0 && {
                      borderTopLeftRadius: 999,
                      borderBottomLeftRadius: 999,
                    }),
                    ...(index === DEFAULT_COLUMN_COUNT - 1 && {
                      borderTopRightRadius: 999,
                      borderBottomRightRadius: 999,
                    }),
                  }}>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: rowsPerPage }).map((_, rowIdx) => (
                <TableRow key={rowIdx}>
                  {Array.from({ length: DEFAULT_COLUMN_COUNT }).map((_, colIdx) => (
                    <TableCell key={colIdx}>
                      <Skeleton variant="text" width="100%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="end" mt={2}>
          <Skeleton variant="rectangular" width={300} height={48} />
        </Box>
      </Box>
    )
  }

  return (
    <Box {...props}>
      <Toolbar sx={{ display: 'flex', flexWrap: "wrap", gap: 2, justifyContent: 'space-between' }}>
        <TextField
          onChange={handleSearchChange}
          placeholder="Search"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              startAdornment: <Icon icon="mdi:magnify" style={{ color: 'gray.light', fontSize: 24, marginRight: 8 }} />,
              style: { borderRadius: 999, backgroundColor: 'transparent' }
            }
          }}
        />

        <Box display="flex" flexWrap="wrap" gap={2}>
          {filters.map(filter => (
            <Select
              defaultValue={filter.defaultValue ?? filter.options[0]}
              key={filter.label}
              onChange={(e) => {
                const selected = e.target.value;
                handleFilterChange(filter.label, selected);
                filter.onChange?.(selected);
              }}
              size="small"
              variant="outlined"
              sx={{ borderRadius: 999 }}
              startAdornment={filter.startAdornment}
            >
              {filter.options.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          ))}
        </Box>
      </Toolbar>

      <TableContainer sx={{ borderRadius: 8, border: 1, borderColor: 'divider', padding: 2, mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((key, index) => (
                <TableCell
                  key={key}
                  sortDirection={orderBy === key ? order : false}
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
                    active={key === orderBy}
                    direction={orderBy === key ? order : 'asc'}
                    onClick={() => handleRequestSort(key)}
                  >
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <TableRow key={index}>
                  {headCells.map((_, value) => (
                    <TableCell key={value}><Skeleton variant="text" width="100%" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              visibleRows.map((row, index) => (
                <TableRow key={index}>
                  {headCells.map((key) => (
                    <TableCell key={key}>{row[key]}</TableCell>
                  ))}
                </TableRow>
              ))
            )}

            {!isLoading && visibleRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={headCells.length} align="center">
                  <Typography variant="body2" color="text.secondary">
                    Tidak ada data yang ditemukan
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isLoading ? (
        <Box display="flex" justifyContent="end" mt={2}>
          <Skeleton variant="rectangular" width={300} height={48} />
        </Box>
      ) : (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      )}

    </Box>
  );
}