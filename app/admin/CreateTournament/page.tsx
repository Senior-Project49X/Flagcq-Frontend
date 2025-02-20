"use client";
import { PostCreateTour } from "../../lib/API/PostCreateTour";
import { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/navbar";
import LoadingPopup from "../../component/LoadingPopup";
import { EditTourAPI, GetTournamentByID } from "@/app/lib/API/EditTour";
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateTourData((prevData) => ({ ...prevData, [name]: value }));
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setFieldErrors({});
    setIsLoading(true);
    setIsFailed(false);
    setIsSuccess(false);
    setPopupMessage("");

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
      setPopupMessage("Enroll start date must be before Enroll end date.");
      setIsFailed(true);
    } else if (formattedData.enroll_endDate >= formattedData.event_endDate) {
      errors.enroll_endDate = true;
      errors.event_endDate = true;
      setPopupMessage("Enroll end date must be before Event end date.");
      setIsFailed(true);
    } else if (formattedData.event_startDate >= formattedData.event_endDate) {
      errors.event_startDate = true;
      errors.event_endDate = true;
      setPopupMessage("Event start date must be before Event end date.");
      setIsFailed(true);
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      if (tournament_id !== null && tournament_id !== undefined) {
        await EditTourAPI(formattedData);
        setIsSuccess(true);
        setPopupMessage("Tournament edited successfully!");
      } else {
        const response = await PostCreateTour(formattedData);

        if (response.success) {
          setIsSuccess(true);
          setPopupMessage("Tournament created successfully!");
        } else {
          setIsFailed(true);
          setPopupMessage(response.message || "Failed to create tournament.");
        }
      }
    } catch (error: any) {
      console.error("Error creating tournament:", error);
      setIsFailed(true);
      setPopupMessage(error.message || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (!tournament_id) return;
    const fetchTournamentData = async () => {
      try {
        const getTournament = await GetTournamentByID(tournament_id);
        if (!getTournament) return;
        console.log("getTournament", getTournament);
        setCreateTourData((prevData) => ({
          ...prevData,
          topic: getTournament.name,
          description: getTournament.description,
          enroll_startDate: getTournament.enroll_startDate
            ? new Date(getTournament.enroll_startDate)
                .toISOString()
                .slice(0, 16)
            : "",
          enroll_endDate: getTournament.enroll_endDate
            ? new Date(getTournament.enroll_endDate).toISOString().slice(0, 16)
            : "",
          event_startDate: getTournament.event_startDate
            ? new Date(getTournament.event_startDate).toISOString().slice(0, 16)
            : "",
          event_endDate: getTournament.event_endDate
            ? new Date(getTournament.event_endDate).toISOString().slice(0, 16)
            : "",
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
    <div className="min-h-screen bg-[#090147] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">
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
            <RichTextEditor
              value={CreateTourData.description}
              onChange={handleDescriptionChange}
            />
          </div>

          {/* Mode */}
          <div className="mb-4 space-x-4">
            <label className=" font-medium mb-2">Mode</label>

            {["Public", "Private"].map((option) => (
              <button
                key={option}
                type="button"
                value={CreateTourData.mode}
                onClick={() => handleIChange(option)}
                className={`px-4 py-2 rounded-md text-white font-medium ${
                  CreateTourData.mode === option
                    ? "bg-green-500"
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mb-4 flex items-center space-x-2">
            {/* Team Size Limit */}
            <div className="w-1/2">
              <label htmlFor="teamSizeLimit" className="block font-medium mb-2">
                Number of partcipants per team
              </label>
              <select
                id="teamSizeLimit"
                name="teamSizeLimit"
                value={CreateTourData.teamSizeLimit || ""}
                onChange={handleNumberChange}
                className={`${getInputClass("teamSizeLimit")} text-gray-400`} // Ensures the text color matches
                required
              >
                <option value="" disabled className="text-gray-400">
                  Select number between 1-4
                </option>
                {[1, 2, 3, 4].map((size) => (
                  <option key={size} value={size} className="text-black">
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Team Limit */}
            <div className="w-1/2">
              <label htmlFor="limit" className="block font-medium mb-2">
                Total teams in tournament (max 120)
              </label>
              <input
                type="number"
                id="limit"
                name="limit"
                value={CreateTourData.limit || ""} // Ensures the placeholder is shown first
                onChange={handleInputChange}
                className={`${getInputClass("limit")} placeholder-gray-400`} // Placeholder color
                min="1"
                max="120"
                placeholder="Select number between 1-120"
                required
              />
            </div>
          </div>

          <div className="mb-4 flex items-center space-x-2">
            <div className="w-1/2">
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

            <span className="text-xl font-bold text-gray-600 mt-7">→</span>

            <div className="w-1/2">
              <label
                htmlFor="enroll_endDate"
                className="block font-medium mb-2"
              >
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
          </div>

          <div className="mb-4 flex items-center space-x-2">
            <div className="w-1/2">
              <label
                htmlFor="event_startDate"
                className="block font-medium mb-2"
              >
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

            <span className="text-xl font-bold text-gray-600 mt-7">→</span>

            <div className="w-1/2">
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-2 rounded font-bold ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isLoading ? "Submitting..." : "Confirm"}
          </button>
        </form>

        {isLoading && (
          <LoadingPopup
            setLoading={setIsLoading}
            isFailed={isFailed}
            isSuccess={isSuccess}
            Message={popupMessage}
          />
        )}
      </div>
    </div>
  );
}
