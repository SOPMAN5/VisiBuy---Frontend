import { AuthScreen } from "./AuthScreen";
import { LoginForm } from "./features/components/login-form";

export function LoginScreen() {
  return (
    <>
      <div className="flex flex-col items-start justify-center lg:flex-row lg:columns-2 h-screen lg:h-full w-full">
        <div className="hidden lg:block  bg-blue min-h-screen  lg:w-2/3">
          <img src={logo} alt="Visibuy logo" className="w-80 mt-36 ml-28 " />
          <div className="flex gap-x-8 ml-28 pt-28  items-center">
            <img src={lockIcon} alt="lock" className="w-16   " />
            <span>
              <p className="text-3xl text-primary-foreground font-normal">
                Login
              </p>
            </span>
          </div>
        </div>
        <div className=" w-full text-center flex items-center justify-center min-h-dvh ">
          <LoginForm />
        </div>
      </div>
      <Toaster />
    </>
  );
}
