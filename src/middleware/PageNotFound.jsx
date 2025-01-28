import React, { useEffect, useState } from "react";

function PageNotFound() {
  const [pointerPosition, setPointerPosition] = useState({ left: "0%", top: "0%" });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    // Calculate the position of the pointer, considering window boundaries
    let posX = mouseX - width / 2;
    let posY = mouseY - height / 2;
    // Adjust position to keep pointer within window bounds
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    if (posX < 0) posX = 0;
    if (posX + width > windowWidth) posX = windowWidth - width;
    if (posY < 0) posY = 0;
    if (posY + height > windowHeight) posY = windowHeight - height;
    setPointerPosition({ left: posX, top: posY });
  };

  return (
    <div onMouseMove={handleMouseMove} className="PointerContainer">
      <section>
        <div
          id="pointer"
          style={{
            position: "absolute",
            left: `${pointerPosition.left}px`,
            top: `${pointerPosition.top}px`,
          }}
        ></div>
        <div className="white">
          <h1>
            4 <span>X</span> 4
          </h1>
        </div>
        <div className="black">
          <h1>
            4 <span>X</span> 4
          </h1>
        </div>
      </section>
    </div>
  );
}

export default PageNotFound;
