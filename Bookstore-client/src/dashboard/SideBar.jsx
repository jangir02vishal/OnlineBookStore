import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineCloudUpload,
  HiShoppingBag,
  HiSupport,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import userImg from "../assets/profileimg.jpg";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";


const SideBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Logo href="/" img={userImg} imgAlt="">
        <p>User name</p>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/sell/dashboard" icon={HiChartPie}>
            <p>My profile</p>
          </Sidebar.Item>
          <Sidebar.Item
            href="/sell/dashboard/upload"
            icon={HiOutlineCloudUpload}
          >
            <p>Upload Book</p>
          </Sidebar.Item>
          <Sidebar.Item href="/sell/dashboard/manage" icon={HiInbox}>
            <p>Manage Books</p>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            <p>Products</p>
          </Sidebar.Item>
          <Sidebar.Item href="/login" icon={HiArrowSmRight}>
            <p>Log out</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            <p>Upgrade to Pro</p>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            <p>Documentation</p>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiSupport}>
            <p>Help</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
