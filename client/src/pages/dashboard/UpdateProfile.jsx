import React, { useContext } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigation } from "react-router-dom";

const UpdateProfile = () => {
    const {updateUserProfile} = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigation();
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    
    const onSubmit = (data) => {
        console.log(data)
        const name = data.name;
        const photoURL = data.photoURL;

        updateUserProfile(name, photoURL)
          .then(() => {
            // Profile updated!
            alert("Profile updated successfully")
            navigate(from, { replace: true });
          }).catch((error) => {
            // An error occurred
            // ...
          });
    }

  return (
    <div className="h-screen flex items-center justify-center">
    {/* Hero with form */}
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold">Update Your Profile</h3>
            <div className="form-control">
                <label className="label">
                <span className="label-text">Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered"
                    {...register("Name")}
                    required
                />
            </div>
            <div className="form-control">
                <label className="label">
                <span className="label-text">Upload Photo</span>
                </label>
                <input
                    type="text"
                    placeholder="photoURL"
                    className="input input-bordered"
                    {...register("photoURL")}
                    required
                />
                
                {/* daisyUI - File input */}
                {/* <input type="file" className="file-input w-full max-w-xs" /> */}
            </div>
            <div className="form-control mt-6">
                <button className="btn bg-green text-white">Update Profile</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
