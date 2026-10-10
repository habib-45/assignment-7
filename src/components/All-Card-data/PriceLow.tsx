import { CardType } from "../All-Card/Price";

interface TypeL {
  main: CardType;
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

const PriceLow = ({ main }: TypeL) => {
  const isDown = main.change.pct < 0;
  const isUp = main.change.pct > 0;

  return (
    <div>
      <div className="card bg-base-100 col-span-2 shadow-sm p-5 bg-white">
        <div className="flex gap-3">
          <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
            {main.image}
          </div>

          <div>
            <h2 className="card-title">{main.nameBn}</h2>
            <p>
              প্রতি {unitBangla[main.unit.toLowerCase()] ?? main.unit}
            </p>
          </div>
        </div>

        <p>আজকের দাম</p>

        <div className="flex items-center justify-between gap-3">
          <p className="font-bold">
            <span className="text-2xl">
              {main.today.toLocaleString("bn-BD")}
            </span>{" "}
            টাকা
          </p>

          <p
            className={`min-w-15 rounded-2xl px-2 text-center ${isUp
                ? "bg-red-50  text-emerald-600"
                : isDown
                  ? "bg-emerald-50 text-red-500"
                  : "bg-gray-100 text-gray-500"
              }`}
          >
            {isUp ? "▲ " : isDown ? "▼ " : ""}
            {Math.abs(main.change.pct).toLocaleString("bn-BD")}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceLow;