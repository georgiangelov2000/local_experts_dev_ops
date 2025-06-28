import { Link } from "react-router-dom";


export default function Register() {
    return (
      <div className="min-h-screen flex justify-center items-center  p-4">
        <div className="bg-white p-6 w-full max-w-4xl">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Register</h2>
  
          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="business_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business name</label>
                <input type="text" id="business_name" placeholder="John"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
  
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" id="email" placeholder="Doe@gmail.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
  
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                <input type="tel" id="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
  
              <div>
                <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website URL</label>
                <input type="url" id="website" placeholder="flowbite.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Category
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="">Select category</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="cleaning">Cleaning</option>
                </select>
              </div>

              <div>
                <label htmlFor="serviceCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Service Category
                </label>
                <select
                  id="serviceCategory"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="">Select service category</option>
                  <option value="leak-repair">Leak Repair</option>
                  <option value="pipe-installation">Pipe Installation</option>
                  <option value="drain-cleaning">Drain Cleaning</option>
                </select>
              </div>
            </div>
  
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" id="password" placeholder="•••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
  
            <div className="mb-6">
              <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input type="password" id="confirm_password" placeholder="•••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
  
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input id="remember" type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.</label>
            </div>
  
            <button type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
          <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline text-sm"
          >
            ← Go back to Home
          </Link>
        </div>
        </div>
      </div>
    );
  }
  