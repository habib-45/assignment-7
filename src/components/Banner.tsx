import Image from 'next/image';
import React from 'react';

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full"
    })
    // console.log(date);
    return (
        <div className='flex justify-between container mx-auto bg-white my-5 p-5 rounded-2xl'>
            <div className='w-160'>
                <h4 className='bg-green-100 w-70 text-gray-500 p-1 text-center rounded-3xl mb-2 font-semibold'>{date}</h4>
                <h2 className='text-2xl font-bold mb-4'>আজকের বাজারের দাম এক নজরে</h2>
                <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                <button className="btn my-6 bg-emerald-500 text-white rounded-xl px-8 shadow-[0_8px_10px_rgba(16,185,129,0.35)]">
                    সব পণ্য দেখুন
                </button>
            </div>
            <div>
                <Image className='' height={300} width={300} src={'/bazar-hero.png'} alt='' />
            </div>
        </div>
    );
};

export default Banner;