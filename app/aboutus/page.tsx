"use client";
import React from "react";
import Navbar from "../component/Navbar/navbar";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const students = [
  {
    name: "Sirawich Pintana",
    studentCode: "640612099",
    faculty: "Faculty of Engineering",
    image: "/fifa.png",
    github: "https://github.com/ILikeMonday",
    linkedin: "https://www.linkedin.com/in/sirawich-pintana-3733a1294/",
  },
  {
    name: "Praschaya Kornnittisarat ",
    studentCode: "640610649",
    faculty: "Faculty of Engineering",
    image: "/ryuta.png",
    github: "https://github.com/Nanashikung",
    linkedin: "https://www.linkedin.com/in/praschaya-kornnittisarat/",
  },
  {
    name: "Phanuwat Ngoenthok",
    studentCode: "640610659",
    faculty: "Faculty of Engineering",
    image: "/nu.png",
    github: "https://github.com/nunu111",
    linkedin: "https://www.linkedin.com/in/phanuwat1/",
  },
  {
    name: "Pasakorn Sintao",
    studentCode: "640610658",
    faculty: "Faculty of Engineering",
    image: "/auto.png",
    github: "https://github.com/HiM4278",
    linkedin: "https://www.linkedin.com/in/pasakorn-sintao-ba06b326a/",
  },
];

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-6 py-12 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-500">
          About Us
        </h1>

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
                <h2 className="text-xl font-bold text-gray-300">
                  {student.name}
                </h2>
                <p className="text-green-400">
                  <span className="font-bold">Student code:</span>{" "}
                  {student.studentCode}
                </p>
                <p className="text-green-400">
                  <span className="font-bold">Faculty:</span> {student.faculty}
                </p>
                {/* Social Links */}
                <div className="flex items-center space-x-4">
                  {student.github && (
                    <a
                      href={student.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-500"
                    >
                      <FaGithub size={20} />
                      GitHub
                    </a>
                  )}
                  {student.linkedin && (
                    <a
                      href={student.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-500"
                    >
                      <FaLinkedin size={20} />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Copyright */}
      <footer className="py-4 text-center w-full bg-gray-900">
        <p className="text-white">
          © {new Date().getFullYear()} FlagConquest | Follow us on{" "}
          <a href="https://www.cpe.eng.cmu.ac.th/" className="text-green-400">
            CPE CMU
          </a>
        </p>
      </footer>
    </div>
  );
}
