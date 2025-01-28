// import React, { useEffect, useRef, useState } from "react";
// import { ButtonSave } from "../../../../utils/Content";
// import {
//   AppBar,
//   Button,
//   Dialog,
//   IconButton,
//   Slide,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { Close } from "@mui/icons-material";
// import { useReactToPrint } from "react-to-print";
// import Tree from "react-d3-tree";
// import "./style.css";

// const Transition = React.forwardRef((props, ref) => {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const DisplayInformationComponent2 = ({
//   usersData,
//   ministriesData,
//   materialsData,
//   mainClassesData,
//   materialOfDataWithinGivenData,
//   dateFrom,
//   dateTo,
//   MaterialsDIsBooked,
// }) => {
//   const [open, setOpen] = useState(false);
//   const componentRef = useRef();

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   // Example of how you might use usersData or other props to construct a dynamic org chart
//   const createOrgChart = () => {
//     return {
//       name: "CEO",
//       children: ministriesData.map((ministry) => ({
//         name: ministry.ministries,
//         attributes: {
//           department: ministry.entity_name || "Unknown",
//         },
//         children: materialsData
//           .map((material) => ({
//             name: material.name_material,
//             attributes: {
//               type: material.state_name || "Unknown",
//             },
//             children: [
//               {
//                 name: `Booked: ${material.Quantity ? "Yes" : "No"}`,
//               },
//             ],
//           })),
//       })),
//     };
//   };

//   const orgChart = createOrgChart();

//   return (
//     <div>
//       <ButtonSave variant="outlined" onClick={handleClickOpen}>
//         عرض البيانات
//       </ButtonSave>
//       <Dialog
//         fullScreen
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Transition}
//       >
//         <AppBar sx={{ position: "relative", backgroundColor: "#0d47a1" }}>
//           <Toolbar>
//             <IconButton edge="start" color="inherit" onClick={handleClose}>
//               <Close />
//             </IconButton>
//             <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//               التقارير
//             </Typography>
//             <Button autoFocus color="inherit" onClick={handlePrint}>
//               طباعة
//             </Button>
//           </Toolbar>
//         </AppBar>
//         <div className="d-flex justify-content-center align-items-center w-100 h-100">
//           <div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
//             <Tree
//               data={orgChart}
//               rootNodeClassName="node__root"
//               branchNodeClassName="node__branch"
//               leafNodeClassName="node__leaf"
//             />
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default DisplayInformationComponent2;
