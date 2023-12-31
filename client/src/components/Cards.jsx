import React, { useContext, useState } from 'react';
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Swal from 'sweetalert2'

const Cards = ({item}) => {
    const { name, recipe, image, price, _id } = item;
    const  [isHeartFilled, setIsHeartFilled] = useState(false);
    const {user} = useContext(AuthContext);
    // console.log("User", user);

    const navigate = useNavigate();
    const location = useLocation();

    const handleHeartclick = () => {
        setIsHeartFilled(!isHeartFilled);
    }

    const handleAddToCart = (item) => {
        // console.log("btn is clicked", item);
        if(user && user?.email){
            const cartItem = { menuItem: _id, name, quantity: 1, image, price, email: user.email }
            // console.log("Cart items", cartItem);

            fetch('http://localhost:6001/cart', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if(data.insertedId){
                    // sweetalert2; A custom positioned dialog
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }) 
        } else {
            Swal.fire({
                title: "Please Login",
                text: "You have to login to make an order",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
              }).then((result) => {
                if (result.isConfirmed) {
                //   Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                //   });
                    navigate('/signin', {state:{from: location}})
                }
              });
        }

    }

  return (
    <div>
        <div className="card w-76 bg-base-100 shadow-xl relative">
        {/* <div className="card w-96 bg-base-100 shadow-xl relative"> */}
            <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"}`} onClick={handleHeartclick}>
                <FaHeart className='h-5 w-5 cursor-pointer'/>
            </div>
            <Link to={`/menu/${item._id}`}>
                <figure>
                    <img src={item.image} alt="" className='hover:scale-105 transition-all duration-200 md:h-72' />
                </figure>
            </Link>
            <div className="card-body">
                <Link to={`/menu/${item._id}`}>
                    <h2 className="card-title">
                        {item.name}
                    </h2>
                </Link>
                <p>Description of the item</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className='font-semibold'>
                        <span className='text-sm text-red'>&#163;</span>
                        {item.price}
                    </h5>
                    <button onClick={() => {handleAddToCart(item)}} className="btn bg-green text-white">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cards