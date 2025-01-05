function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: any) => void;
}) {
  return (
    <form className="relative flex-1 md:max-w-[320px] ">
      <input
        type="text"
        placeholder="Search bills"
        className="border border-primaryGrey-500 rounded-lg py-3 px-5 w-full "
        value={value}
        onChange={onChange}
      />

      <button className="absolute right-5 top-1/2 -translate-y-1/2">
        <img
          src="assets/images/icon-search.svg"
          alt="search"
          className=" cursor-pointer"
          role="button"
        />
      </button>
    </form>
  );
}

export default SearchInput;
