"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoginButton from "../component/loginButton";
import Script from "next/script";
// Import React Icons
import { FaFlask, FaFlag, FaUsers, FaTrophy } from "react-icons/fa";

export default function Login() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).particlesJS) {
      (window as any).particlesJS("particles-js", {
        particles: {
          number: { value: 80 },
          color: { value: "#ffffff" },
          opacity: { value: 0.5 },
          size: { value: 3 },
          line_linked: { enable: true, color: "#ffffff", opacity: 0.2 },
        },
      });
    }
  }, []);

  const [showTopButton, setShowTopButton] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageIndex_admin, setCurrentImageIndex_admin] = useState(0);

  const tabs = [
    {
      src: "/homepage.png",
      alt: "Homepage Preview",
      title: "Homepage Dashboard",
      label: "Part 1",
      description: "Homepage Information",
    },
    {
      src: "/question.png",
      alt: "Question Preview",
      title: "Question System",
      label: "Part 2",
      description: "Question Information",
    },
    {
      src: "/Leader.png",
      alt: "Leaderboard Preview",
      title: "Leaderboard System",
      label: "Part 3",
      description: "Leaderboard Information",
    },
    {
      src: "/tour.png",
      alt: "Tournament List Preview",
      title: "Tournament List",
      label: "Part 4",
      description: "Tournament List Information",
    },
    {
      src: "/Tour_joined.png",
      alt: "Tournament Joined Preview",
      title: "Tournament Details",
      label: "Part 5",
      description: "Tournament Details Information",
    },
  ];

  const tabs_admin = [
    {
      src: "/Create_question.png",
      alt: "Create Question Preview",
      title: "Create Question",
      label: "Part 1",
      description: "Create Question Information",
    },
    {
      src: "/Create_tour.png",
      alt: "Create Tournament Preview",
      title: "Create Tournament",
      label: "Part 2",
      description: "Create Tournament Information",
    },
    {
      src: "/Create_question_in_tour.png",
      alt: " Preview",
      title: "Create Question in Tournament",
      label: "Part 3",
      description: "Create Question in Tournament Information",
    },
    {
      src: "/Change_role.png",
      alt: "Change_role Preview",
      title: "Change Role",
      label: "Part 4",
      description: "Change Role Information",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed flex mr-4 top-4 right-4 z-50 transition-all duration-300 ${
          showTopButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        {/* <Image
          src="/logo-login.svg"
          alt="FlagConquest logo"
          width={50}
          height={50}
          className=" object-cover"
        /> */}
        <LoginButton />
      </div>

      <Script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" />
      <style jsx global>{`
        body {
          cursor: url("https://cdn.custom-cursor.com/db/5301/32/cyberpunk-2077-logo-pointer.png"),
            auto;
        }
        #particles-js {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
      `}</style>
      <div id="particles-js" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Hero Section */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-5xl mb-4 text-red-500 tracking-wider">
            Welcome to FlagConquest
          </h1>
          <p className="text-xl mb-6 text-green-400">
            Test your hacking skills and conquer the cybersecurity battlefield
          </p>
        </div>
        {/* Login Card - Remove LoginButton from here */}
        <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-96 text-center backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-login.svg"
              alt="FlagConquest logo"
              width={50}
              height={50}
              className="w-48 h-48 object-cover"
            />
          </div>
          <LoginButton />
          <p className="text-green-400 text-sm mt-3">Login via CMU entra ID</p>
        </div>

        {/* Features Section */}
        <div className="flex justify-center flex-wrap gap-8 py-16 w-full">
          <div className="max-w-xs p-8 bg-white bg-opacity-10 rounded-xl text-center shadow-lg">
            <FaFlask className="w-20 h-20 mb-4 mx-auto text-green-400" />
            <h2 className="text-2xl mb-2 text-red-500">Interactive Labs</h2>
            <p className="text-lg text-green-400">
              Practice real-world hacking challenges.
            </p>
          </div>
          <div className="max-w-xs p-8 bg-white bg-opacity-10 rounded-xl text-center shadow-lg">
            <FaFlag className="w-20 h-20 mb-4 mx-auto text-green-400" />
            <h2 className="text-2xl mb-2 text-red-500">CTF Competitions</h2>
            <p className="text-lg text-green-400">
              Compete in Capture The Flag challenges.
            </p>
          </div>
          <div className="max-w-xs p-8 bg-white bg-opacity-10 rounded-xl text-center shadow-lg">
            <FaUsers className="w-20 h-20 mb-4 mx-auto text-green-400" />
            <h2 className="text-2xl mb-2 text-red-500">
              Community & Leaderboards
            </h2>
            <p className="text-lg text-green-400">
              Join a network of cybersecurity enthusiasts.
            </p>
          </div>
          <div className="max-w-xs p-8 bg-white bg-opacity-10 rounded-xl text-center shadow-lg">
            <FaTrophy className="w-20 h-20 mb-4 mx-auto text-green-400" />
            <h2 className="text-2xl mb-2 text-red-500">Tournament</h2>
            <p className="text-lg text-green-400">
              Have tournament to join. More fun and more challenge to play.
            </p>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 mb-16">
          <div className="flex gap-8">
            {/* Tab Navigation */}
            <div className="w-64 flex flex-col gap-2 mt-20">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`p-4 text-left rounded-lg transition-all duration-300 ${
                    currentImageIndex === index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <div className="font-bold">{tab.label}</div>
                  <div className="text-sm opacity-80">{tab.description}</div>
                </button>
              ))}
            </div>

            {/* Image Display */}
            <div className="flex-1">
              <h2 className="text-3xl text-center text-red-500 mb-8">
                Platform User Preview
              </h2>
              <div className="transform transition-transform duration-300">
                <Image
                  src={tabs[currentImageIndex].src}
                  alt={tabs[currentImageIndex].alt}
                  width={1200}
                  height={675}
                  className="rounded-lg shadow-lg w-full h-auto border-2 border-green-400"
                />
                <p className="text-center text-green-400 mt-2">
                  {tabs[currentImageIndex].title}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 mb-16">
          <div className="flex gap-8">
            {/* Tab Navigation */}

            {/* Image Display */}
            <div className="flex-1">
              <h2 className="text-3xl text-center text-red-500 mb-8">
                Platform Admin Preview
              </h2>
              <div className="transform transition-transform duration-300">
                <Image
                  src={tabs_admin[currentImageIndex_admin].src}
                  alt={tabs_admin[currentImageIndex_admin].alt}
                  width={1200}
                  height={675}
                  className="rounded-lg shadow-lg w-full h-auto border-2 border-green-400"
                />
                <p className="text-center text-green-400 mt-2">
                  {tabs_admin[currentImageIndex_admin].title}
                </p>
              </div>
            </div>
            <div className="w-64 flex flex-col gap-2 mt-20">
              {tabs_admin.map((tab_admin, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex_admin(index)}
                  className={`p-4 text-left rounded-lg transition-all duration-300 ${
                    currentImageIndex_admin === index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <div className="font-bold">{tab_admin.label}</div>
                  <div className="text-sm opacity-80">
                    {tab_admin.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-4 text-center w-full bg-gray-900">
          <p className="text-white">
            © {new Date().getFullYear()} FlagConquest | Follow us on{" "}
            <a href="https://www.cpe.eng.cmu.ac.th/" className="text-green-400">
              CPE CMU
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
