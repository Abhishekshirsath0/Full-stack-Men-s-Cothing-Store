import { Link } from "react-router";
const Login = () => {
  return (
    <>
   <div class="text-center py-6 ">
  <h2 class="text-3xl font-semibold text-slate-700">
    Welcome to Login
  </h2>
</div>

    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 border border-gray-200 rounded-lg shadow-md">
       
        <form action="#">

          
          <h5 className="text-xl font-semibold text-gray-900 mb-6">
            Sign in to our platform
          </h5>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5"
              placeholder="example@company.com"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5"
              placeholder="•••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="checkbox-remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="checkbox-remember"
                className="ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <Link to="/"
              className="text-sm text-blue-600 hover:underline"
            >
              Lost Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mb-3"
          >
            Login to your account
          </button>

          <div className="text-sm text-gray-900">
            Not registered?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;