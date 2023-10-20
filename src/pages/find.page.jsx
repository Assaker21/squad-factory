import MenuBar from "../components/menu-bar.component.jsx";
import FindContent from "../components/find-content.component.jsx";

import "./find.page.scss";

function Find() {
  return (
    <>
      <div className="find-container">
        <MenuBar />
        <FindContent />
      </div>
    </>
  );
}

export default Find;
