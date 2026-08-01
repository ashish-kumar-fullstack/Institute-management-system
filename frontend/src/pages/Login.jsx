import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialFormData = {
  email: "",
  password: "",
 };

const Login = ()=> {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    let updatedValue = type === "checkbox" ? checked : value;

    if (name === "tenantSlug") {
      updatedValue = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-+/, "");
    }

    setFormData((previousData) => ({
      ...previousData,
      [name]: updatedValue,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setApiError("");
    setSuccessMessage("");
  };

 const getDashboardRoute = (role) => {
  const roleRoutes = {
    super_admin: "/super-admin/dashboard",
    institute_admin: "/admin/dashboard",
    teacher: "/teacher/dashboard",
    accountant: "/accountant/dashboard",
  };

  return roleRoutes[role] || "/unauthorized";
};

const handleSubmit = async (event) => {
  event.preventDefault();

  setApiError("");
  setSuccessMessage("");

  if (!validateForm()) {
    return;
  }

  const requestData = {
    email: formData.email.toLowerCase().trim(),
    password: formData.password,
  };

  try {
    setIsLoading(true);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    const contentType = response.headers.get("content-type");

    let result;

    if (contentType?.includes("application/json")) {
      result = await response.json();
    } else {
      const rawResponse = await response.text();

      console.error("Backend returned non-JSON:", rawResponse);

      throw new Error(
        `Server returned an invalid response (${response.status})`
      );
    }

    if (!response.ok) {
      throw new Error(
        result.message ||
          result.error ||
          "Invalid email or password"
      );
    }

    const loggedInUser = result.data?.user;

    if (!loggedInUser?.role) {
      throw new Error("User role was not returned by the server");
    }

    setSuccessMessage(result.message || "Login successful");

    const dashboardRoute = getDashboardRoute(loggedInUser.role);

    navigate(dashboardRoute, {
      replace: true,
    });
  } catch (error) {
    setApiError(
      error.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};

  const inputClassName = (fieldName) => {
    return `w-full rounded-lg border px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 ${
      errors[fieldName]
        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        : "border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    }`;
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        {/* Left content */}
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
              examinations, and institute operations from one secure
              platform.
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
                Login to your account to start managing your
                operations.
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  className={inputClassName("email")}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
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
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
                    className={inputClassName("password")}
                  />

                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>


              {apiError && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-4"
                >
                  <p className="text-sm font-medium text-red-700">
                    {apiError}
                  </p>
                </div>
              )}

              {successMessage && (
                <div
                  role="status"
                  className="rounded-lg border border-green-200 bg-green-50 p-4"
                >
                  <p className="text-sm font-medium text-green-700">
                    {successMessage}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isLoading ? "Logging in..." : "Login to your account"}
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