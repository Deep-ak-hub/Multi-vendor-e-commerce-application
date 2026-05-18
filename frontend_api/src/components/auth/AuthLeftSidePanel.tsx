import { LogoComponent } from "../LogoComponent";

export default function AuthLeftSidePanel() {
  return (
    <>
      <div className="flex w-1/4 h-screen ">
        <div className="w-full bg-gradient-secondary flex flex-col items-center justify-center">
          <LogoComponent className="bg-transparent/50 backdrop-blur-sm p-6 rounded-xl size-38" />
          <div className="text-center font-semibold text-primary-950">
            <h3>Buy Whatever You Want !!</h3>
          </div>
        </div>
        {/* <div className="w-full lg:w-2/3 bg-gray-200"></div> */}
      </div>
    </>
  );
}
