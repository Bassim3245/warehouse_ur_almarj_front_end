import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
function Logo() {
  const { rtl } = useSelector((state) => state.language);
  return (
    <div className="logo-circle mb-0 p-1">
      <div className="displayNone">
        <Typography sx={{ textAlign: "right", color: "black" }}>
          {rtl?.dir === "ltr" ? (
            <>
              The <span style={{ color: "orange" }}>National</span> Bank <br />{" "}
              for Obsolete and Slow-Moving Materials
            </>
          ) : (
            <>
              البنك <span style={{ color: "orange" }}>الوطني</span> <br />{" "}
              للمواد الراكدة وبطيئة الحركة
            </>
          )}
        </Typography>
      </div>
      <div className="m-0">
        <div
          className="circleLogo yellow mb-2"
          style={{ width: "25px", height: "25px" }}
        ></div>
        <div
          className="circleLogo light-purple"
          style={{ width: "25px", height: "25px" }}
        ></div>
      </div>
      <div className="m-0">
        <div
          className="circleLogo purple mb-2"
          style={{ width: "25px", height: "25px" }}
        ></div>
        <div
          className="circleLogo light-yellow"
          style={{ width: "25px", height: "25px" }}
        ></div>
      </div>
    </div>
  );
}

export default Logo;
