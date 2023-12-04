import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider';

const Profile = ({user}) => {
    const { logOut } = useContext(AuthContext);

    // logout
    const handleLogout = () => {
      logOut()
        .then(() => {
          // Sign-out successful.
          alert('logout successful')
        })
        .catch((error) => {
          console.log(error);
        });
    };

  return (
    <div>
        {/* Dropdown button */}
        {/* <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
        </div> */}

        <div className="drawer drawer-end z-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">

                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar">
                    {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar"> */}
                        <div className="w-10 rounded-full">
                            {
                                user.photoURL ? <img alt="Tailwind CSS Navbar component" src={user.photoURL} /> : <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            }
                        </div>
                    {/* </div> */}
                </label>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">

                    {/* Sidebar content here */}
                    <li><a href='/update-profile'>Profile</a></li>
                    <li><a>Order</a></li>
                    <li><a>Settings</a></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Profile