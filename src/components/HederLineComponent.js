import '../style/HederLineComponent.css'; // Assuming you're using a separate CSS file

function HederLineComponent({title}) {
  return (
    <div className="header-line-container displayNone">
      <h2 className="header-line-title displayNone">{title}</h2>
    </div>
  );
}

export default HederLineComponent;
