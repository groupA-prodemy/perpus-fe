import { Link, Outlet, useNavigate } from "react-router-dom";
import { responses } from "../auth/LoginForm.jsx";

export let personArr = []
export let usernameArr = []
export let roleArr = []
export default function AdminDashboard() {
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
            }, 5000, navigate("/end"))
        } else {
            responsesLogout[responsesLogout.length - 1].message.toString()
        }
    }

    return <>
        <div className="row">
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link to={"/roles"}>
                                        Role List
                                    </Link>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-mars-double fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link to={"/users"}>
                                        User List
                                    </Link>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-users fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link to={"/publisher"}>
                                        Publisher
                                    </Link>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-id-card fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    <Link to={"/author"}>
                                        Author
                                    </Link>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-tag fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}