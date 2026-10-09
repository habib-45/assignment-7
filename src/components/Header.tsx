import React from 'react';
import Image from 'next/image';
import Navber from './Navber';

const Header = () => {
    const date = new Date().toLocaleDateString
        ("bn-BD", {
            dateStyle: "full"
        })
    // console.log(date);
    return (
        <div className='container mx-auto'>
            <div className='mt-5 flex justify-between items-center'>
                <div className='flex gap-2'>
                    <Image className='w-13 h-13 bg-emerald-600 p-3 rounded-2xl' height={50} width={50} src={'/logo-icon.png'} alt='' />
                    <div className='flex flex-col'>
                        <h2 className='text-red-500 text-2xl font-bold'>বাজার দর</h2>
                        <p>{date}</p>
                    </div>
                </div>
                <div className='right-4 flex'>
                    <button className="btn btn-ghost">সাইন ইন</button>
                    <button className="btn bg-emerald-600 text-amber-50">সাইন আপ</button>
                </div>
            </div>


            <Navber></Navber>
        </div>
    );
};

export default Header;