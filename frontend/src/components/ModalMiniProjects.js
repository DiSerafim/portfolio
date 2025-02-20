import React from "react";

const ModalMiniProjects = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose} title="Fechar">
          X
        </button>
        <div className="iframe-container">
          <iframe
            src={project.url}
            title="project.name"
            min-width="100%"
            min-height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalMiniProjects;
