import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import axios from 'axios';
import { BackendUrl } from '../../../redux/api/axios';
import { getToken } from '../../../utils/handelCookie';
import AddIcon from '@mui/icons-material/Add';

const WarehousesList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const token = getToken();

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/warehouses`, {
        headers: { Authorization: token }
      });
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <Box sx={{ }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2" align="right">
          إدارة المخازن
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          إضافة مخزن جديد
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">اسم المخزن</TableCell>
              <TableCell align="right">الموقع</TableCell>
              <TableCell align="right">السعة</TableCell>
              <TableCell align="right">الحالة</TableCell>
              <TableCell align="right">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouses.map((warehouse) => (
              <TableRow key={warehouse.id}>
                <TableCell align="right">{warehouse.name}</TableCell>
                <TableCell align="right">{warehouse.location}</TableCell>
                <TableCell align="right">{warehouse.capacity}</TableCell>
                <TableCell align="right">{warehouse.status}</TableCell>
                <TableCell align="right">
                  <Button color="primary" size="small">تعديل</Button>
                  <Button color="secondary" size="small">عرض</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WarehousesList;
