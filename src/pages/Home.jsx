import { Link, Outlet, useNavigate } from "react-router-dom";
import "../components/Spinner/home.css";
import { useState } from "react";


export let responses = [];

export default function Home() {
    const navigate = useNavigate()
    let msg = ""

    const [formInput, setFormInput] = useState({
        username: '',
        password: '',
    })

    function handleInput(event, inputName) {
        const copyFormInput = { ...formInput }
        copyFormInput[inputName] = event.target.value
        setFormInput(copyFormInput)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const payload = JSON.stringify({
            ...formInput
        })
        const targetUrl = "https://be-library-mini-system.herokuapp.com/auth/login"
        const method = "POST"
        await fetch(targetUrl, {
            method: method,
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((re) => re.json()).then((d) => responses.push(d))
        if (responses[responses.length - 1].status.toString() === "true") {
            alert
                (
                    responses[responses.length - 1].message.toString()
                    + "\n" + "name: " + responses[responses.length - 1].data.name.toString()
                )
            if (responses[responses.length - 1].data.roleName.toString() !== "admin") {
                navigate("/user/dashboard")
            }
            if (responses[responses.length - 1].data.roleName.toString() === "Admin") {
                navigate("/admin/dashboard")
            }
        } else {
            if (formInput.username !== "" && formInput.password !== "") {
                const messageArr = responses[responses.length - 1].message.toString().split(" ");
                if (messageArr.indexOf("Wrong") >= 0) {
                    alert(responses[responses.length - 1].message.toString())
                    msg = responses[responses.length - 1].message.toString();
                } else {
                    alert(responses[responses.length - 1].message.toString())
                }
            } else {
                alert("Form must be filled fully")
            }
        }
    }
    return <>
        <div className="container head">
            <div className="row">
                <div className="col-md-3 col-12 " />
                <div className="col-md-6 col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3>Log In</h3>
                            <div className="text-center">
                                <img className={"img-profile"}
                                    src={"https://media.getredy.id/images/users/12168/15039894701611635740.png"} />
                            </div>
                            <div className="card">
                                <form onSubmit={event => handleSubmit(event)} key={formInput.id} className="card-header">
                                    <div className="mb-3">
                                        <input type={"text"}
                                            value={formInput.username}
                                            placeholder="Username"
                                            required
                                            onChange={event => handleInput(event, "username")}
                                            className={"form-control"}
                                        />
                                    </div>
                                    <div class="mb-3">
                                        <input type={"password"}
                                            value={formInput.password}
                                            placeholder="Password"
                                            required
                                            onChange={event => handleInput(event, "password")}
                                            className={"form-control"}
                                        />
                                    </div>
                                    <div className="">
                                        <button className="btn btn-primary">Log In</button>
                                        &nbsp; &nbsp;
                                        <Link to={"/register"}>
                                            <button className="btn btn-secondary">Register
                                            </button>
                                        </Link>
                                    </div>
                                    <br />
                                    <div className="text-center text-muted mt-auto">
                                        Need help? <span><a href={"https://github.com/groupA-prodemy"}>Contact Us</a></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>

    </>
}