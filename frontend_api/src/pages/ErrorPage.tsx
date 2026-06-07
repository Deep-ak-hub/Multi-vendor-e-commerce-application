import { useNavigate } from "react-router-dom";

interface IErrorPageProps {
  code?: number;
  message?: string;
  buttonTitle?: React.ReactNode
}

export default function ErrorPage({
  code = 404,
  message = "page not found",
  buttonTitle = <>Previous Page</>
}: IErrorPageProps) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <div className="text-6xl font-bold text-blue-500 mb-2">{code}</div>
        <h1 className="text-2xl font-semibold mb-4">Error</h1>
        <p className="text-gray-600 mb-6">{message}</p>

        <button
          onClick={handleRedirect}
          className="mt-2 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
        >
          {buttonTitle}
        </button>
      </div>
    </div>
  );
}
