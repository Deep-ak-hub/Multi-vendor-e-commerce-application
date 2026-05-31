import { Link, NavLink } from "react-router-dom";
import { PageTitle } from "../components/PageTitleComponent";
import InputComponent from "../components/form/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { useForm } from "react-hook-form";

export interface ILoginCredentials {
  email: string;
  password: string;
}

export default function LoginPage() {
  /*   const [credentials, setCredentials] = useState<ILoginCredentials>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  }; */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginCredentials>();

  const submitForm = (data: ILoginCredentials) => {
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-105 flex flex-col items-center text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-2xl"
      >
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-primary-700">
          <span className="text-4xl">👤</span>
        </div>

        <PageTitle
          value="CUSTOMER LOGIN"
          className="font-light tracking-[6px] mb-12"
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

        <div className="flex justify-between w-full text-sm mb-10">
          <label className="flex items-center gap-2 text-white/90">
            <input type="checkbox" />
            Remember me
          </label>

          <NavLink to="../forget-password" className="italic">
            Forgot Password?
          </NavLink>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-button-primary hover:bg-button-primary-hover tracking-[4px] font-semibold cursor-pointer rounded-lg transitions-colors duration-300"
        >
          LOGIN
        </button>

        <Link
          to="/"
          className="w-full mt-4 py-3 bg-button-secondary text-slate-200 hover:bg-button-secondary-hover font-semibold cursor-pointer rounded-lg border border-white/20 transition duration-300 flex items-center justify-center gap-3"
        >
          <span>🟢</span>
          Continue with Google
        </Link>

        <div className="flex flex-col items-center mt-8 text-sm">
          <p className="mb-3 text-white/90">Didn't have an account yet?</p>

          <Link
            to="../register"
            className="px-6 py-2 border border-white/70 rounded-md hover:bg-white/20 transition cursor-pointer"
          >
            Register
          </Link>
        </div>
      </form>
    </>
  );
}
