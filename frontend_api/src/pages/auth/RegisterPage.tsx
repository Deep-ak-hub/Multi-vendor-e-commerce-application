import { Link } from "react-router-dom";
import { PageTitle } from "../../components/PageTitleComponent";
import InputComponent, { FileComponent } from "../../components/form/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonComponent from "../../components/ButtonComponent";
import { credentialsDTO, type RegisterCredentials } from "./auth.contract";
import axiosInstance from "../../lib/axios.config";

export default function RegisterPage() {
  /* const [data, setData] = useState<IRegisterCredentials>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
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
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    resolver: zodResolver(credentialsDTO),
  });

  const submitForm = async (data: RegisterCredentials) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("phone", data.phone);
      formData.append("image", data.image[0]);
      
      const response = await axiosInstance.post("/auth/register", formData)
      console.log(response);
    } catch (exception) {
      console.log(exception);
    }
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
          registration={register("name")}
          error={errors.name?.message}
        />

        <InputComponent
          type="email"
          placeholder="Email Id"
          icon={<MdOutlineEmail size={23} />}
          registration={register("email")}
          error={errors.email?.message}
        />

        <InputComponent
          type="password"
          placeholder="Password"
          icon={<IoMdLock size={23} />}
          registration={register("password")}
          error={errors.password?.message}
        />

        <InputComponent
          type="password"
          placeholder="Confirm Password"
          icon={<IoMdLock size={23} />}
          registration={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <InputComponent
          type="tel"
          placeholder="Phone"
          icon={<FiPhoneCall size={23} />}
          registration={register("phone")}
          error={errors.phone?.message}
        />

        <FileComponent
          isMultiple
          placeholder="Images"
          registration={register("image")}
          error={errors.image?.message}
        />

        <ButtonComponent
          type="submit"
          className="w-full py-3 bg-button-primary hover:bg-button-primary-hover tracking-[4px] font-semibold cursor-pointer rounded-lg transitions-colors duration-300 disabled:cursor-not-allowed disabled:hover:scale-none"
          isSubmitting={isSubmitting}
        >
          REGISTER
        </ButtonComponent>

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
