import React, { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

function Projects(props) {
  const [deps, setDeps] = useState({});
  const [detailsModalShow, setDetailsModalShow] = useState(false);

  const detailsModalShowHandler = (data) => {
    setDetailsModalShow(true);
    setDeps(data);
  };

  const detailsModalCloseHandler = () => {
    setDetailsModalShow(false);
  };

  if (props.resumeProjects && props.resumeBasicInfo) {
    var sectionName = props.resumeBasicInfo.section_name.projects;
    var projects = props.resumeProjects.map(function (project) {
      const imageSrc = `${process.env.PUBLIC_URL}/${project.images[0]}`;
      return (
        <div
          className="col-sm-12 col-md-6 col-lg-4"
          key={project.title}
          style={{ cursor: "pointer" }}
        >
          <span className="portfolio-item d-block">
            <div className="foto" onClick={() => detailsModalShowHandler(project)}>
              <div>
                <img
                  src={imageSrc}
                  alt="projectImages"
                  height="230"
                  style={{ marginBottom: 0, paddingBottom: 0, position: 'relative' }}
                />
                <span className="project-date">{project.startDate}</span>
                <br />
                <p className="project-title-settings mt-3">
                  {project.title}
                </p>
              </div>
            </div>
          </span>
        </div>
      );
    });
  }

  return (
    <section id="portfolio">
      <div className="col-md-12">
        <h1 className="section-title" style={{ color: "black" }}>
          <span>{sectionName}</span>
        </h1>
        <div className="col-md-12 mx-auto">
          <div className="row mx-auto">{projects}</div>
        </div>
        <ProjectDetailsModal
          show={detailsModalShow}
          onHide={detailsModalCloseHandler}
          data={deps}
        />
      </div>
    </section>
  );
}

export default Projects;