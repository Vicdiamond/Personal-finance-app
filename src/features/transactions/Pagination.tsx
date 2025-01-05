import { useSearchParams } from "react-router-dom";
import { calculatePagination } from "../../utils/helpers";

function Pagination({ pageCount }: { pageCount: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev.toString());
    setSearchParams(searchParams);
  }

  const paginationButtons = calculatePagination(pageCount, currentPage);

  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        className="flex items-center px-4 py-[9.5px] gap-4 border border-primaryBeige-500 rounded-lg flex-shrink-0"
        disabled={currentPage === 1}
        onClick={prevPage}
      >
        <img src="assets/images/icon-caret-left.svg" alt="icon-left" />
        <p className="text-textPreset4 font-normal text-primaryGrey-900 hidden md:block">
          Prev
        </p>
      </button>

      <div className="flex items-center gap-2">
        {paginationButtons.map((page, index) => (
          <button
            key={index}
            className={`px-4 py-[9.5px] gap-4 border border-primaryBeige-500 rounded-lg text-textPreset4 font-normal text-primaryGrey-900 ${
              page === currentPage
                ? "bg-primaryGrey-900 text-white"
                : "bg-white"
            }`}
            onClick={() => {
              if (typeof page === "number") {
                searchParams.set("page", page.toString());
                setSearchParams(searchParams);
              }
            }}
            disabled={typeof page !== "number"}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="flex items-center px-4 py-[9.5px] gap-4 border border-primaryBeige-500 rounded-lg cursor-pointer flex-shrink-0"
        disabled={currentPage === pageCount}
        onClick={nextPage}
      >
        <p className="text-textPreset4 font-normal text-primaryGrey-900 hidden md:block">
          Next
        </p>
        <img src="assets/images/icon-caret-right.svg" alt="icon-left" />
      </button>
    </div>
  );
}

export default Pagination;
