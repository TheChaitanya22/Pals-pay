import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { Warning } from "../components/Warning";

export const Signin = () => {
  return (
    <div className=" h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={" Sign In "} />
          <Subheading
            label={" Enter your crendentials to access your account"}
          />
          <Inputbox label={"Email"} placeholder={"John@gmail.com"} />
          <Inputbox label={"Password"} placeholder={"123456"} />
          <Button label={"Sign in"} />
          <Warning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
};
