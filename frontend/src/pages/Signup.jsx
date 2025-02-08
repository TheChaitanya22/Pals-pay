import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { Warning } from "../components/Warning";
import axios  from "axios";




export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={" Signup "} />
                <Subheading label={" Enter your information to create an account "} />
                <Inputbox label={"First Name"} placeholder={"John"} onChange = { e => {
                    setFirstName(e.target.value);
                }}/>
                <Inputbox label={"Last Name"} placeholder={"Doe"} onChange = { e => {
                    setLastName(e.target.value);
                }}/>
                <Inputbox label={"Email"} placeholder={"John@gmail.com"} onChange = { e => {
                    setUserName(e.target.value);
                }}/>
                <Inputbox label={"Password"} placeholder={"123456"} onChange = { e => {
                    setPassword(e.target.value);
                }}/>
                <Button label={"Sign up"} onPress = { async() => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        userName,
                        firstName,
                        lastName,
                        password
                    });
                    localStorage.setItem("token", response.data.token)
                }}/>
                <Warning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}