import Link from "next/link";
import CampyLogo from "../../public/favicon.ico";

export default function Logo() {
  return <img className="w-8 h-8" src={CampyLogo.src} alt="Campy Logo" />;
}
