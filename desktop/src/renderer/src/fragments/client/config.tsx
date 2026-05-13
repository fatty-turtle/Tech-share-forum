import AddFriendIcon from "../../components/icons/AddFriendIcon";
import CommentIcon from "../../components/icons/CommentIcon";
import DashBoardIcon from "../../components/icons/DashBoardIcon";
import TrendIcon from "../../components/icons/TrendIcon";
import UsersIcon from "../../components/icons/UsersIcon";

export const actions = [
  {
    name: "Dashboard",
    icon: <DashBoardIcon />,
    route: "/dashboard",
  },
  {
    name: "Trending",
    icon: <TrendIcon />,
    route: "/trending",
  },
  {
    name: "My Dicussions",
    icon: <DashBoardIcon />,
    route: "/my-discussion",
  },
];

export const authens = [
  {
    name: "Sign In",
    icon: <UsersIcon />,
    route: "/login",
  },
  {
    name: "Sign Up",
    icon: <AddFriendIcon />,
    route: "/my-discussion",
  },
];
