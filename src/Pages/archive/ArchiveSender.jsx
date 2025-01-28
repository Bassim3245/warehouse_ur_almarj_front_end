import { OpenInNew } from "@mui/icons-material";
import DropDownGrid from "../../components/CustomMennu";
import GridTemplate from "../../components/GridTemplet";
import { useNavigate } from "react-router-dom";
import { renderMenuItem } from "../../utils/Function";
import { getToken } from "../../utils/handelCookie";
function ArchiveSender({
  t,
  dataMaterials,
  setLimit,
  setPage,
  limit,
  totalItems,
  totalPages,
  page,
  dataUserById,
}) {
  const navigate = useNavigate();
  const columns = [
    { field: "stagnant_id", headerName: "ID", hideable: false, width: 70 },
    {
      field: "index",
      headerName: "#",
      width: 33,
      renderCell: (params) => params?.index,
    },
    {
      field: "ministries",
      headerName: t("userManager.Ministry name"),
      flex: 1,
    },
    {
      field: "entity_name_from",
      headerName: t("userManager.Entity name"),
      minWidth: "150px",
      maxWidth: "175px",
      flex: 1,
    },
    {
      field: "entity_name_buy",
      headerName: t("أسم الجهة المستلمة"),
      minWidth: "150px",
      maxWidth: "175px",
      flex: 1,
    },
    {
      field: "main_Class_name",
      headerName: t("Stagnant.mainClass"),
      flex: 1,
      minWidth: "150px",
      maxWidth: "175px",
    },
    {
      field: "sub_class_name",
      headerName: t("Stagnant.subClass"),
      flex: 1,
      minWidth: "150px",
      maxWidth: "175px",
    },
    {
      field: "name_material",
      headerName: t("Stagnant.nameMaterial"),
      flex: 1,
    },
    {
      field: "measuring_unit",
      headerName: t("Stagnant.measuringUnit"),
      flex: 0.8,
    },
    {
      field: "Quantity_buy",
      headerName: t("الكمية المسلمة "),
      flex: 0.8,
    },

    {
      field: "state_booked_buy",
      headerName: t("حالة المادة"),
      flex: 1,
      renderCell: (params) => (
        <>
          {params?.row?.entity_buy_id == dataUserById?.entity_id ? (
            <div>
              <p>مادة مرسلة</p>
            </div>
          ) : (
            "-----"
          )}
        </>
      ),
    },
    {
      field: "Action",
      headerName: "أجراء",
      headerAlign: "center",
      flex: 0.5,
      renderCell: (params) => (
        <DropDownGrid>
          {/* <Divider sx={{ my: 0.5 }} /> */}
          {renderMenuItem(
            "informationProduct",
            () => openProduct(params?.row?.id),
            OpenInNew,
            "معلومات المنتج"
          )}
          {/* <Divider />
          {renderMenuItem(
            "delete",
            () =>
              DeleteItem(
                params?.row?.stagnant_id,
                setDelete,
                setAnchorEl,
                token,
                "deleteProjectById"
              ),
            DeleteOutlined,
            "حذف"
          )} */}
        </DropDownGrid>
      ),
    },
  ];
  const openProduct = (id) => {
    navigate(`/information-Material/${id}`);
  };
  const rows = dataMaterials?.map((item, index) => ({
    index: index + 1,
    ...item,
  }));
  return (
    <div>
      <GridTemplate
        rows={rows}
        columns={columns}
        setLimit={setLimit}
        setPage={setPage}
        page={page}
        limit={limit}
        totalItems={totalItems}
        totalPages={totalPages}
      />
    </div>
  );
}
export default ArchiveSender;
