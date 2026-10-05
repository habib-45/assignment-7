import React from 'react';

const Navber = async() => {

    const res =await fetch('https://news-api-v2.vercel.app/api/categories')
    const categoriesData = await res.json()
    console.log(categoriesData)
    return (
        <div>
            <h2></h2>
        </div>
    );
};

export default Navber;