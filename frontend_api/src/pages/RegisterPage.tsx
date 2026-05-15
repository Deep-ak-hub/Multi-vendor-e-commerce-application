import { useState } from "react";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitleComponent";

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  dob: string;
  address: string;
}

export default function RegisterPage() {
  
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  }
    

  return (
    <>
      <div className="flex w-full grow h-screen">

        <div className="w-full flex items-center justify-center bg-primary-400  p-4 overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-105 flex flex-col items-center text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-2xl my-8"
          >
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-green-800 flex items-center justify-center mb-6 ring-2 ring-white/20">
              <span className="text-4xl">👤</span>
            </div>

            {/* Title */}
            <PageTitle
              value="CREATE ACCOUNT"
              className="font-light tracking-[4px] text-center mb-8 text-sm"
            />

            {/* Name Field */}
            <div className="w-full mb-6">
              <div className="flex items-center border-b border-white/70 pb-2">
                <span className="mr-3">👤</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="bg-transparent outline-none w-full placeholder-white/80 text-white"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="w-full mb-6">
              <div className="flex items-center border-b border-white/70 pb-2">
                <span className="mr-3">✉</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email ID"
                  className="bg-transparent outline-none w-full placeholder-white/80 text-white"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="w-full mb-6">
              <div className="flex items-center border-b border-white/70 pb-2">
                <span className="mr-3">🔒</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="bg-transparent outline-none w-full placeholder-white/80 text-white"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="w-full mb-6">
              <div className="flex items-center border-b border-white/70 pb-2">
                <span className="mr-3">📱</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="bg-transparent outline-none w-full placeholder-white/80 text-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-green-800 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed tracking-[4px] font-semibold cursor-pointer rounded-lg transition-colors duration-300"
            >
              {isLoading ? "REGISTERING..." : "REGISTER"}
            </button>

            {/* Login Link */}
            <div className="flex flex-col items-center mt-8 text-sm">
              <p className="mb-3 text-white/90">Already have an account?</p>

              <Link
                to="/"
                className="px-6 py-2 border border-white/70 rounded-md hover:bg-white/20 transition cursor-pointer"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
