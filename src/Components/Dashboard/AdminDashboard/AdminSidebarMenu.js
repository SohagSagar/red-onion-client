import React from 'react';
import { RiCloseLine,RiFolderAddLine } from 'react-icons/ri';
import { AiOutlineDashboard} from "react-icons/ai";
import { BsBook, BsPencilSquare } from "react-icons/bs";
import { MdOutlineLibraryAdd,MdPreview } from "react-icons/md";
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink, Outlet, Link } from "react-router-dom";
import '../../../Styles/SidebarMenu.css';




const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: <AiOutlineDashboard />,
    },
    {
        path: "/dashboard/all-orders",
        name: "All Orders",
        icon: <BsBook />,
    },
    {
        path: "/dashboard/all-users",
        name: "All Users",
        icon: <RiFolderAddLine />,
    },
    {
        path: "/dashboard/pending-orders",
        name: "Pending Orders",
        icon: <MdPreview/>,
    },
    {
        path: "/dashboard/confirmed-orders",
        name: "Confirm Orders",
        icon: <MdOutlineLibraryAdd />,

    },
    {
        path: "/dashboard/add-foods",
        name: "Add Foods",
        icon: <BsPencilSquare />,
    },
    {
        path: "/dashboard/all-foods",
        name: "All Foods",
        icon: <BsPencilSquare />,
    },
    {
        path: "/dashboard/user-reviews",
        name: "User Reviews",
        icon: <BsPencilSquare />,
    },
    {
        path: "/dashboard/user-complains",
        name: "User Complains",
        icon: <BsPencilSquare />,
    },
    {
        path: "/dashboard/update-password",
        name: "Update Password",
        icon: <BsPencilSquare />,
    }
    
];

const AdminSidebarMenu = () => {

    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-start justify-start mt-3 ml-4">

                    <label for="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><GiHamburgerMenu /></label>
                    <Outlet />

                </div>

                <div className="drawer-side shadow-xl mt-5 rounded-md">
                    <label for="my-drawer-2" className="drawer-overlay"></label>

                    <ul className="menu p-4 overflow-y-auto w-72 bg-base-100 text-base-content">
                        <div className='flex items-center justify-center'>
                            {/* user avatar in dashboard */}
                            <div class="avatar online">
                                <div class="w-16 rounded-full">
                                    <img src="https://placeimg.com/192/192/people" />
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-start'>
                                <h1 className='text-lg font-semibold ml-4 '>School Space</h1>
                                <p className='text-sm font-semibold '>Role: Admin</p>
                            </div>
                            <label for="my-drawer-2"><RiCloseLine for="my-drawer-2" className='text-2xl cursor-pointer lg:hidden' /></label>
                        </div>
                        <div className="divider"></div>

                        <section className="routes ">
                            {routes.map((route, index) => {
                                return (
                                    <NavLink
                                        to={route.path}
                                        key={index}
                                        className="link"
                                        activeClassName="active"
                                    >
                                        <div className="icon">{route.icon}</div>
                                        {route.name}

                                    </NavLink>
                                );
                            })}

                        </section>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default AdminSidebarMenu;