"use client";
import React from "react";
import Navbar from "../component/Navbar/navbar";
import Image from "next/image";
import { LinkedIn } from "@mui/icons-material";

const professor = {
  name: "อาจารย์ เอะ",
  title: "Professor of Computer Engineering",
  faculty: "Faculty of Engineering",
  image: "/profile_professor.jpg",
};

const students = [
  {
    name: "สิรวิชญ์ ปินตานา",
    studentCode: "640612099",
    faculty: "Faculty of Engineering",
    image: "/profile_fifa.jpg",
    LinkedIn: "https://www.linkedin.com/in/sirawich-pintana-3733a1294/",
  },
  {
    name: "ปราชญ์ชยา กรณิศทิศารัศม์",
    studentCode: "640610649",
    faculty: "Faculty of Engineering",
    image: "/profile_ariya.jpg",
    LinkedIn: "https://www.linkedin.com/in/praschaya-kornnittisarat/",
  },
  {
    name: "ภาณุวัฒน์ เงินท๊อก",
    studentCode: "640610659",
    faculty: "Faculty of Engineering",
    image: "/profile_nattawut.jpg",
    LinkedIn: "https://www.linkedin.com/in/phanuwat1/",
  },
  {
    name: "ภัสกรณ์ สินเธาว์",
    studentCode: "640610658",
    faculty: "Faculty of Engineering",
    image: "/profile_preeya.jpg",
    LinkedIn: "https://www.linkedin.com/in/pasakorn-sintao-ba06b326a/",
  },
];

export default function Profile() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          About Us
        </h1>

        {/* Professor Card */}
        <div className="bg-white rounded-lg p-10 shadow-xl flex items-center space-x-10 mb-10 w-full max-w-4xl mx-auto">
          <div className="w-48 h-48 flex-shrink-0">
            <Image
              src={professor.image}
              alt={professor.name}
              width={500}
              height={500}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">{professor.name}</h2>
            <p className="text-gray-600 font-semibold">{professor.title}</p>
            <p className="text-gray-600">
              <span className="font-bold">Faculty:</span> {professor.faculty}
            </p>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {students.map((student, index) => (
            <div
              key={index}
              className="bg-gray-800 border-2 border-green-500 rounded-lg p-8 shadow-lg flex items-center space-x-8"
            >
              <div className="w-32 h-32 flex-shrink-0">
                <Image
                  src={student.image}
                  alt={student.name}
                  width={500}
                  height={500}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-red-500">
                  {student.name}
                </h2>
                <p className="text-green-400">
                  <span className="font-bold">Student code:</span>{" "}
                  {student.studentCode}
                </p>
                <p className="text-green-400">
                  <span className="font-bold">Faculty:</span> {student.faculty}
                </p>
                <p className="text-green-400">
                  <span className="font-bold">LinkedIn:</span>{" "}
                  <a
                    href={student.LinkedIn}
                    className="text-blue-600 underline"
                  >
                    {student.LinkedIn}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
