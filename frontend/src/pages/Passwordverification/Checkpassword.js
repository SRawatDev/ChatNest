import React from 'react'

function Checkpassword() {
  
    return (
      <>
        <div className="mt-5 flex justify-center">
          <div className="bg-white w-full max-w-md mx-2 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              Welcome to the Chat App
            </h3>
            <form>
              <div className="flex flex-col gap-4">
          
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="font-medium text-gray-700">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="email"
                    placeholder="Enter your password"
                    name="email"
                    required
                    className="bg-slate-50 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  
}

export default Checkpassword
