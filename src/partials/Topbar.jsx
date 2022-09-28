import { Link, useNavigate } from "react-router-dom"

import gbr from "../../style/img/undraw_profile.svg"

export let personArr = []
export let usernameArr = []
export let roleArr = []
export default function Topbar() {
    let userIdArr = []
    let responsesLogout = []
    const navigate = useNavigate()

    try {
        let message = responses[responses.length - 1].message.toString().split(" ") //
        let indicator = 0;
        if (message.indexOf("Admin") >= 0) {
            indicator += 1;
        }
        if (indicator > 0) {
            personArr.push(responses[responses.length - 1].data.name.toString())
            usernameArr.push(responses[responses.length - 1].data.username.toString())
            roleArr.push(responses[responses.length - 1].data.roleName.toString())
            userIdArr.push(responses[responses.length - 1].data.userId.toString())
            localStorage.setItem("name", personArr[personArr.length - 1].toString())
            localStorage.setItem("uname", usernameArr[usernameArr.length - 1].toString())
            localStorage.setItem("role", roleArr[roleArr.length - 1].toString())
            localStorage.setItem("uId", userIdArr[userIdArr.length - 1].toString())
        }
    } catch (error) {
        personArr.push(localStorage.getItem("name"))
        usernameArr.push(localStorage.getItem("uname"))
        roleArr.push(localStorage.getItem("role"))
        userIdArr.push(localStorage.getItem("uId"))
    }


    async function logout(event) {
        event.preventDefault()
        const targetUrl = "https://be-library-mini-system.herokuapp.com/auth/logout/" + userIdArr[userIdArr.length - 1]
        const method = "POST"
        await fetch(targetUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((re) => re.json()).then((d) => responsesLogout.push(d))
        if (responsesLogout[responsesLogout.length - 1].status.toString() === "true") {
            alert
                (
                    responsesLogout[responsesLogout.length - 1].message.toString()
                )
            setTimeout(() => {
                navigate("/")
            })
        } else {
            responsesLogout[responsesLogout.length - 1].message.toString()
        }
    }
    return <>
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>

            {/* <!-- Topbar Search --> */}
            <form
                className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                        aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
            </form>

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">

                {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-search fa-fw"></i>
                    </a>
                    {/* <!-- Dropdown - Messages --> */}
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                    placeholder="Search for..." aria-label="Search"
                                    aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{personArr[personArr.length - 1]}</span>
                        <img className="img-profile rounded-circle"
                            src={gbr} />
                    </a>
                    {/* <!-- Dropdown - User Information --> */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <Link to={"/users/" + usernameArr[usernameArr.length - 1]}>
                            <a className="dropdown-item">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400">
                                </i>
                                Profile
                            </a>
                        </Link>

                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" onClick={(event) => logout(event)}>Logout</i>
                        </a>
                    </div>
                </li>

            </ul>
        </nav>
    </>
}