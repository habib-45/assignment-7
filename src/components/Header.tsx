import React from 'react';
import Image from 'next/image';
import Navber from './Navber';

const Header = () => {
    const date = new Date().toLocaleDateString
        ("bn-BD", {
            dateStyle: "full"
        })
    console.log(date);
    return (
        <div className=''>
            <div className='mt-5 flex justify-center items-center relative'>
                <div className='flex justify-center items-center gap-2'>
                    <Image className='w-10 h-10' height={50} width={50} src={'/logo.webp'} alt='' />
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-red-500 text-2xl font-bold'>Bangla News 24</h2>
                        <p>{date}</p>
                    </div>
                </div>
                <div className='absolute right-4 flex'>
                    <button className="btn btn-ghost">সাইন ইন</button>
                    <button className="btn bg-red-700 text-amber-50">সাইন আপ</button>
                </div>
            </div>


            <Navber></Navber>
        </div>
    );
};

export default Header;