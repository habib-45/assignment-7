import MarqueeText from "react-marquee-text"
import "react-marquee-text"

interface prodactTYpe {
    id: number,
    image: string,
    nameBn: string,
    today: number,
    change: {
        pct: number
    }
}

const Marquee = async () => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products')
    const marqueeData = await res.json()

    // console.log(headlines)
    return (
        <div className="bg-yellow-50 text-black items-center px-5">

            <div className="flex max-w-7xl mx-auto">

                <MarqueeText direction="right" duration={10} className="py-2">

                    {marqueeData.map((ma:prodactTYpe) => <span key={ma.id}>
                        <span>{ma.image}</span>
                        <span> {ma.nameBn}</span>
                        <span> {ma.today.toLocaleString("bn-BD")} টাকা/কেজি</span>
                        <span> {ma.change.pct.toLocaleString("bn-BD")} %</span>
                        <span className='mx-5'>󠁯•󠁏</span>
                    </span>
                    )}
                </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;