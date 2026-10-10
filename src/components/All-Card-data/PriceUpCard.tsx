import React from 'react';
import { CardType } from '../All-Card/Price';

interface Typen {
  data: CardType;
}
const unitBangla: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        gram: "গ্রাম",
        piece: "পিস",
        pcs: "পিস",
        dozen: "ডজন",
        pound: "পাউন্ড",
    };
const PriceUpCard = ({ data }:Typen) => {
    return (
        <div>
            <div className="card bg-base-100 col-span-2 shadow-sm p-5 bg-white">
                <div className="flex gap-3">
                    <h2 className="h-13 w-13 bg-emerald-50 mb-4 flex items-center justify-center rounded-2xl">{data.image}</h2>
                    <div>
                        <h2 className="card-title">{data.nameBn}</h2>
                        <p>প্রতি {unitBangla[data.unit.toLowerCase()] || data.unit}</p>
                    </div>
                </div>
                <p>আজকের দাম</p>
                <div className="flex justify-between items-center">
                    <p className="font-bold "><span className="text-2xl">{data.today.toLocaleString("bn-BD")}</span> টাকা</p>
                    
                    <p
                        className={`h-6 min-w-15 px-2 text-center rounded-2xl ${data.change.pct > 0
                                ? "bg-red-50 text-red-500"
                                : data.change.pct < 0
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-gray-100 text-gray-500"
                            }`}
                    >
                        {data.change.pct > 0 ? "▲ " : data.change.pct < 0 ? "▼ " : ""}
                        {Math.abs(data.change.pct).toLocaleString("bn-BD")}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PriceUpCard;