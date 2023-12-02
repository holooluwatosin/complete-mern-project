import React, { useContext } from 'react'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthProvider';

const Modal = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    // From contexts/AuthProvider
    const {} = useContext(AuthContext)

    const onSubmit = (data) => console.log(data)

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
    {/* <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle"> */}
        <div className="modal-box">
            <div className="modal-action flex flex-col justify-center mt-0">
                {/* From the Hero/Responsive Component */}
                <form className="card-body" method="dialog" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-bold text-lg">Please Login!</h3>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" {...register("email")}  />
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" {...register("password")}  />
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

                    <button
                    htmlFor="my_modal_5"
                    onClick={()=>document.getElementById('my_modal_5').close()} 
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
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
        </div>
    </dialog>
  )
}

export default Modal