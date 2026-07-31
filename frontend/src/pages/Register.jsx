import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialFormData = {
  instituteName: "",
  tenantSlug: "",
  adminName: "",
  email: "",
  password: "",
  confirmPassword: "",
  term: false,
};

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.instituteName.trim()) {
      newErrors.instituteName = "Institute name is required";
    } else if (formData.instituteName.trim().length < 3) {
      newErrors.instituteName =
        "Institute name must contain at least 3 characters";
    }

    if (!formData.tenantSlug.trim()) {
      newErrors.tenantSlug = "Institute username is required";
    } else if (formData.tenantSlug.trim().length < 3) {
      newErrors.tenantSlug =
        "Institute username must contain at least 3 characters";
    } else if (!/^[a-zA-Z0-9-]+$/.test(formData.tenantSlug.trim())) {
      newErrors.tenantSlug =
        "Username can only contain letters, numbers, and hyphens";
    }

    if (!formData.adminName.trim()) {
      newErrors.adminName = "Admin name is required";
    } else if (formData.adminName.trim().length < 2) {
      newErrors.adminName =
        "Admin name must contain at least 2 characters";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.term) {
      newErrors.term = "Please accept the terms and conditions";
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setApiError("");
    setSuccessMessage("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const requestData = {
      instituteName: formData.instituteName.trim(),
      slug: formData.tenantSlug.trim(),
      adminName: formData.adminName.trim(),
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
    };

    try {
      setIsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/institute-register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.error ||
            "Institute registration failed"
        );
      }

      setSuccessMessage(
        result.message || "Institute registered successfully"
      );

      setFormData(initialFormData);
      setErrors({});

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setApiError(
        error.message || "Something went wrong. Please try again."
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
                to="/login"
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-white"
              >
                Login
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

        {/* Registration form */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Register your institute
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Create your institute account and start managing your
                operations.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="instituteName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Institute name
                </label>

                <input
                  id="instituteName"
                  name="instituteName"
                  type="text"
                  value={formData.instituteName}
                  onChange={handleChange}
                  placeholder="Example Public School"
                  autoComplete="organization"
                  className={inputClassName("instituteName")}
                />

                {errors.instituteName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.instituteName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="tenantSlug"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Institute username
                </label>

                <input
                  id="tenantSlug"
                  name="tenantSlug"
                  type="text"
                  value={formData.tenantSlug}
                  onChange={handleChange}
                  placeholder="example-public-school"
                  autoComplete="off"
                  className={inputClassName("tenantSlug")}
                />

                <p className="mt-1 text-xs text-gray-500">
                  Used as your unique institute identifier.
                </p>

                {errors.tenantSlug && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.tenantSlug}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="adminName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Admin name
                </label>

                <input
                  id="adminName"
                  name="adminName"
                  type="text"
                  value={formData.adminName}
                  onChange={handleChange}
                  placeholder="Enter administrator name"
                  autoComplete="name"
                  className={inputClassName("adminName")}
                />

                {errors.adminName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.adminName}
                  </p>
                )}
              </div>

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

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Confirm password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    autoComplete="new-password"
                    className={inputClassName("confirmPassword")}
                  />

                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <input
                    id="term"
                    name="term"
                    type="checkbox"
                    checked={formData.term}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />

                  <label
                    htmlFor="term"
                    className="text-sm leading-6 text-gray-600"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      terms and conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      privacy policy
                    </Link>
                    .
                  </label>
                </div>

                {errors.term && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.term}
                  </p>
                )}
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
                {isLoading ? "Registering..." : "Register Institute"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already registered?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Login to your account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;