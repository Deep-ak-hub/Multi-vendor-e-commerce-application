import { Link } from "react-router-dom";
import { PageTitle } from "../../components/PageTitleComponent";
import InputComponent from "../../components/form/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import type { ILoginCredentials } from "./LoginPage";
import { useForm } from "react-hook-form";

export default function ForgetPasswordPage() {
  /* const [credentials, setCredentials] = useState<ILoginCredentials>({
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
  } = useForm<ILoginCredentials>({});

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
          value="FORGET PASSWORD"
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
