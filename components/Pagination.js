export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded mr-2"
            >
                Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`px-3 py-1 border rounded mr-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                >
                    {i + 1}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded"
            >
                Next
            </button>
        </div>
    );
}