import React, { useContext, useState } from 'react'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { Link, useLocation, useNavigation } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthProvider';

const Modal = () => {
    // From contexts/AuthProvider
    const { signUpWithGmail, login } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState("");

    // Redirecting to home page or a specific page
    const location = useLocation();
    const navigate = useNavigation();
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    
    // login with google
    const handleLogin = () => {
        signUpWithGmail()
        .then((result) => {
            const user = result.user;
            alert("Login successful!")
            navigate(from, { replace: true });
        })
        .catch((error) => console.log(error));
    };

    // Register
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        console.log("User credentials", email, password);
        login(email, password)
          .then((result) => {
            // Signed in
            const user = result.user;
            // console.log(user);
            alert("Login successful!");
            document.getElementById("my_modal_5").close()
            // navigate(from, { replace: true });
            // ...
          })
          .catch((error) => {
            const errorMessage = error.message;
            setErrorMessage("Please provide valid email & password!");
          });
        //   reset()
    };

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

                    {/* show errors */}
                    {errorMessage ? (
                    <p className="text-red text-xs italic">
                        {errorMessage}
                    </p>
                    ) : (
                    ""
                    )}

                    {/* Login Button */}
                    <div className="form-control mt-6">
                        <input type="submit" value="Login" className="btn bg-green" />
                    </div>

                    {/* Signup */}
                    <p className="text-center my-2">
                        Don't have an account? 

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
                    <button className="btn btn-circle hover:bg-green hover:text-white" onClick={handleLogin}>
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