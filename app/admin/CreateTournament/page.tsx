"use client";
import { PostCreateTour } from "../../lib/API/PostCreateTour";
import { useState } from "react";
import Navbar from "../../component/navbar";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateTourData((prevData) => ({ ...prevData, [name]: value }));
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: false })); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset messages and errors
    setSuccessMessage(null);
    setErrorMessage(null);
    setFieldErrors({});

    const formattedData = {
      ...CreateTourData,
      enroll_startDate: new Date(CreateTourData.enroll_startDate).toISOString(),
      enroll_endDate: new Date(CreateTourData.enroll_endDate).toISOString(),
      event_startDate: new Date(CreateTourData.event_startDate).toISOString(),
      event_endDate: new Date(CreateTourData.event_endDate).toISOString(),
    };

    const errors: Record<string, boolean> = {};

    // Validation checks
    if (formattedData.enroll_startDate >= formattedData.enroll_endDate) {
      errors.enroll_startDate = true;
      errors.enroll_endDate = true;
      setErrorMessage("Enroll start date must be before Enroll end date.");
    } else if (formattedData.enroll_endDate >= formattedData.event_startDate) {
      errors.enroll_endDate = true;
      errors.event_startDate = true;
      setErrorMessage("Enroll end date must be before Event start date.");
    } else if (formattedData.event_startDate >= formattedData.event_endDate) {
      errors.event_startDate = true;
      errors.event_endDate = true;
      setErrorMessage("Event start date must be before Event end date.");
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Prevent form submission if there are errors
    }

    try {
      setIsLoading(true);
      await PostCreateTour(formattedData);
      setSuccessMessage("Tournament created successfully!");
    } catch (error) {
      console.error("Error creating tournament:", error);
      setErrorMessage("Failed to create the tournament. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClass = (field: string) =>
    `w-full p-2 rounded ${
      fieldErrors[field]
        ? "border-2 border-red-600"
        : "border-2 border-gray-300"
    }`;

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
              className={getInputClass("topic")}
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
              className={getInputClass("description")}
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
              className={getInputClass("enroll_startDate")}
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
              className={getInputClass("enroll_endDate")}
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
              className={getInputClass("event_startDate")}
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
              className={getInputClass("event_endDate")}
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

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 p-2 text-center bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 p-2 text-center bg-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
