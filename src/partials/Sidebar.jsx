import {Link} from "react-router-dom";
import {responses} from "../pages/auth/LoginForm.jsx";
import "../../style/js/sb-admin-2.min.js"


export let personArrSideBar = [];
export let usernameArrSideBar = [];
export let userIdArrSideBar = [];
export let roleArrSideBar = [];
export let responsesLogoutSideBar = [];

const menuList = [
    {
        title: "Dashboard",
        icon: "fa-home",
        link: "/admin/dashboard",
    },
    {
        title: "Form Book",
        icon: "fa-book",
        link: "/book/form",
    },
    {
        title: "Book",
        icon: "fa-book",
        link: "/user/dashboard",
    },
    {
        title: "Author",
        icon: "fa-tag",
        link: "/author",
    },
    {
        title: "Publisher",
        icon: "fa-id-card",
        link: "/publisher",
    },
    {
        title: "User List",
        icon: "fa-users",
        link: "/users",
    },
    {
        title: "Role List",
        icon: "fa-mars-double",
        link: "/roles",
    }
];

export default function Sidebar() {

    try {
        let message = responses[responses.length - 1].message.toString().split(" ");
        let indicator = 0;
        if (message.length != 0) {
            indicator += 1;
        }
        if (indicator > 0) {
            personArrSideBar.push(responses[responses.length - 1].data.name.toString());
            usernameArrSideBar.push(responses[responses.length - 1].data.username.toString());
            roleArrSideBar.push(responses[responses.length - 1].data.roleName.toString());
            userIdArrSideBar.push(responses[responses.length - 1].data.userId.toString());
            localStorage.setItem("name", personArrSideBar[personArrSideBar.length - 1].toString());
            localStorage.setItem("uname", usernameArrSideBar[usernameArrSideBar.length - 1].toString());
            localStorage.setItem(
                "role",
                roleArrSideBar[roleArrSideBar.length - 1].toString()
            );
            localStorage.setItem(
                "uId",
                userIdArrSideBar[userIdArrSideBar.length - 1].toString()
            );
        }
    } catch (error) {
        personArrSideBar.push(localStorage.getItem("name"));
        usernameArrSideBar.push(localStorage.getItem("uname"));
        roleArrSideBar.push(localStorage.getItem("role"));
        userIdArrSideBar.push(localStorage.getItem("uId"));
    }

    return (
        <>
            <ul
                className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                id="accordionSidebar"
            >
                {/* <!-- Sidebar - Brand --> */}
                <a
                    className="sidebar-brand d-flex align-items-center justify-content-center"
                >
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-book"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">PSM Mini Library</div>
                </a>

                {/* <!-- Divider --> */}
                {/* <hr className="sidebar-divider my-0"/> */}

                {/* <!-- Nav Item - Dashboard --> */}

                {/* admin */}
                {roleArrSideBar[roleArrSideBar.length - 1] === "Admin" ? (
                    <>
                        {menuList.map((menu) => (
                            <li className="nav-item" key={menu.title}>
                                <Link className="nav-link" to={menu.link}>
                                    <i className={"fas fa-fw " + menu.icon}></i>
                                    &nbsp;
                                    <span>{menu.title}</span>
                                </Link>
                            </li>
                        ))}
                        {/* {menuProfile.map((profile) => (
                            <li className="nav-item" key={profile.title}>
                                <Link className="nav-link" to={profile.link} onClick={location.reload}>
                                    <i className={"fas fa-fw " + profile.icon}></i>
                                    &nbsp;
                                    <span>{profile.title}</span>
                                </Link>
                            </li>
                        ))}
                        {menuLogOut.map((logOut) => (
                            <li className="nav-item" key={logOut.title}>
                                <Link className="nav-link" onClick={(event) => logout(event)}>
                                    <i className={"fas fa-fw " + logOut.icon}></i>
                                    &nbsp;
                                    <span>{logOut.title}</span>
                                </Link>
                            </li>
                        ))} */}
                    </>
                ) : (

                    // user
                    <>
                        <li className="nav-item" key={menuList[0].title}>
                            <Link className="nav-link" to={"/user/dashboard"}>
                                <i className={"fas fa-fw " + menuList[0].icon}></i>
                                &nbsp;
                                <span>{menuList[0].title}</span>
                            </Link>
                        </li>
                        {/* <li className="nav-item" key={menuList[1].title}>
                            <Link className="nav-link" to={menuList[1].link}>
                                <i className={"fas fa-fw " + menuList[1].icon}></i>
                                &nbsp;
                                <span>{menuList[1].title}</span>
                            </Link>
                        </li> */}
                        {/* <li className="nav-item" key={menuProfile[0].title}>
                            <Link className="nav-link" to={menuProfile[0].link}>
                                <i className={"fas fa-fw " + menuProfile[0].icon}></i>
                                &nbsp;
                                <span>{menuProfile[0].title}</span>
                            </Link>
                        </li>
                        <li className="nav-item" key={menuLogOut[0].title}>
                            <Link className="nav-link" onClick={(event) => logout(event)}>
                                <i className={"fas fa-fw " + menuLogOut[0].icon}></i>
                                &nbsp;
                                <span>{menuLogOut[0].title}</span>
                            </Link>
                        </li> */}
                    </>
                )}

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block"/>

                {/* <!-- Sidebar Toggler (Sidebar) --> */}
                <div className="text-center d-none d-md-inline">
                    <button
                        className="rounded-circle border-0"
                        id="sidebarToggle"
                    ></button>
                </div>
            </ul>
        </>
    );
}
