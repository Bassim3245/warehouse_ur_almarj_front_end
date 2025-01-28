import "./StyleMiddle.css"
function Authorized() {
  return (
    <div id="sec-1" className="sectionAuth">
      <div id="ctn">
        <div className="marquee">
          <div className="marquee-text"></div>
          <div className="marquee-text"></div>
          <div className="marquee-text"></div>
        </div>
        <div className="text-ctn">ERROR</div>
        <div id="forbidden">FORBIDDEN</div>
        <div className="text-ctn">
          HTTP
          <br />
          403
        </div>
        <div className="marquee">
          <div className="marquee-text"></div>
          <div className="marquee-text"></div>
          <div className="marquee-text"></div>
        </div>
      </div>
    </div>
  );
}

export default Authorized;
