function TransactionHeader() {
  return (
    <div className="hidden md:flex justify-between items-center text-textPreset5 text-primaryGrey-500 font-normal py-3">
      <p className="f">Recipient / Sender</p>
      <div className="flex justify-between items-center  w-1/3">
        <p>Category</p>
        <p>Transaction Date</p>
      </div>
      <p className="f">Amount</p>
    </div>
  );
}

export default TransactionHeader;
