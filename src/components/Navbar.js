import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='bg-[#E7DECC] h-12 w-full'>
        <div className='h-full w-11/12 mx-auto flex justify-between'>
            {/* logo */}
            <Link to="/" className='h-full font-semibold text-xl flex items-center '>
                OnlineMovieBooking
            </Link>

            {/* middle */}
            <div className='flex gap-4'>
                <Link to="/"
                    className='flex items-center h-full'
                >
                    Upcoming Movies
                </Link>
                <Link to="/"
                    className='flex items-center h-full'
                >
                    Current Movies
                </Link>
            </div>

            {/* end */}
            <div className='flex gap-4'>
                <Link to="/signup"
                    className='flex items-center h-full'
                >
                    Sign Up
                </Link>

                <Link to="/signup"
                    className='flex items-center h-full'
                >
                    Log In
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar