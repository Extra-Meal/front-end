// import img from "../../assets/meal.jfif";
// import type { Area } from "../../types/area.type";
// function AreaCard({ area }: { area: Area }) {
//   return (
//     <div className="area relative w-fit">
//       <div className="box relative w-fit overflow-hidden rounded-3xl">
//         <img src={img} alt={area.name} className="h-70 w-65 rounded-3xl" />
//       </div>
//       <span className="caption text-3xl font-bold">{area.name} Plates</span>
//     </div>
//   );
// }
import ReactCountryFlag from "react-country-flag";

import type { Area } from "../../types/area.type";

const areaToCountryCode: Record<string, string> = {
  japanese: "JP",
  vietnamese: "VN",
  uruguayan: "UY",
  ukrainian: "UA",
  turkish: "TR",
  tunisian: "TN",
  thai: "TH",
  spanish: "ES",
  russian: "RU",
  portuguese: "PT",
  polish: "PL",
  moroccan: "MA",
  mexican: "MX",
  malaysian: "MY",
  kenyan: "KE",
  american: "US",
  jamaican: "JM",
  italian: "IT",
  irish: "IE",
  indian: "IN",
  greek: "GR",
  french: "FR",
  filipino: "PH",
  egyptian: "EG",
  dutch: "NL",
  croatian: "HR",
  chinese: "CN",
  canadian: "CA",
  british: "GB",
};

const AreaCard = ({ area }: { area: Area }) => {
  const normalizedName = area.name?.toLowerCase();
  const countryCode = normalizedName ? areaToCountryCode[normalizedName] : undefined;

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow transition-transform duration-200 hover:scale-105">
      {countryCode && (
        <ReactCountryFlag
          countryCode={countryCode}
          svg
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "0.5rem",
          }}
          title={area.name}
          className="bg-primary/30 rounded-full p-3"
        />
      )}
      <span className="text-lg font-medium text-gray-700">{area.name}</span>
    </div>
  );
};

export default AreaCard;
