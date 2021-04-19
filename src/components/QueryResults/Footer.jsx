export default function Footer({ page, setPage, rows, start, end }) {
  const handleNext = () => {
    if (!isLastPage()) setPage(page + 1);
  };
  const handlePrev = () => {
    if (!isFirstPage()) setPage(page - 1);
  };
  const isLastPage = () => page >= parseInt(rows.length / 10);
  const isFirstPage = () => page === 1;

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
                    Showing{' '}
            <span className="font-medium">{start}{' '}</span>
                    to{' '}
            <span className="font-medium">{end}{' '}</span>
                    of{' '}
            <span className="font-medium">{rows.length}{' '}</span>
                    results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a href="#" className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${isFirstPage() ? "bg-gray-200" : "hover:bg-gray-50"}`}  onClick={handlePrev}>
              <span className="sr-only">Previous</span>
              {/* <!-- Heroicon name: solid/chevron-left --> */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${isLastPage() ? "bg-gray-200" : "hover:bg-gray-50"}`} onClick={handleNext}>
              <span className="sr-only">Next</span>
              {/* <!-- Heroicon name: solid/chevron-right --> */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
