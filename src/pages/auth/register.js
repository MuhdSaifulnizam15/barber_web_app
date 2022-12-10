export default function Register() {
  return (
    <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <div>
          <img
            class="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 class="my-6 text-center text-3xl font-bold tracking-tight">
            Create an account
          </h2>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div>
            <div className="my-4">
              <label for="fname" class="sr-only">
                Full Name
              </label>
              <p className="mb-2 sm:text-sm">
                Full Name
              </p>
              <input
                id="fname"
                name="fname"
                type="text"
                required
                class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Full Name"
              />
            </div>
            <div className="my-4">
              <label for="email-address" class="sr-only">
                Email address
              </label>
              <p className="mb-2 sm:text-sm">
                Email address
              </p>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Email address"
              />
            </div>
            <div className="my-4">
              <label for="password" class="sr-only">
                Password
              </label>
              <p className="my-2 sm:text-sm">
                Password
              </p>
              <input
                id="password"
                name="password"
                type="password"
                required
                class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Register Account
            </button>
          </div>
        </form>

        <div class="flex justify-center container mx-auto mt-6 text-sm">
          <div class="flex ">
            Already have an account?
            <a
              href="/auth/login"
              class="font-medium text-indigo-600 hover:text-indigo-500 pl-1"
            >
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}