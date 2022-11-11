import IconCampaign from "components/icons/IconCampaign";
import IconDarkmode from "components/icons/IconDarkmode";
import IconDashboard from "components/icons/IconDashboard";
import IconLogout from "components/icons/IconLogout";
import IconPayment from "components/icons/IconPayment";
import IconProfile from "components/icons/IconProfile";
import IconWithdraw from "components/icons/IconWithdraw";
import React from "react";
import { NavLink } from "react-router-dom";

const sidebarLinks = [
  { icon: <IconDashboard></IconDashboard>, title: "Dashboard", url: "/" },
  { icon: <IconCampaign></IconCampaign>, title: "Campaign", url: "/campaign" },
  { icon: <IconPayment></IconPayment>, title: "Payment", url: "/payment" },
  { icon: <IconWithdraw></IconWithdraw>, title: "Withdraw", url: "/withdraw" },
  { icon: <IconProfile></IconProfile>, title: "Profile", url: "/profile" },
  {
    icon: <IconLogout></IconLogout>,
    title: "Logout",
    url: "/logout",
    onClick: () => {},
  },
  {
    icon: <IconDarkmode></IconDarkmode>,
    title: "Light/Dark",
    url: "/dark",
    onClick: () => {},
  },
];

const DashboardSidebar = () => {
  const navLinkClass =
    "flex items-center gap-x-5 md:w-12 md:h-12 md:justify-center md:rounded-lg md:mb-8  last:mt-auto last:bg-white last:shadow-sdprimary";

  return (
    <div className="w-full md:w-[76px] px-[14px] py-10 rounded-3xl bg-white shadow-[10px_10px_20px_rgba(218,_213,_213,_0.15)] flex flex-col flex-shrink-0">
      {sidebarLinks.map((link) => (
        <NavLink
          to={link.url}
          className={({ isActive }) =>
            isActive
              ? `${navLinkClass} text-primary bg-primary bg-opacity-20`
              : `${navLinkClass} text-icon-color`
          }
          key={link.title}
        >
          <span>{link.icon}</span>
          <span className="md:hidden">{link.title}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default DashboardSidebar;
