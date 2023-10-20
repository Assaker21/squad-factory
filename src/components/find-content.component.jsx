import { useCallback, useEffect, useRef } from "react";
import "./find-content.component.scss";
import axios from "axios";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function FindItem({ project }) {
  function descLimiter(inputString, maxLength) {
    if (inputString.length <= maxLength) {
      return inputString;
    } else {
      return inputString.slice(0, maxLength) + "...";
    }
  }
  return (
    <div className="find-item">
      <img src={project.images[0] + "?random=" + Math.random()} alt="" loading="lazy" className="item-image" />
      <h3 className="item-title">{project.name}</h3>
      <p className="item-desc">{descLimiter(project.desc, 50)}</p>
      <p className="item-info">{project.members.length} members • 28 hours ago</p>
      <div className="skills">
        {project.skills.map((skill) => {
          return (
            <span key={"Project " + project.id + " - Skill " + skill} className="skill">
              {skill}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function FindItemSkeleton() {
  return (
    <div className="find-item-skeleton">
      <div className="image-skeleton skeleton"></div>
      <div className="title-skeleton skeleton"></div>
      <div className="desc-skeleton skeleton"></div>
      <div className="info-skeleton skeleton"></div>
    </div>
  );
}

function FindContent() {
  const [projects, setProjects] = useState([]);
  const [fetching, setFetching] = useState(false);

  const observer = useRef();
  const lastElementRef = useCallback(
    (element) => {
      if (fetching) return;
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("visible");
          fetchProjects();
        }
      });
      if (element) observer.current.observe(element);
    },
    [fetching]
  );

  async function fetchProjects() {
    if (fetching) return;
    setFetching(true);

    const data = (await axios.get("https://dummyjson.com/posts?skip=" + projects.length.toString())).data;
    console.log("https://dummyjson.com/posts?skip=" + projects.length.toString());
    var currentProjects = [...data.posts];
    for (var i = 0; i < currentProjects.length; i++) {
      currentProjects[i] = {
        id: currentProjects[i].id,
        images: ["https://loremflickr.com/320/160", "https://loremflickr.com/320/1600", "https://loremflickr.com/320/160"],
        name: currentProjects[i].title,
        desc: currentProjects[i].body,
        members: [
          {
            id: 0,
            name: "Jake Gyllenhaul"
          },
          {
            id: 1,
            name: "Somodare Sobotic"
          }
        ],
        skills: ["Unity", "NodeJS", "JavaScript", "React"]
      };
    }

    setProjects([...projects, ...currentProjects]);
    setFetching(false);
  }

  useEffect(() => {
    fetchProjects();
    console.log("now");
  }, []);

  return (
    <div className="find-content-container">
      {projects.length > 0 &&
        projects.map((project) => {
          return <FindItem key={"Project " + project.id} project={project} />;
        })}

      <div className="lastElement" ref={lastElementRef}></div>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => {
        return <FindItemSkeleton key={"Skeleton find item " + id} />;
      })}

      <div className="spinner">
        <ColorRing colors={["#3f3f3f", "#3f3f3f", "#3f3f3f", "#3f3f3f", "#3f3f3f"]} height={70} width={70} />
      </div>
    </div>
  );
}

export default FindContent;
