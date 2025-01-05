import SummariesContainer from "../../ui/SummariesContainer";
import SummariesHeader from "../../ui/SummariesHeader";
import RecurringBillHighlight from "./RecurringBillHighlight";

function RecurringBillsSummary() {
  return (
    <SummariesContainer className=" row-start-6 row-end-10 col-start-2 col-end-3">
      <SummariesHeader
        title="Recurring Bills"
        buttonText="See Details"
        to="/recurringBills"
      />

      <ul className="mt-8 space-y-3 ">
        <RecurringBillHighlight />
        <RecurringBillHighlight />
        <RecurringBillHighlight />
      </ul>
    </SummariesContainer>
  );
}

export default RecurringBillsSummary;
