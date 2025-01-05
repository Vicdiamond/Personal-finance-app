import RecurringBillsContainer from "../features/recurringbills/RecurringBillsContainer";

function RecurringBills() {
  return (
    <div className="px-4 md:px-10 py-6 md:py-8">
      <h1 className="text-textPreset1 font-semibold text-primaryGrey-900 mb-8">
        Recurring bills
      </h1>

      <RecurringBillsContainer />
    </div>
  );
}

export default RecurringBills;
