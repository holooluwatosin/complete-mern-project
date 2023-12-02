import React, { useContext } from 'react'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';

const Signup = () => {
    // From contexts/AuthProvider
    const { createUser, login } = useContext(AuthContext)

    // From react-hook-form (i.e. https://react-hook-form.com/get-started)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        // console.log(email, password)
        createUser(email, password)
            .then((result) => {
            // Signed up 
            const user = result.user;
            alert("Account creation successful!");
            Navigate(from, { replace: true });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorMessage}`)
            // ..
        });
      };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
        <div className="modal-action flex flex-col justify-center mt-0">
            {/* From the Hero/Responsive Component */}
            <form className="card-body" method="dialog" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="font-bold text-lg">Create an account.</h3>

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
                    <input type="submit" value="Signup" className="btn bg-green" />
                </div>

                {/* Signup */}
                <p className="text-center my-2">
                    Have an account? 

                    <button onClick={()=>document.getElementById('my_modal_5').showModal()} className="underline text-red ml-1">
                        Login
                    </button>
                </p>

                <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
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
        <Modal />
    </div>
  )
}

export default Signup