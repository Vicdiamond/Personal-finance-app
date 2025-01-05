import DashboardLayout from "../features/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <div className="px-4 md:px-10 py-6 md:py-8">
      <h1 className="text-textPreset1 font-semibold text-primaryGrey-900 mb-8">
        Overview
      </h1>

      <DashboardLayout />
    </div>
  );
}

export default Dashboard;
