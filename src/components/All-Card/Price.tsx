import React from 'react';
import PriceUpCard from '../All-Card-data/PriceUpCard';
import PriceLow from '../All-Card-data/PriceLow';

export interface CardType {
    id: number;
    nameBn: string;
    slug: string;
    today: number;
    unit: string;
    yesterday: number;
    image: string;
    change: {
        pct: number
    }
}

const PriceUp = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products"
    );
    const products: CardType[] = await res.json();
    const priceUp = products
        .filter((product) => product.today > product.yesterday)
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);


    const priceLow = products
        .filter((product) => product.today > product.yesterday)
        .sort((a, b) => b.change.pct + a.change.pct)
        .slice(0, 6);

    // const priceLow = products.filter(
    //     (product) => product.today < product.yesterday
    // );
    return (
        <div>
            <div>
                <h2 className="card-title mb-4">🔺 আজ দাম বেড়েছে</h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {priceUp.slice(0, 6).map((product) => (
                        <PriceUpCard key={product.id} data={product}></PriceUpCard>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="card-title mt-10 mb-3">🟢 আজ দাম কমেছে</h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {priceLow.map((product) => (
                        <PriceLow key={product.id} main={product}></PriceLow>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PriceUp;