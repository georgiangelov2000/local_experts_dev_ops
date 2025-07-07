export default function Pagination({ pagination, onPageChange }) {
    const totalPages = Math.ceil(pagination.total / pagination.per_page);

    return (
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              onClick={() => pagination.current_page > 1 && onPageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className={`flex items-center justify-center px-4 h-10 bg-gray-200 ${
                pagination.current_page === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'hover:bg-gray-300 text-gray-700 cursor-pointer'
              }`}
            >
              Previous
            </button>
          </li>
  
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center px-4 h-10 ml-1 mr-1 ${
                  pagination.current_page === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer '
                }`}
              >
                {page}
              </button>
            </li>
          ))}
  
          <li>
            <button
              onClick={() => pagination.current_page < totalPages && onPageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === totalPages}
              className={`flex items-center justify-center px-4 h-10 bg-gray-200 ${
                pagination.current_page === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'hover:bg-gray-300 text-gray-700 cursor-pointer'
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }
  