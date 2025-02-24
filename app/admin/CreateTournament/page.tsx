"use client";
import { PostCreateTour } from "../../lib/API/PostCreateTour";
import { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/navbar";
import LoadingPopup from "../../component/LoadingPopup";
import { EditTourAPI, GetTournamentByID } from "@/app/lib/API/EditTour";
import { useSearchParams } from "next/navigation";

import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@/app/component/RichTextEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
interface CreateTourState {
  topic: string;
  description: string;
  enroll_startDate: string;
  enroll_endDate: string;
  event_startDate: string;
  event_endDate: string;
  mode: string;
  teamSizeLimit: number;
  limit: number;
  joinCode: string;
  tournament_id: number | null | undefined;
}

export default function CreateTour() {
  const searchParams = useSearchParams();
  const tournament_id = searchParams.get("TournamentID")
    ? Number(searchParams.get("TournamentID"))
    : null;
  const [CreateTourData, setCreateTourData] = useState<CreateTourState>({
    topic: "",
    description: "",
    enroll_startDate: "",
    enroll_endDate: "",
    event_startDate: "",
    event_endDate: "",
    mode: "Public",
    teamSizeLimit: 0,
    limit: 0,
    joinCode: "",
    tournament_id,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateTourData((prevData) => ({ ...prevData, [name]: value }));
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  // Modify your handleSubmit function in CreateTour:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
      ...CreateTourData,
      enroll_startDate: new Date(
        new Date(CreateTourData.enroll_startDate).getTime() - 7 * 60 * 60 * 1000
      ).toISOString(),
      enroll_endDate: new Date(
        new Date(CreateTourData.enroll_endDate).getTime() - 7 * 60 * 60 * 1000
      ).toISOString(),
      event_startDate: new Date(
        new Date(CreateTourData.event_startDate).getTime() - 7 * 60 * 60 * 1000
      ).toISOString(),
      event_endDate: new Date(
        new Date(CreateTourData.event_endDate).getTime() - 7 * 60 * 60 * 1000
      ).toISOString(),
    };

    const errors: Record<string, boolean> = {};

    try {
      if (tournament_id !== undefined && tournament_id !== null) {
        if (formattedData.enroll_startDate >= formattedData.enroll_endDate) {
          errors.enroll_startDate = true;
          errors.enroll_endDate = true;
          setMessage("Enroll start date must be before Enroll end date.");
          setIsFailed(true);
        } else if (
          formattedData.enroll_endDate >= formattedData.event_endDate
        ) {
          errors.enroll_endDate = true;
          errors.event_endDate = true;
          setMessage("Enroll end date must be before Event end date.");
          setIsFailed(true);
        } else if (
          formattedData.event_startDate >= formattedData.event_endDate
        ) {
          errors.event_startDate = true;
          errors.event_endDate = true;
          setMessage("Event start date must be before Event end date.");
          setIsFailed(true);
        }
        await EditTourAPI(formattedData, {
          setIsFailed,
          setMessage,
          setIsSuccess,
        });
      } else {
        await PostCreateTour(formattedData, {
          setIsFailed,
          setMessage,
          setIsSuccess,
        });
      }
    } catch (error: any) {
      console.error("Error creating tournament:", error);
      setIsFailed(true);
      setMessage(error.message || "An unexpected error occurred.");
    }
    setLoading(true);
  };

  // Add this useEffect to handle state resets
  useEffect(() => {
    if (!loading) {
      setMessage("");
      setIsFailed(false);
      setIsSuccess(false);
    }
  }, [loading]);

  function formatToLocalDateTime(utcDateString: string): string {
    // Create a date object from the UTC string
    const date = new Date(utcDateString);

    // Add 7 hours to convert to UTC+7
    const utc7Date = new Date(date.getTime() + 7 * 60 * 60 * 1000);

    // Format to YYYY-MM-DDThh:mm (format required by datetime-local input)
    return utc7Date.toISOString().slice(0, 16);
  }

  useEffect(() => {
    if (!tournament_id) return;
    const fetchTournamentData = async () => {
      try {
        const getTournament = await GetTournamentByID(tournament_id);
        if (!getTournament) return;

        setCreateTourData((prevData) => ({
          ...prevData,
          topic: getTournament.name,
          description: getTournament.description,
          enroll_startDate: formatToLocalDateTime(
            getTournament.enroll_startDate
          ),
          enroll_endDate: formatToLocalDateTime(getTournament.enroll_endDate),
          event_startDate: formatToLocalDateTime(getTournament.event_startDate),
          event_endDate: formatToLocalDateTime(getTournament.event_endDate),
          mode: getTournament.mode,
          teamSizeLimit: getTournament.teamSizeLimit,
          limit: getTournament.teamLimit,
        }));
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };

    fetchTournamentData();
  }, [tournament_id]);

  const getInputClass = (field: string) =>
    `w-full p-2 rounded ${
      fieldErrors[field]
        ? "border-2 border-red-600"
        : "border-2 border-gray-300"
    }`;

  const handleDescriptionChange = (value: string) => {
    setCreateTourData((prevData) => ({ ...prevData, description: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCreateTourData((prevData) => ({ ...prevData, [name]: Number(value) }));
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: false })); // Clear error on change
  };

  const handleIChange = (mode: string) => {
    setCreateTourData((prev) => ({ ...prev, mode }));
  };

  return (
    <div className="min-h-screen  text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-400 drop-shadow-lg">
          Create Tournament
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700"
        >
          {/* Topic */}
          <div className="mb-6">
            <label
              htmlFor="topic"
              className="block text-lg font-medium mb-2 text-green-400"
            >
              Tournament Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={CreateTourData.topic}
              onChange={handleInputChange}
              className={`${getInputClass(
                "topic"
              )} bg-gray-700 text-white border-gray-600 focus:border-green-400 focus:ring-green-400 rounded-lg`}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium mb-2 text-green-400"
            >
              Description
            </label>
            <div className="bg-gray-700 rounded-lg overflow-hidden">
              <RichTextEditor
                value={CreateTourData.description}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>

          {/* Mode */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-3 text-green-400">
              Mode
            </label>
            <div className="flex space-x-4">
              {["Public", "Private"].map((option) => (
                <button
                  key={option}
                  type="button"
                  value={CreateTourData.mode}
                  onClick={() => handleIChange(option)}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 ${
                    CreateTourData.mode === option
                      ? "bg-green-500 shadow-lg"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Team Limits Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Team Size Limit */}
            <div>
              <label
                htmlFor="teamSizeLimit"
                className="block text-lg font-medium mb-2 text-green-400"
              >
                Participants per team
              </label>
              <select
                id="teamSizeLimit"
                name="teamSizeLimit"
                value={CreateTourData.teamSizeLimit || ""}
                onChange={handleNumberChange}
                className={`${getInputClass(
                  "teamSizeLimit"
                )} bg-gray-700 text-white border-gray-600 focus:border-green-400 focus:ring-green-400 rounded-lg`}
                required
              >
                <option value="" disabled>
                  Select number (1-4)
                </option>
                {[1, 2, 3, 4].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Team Limit */}
            <div>
              <label
                htmlFor="limit"
                className="block text-lg font-medium mb-2 text-green-400"
              >
                Total teams limit
              </label>
              <input
                type="number"
                id="limit"
                name="limit"
                value={CreateTourData.limit || ""}
                onChange={handleInputChange}
                className={`${getInputClass(
                  "limit"
                )} bg-gray-700 text-white border-gray-600 focus:border-green-400 focus:ring-green-400 rounded-lg`}
                min="1"
                max="120"
                placeholder="Enter number (1-120)"
                required
              />
            </div>
          </div>

          {/* Date Sections */}
          <div className="space-y-6">
            {/* Enrollment Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <label
                  htmlFor="enroll_startDate"
                  className="block text-lg font-medium mb-2 text-green-400"
                >
                  Enrollment Start
                </label>
                <input
                  type="datetime-local"
                  id="enroll_startDate"
                  name="enroll_startDate"
                  value={CreateTourData.enroll_startDate}
                  onChange={handleInputChange}
                  className={`${getInputClass(
                    "enroll_startDate"
                  )} bg-gray-700 text-white border-gray-600 focus:border-green-400 focus:ring-green-400 rounded-lg mr-6 `}
                  required
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="enroll_endDate"
                  className="block text-lg font-medium mb-2 text-green-400"
                >
                  Enrollment End
                </label>
                <input
                  type="datetime-local"
                  id="enroll_endDate"
                  name="enroll_endDate"
                  value={CreateTourData.enroll_endDate}
                  onChange={handleInputChange}
                  className={`${getInputClass(
                    "enroll_endDate"
                  )} bg-gray-700 text-white border-gray-600 focus:border-green-400 focus:ring-green-400 rounded-lg`}
                  required
                />
              </div>
            </div>

            {/* Event Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <label
                  htmlFor="event_startDate"
                  className="block text-lg font-medium mb-2 text-green-400"
                >
                  Event Start
                </label>
                <input
                  type="datetime-local"
                  id="event_startDate"
                  name="event_startDate"
                  value={CreateTourData.event_startDate}
                  onChange={handleInputChange}
                  className={`${getInputClass(
                    "event_startDate"
                  )} bg-gray-700 text-white border-gray-600 focus:border-green-400 focus:ring-green-400 rounded-lg`}
                  required
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="event_endDate"
                  className="block text-lg font-medium mb-2 text-green-400"
                >
                  Event End
                </label>
                <input
                  type="datetime-local"
                  id="event_endDate"
                  name="event_endDate"
                  value={CreateTourData.event_endDate}
                  onChange={handleInputChange}
                  className={`${getInputClass(
                    "event_endDate"
                  )} bg-gray-700 text-white border-gray-600 focus:border-green-400 focus:ring-green-400 rounded-lg`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 rounded-lg font-bold text-lg mt-8 transition-all duration-300 transform hover:scale-105 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white shadow-lg"
            }`}
          >
            {loading ? "Creating Tournament..." : "Create Tournament"}
          </button>
        </form>
        {loading && (
          <LoadingPopup
            setLoading={setLoading}
            isFailed={isFailed}
            isSuccess={isSuccess}
            Message={message}
          />
        )}
      </div>
    </div>
  );
}
