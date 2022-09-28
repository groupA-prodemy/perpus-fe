import { Link, Outlet, useNavigate } from "react-router-dom";
import { responses } from "../auth/LoginForm.jsx";

export let personArr = []
export let usernameArr = []
export let roleArr = []
export default function AdminDashboard() {
    let userIdArr = []
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


    return <>
        <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link to={"/roles"}>
                                        Role List
                                    </Link>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-mars-double fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link to={"/users"}>
                                        User List
                                    </Link>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-users fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link to={"/publisher"}>
                                        Publisher
                                    </Link>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-id-card fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link to={"/author"}>
                                        Author
                                    </Link>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-tag fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}