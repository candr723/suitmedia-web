export default function Pagination({ page, setPage, totalPages }) {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];

    const start = Math.max(1, page - delta);
    const end = Math.min(totalPages, page + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const pages = getPageNumbers();

  return (
    <div className="mt-10 flex justify-center gap-2 flex-wrap text-sm">
      <button
        disabled={page === 1}
        onClick={() => setPage(1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &laquo;
      </button>

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &lsaquo;
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 border rounded ${
            page === p ? "bg-black text-white" : ""
          }`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &rsaquo;
      </button>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(totalPages)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        &raquo;
      </button>
    </div>
  );
}
