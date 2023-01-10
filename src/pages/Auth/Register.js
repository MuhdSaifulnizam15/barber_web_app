import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import Spinner from 'components/Spinner';
import { registerUser } from 'features/auth/authActions';

const Register = () => {
  const { loading, userInfo, success } = useSelector(
    state => state.auth,
  );
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/auth/login');
    // redirect authenticated user to profile screen
    console.log('userInfo', userInfo);
    // if (userInfo) navigate('/');
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirm_password) {
      alert('Password mismatch');
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="my-6 text-center text-3xl font-bold tracking-tight">
            Create an account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit(submitForm)}
        >
          <input type="hidden" name="remember" value="true" />
          <div>
            <div className="my-4">
              <label htmlFor="fname" className="sr-only">
                First Name
              </label>
              <p className="mb-2 sm:text-sm">First Name</p>
              <input
                id="fname"
                name="fname"
                type="text"
                required
                {...register('first_name')}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="First Name"
              />
            </div>
            <div className="my-4">
              <label htmlFor="lname" className="sr-only">
                Last Name
              </label>
              <p className="mb-2 sm:text-sm">Last Name</p>
              <input
                id="lname"
                name="lname"
                type="text"
                required
                {...register('last_name')}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Last Name"
              />
            </div>
            <div className="my-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <p className="mb-2 sm:text-sm">Email address</p>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                {...register('email')}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Email address"
              />
            </div>
            <div className="my-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <p className="my-2 sm:text-sm">Password</p>
              <input
                id="password"
                name="password"
                type="password"
                required
                {...register('password')}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Password"
              />
            </div>
            <div className="my-4">
              <label htmlFor="cpassword" className="sr-only">
                Confirm Password
              </label>
              <p className="my-2 sm:text-sm">Confirm Password</p>
              <input
                id="cpassword"
                name="cpassword"
                type="password"
                required
                {...register('confirm_password')}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {loading ? <Spinner /> : 'Register Account'}
            </button>
          </div>
        </form>

        <div className="flex justify-center container mx-auto mt-6 text-sm">
          <div className="flex ">
            Already have an account?
            <a
              href="/auth/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 pl-1"
            >
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;