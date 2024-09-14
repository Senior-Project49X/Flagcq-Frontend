import Image from "next/image";
import Navbar from "./navbar";
import Category from "./category";
import Difficult from "./difficult";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Category />
      <Difficult />
    </div>
  );
}
