import "../css/Pagination.css"; 

function Pagination({ page, totalPages, onPageChange }) {
  const maxPagesToShow = 5;
  const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-wrapper">
      <button
        className="carousel-btn prev-btn"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ❮
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="page-btn">
            1
          </button>
          {startPage > 2 && <span className="ellipsis">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={`page-btn ${p === page ? "active" : ""}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="ellipsis">...</span>}
          <button onClick={() => onPageChange(totalPages)} className="page-btn">
            {totalPages}
          </button>
        </>
      )}

       <button
        className="carousel-btn next-btn"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        ❯
      </button>
    </div>
  );
}

export default Pagination;
