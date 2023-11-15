import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  async function main() {
    const searchString = "Anabaseios: * (Savage)";
    const searchQuery = `https://xivapi.com/search?string=${encodeURIComponent(
      searchString
    )}&string_algo=wildcard`;

    const response = await fetch(searchQuery);
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.Results.length; i++) {
      console.log(data.Results[i].Nameame);
    }
  }

  main();
}
