function BillHeader() {
  return (
    <div className="hidden md:flex justify-between items-center py-4 text-textPreset5 text-primaryGrey-500 font-normal">
      <div className="flex-1">Bill Title</div>
      <div className="flex items-center justify-between flex-1">
        <p>Due Date</p>
        <p>Amount</p>
      </div>
    </div>
  );
}

export default BillHeader;
