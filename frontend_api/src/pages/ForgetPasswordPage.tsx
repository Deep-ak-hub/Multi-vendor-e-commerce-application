import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitleComponent";

export default function ForgetPasswordPage() {
  return (
    <>
      <form className="w-105 flex flex-col items-center text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-2xl">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-primary-700">
          <span className="text-4xl">👤</span>
        </div>

        <PageTitle
          value="FORGET PASSWORD"
          className="font-light tracking-[6px] mb-12"
        />

        <div className="w-full mb-8">
          <div className="flex items-center border-b border-white/70 pb-2">
            <span className="mr-3">✉</span>
            <input
              type="text"
              placeholder="Email ID"
              className="bg-transparent outline-none w-full placeholder-white/80"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-button-primary hover:bg-button-primary-hover tracking-[4px] font-semibold cursor-pointer rounded-lg transitions-colors duration-300"
        >
          Forget Password
        </button>

        <div className="flex flex-col items-center mt-8 text-sm">
          <p className="mb-3 text-white/90">Login with Password?</p>

          <Link
            to="../"
            className="px-6 py-2 border border-white/70 rounded-md hover:bg-white/20 transition cursor-pointer"
          >
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
