import React from "react";

const ModalMiniProjects = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <iframe src="project.url" title="project.name" />
        <button onClick={onClose}>X fechar</button>
      </div>
    </div>
  );
};

export default ModalMiniProjects;
