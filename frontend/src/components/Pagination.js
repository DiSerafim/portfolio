import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ page, totalPages, loading, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        disabled={loading || page === 1}
        onClick={() => onPageChange("prev")}
      >
        Anterior
      </button>
      <span>
        {page} | {totalPages}
      </span>
      <button
        disabled={loading || page === totalPages}
        onClick={() => onPageChange("next")}
      >
        Próxima
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
