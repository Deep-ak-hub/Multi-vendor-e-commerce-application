import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitleComponent";
import InputComponent from "../components/form/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import { useForm } from "react-hook-form";

export interface IRegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: number;
}

export default function RegisterPage() {
  /* const [data, setData] = useState<IRegisterCredentials>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: 0,
  });

   const handleInputChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
 */
  /* const submitForm = (e: BaseSyntheticEvent) => {
  e.preventDefault()
}
 */

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterCredentials>();

  const submitForm = (data: IRegisterCredentials) => {
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        action=""
        className="w-105 flex flex-col items-center text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-2xl"
      >
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
          icon={<FaUser size={23} />}
          registration={register("fullName", {
            required: "Full name is required",
            minLength: { value: 3, message: "Name must be at least 3 characters" },
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "Name should only contain letters",
            },
          })}
          error={errors.fullName?.message}
        />

        <InputComponent
          type="email"
          placeholder="Email Id"
          icon={<MdOutlineEmail size={23} />}
          registration={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          })}
          error={errors.email?.message}
        />

        <InputComponent
          type="password"
          placeholder="Password"
          icon={<IoMdLock size={23} />}
          registration={register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
              message: "Password must contain uppercase, lowercase, numbers, and special characters (!@#$%^&*)",
            },
          })}
          error={errors.password?.message}
        />

        <InputComponent
        type="password"
        placeholder="Confirm Password"
        icon={<IoMdLock size={23} />}
        registration={register("confirmPassword", {
          required: "Please confirm your password",
          validate: (val) =>
            val === watch("password") || "Passwords do not match",
        })}
        error={errors.confirmPassword?.message}
      />

        <InputComponent
        type="number"
        placeholder="Phone"
        icon={<FiPhoneCall size={23} />}
        registration={register("phone", {
          required: "Phone number is required",
          valueAsNumber: true,
          validate: (val) => {
            const phoneStr = val?.toString() || "";
            if (phoneStr.length < 10) return "Phone number must be at least 10 digits";
            if (phoneStr.length > 15) return "Phone number cannot exceed 15 digits";
            if (!/^\d+$/.test(phoneStr)) return "Phone number should only contain digits";
            return true;
          },
        })}
        error={errors.phone?.message}
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
