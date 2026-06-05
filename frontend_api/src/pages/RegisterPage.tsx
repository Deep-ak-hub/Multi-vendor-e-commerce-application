import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitleComponent";
import InputComponent, {
  FileComponent,
} from "../components/form/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonComponent from "../components/ButtonComponent";

export interface IRegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  images: FileList;
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
const allowedImageTypes = ["images/jpeg", "images/png", "images/webp"];

const credentialsDTO = z
  .object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(20, "Username cannot exceed 20 characters"),
    email: z.email("Please enter a valid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(phoneRegex, "Invalid phone number format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain uppercase, lowercase, numbers, and special characters (!@#$%^&*)",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    images: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, "Please select at least one images")
      .refine((files) => files.length <= 10, "Maximum 10 images allowed")
      .refine(
        (files) =>
          Array.from(files).every((file) => file.size <= 5 * 1024 * 1024),
        "Each images must be less than 5MB",
      )
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            allowedImageTypes.includes(file.type),
          ),
        "Only JPG, PNG and WEBP images are allowed",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterCredentials = z.infer<typeof credentialsDTO>;

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
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    resolver: zodResolver(credentialsDTO),
  });

  const submitForm = async(data: RegisterCredentials) => {
    const images = Array.from(data.images);

    console.log("Form Data:", data);
    console.log("Selected Images:", images);
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
          registration={register("fullName")}
          error={errors.fullName?.message}
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
          registration={register("images")}
          error={errors.images?.message}
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
