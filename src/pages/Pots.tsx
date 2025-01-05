import AddPot from "../features/pots/AddPot";
import PotsList from "../features/pots/PotsList";
import OverscrollContainer from "../ui/OverscrollContainer";

function Pots() {
  return (
    <div className="px-4 md:px-10 py-6 md:py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-textPreset1 font-semibold text-primaryGrey-900">
          Pots
        </h1>
        <AddPot />
      </div>

      <OverscrollContainer height="76vh">
        <PotsList />
      </OverscrollContainer>
    </div>
  );
}

export default Pots;
