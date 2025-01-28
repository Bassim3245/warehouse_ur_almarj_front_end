import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
export const exportData = [
  {
    label: "تقرير المستخدمين",
    value: "users",
    id: "1",
  },
  {
    label: "عدد الوزارات والجهات التابعة لها",
    value: "ministriesAndEntities",
    id: "2",
  },
  { label: "عدد أجمالي المواد المدخلة", value: "material", id: "3" },
  { label: "عدد الاصناف الرئيسية وتفرعاتها", value: "mainClass", id: "4" },
  {
    label: "عدد المواد خلال شهر معين",
    value: "materialOfDataWithinGivenDate",
    id: "5",
  },
  { label: "عدد الصفقات المكتملة", value: "completedTransactions", id: "6" },
];
export const exportData2 = [
  { label: "تقرير المخازن", value: "wareHouse", id: "1" },
  {
    label: "تقرير حسب التصنيف",
    value: "mainClass",
    id: "2",
  },
  {
    label: "تقرير المالية",
    value: "financial",
    id: "3",
  },
];
export const InformationMaterial = [
  {
    label: "أسم المادة ",
    value: "material_name",
    id: "1",
  },
  {
    label: "الرقم الرمزي للمادة",
    value: "code_material",
    id: "2",
  },
  {
    label: "نوع المستند",
    value: "type_document",
    id: "3",
  },
  {
    label: "رقم المستند",
    value: "quantity_material",
    id: "4",
  },
  {
    label: "كمية المادة",
    value: "quantity_material",
    id: "5",
  },
  {
    label: "الرصيد",
    value: "Entities_name",
    id: "6",
  },
  {
    label: "حالة المادة",
    value: "state_name",
    id: "7",
  },
  {
    label: "وحدة قياس المادة",
    value: "measuring_unit",
    id: "8",
  },
  {
    label: "المواصفات الفنية للمادة",
    value: "specifications",
    id: "9",
  },
  {
    label: "سعر المادة",
    value: "price",
    id: "10",
  },
  {
    label: "سعر الكلي",
    value: "total_price",
    id: "11",
  },
  {
    label: "تاريخ الشراء",
    value: "purchase_date",
    id: "12",
  },
];
export const InformationSelectMaterial = [
  {
    label: "اسم المادة",
    value: "name_material",
    id: "1",
  },
  {
    label: "حالة المادة",
    value: "state_name",
    id: "2",
  },
  {
    label: "كمية المادة",
    value: "Quantity",
    id: "3",
  },
  {
    label: "تاريخ الادخال",
    value: "created_at",
    id: "4",
  },
];
export const options = [
  // { value: "pdf", label: "تنزيل على شكل Pdf" },
  { value: "excel", label: "تنزيل على شكل Excel" },
  { value: "displayData", label: "عرض المعلومات" },
];

export const ReportCheckboxGroup = ({
  items,
  activeItems,
  handleChange,
  color,
}) => (
  <Box
    sx={{
      border: "1px solid",
      borderColor: "divider",
      p: 2,
    }}
  >
    <FormGroup sx={{ p: "20px" }}>
      {items.map((item) => (
        <FormControlLabel
          key={item.id}
          control={
            <Checkbox
              checked={activeItems.includes(item.id)}
              onChange={handleChange(item.id)}
              sx={{
                color: color[800],
                "&.Mui-checked": {
                  color: color[600],
                },
              }}
            />
          }
          label={item.label}
        />
      ))}
    </FormGroup>
  </Box>
);
