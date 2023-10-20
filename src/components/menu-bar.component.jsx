import { useState } from "react";
import "./menu-bar.component.scss";
import { useRef } from "react";

function MenuBar() {
  const menuItems = ["All", "Computer programming", "Gaming", "Computer hardware", "Music", "Smartphones", "3D modeling", "Electrical engineering", "Godot", "Marvels Spider-Man 2", "Podcasts", "Machines", "Théories", "Illuminati", "Francmasons", "Officiel", "Secret", "Impossible", "Recommendation", "Sujet", "Intéressant", "France 2015", "Vagues"];

  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const ref = useRef();

  function scroll(direction) {
    const currentScroll = ref.current.scrollLeft;
    ref.current.scrollLeft += (direction * window.innerWidth) / 4;
    setScrollPosition(currentScroll + (direction * window.innerWidth) / 4);
  }

  return (
    <div className="menu-bar">
      <button
        className={"menu-arrow-button left" + (scrollPosition <= 0 ? " hidden" : "")}
        onClick={() => {
          scroll(-1);
        }}
      >
        <i className="bx bx-chevron-left"></i>
      </button>
      <div className="content" ref={ref}>
        {menuItems.map((item, index) => {
          return (
            <span
              key={"Menu item" + item}
              className={"menu-item" + (index == selectedItem ? " selected" : "")}
              onClick={() => {
                if (index == selectedItem) return;
                setSelectedItem(index);
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
      <button
        className={"menu-arrow-button right" + (ref.current && ref.current.scrollWidth - scrollPosition - ref.current.offsetWidth <= 0 ? " hidden" : "")}
        onClick={() => {
          scroll(1);
        }}
      >
        <i className="bx bx-chevron-right"></i>
      </button>
    </div>
  );
}

export default MenuBar;
