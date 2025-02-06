import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { Warning } from "../components/Warning";


export const Signup = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={" Signup "} />
                <Subheading label={" Enter your information to create an account "} />
                <Inputbox label={"First Name"} placeholder={"John"} />
                <Inputbox label={"Last Name"} placeholder={"Doe"} />
                <Inputbox label={"Email"} placeholder={"John@gmail.com"} />
                <Inputbox label={"Password"} placeholder={"123456"} />
                <Button label={"Sign up"}/>
                <Warning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}