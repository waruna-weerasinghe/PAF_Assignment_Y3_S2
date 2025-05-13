 import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../Redux/Auth/Action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string().min(4, "Must be at least 4 characters").required("Required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Required"),
  name: Yup.string().min(2, "Must be at least 2 characters").required("Required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms and privacy policy"),
});

const Signup = () => {
  const initialValues = { email: "", username: "", password: "", name: "", terms: false };
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    dispatch(signupAction(values));
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (auth.signup?.username) {
      navigate("/login");
    }
  }, [auth.signup, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-8">
        <div className="flex flex-col items-center">
          <img
            className="mx-auto h-32 w-auto"
            src="/images/Pink-Cute-Cupcake-Bakery-Logo.png"
            alt="Cake Shop Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Yes! We Cake
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Experience the delightful world of baking with Us
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.email && touched.email ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm`}
                    placeholder="Email address"
                  />
                  <ErrorMessage name="email" component="p" className="text-sm text-red-600 mt-1" />
                </div>

                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.username && touched.username ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm`}
                    placeholder="Username"
                  />
                  <ErrorMessage name="username" component="p" className="text-sm text-red-600 mt-1" />
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.name && touched.name ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm`}
                    placeholder="Full Name"
                  />
                  <ErrorMessage name="name" component="p" className="text-sm text-red-600 mt-1" />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.password && touched.password ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm`}
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="p" className="text-sm text-red-600 mt-1" />
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center">
                  <Field
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the{" "}
                    <a href="#" className="text-amber-600 hover:text-amber-500">
                      Terms
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-amber-600 hover:text-amber-500">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                <ErrorMessage name="terms" component="p" className="text-sm text-red-600 mt-1" />

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="font-medium text-amber-600 hover:text-amber-500"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
