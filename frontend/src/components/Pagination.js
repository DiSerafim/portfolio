import React from "react";
import "./Pagination.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ page, totalPages, loading, onPageChange }) => {
  const renderPageNumbers = () => {
    const totalNumbersToShow = 8;
    const pages = [];

    let start = Math.max(1, page - Math.floor(totalNumbersToShow / 2));
    let end = start + totalNumbersToShow - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - totalNumbersToShow + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push(<FaArrowLeft />);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push(<FaArrowRight /> );
      pages.push(totalPages);
    }

    return pages.map((p, index) => (
      <button
        key={index}
        onClick={() => typeof p === "number" && onPageChange(p)}
        disabled={p === "..."}
        className={`pagination-btn ${p === page ? "active" : ""}`}
      >
        {p}
      </button>
    ));
  };

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Anterior
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Próxima
      </button>
    </div>
  );
};

export default Pagination;
