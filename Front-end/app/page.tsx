import Image from "next/image";
import Navbar from "./navbar";
import Category from "./category";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Category />
    </div>
  );
}
