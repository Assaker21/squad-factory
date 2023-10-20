import { useState } from "react";
import "./navbar.component.scss";
import { useEffect } from "react";

function Navbar() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      console.log("resize");
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
        console.log("resize");
      });
    };
  }, []);
  return (
    <>
      <nav className="navbar">
        <div className="left">
          <h1 className="title">Squad Factory</h1>
        </div>
        <div className={width >= 740 ? "middle" : "middle hidden"}>
          <input placeholder="Search" type="text" className="search-input" />
          <button className="search-button">
            <i className="bx bx-search"></i>
          </button>
        </div>
        <div className="right">
          <button className="create-button">
            <i className="bx bx-plus"></i>
          </button>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4pGusECwdDSuEmH2BRH1ObPYpp_uRs57N5SnMw4sCOY6-kRIuzDUw9zK1zLji_eCgTPA&usqp=CAU" alt="" className="account" />
        </div>
      </nav>
      <div className={width < 740 ? "search-narrow" : "search-narrow hidden"}>
        <div className="middle">
          <input placeholder="Search" type="text" className="search-input" />
          <button className="search-button">
            <i className="bx bx-search"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
