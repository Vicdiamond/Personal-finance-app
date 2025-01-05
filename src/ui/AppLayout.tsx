import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

function AppLayout() {
  const [isMinimized, setIsMinimized] = useState(false);

  function handleMinimize() {
    setIsMinimized(!isMinimized);
  }

  return (
    <div
      className={`grid grid-rows-[1fr_auto]  min-h-screen xl:grid-rows-none bg-primaryBeige-100 ${
        isMinimized ? "xl:grid-cols-[auto_1fr]" : "xl:grid-cols-[300px_1fr]  "
      }`}
    >
      <Sidebar isMinimized={isMinimized} setIsMinimized={handleMinimize} />

      <div className="order-1 xl:order-2">
        <div className="  overflow-hidden  h-[89vh] xl:h-[100vh] w-full ">
          <div className="overflow-auto h-full ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
