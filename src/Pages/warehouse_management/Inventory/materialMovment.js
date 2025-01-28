import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ColorLink } from "../../../utils/Content";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../../redux/LanguageState";
import Header from "../../../components/HeaderComponent";
import { getToken } from "../../../utils/handelCookie";
import "../style/DetailsCard.css";
import {
  formatDateYearsMonth,
  SectionTitle,
  StyledTableCell,
  StyledTableRow,
} from "../../../utils/Function";
import { useReactToPrint } from "react-to-print";
import { LocalPrintshopOutlined } from "@mui/icons-material";

export default function MaterialMovement() {
  const { id } = useParams();
  const [paramsQuery] = useSearchParams();
  const [deleteItem, setDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [refreshButton, setRefreshButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState({});
  const [materialMovements, setMaterialMovements] = useState([]);
  const [error, setError] = useState(null);
  const token = getToken();
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);

  useEffect(() => {
    const fetchDataByProjectId = async () => {
      try {
        setLoading(true);
        const [inventoryResponse, movementsResponse] = await Promise.all([
          axios.get(
            `${BackendUrl}/api/storGetDataById/${paramsQuery.get(
              "material_id"
            )}`,
            {
              headers: { authorization: token },
            }
          ),
          axios.get(
            `${BackendUrl}/api/materialMovements/${paramsQuery.get(
              "material_id"
            )}`,
            {
              headers: { authorization: token },
            }
          ),
        ]);
        if (inventoryResponse?.data) {
          setInventory(inventoryResponse?.data?.data);
        }
        if (movementsResponse?.data) {
          setMaterialMovements(movementsResponse?.data?.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataByProjectId();
  }, [id, deleteItem, anchorEl, refreshButton]);

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="w-100">
      <div className="pb-3 d-flex justify-content-around">
        <ColorLink onClick={handleBack}>{t("رجوع")}</ColorLink>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={handlePrint}
          startIcon={<LocalPrintshopOutlined />}
        >
          {t("طباعة الجرد")}
        </Button>
      </div>
      <div
        className={`p-3 rad-10 ${
          theme?.palette?.mode === "dark" ? "bg-dark" : "bg-white"
        }`}
        ref={componentRef}
      >
        <Box className="d-flex justify-content-center">
          <Header
            title={t("معلومات المادة")}
            subTitle={t("معلومات المادة التفصيلية")}
          />
        </Box>

        {/* Loading and Error States */}
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">{t("Loading...")}</span>
            </div>
          </div>
        ) : error ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <p style={{ color: theme?.palette?.error.main }}>{error}</p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              padding: "15px",
            }}
          >
            <div className="detailsCard" style={{ margin: "10px" }}>
              <div className="detailsCardBody">
                {/* First Row */}
                <div className="detailsRowGroup">
                  <div className="detailsRow">
                    <span className="detailsLabel">{t("الرقم الرمزي")}</span>
                    <span className="detailsValue">
                      {inventory?.cod_material || "---"}
                    </span>
                  </div>
                  <div className="detailsRow">
                    <span className="detailsLabel">{t("أسم المنتج")}</span>
                    <span className="detailsValue">
                      {inventory?.name_of_material || "---"}
                    </span>
                  </div>
                  <div className="detailsRow">
                    <span className="detailsLabel">{t("سعر المادة")}</span>
                    <span className="detailsValue">
                      {inventory?.price || "---"}
                    </span>
                  </div>
                </div>
                <hr />
                {/* Second Row */}
                <div className="detailsRowGroup">
                  <div className="detailsRow">
                    <span className="detailsLabel">{t("المستودع")}</span>
                    <span className="detailsValue">
                      {inventory?.warehouse_name || "---"}
                    </span>
                  </div>
                  <div className="detailsRow">
                    <span className="detailsLabel">{t("وحدة المادة")}</span>
                    <span className="detailsValue">
                      {inventory?.measuring_unit || "---"}
                    </span>
                  </div>
                  <div className="detailsRow">
                    <span className="detailsLabel">
                      {t("المواصفات الفنية")}
                    </span>
                    <span className="detailsValue">
                      {inventory?.specification || "---"}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="detailsRowGroup">
                  <div className="detailsRow">
                    <span className="detailsLabel">{t("المنشأء")}</span>
                    <span className="detailsValue">
                      {inventory?.origin || "---"}
                    </span>
                  </div>
                  <div className="detailsRow">
                    <span className="detailsLabel">{t("الرصيد")}</span>
                    <span className="detailsValue">
                      {inventory?.balance || "---"}
                    </span>
                  </div>
                  <div className="detailsRow">
                    <span className="detailsLabel">
                      {t("الحد الادنى للمخزون")}
                    </span>
                    <span className="detailsValue">
                      {inventory?.minimum_stock_level || "---"}
                    </span>
                  </div>
                  <div className="detailsRow">
                    <span className="detailsLabel">{t(" السعر الاجمالي")}</span>
                    <span className="detailsValue">
                      {inventory?.price * inventory?.quantity_incoming || "---"}
                    </span>
                  </div>
                </div>
                <hr />
                {/* Third Row */}
                <div className="detailsRowGroup">
                  <div className="detailsRow">
                    <span className="detailsLabel">
                      {t("تاريخ  أنتاج المادة ")}
                    </span>
                    <span className="detailsValue">
                      {formatDateYearsMonth(inventory?.expiry_date) || "---"}
                    </span>
                  </div>
                  <div className="detailsRow">
                    <span className="detailsLabel">
                      {t("تاريخ  أدخال المادة ")}
                    </span>
                    <span className="detailsValue">
                      {formatDateYearsMonth(inventory?.expiry_date) || "---"}
                    </span>
                  </div>
                </div>
                {/* Fourth Row */}
                <div className="detailsRowGroup">
                  <div className="detailsRow"></div>
                </div>
              </div>
            </div>
            {/* Material Movements Section */}
            <div className="detailsCard mt-4" style={{ margin: "10px" }}>
              <div className="detailsCardBody">
                <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
                  <SectionTitle variant="h5">{t("حركة المادة")}</SectionTitle>
                  <TableContainer>
                    <Table dir={"rtl"}>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell className="header">
                            #
                          </StyledTableCell>
                          <StyledTableCell className="header">
                            {t("ألمادة")}
                          </StyledTableCell>
                          <StyledTableCell className="header">
                            {t("رقم الرمزي للمادة")}
                          </StyledTableCell>
                          <StyledTableCell className="header">
                            {t("المخزن")}
                          </StyledTableCell>
                          <StyledTableCell className="header">
                            {t("الرصيد")}
                          </StyledTableCell>
                          <StyledTableCell className="header">
                            {t("حالة المادة")}
                          </StyledTableCell>
                          <StyledTableCell className="header">
                            {t("وحدة قياس المادة")}
                          </StyledTableCell>
                          <StyledTableCell className="header">
                            {t("المواصفات الفنية للمادة")}
                          </StyledTableCell>
                          <StyledTableCell className="header">
                            {t("تاريخ الانتاج")}
                          </StyledTableCell>
                          <StyledTableCell className="header">
                            {t("تاريخ الادخال الى النظام")}
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {materialMovements.map((movement, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>
                              {movement?.document_type || "N/A"}
                            </StyledTableCell>
                            <StyledTableCell>
                              {movement?.quantity_incoming_outgoing || "N/A"}
                            </StyledTableCell>
                            <StyledTableCell>
                              {movement?.document_number || "N/A"}
                            </StyledTableCell>
                            <StyledTableCell>
                              {movement?.balance || "N/A"}
                            </StyledTableCell>
                            <StyledTableCell>
                              {movement?.state_name || "N/A"}
                            </StyledTableCell>
                            <StyledTableCell>
                              {movement?.measuring_unit || "N/A"}
                            </StyledTableCell>
                            <StyledTableCell>
                              {movement?.specification || "N/A"}
                            </StyledTableCell>
                            <StyledTableCell>
                              {formatDateYearsMonth(movement?.document_date) ||
                                "N/A"}
                            </StyledTableCell>
                            <StyledTableCell>
                              {formatDateYearsMonth(movement?.purchase_date) ||
                                "N/A"}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
