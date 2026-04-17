import DashBoardIcon from "@/components/icons/DashBoardIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import HammerIcon from "@/components/icons/HammerIcon";
import CogIcon from "@/components/icons/CogIcon";
const actions = [
  {
    name: "Dashboard",
    icon: <DashBoardIcon />,
    route: "/dashboard",
  },
  {
    name: "User Management",
    icon: <UsersIcon />,
    route: "/user-management",
  },
  // {
  //   name: "Content Moderation",
  //   icon: <HammerIcon />,
  //   route: "/content-mod",
  // },
  {
    name: "Settings",
    icon: <CogIcon />,
    route: "/settings",
  },
];

export default actions;
