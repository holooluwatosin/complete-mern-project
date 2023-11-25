import React, { Component, useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from '../../components/Cards';

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        >
            NEXT
        </div>
    );
};
  
const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        >
            BACK
        </div>
    );
};

const SpecialDishes = () => {
    const [recipes, setRecipes] = useState([]);
    const slider = React.useRef(null);

    useEffect(() => {
        fetch("/menu.json")
        .then(res => res.json())
        .then(data => {
            console.log('data', data);
            const specials = data.filter((item) => {
                return item.category === "popular";
            })
            console.log('specials', specials);
            setRecipes(specials)
        })
    }, [])

    // slideToScroll value shows the number of elements it should withhold whilst sliding 
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],

        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    }
  return (
    <div className='section-container my-20 relative'>
        <div className='text-left'>
            <p className='subtitle'>Special Dishes</p>
            <h2 className='title md:w-[520px]'>Standout Dishes From Our Menu</h2>
        </div>

        {/* <div className=''> */}
        <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
            <button 
                onClick={() => slider?.current?.slickPrev()}
                className=" btn p-2 rounded-full ml-5"
            >
                <FaAngleLeft className="h-8 w-8 p-1"/>
            </button>
            <button
                onClick={() => slider?.current?.slickNext()}
                className="bg-green btn p-2 rounded-full ml-5"
            >
                <FaAngleRight className="h-8 w-8 p-1"/>
            </button>
        </div>

        {/* Slider (instakked from react-slick.neostack.com)*/}
        <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
            {
                recipes.map((item, i) => (
                    <Cards key={i} item={item} />
                ))
            }
        </Slider>
    </div>
  )
}

export default SpecialDishes