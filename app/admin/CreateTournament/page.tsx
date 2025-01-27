"use client";
import { PostCreateTour } from "../../lib/API/PostCreateTour";
import { useState } from "react";
import Navbar from "../../component/navbar";
import { formatDynamicAPIAccesses } from "next/dist/server/app-render/dynamic-rendering";

interface CreateTourState {
  topic: string;
  description: string;
  enroll_startDate: string;
  enroll_endDate: string;
  event_startDate: string;
  event_endDate: string;
}

export default function CreateTour() {
  const [CreateTourData, setCreateTourData] = useState<CreateTourState>({
    topic: "",
    description: "",
    enroll_startDate: "",
    enroll_endDate: "",
    event_startDate: "",
    event_endDate: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateTourData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert date strings to fully qualified ISO 8601 with timezone 'Z'
    const formattedData = {
      ...CreateTourData,
      enroll_startDate: new Date(CreateTourData.enroll_startDate).toISOString(),
      enroll_endDate: new Date(CreateTourData.enroll_endDate).toISOString(),
      event_startDate: new Date(CreateTourData.event_startDate).toISOString(),
      event_endDate: new Date(CreateTourData.event_endDate).toISOString(),
    };

    try {
      setIsLoading(true);
      setSuccessMessage(null);
      await PostCreateTour(formattedData);
      if (
        formattedData.enroll_startDate < formattedData.enroll_endDate &&
        formattedData.event_startDate < formattedData.event_endDate &&
        formattedData.enroll_endDate < formattedData.event_startDate &&
        formattedData.event_endDate < formattedData.enroll_startDate
      ) {
        setSuccessMessage("Tournament created successfully!");
      } else {
        setSuccessMessage("Invalid Date");
      }
    } catch (error) {
      console.error("Error creating tournament:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090147] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Tournament
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-lg shadow-md text-black"
        >
          {/* Topic */}
          <div className="mb-4">
            <label htmlFor="topic" className="block font-medium mb-2">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={CreateTourData.topic}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={CreateTourData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Enrollment Start Date */}
          <div className="mb-4">
            <label
              htmlFor="enroll_startDate"
              className="block font-medium mb-2"
            >
              Enroll Start Date
            </label>
            <input
              type="datetime-local"
              id="enroll_startDate"
              name="enroll_startDate"
              value={CreateTourData.enroll_startDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Enrollment End Date */}
          <div className="mb-4">
            <label htmlFor="enroll_endDate" className="block font-medium mb-2">
              Enroll End Date
            </label>
            <input
              type="datetime-local"
              id="enroll_endDate"
              name="enroll_endDate"
              value={CreateTourData.enroll_endDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Event Start Date */}
          <div className="mb-4">
            <label htmlFor="event_startDate" className="block font-medium mb-2">
              Event Start Date
            </label>
            <input
              type="datetime-local"
              id="event_startDate"
              name="event_startDate"
              value={CreateTourData.event_startDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Event End Date */}
          <div className="mb-4">
            <label htmlFor="event_endDate" className="block font-medium mb-2">
              Event End Date
            </label>
            <input
              type="datetime-local"
              id="event_endDate"
              name="event_endDate"
              value={CreateTourData.event_endDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-2 rounded font-bold ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {isLoading ? "Submitting..." : "Confirm"}
          </button>
        </form>
        {successMessage && (
          <div className="mt-4 p-2 text-center bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}
