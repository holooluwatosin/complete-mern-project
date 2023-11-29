import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="modal-action flex flex-col justify-center mt-0">
        {/* From the Hero/Responsive Component */}
        <form className="card-body" method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* Email */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" {...register("email")} required />
            </div>

            {/* Password */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" {...register("password")} required />
                <label className="label mt-1">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
                <input type="submit" value="Login" className="btn bg-green" />
            </div>

            {/* Signup */}
            <p className="text-center my-2">
                Donot have an account? 

                <Link to="/signup" className="underline text-red ml-1">
                    Signup Now
                </Link>
            </p>

            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        {/* Social Signin */}
        <div className='text-center space-x-3 mb-5'>
            <button className="btn btn-circle hover:bg-green hover:text-white">
                <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
                <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
                <FaGithub />
            </button>
        </div>
    </div>
  )
}

export default Signup