import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  InputAdornment,
  Grid,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
const initialShipments = [
  {
    id: 1,
    trackingNumber: "SHP001",
    customerName: "شركة الأمل",
    destination: "بغداد",
    status: "قيد التنفيذ",
    date: "2024-12-23",
    items: [
      { name: "لابتوب HP", quantity: 2 },
      { name: "طابعة Canon", quantity: 1 },
    ],
    priority: "عالي",
  },
  {
    id: 2,
    trackingNumber: "SHP002",
    customerName: "مؤسسة النور",
    destination: "بابل",
    status: "تم التسليم",
    date: "2024-12-22",
    items: [{ name: "طاولة مكتب", quantity: 5 }],
    priority: "عادي",
  },
  {
    id: 3,
    trackingNumber: "SHP003",
    customerName: "شركة البناء",
    destination: "البصرة",
    status: "في الطريق",
    date: "2024-12-21",
    items: [
      { name: "لابتوب HP", quantity: 3 },
      { name: "طاولة مكتب", quantity: 2 },
    ],
    priority: "منخفض",
  },
];
const getStatusColor = (status) => {
  switch (status) {
    case "قيد التنفيذ":
      return "warning";
    case "تم التسليم":
      return "success";
    case "في الطريق":
      return "info";
    default:
      return "default";
  }
};
const getPriorityColor = (priority) => {
  switch (priority) {
    case "عالي":
      return "error";
    case "عادي":
      return "primary";
    case "منخفض":
      return "success";
    default:
      return "default";
  }
};

const Shipments = () => {
  const [shipments, setShipments] = useState(initialShipments);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetailsOpen = (shipment) => {
    setSelectedShipment(shipment);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedShipment(null);
  };

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.trackingNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          placeholder="بحث..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          إضافة شحنة جديدة
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">رقم التتبع</TableCell>
              <TableCell align="right">اسم العميل</TableCell>
              <TableCell align="right">الوجهة</TableCell>
              <TableCell align="right">الحالة</TableCell>
              <TableCell align="right">الأولوية</TableCell>
              <TableCell align="right">التاريخ</TableCell>
              <TableCell align="right">عدد المنتجات</TableCell>
              <TableCell align="center">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredShipments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="right">{row.trackingNumber}</TableCell>
                  <TableCell align="right">{row.customerName}</TableCell>
                  <TableCell align="right">{row.destination}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={row.status}
                      color={getStatusColor(row.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={row.priority}
                      color={getPriorityColor(row.priority)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.items.length}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleDetailsOpen(row)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredShipments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="عدد الصفوف في الصفحة"
        />
      </TableContainer>

      {/* Shipment Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={handleDetailsClose}
        maxWidth="md"
        fullWidth
        BackdropProps={{
          style: {
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(3px)",
          },
        }}
      >
        <DialogTitle align="right">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocalShippingIcon />
            <Typography>
              تفاصيل الشحنة {selectedShipment?.trackingNumber}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedShipment && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  اسم العميل
                </Typography>
                <Typography variant="body1">
                  {selectedShipment.customerName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  الوجهة
                </Typography>
                <Typography variant="body1">
                  {selectedShipment.destination}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  الحالة
                </Typography>
                <Chip
                  label={selectedShipment.status}
                  color={getStatusColor(selectedShipment.status)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  الأولوية
                </Typography>
                <Chip
                  label={selectedShipment.priority}
                  color={getPriorityColor(selectedShipment.priority)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  المنتجات
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 1 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">اسم المنتج</TableCell>
                        <TableCell align="right">الكمية</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedShipment.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell align="right">{item.name}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose}>إغلاق</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Shipments;
