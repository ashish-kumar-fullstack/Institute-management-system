import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, user} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!email || !password) {
      setErrorMessage("Please enter email and password");
      return;
    }
    try {
      setIsLoading(true);
      const user = await login(email, password);
      setSuccessMessage("Login successful");
      setTimeout(() => {
        if (user.role === "institute_admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/", { replace: true });
        }
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message || "Login failed");
    } finally {
      setIsLoading(false);
      console.log(user);
      
    }
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="hidden md:block">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Institute Management Platform
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 lg:text-6xl">
              The complete operating system for modern{" "}
              <span className="text-blue-600">institutes.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600 lg:text-xl">
              Manage students, teachers, attendance, fees, batches,
              examinations, and institute operations from one secure platform.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/features"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                View Features
              </Link>

              <Link
                to="/register"
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-white"
              >
                Register
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-500">Cloud based</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-500">Data access</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-900">Secure</p>
                <p className="text-sm text-gray-500">Tenant data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Login to your account
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Login to your account to start managing your operations.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="">
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                   className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>
              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-3"
                >
                  <p className="text-sm font-medium text-red-700">
                    {errorMessage}
                  </p>
                </div>
              )}

              {successMessage && (
                <div
                  role="status"
                  className="rounded-lg border border-green-200 bg-green-50 p-3"
                >
                  <p className="text-sm font-medium text-green-700">
                    {successMessage}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:underline"
              >
                Register your institute
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
