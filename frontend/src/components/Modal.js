import PropTypes from "prop-types";
import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

const Modal = ({ showModal, modalContent, onClose }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div
          className="modal-import"
          dangerouslySetInnerHTML={{ __html: modalContent }}
        />
        <button onClick={onClose}>
          <IoMdCloseCircle className="modal-close" />
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  modalContent: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
