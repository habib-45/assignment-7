
interface prodactType {
    id: number;
    nameBn: string;
    slug: string;
    today: number;
    unit: string;
    image: string;
    change: {
        pct: number
    }
}

const allProdact = ({ main }: { main: prodactType }) => {
    // console.log(news);
    console.log("IMAGE:", main.image);
    const unitBangla: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        gram: "গ্রাম",
        piece: "পিস",
        pcs: "পিস",
        dozen: "ডজন",
        pound: "পাউন্ড",
    };

    return (
        <div>
            <div className="card bg-white col-span-2 shadow-sm p-5">
                <div className="flex gap-3">
                    <h2 className="h-13 w-13 bg-emerald-50 mb-4 flex items-center justify-center rounded-2xl">{main.image}</h2>
                    <div>
                        <h2 className="card-title">{main.nameBn}</h2>
                        <p>প্রতি {unitBangla[main.unit.toLowerCase()] || main.unit}</p>
                    </div>
                </div>
                <p>আজকের দাম</p>
                <div className="flex justify-between items-center">
                    <p className="font-bold "><span className="text-2xl">{main.today.toLocaleString("bn-BD")}</span> টাকা</p>
                    
                    <p
                        className={`h-6 min-w-15 px-2 text-center rounded-2xl ${main.change.pct > 0
                                ? "bg-red-50 text-red-500"
                                : main.change.pct < 0
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-gray-100 text-gray-500"
                            }`}
                    >
                        {main.change.pct > 0 ? "▲ " : main.change.pct < 0 ? "▼ " : ""}
                        {Math.abs(main.change.pct).toLocaleString("bn-BD")}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default allProdact;