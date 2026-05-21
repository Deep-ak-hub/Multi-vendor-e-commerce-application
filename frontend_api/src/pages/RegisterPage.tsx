import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitleComponent";
import InputComponent from "../components/form/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import { useState, type BaseSyntheticEvent } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";

export interface IRegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: number;
}

export default function RegisterPage() {
  const [data, setData] = useState<IRegisterCredentials>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: NaN,
  });

  const handleInputChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  
  return (
    <>
      <form className="w-105 flex flex-col items-center text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-2xl">

        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-primary-700">
          <span className="text-4xl">📝</span>
        </div>

        <PageTitle
          value="CREATE ACCOUNT"
          className="font-light tracking-[6px] mb-12"
        />

        <InputComponent
          type="text"
          placeholder="Full Name"
          name="fullName"
          icon={<FaUser size={23} />}
          handler={handleInputChange}
        />

        <InputComponent
          type="email"
          placeholder="Email Id"
          name="email"
          icon={<MdOutlineEmail size={23} />}
          handler={handleInputChange}
        />

        <InputComponent
          type="password"
          placeholder="Password"
          name="password"
          icon={<IoMdLock size={23} />}
          handler={handleInputChange}
        />

        <InputComponent
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          icon={<IoMdLock size={23} />}
          handler={handleInputChange}
        />

        <InputComponent
          type="number"
          placeholder="Phone"
          name="phone"
          icon={<FiPhoneCall size={23} />}
          handler={handleInputChange}
        />      

        <button
          type="submit"
          className="w-full py-3 bg-button-primary hover:bg-button-primary-hover tracking-[4px] font-semibold cursor-pointer rounded-lg transitions-colors duration-300"
        >
          REGISTER
        </button>

        <div className="flex flex-col items-center mt-8 text-sm">
          <p className="mb-3 text-white/90">Already have an account?</p>

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
