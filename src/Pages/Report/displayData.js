import React, { useRef, useState } from "react";
import { ButtonSave } from "../../utils/Content";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableFooter,
} from "@mui/material";
import { Close, Print } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import {
  formatDateYearsMonth,
  SectionTitle,
  StyledTableCell,
  StyledTableRow,
} from "../../utils/Function";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const DisplayInformationComponent = ({
  includes,
  activeFactory,
  ActiveLab,
  activeMaterial,
  activeWareHouse,
}) => {
  const [open, setOpen] = useState(false);
  const componentRef = useRef();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <ButtonSave variant="outlined" onClick={handleClickOpen}>
        عرض البيانات
      </ButtonSave>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#1e6a99" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              التقارير
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handlePrint}
              startIcon={<Print />}
            >
              طباعة
            </Button>
          </Toolbar>
        </AppBar>
        {includes?.includes("1") && (
          <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
            <SectionTitle variant="h5">بيانات المخازن</SectionTitle>
            <TableContainer>
              <Table dir={"rtl"}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="header">#</StyledTableCell>
                    {activeMaterial?.includes("1") && (
                      <StyledTableCell className="header">
                        اسم ألمادة
                      </StyledTableCell>
                    )}
                    {activeMaterial?.includes("2") && (
                      <StyledTableCell className="header">
                        رقم الرمزي للمادة
                      </StyledTableCell>
                    )}
                    {activeMaterial?.includes("3") && (
                      <StyledTableCell className="header">
                        رقم المستند
                      </StyledTableCell>
                    )}
                    {activeMaterial?.includes("4") && (
                      <StyledTableCell className="header">
                        نوع المستند
                      </StyledTableCell>
                    )}
                    {activeMaterial?.includes("5") && (
                      <StyledTableCell className="header">
                        كمية المادة
                      </StyledTableCell>
                    )}
                    {activeMaterial?.includes("6") && (
                      <StyledTableCell className="header">
                        الرصيد
                      </StyledTableCell>
                    )}
                    {activeMaterial?.includes("7") && (
                      <StyledTableCell className="header">
                        حالة المادة
                      </StyledTableCell>
                    )}
                    {activeMaterial?.includes("8") && (
                      <StyledTableCell className="header">
                        وحدة قياس المادة
                      </StyledTableCell>
                    )}
                    {activeMaterial?.includes("9") && (
                      <StyledTableCell className="header">
                        المواصفات الفنية للمادة
                      </StyledTableCell>
                    )}
                    {activeMaterial?.includes("10") && (
                      <StyledTableCell className="header">
                        سعر المادة
                      </StyledTableCell>
                    )}
                    {activeMaterial?.includes("11") && (
                      <StyledTableCell className="header">
                        سعر الاجمالي
                      </StyledTableCell>
                    )}
                    {activeMaterial?.includes("12") && (
                      <StyledTableCell className="header">
                        تاريخ الشراء
                      </StyledTableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activeWareHouse?.map((warehouse, warehouseIndex) => (
                    <React.Fragment key={`warehouse-${warehouseIndex}`}>
                      <TableRow>
                        <StyledTableCell
                          colSpan={activeMaterial?.length + 1}
                          className="warehouse-header"
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            textAlign: "center",
                            color: "#333",
                          }}
                        >
                          {[
                            warehouse?.dataWarehouse?.Entities_name,
                            warehouse?.dataWarehouse?.Factories_name,
                            warehouse?.dataWarehouse?.Laboratory_name,
                            warehouse?.dataWarehouse?.name,
                          ]
                            .filter(Boolean) // Remove undefined or null values
                            .sort() // Sort alphabetically
                            .join(" | ")}{" "}
                          {/* Join sorted values with a separator */}
                        </StyledTableCell>
                      </TableRow>

                      {warehouse?.inventory?.map((item, index) => (
                        <StyledTableRow key={`item-${warehouseIndex}-${index}`}>
                          <StyledTableCell>{index + 1}</StyledTableCell>
                          {activeMaterial?.includes("1") && (
                            <StyledTableCell>
                              {item?.name_of_material || "N/A"}
                            </StyledTableCell>
                          )}
                          {activeMaterial?.includes("2") && (
                            <StyledTableCell>
                              {item?.cod_material || "N/A"}
                            </StyledTableCell>
                          )}
                          {activeMaterial?.includes("3") && (
                            <StyledTableCell>
                              {item?.document_type || "N/A"}
                            </StyledTableCell>
                          )}
                          {activeMaterial?.includes("4") && (
                            <StyledTableCell>
                              {item?.document_number || "N/A"}
                            </StyledTableCell>
                          )}
                          {activeMaterial?.includes("5") && (
                            <StyledTableCell>
                              {item?.quantity_incoming_outgoing || "N/A"}
                            </StyledTableCell>
                          )}

                          {activeMaterial?.includes("6") && (
                            <StyledTableCell>
                              {item?.balance || "N/A"}
                            </StyledTableCell>
                          )}
                          {activeMaterial?.includes("7") && (
                            <StyledTableCell>
                              {item?.state_name || "N/A"}
                            </StyledTableCell>
                          )}
                          {activeMaterial?.includes("8") && (
                            <StyledTableCell>
                              {item?.measuring_unit || "N/A"}
                            </StyledTableCell>
                          )}
                          {activeMaterial?.includes("9") && (
                            <StyledTableCell sx={{ textAlign: "right" }}>
                              {item?.specification || "N/A"}
                            </StyledTableCell>
                          )}
                          {activeMaterial?.includes("10") && (
                            <StyledTableCell sx={{ textAlign: "right" }}>
                              {item?.price || "N/A"}
                            </StyledTableCell>
                          )}
                          {activeMaterial?.includes("11") && (
                            <StyledTableCell sx={{ textAlign: "right" }}>
                              {item?.price * item?.quantity_incoming_outgoing ||
                                "N/A"}
                            </StyledTableCell>
                          )}
                          {activeMaterial?.includes("12") && (
                            <StyledTableCell>
                              {formatDateYearsMonth(item?.purchase_date) ||
                                "N/A"}
                            </StyledTableCell>
                          )}
                        </StyledTableRow>
                      ))}
                      <TableFooter>
                        <TableRow>
                          <StyledTableCell colSpan={activeMaterial?.length}>
                            أجمالي المواد
                          </StyledTableCell>
                          <StyledTableCell>
                            {warehouse?.inventory?.length}
                          </StyledTableCell>
                        </TableRow>
                      </TableFooter>
                    </React.Fragment>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <StyledTableCell colSpan={activeMaterial?.length}>
                      أجمالي المخازن
                    </StyledTableCell>
                    <StyledTableCell>{activeWareHouse?.length}</StyledTableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {includes?.includes("2") && (
          <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
            <SectionTitle variant="h5"> معلومات ألمعامل</SectionTitle>
            <TableContainer>
              <Table dir={"rtl"}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="header">#</StyledTableCell>
                    <StyledTableCell className="header">
                      أسم المعمل
                    </StyledTableCell>
                    <StyledTableCell className="header">الموقع</StyledTableCell>
                    <StyledTableCell className="header">التخصص</StyledTableCell>
                    <StyledTableCell className="header">الوصق</StyledTableCell>
                    <StyledTableCell className="header">
                      المسؤول
                    </StyledTableCell>
                    <StyledTableCell className="header">
                      الجهة المستفيدة
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ActiveLab?.map((item, index) => (
                    <StyledTableRow key={item.lab_id}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>
                        {item?.Laboratory_name || "N/A"}
                      </StyledTableCell>
                      <StyledTableCell>{item?.location}</StyledTableCell>
                      <StyledTableCell>{item?.description}</StyledTableCell>
                      <StyledTableCell>{item?.specialization}</StyledTableCell>
                      <StyledTableCell>{item?.user_name}</StyledTableCell>
                      <StyledTableCell>{item?.Entities_name}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <StyledTableCell colSpan={2}>
                      أجمالي المخازن
                    </StyledTableCell>
                    <StyledTableCell>{ActiveLab?.length}</StyledTableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {includes?.includes("3") && (
          <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
            <SectionTitle variant="h5">المواد الاجمالية في المنصة</SectionTitle>
            <TableContainer>
              <Table dir={"rtl"}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="header">#</StyledTableCell>
                    <StyledTableCell className="header">
                      أسم المصنع
                    </StyledTableCell>
                    <StyledTableCell className="header">الموقع</StyledTableCell>
                    <StyledTableCell className="header">الوصف</StyledTableCell>
                    <StyledTableCell className="header">
                      حالة المصنع
                    </StyledTableCell>
                    <StyledTableCell className="header">
                      المسؤول
                    </StyledTableCell>
                    <StyledTableCell className="header">
                      الجهة المستفيدة
                    </StyledTableCell>

                    <StyledTableCell className="header">
                      ترايخ الادخال
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activeFactory?.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>
                        {item?.Factories_name || "N/A"}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item?.location || "N/A"}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item?.description || "N/A"}
                      </StyledTableCell>
                      <StyledTableCell>{item?.status || "N/A"}</StyledTableCell>
                      <StyledTableCell>
                        {item?.user_name || "N/A"}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item?.Entities_name || "N/A"}
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatDateYearsMonth(item?.created_at) || "N/A"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <StyledTableCell colSpan={activeFactory?.length}>
                      الإجمالي
                    </StyledTableCell>
                    <StyledTableCell>{activeFactory?.length}</StyledTableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Dialog>
    </div>
  );
};

export default DisplayInformationComponent;
