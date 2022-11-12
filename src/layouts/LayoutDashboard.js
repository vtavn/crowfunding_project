import { Button } from "components/button";
import Overlay from "components/common/Overlay";
import CampaignPerk from "modules/campaign/CampaignPerk";
import DashboardSidebar from "modules/dashboard/DashboardSidebar";
import DashboardTopbar from "modules/dashboard/DashboardTopbar";
import React from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { Outlet } from "react-router-dom";

const LayoutDashboard = ({ children }) => {
  const { control } = useForm();

  return (
    <div className="min-h-screen p-10 bg-lite">
      <ReactModal
        isOpen={false}
        overlayClassName="modal-overlay fixed inset-0  bg-black bg-opacity-40 z-50 flex items-center justify-center"
        className="modal-content w-full max-w-[521px] outline-none bg-white rounded-2xl p-10 relative max-h-[90vh] overflow-y-auto scroll-hidden"
      >
        <button className="absolute z-10 cursor-pointer right-10 top-[10px] text-text1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="font-bold text-[25px] mb-10 text-center">
          Back this project
        </h2>
        <p className="mb-3 text-sm">Enter the contribute amount</p>
        <input
          type="text"
          placeholder="$10"
          control={control}
          name="pedge"
          className="w-full px-5 py-2 text-lg font-medium border rounded-lg border-strock"
        />
        <p className="my-5 text-text3">
          Contribution are not associatied with perks
        </p>
        <Button kind="primary">Continue</Button>
        <div className="mt-[60px]">
          <CampaignPerk showButton></CampaignPerk>
        </div>
      </ReactModal>
      <Overlay></Overlay>
      <DashboardTopbar></DashboardTopbar>
      <div className="flex items-start gap-x-10">
        <DashboardSidebar></DashboardSidebar>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default LayoutDashboard;
