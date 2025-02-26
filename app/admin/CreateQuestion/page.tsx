"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Navbar from "../../component/Navbar/navbar";
import {
  CreateQuestionAPI,
  DownloadQuestionsByID,
  EditQuestionAPI,
  GetCategories,
  GetQuestionsByID,
} from "../../lib/API/QuestionAPI";
import CreateCategories from "../component/CreateCategories";
import LoadingPopup from "../../component/LoadingPopup";
import CreateHint from "../../component/CreateHint";
import { isRoleUser } from "../../lib/role";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditCategories from "../component/EditCategories";
import DeleteCategories from "../component/DeleteCategories";
const RichTextEditor = dynamic(() => import("@/app/component/RichTextEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface ButtonStates {
  [key: string]: boolean; // Define a dynamic object where keys are strings and values are boolean
}
interface Category {
  id: string;
  name: string;
}

export default function CreateQuestion() {
  const searchParams = useSearchParams();
  const id = searchParams.get("QuestionID")
    ? Number(searchParams.get("QuestionID"))
    : null;
  const router = useRouter();
  const [modeSelection, setModeSelection] = useState<ButtonStates>({
    Practice: false,
    Tournament: false,
    UnPublic: true,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([] as Category[]);
  const newCategory = false;
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [hints, setHints] = useState<
    { id: string | number | null; detail: string; penalty: number }[]
  >([]);
  const category = "";
  const [difficultysID, setDifficultysID] = useState<string>("");
  const [isCreateCategory, setIsCreateCategory] = useState<boolean>(false);
  const [isEditCategory, setIsEditCategory] = useState<boolean>(false);
  const [isDeleteCategory, setIsDeleteCategory] = useState<boolean>(false);
  const [point, setPoint] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    if (id !== null && id !== undefined) {
      const fetchQuestion = async () => {
        const getQuestion = await GetQuestionsByID(id);
        setTopic(getQuestion.title);
        setPoint(getQuestion.point);
        setSelectedCategory(getQuestion.categories_id);
        setDifficultysID(getQuestion.difficultys_id);
        setHints(
          getQuestion.hints.map((hint: any) => ({
            id: hint.id,
            detail: hint.Description,
            penalty: hint.point,
          }))
        );
        setAnswer(getQuestion.answer);
        handleToggle(getQuestion.mode);
        setDescription(getQuestion.description); // Ensure a valid description
        setFile(getQuestion.file_path);
      };
      fetchQuestion();
    }
  }, [id]);

  //* API new question
  const onCreateQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Check if a category is selected
    if (selectedCategory === "") return;

    // Append the hints JSON to the form
    formData.append("Hints", JSON.stringify(hints));

    formData.append("Practice", modeSelection.Practice.toString());
    formData.append("Tournament", modeSelection.Tournament.toString());
    formData.append("Description", description);
    formData.append(
      "isFileEdited",
      typeof file === "string" ? "false" : "true"
    );

    if (id !== null && id !== undefined) {
      EditQuestionAPI(formData, { setIsFailed, setMessage, setIsSuccess }, id);
    } else {
      CreateQuestionAPI(formData, { setIsFailed, setMessage, setIsSuccess });
    }
    setLoading(true);
    // setFile(null); // Reset file state to avoid InvalidStateError
  };

  const [selectedMode, setSelectedMode] = useState<string>("UnPublic");

  const handleToggle = (buttonKey: string): void => {
    setModeSelection((prevStates) => ({
      Practice: buttonKey === "Practice",
      Tournament: buttonKey === "Tournament",
      UnPublic: buttonKey === "UnPublic",
    }));
    setSelectedMode(buttonKey);
  };

  const getModeMessage = (): JSX.Element => {
    switch (selectedMode) {
      case "Practice":
        return (
          <span>
            This mode will go to{" "}
            <span className="underline">practice pool</span>
          </span>
        );
      case "Tournament":
        return (
          <span>
            This mode will go to{" "}
            <span className="underline">tournament pool</span>
          </span>
        );
      case "UnPublic":
        return (
          <span>
            This mode will <span className="underline">not go to any pool</span>
          </span>
        );
      default:
        return <span></span>;
    }
  };

  const handleHintChange = (index: number, field: string, value: any) => {
    const newHints = [...hints];
    newHints[index] = {
      ...newHints[index],
      [field]: field === "penalty" ? handleCheckNumber(value) : value,
    };
    setHints(newHints);
  };

  const addHint = () => {
    if (hints.length >= 3) return;
    console.log("Before addition:", hints);

    setHints([...hints, { id: null, detail: "", penalty: 0 }]);
    console.log("After addition:", hints);
  };

  const handleCheckNumber = (value: string) => {
    if (value === "0") {
      return value;
    } else if (value === "00") {
      return "0";
    } else {
      value = value.replace(/^0+/, "");
      return value;
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Allow single zero but remove leading zeros for other numbers
    setPoint(handleCheckNumber(value));
  };
  const removeHint = (index: number) => {
    console.log("Before removal:", hints);
    setHints((prevHints) => {
      const newHints = prevHints.filter((_, i) => i !== index);
      console.log("After removal:", newHints);
      return newHints;
    });
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedCategory(value);
    if (value === "New Category") {
      setIsCreateCategory(true);
    } else {
      setIsCreateCategory(false);
    }
  };

  useEffect(() => {
    setMessage("");
    setIsFailed(false);
    setIsSuccess(false);
  }, [loading]);
  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await GetCategories());
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isRoleUser()) {
      router.push("/unauthorized");
    }
  }, [router]);

  return (
    <div className="min-h-screen  text-white">
      {loading && (
        <LoadingPopup
          setLoading={setLoading}
          isFailed={isFailed}
          isSuccess={isSuccess}
          Message={message}
        />
      )}
      {isCreateCategory && (
        <CreateCategories
          onClose={async (Category: string) => {
            setIsCreateCategory(false);
            setCategories(await GetCategories());
            setSelectedCategory(Category);
          }}
        />
      )}
      {isEditCategory && (
        <EditCategories
          id={selectedCategory}
          name={
            categories.find((c: Category) => c.id === selectedCategory)?.name
          }
          onClose={async (CategoryID: string) => {
            setIsEditCategory(false);
            setCategories(await GetCategories());
            setSelectedCategory(CategoryID);
          }}
        />
      )}
      {isDeleteCategory && (
        <DeleteCategories
          id={selectedCategory}
          onClose={async (CategoryID: string) => {
            setIsDeleteCategory(false);
            setCategories(await GetCategories());
            setSelectedCategory(CategoryID);
          }}
        />
      )}
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center text-green-400 drop-shadow-lg">
          Create Question
        </h1>

        <form
          onSubmit={onCreateQuestion}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
        >
          {/* Topic */}
          <div className="mb-4">
            <label
              htmlFor="topic"
              className="block text-base font-medium mb-1 text-green-400"
            >
              Topic
            </label>
            <input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              type="text"
              name="title"
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:border-green-400 focus:ring-green-400"
              required
              maxLength={50}
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-base font-medium mb-1 text-green-400">
              Category
            </label>
            <div className="flex gap-1">
              <select
                name="categories_id"
                className="flex-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:border-green-400 focus:ring-green-400"
                value={selectedCategory}
                onChange={handleCategoryChange}
                required
              >
                <option value={category}>---please select category---</option>
                {categories.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                <option value={"New Category"}>[New Category]</option>
              </select>
              {selectedCategory !== "" && (
                <>
                  <button
                    className="p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEditCategory(true);
                    }}
                  >
                    <ModeEditOutlineRoundedIcon />
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDeleteCategory(true);
                    }}
                  >
                    <DeleteRoundedIcon />
                  </button>
                </>
              )}
            </div>
            {newCategory && (
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:border-green-400 focus:ring-green-400"
              />
            )}
          </div>

          {/* Difficulty */}
          <div className="mb-4">
            <label className="block text-base font-medium mb-1 text-green-400">
              Difficulty
            </label>
            <select
              value={difficultysID}
              name="difficultys_id"
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:border-green-400 focus:ring-green-400"
              onChange={(e) => setDifficultysID(e.target.value)}
              required
            >
              <option value={""}>---please select Difficulty---</option>
              <option value={"Easy"}>Easy</option>
              <option value={"Medium"}>Medium</option>
              <option value={"Hard"}>Hard</option>
            </select>
          </div>

          {/* Mode */}
          <div className="mb-4">
            <label className="block text-base font-medium mb-2 text-green-400">
              Mode
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(modeSelection).map((buttonKey) => (
                <button
                  key={buttonKey}
                  type="button"
                  className={`px-4 py-2 rounded-md text-white font-medium transition-all duration-300 ${
                    modeSelection[buttonKey]
                      ? "bg-green-500 shadow-md"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  onClick={() => handleToggle(buttonKey)}
                >
                  {buttonKey}
                </button>
              ))}
            </div>
            <div className="mt-4 text-sm text-red-500">{getModeMessage()}</div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-base font-medium mb-1 text-green-400">
              Description
            </label>
            <div className="bg-gray-700 rounded-md overflow-hidden">
              <RichTextEditor value={description} onChange={setDescription} />
            </div>
          </div>

          {/* Hints */}
          <div className="mb-4">
            <label className="block text-base font-medium mb-2 text-green-400">
              Hints
            </label>
            {hints.length < 3 && (
              <button
                type="button"
                onClick={addHint}
                className="px-4 py-2 bg-green-500 text-white rounded-md font-medium transition-all duration-300 hover:bg-green-600 mb-2"
              >
                Add Hint
              </button>
            )}
            <div className="space-y-2">
              {hints.length > 0 &&
                hints.map((hint, index) => (
                  <CreateHint
                    key={hint.id}
                    index={index}
                    detail={hint.detail}
                    penalty={hint.penalty}
                    handleHintChange={handleHintChange}
                    removeHint={removeHint}
                  />
                ))}
            </div>
          </div>

          {/* Answer */}
          <div className="mb-4">
            <label className="block text-base font-medium mb-1 text-green-400">
              Answer
            </label>
            <div className="flex items-center gap-1">
              {modeSelection["Practice"] && (
                <span className="text-white">CTFCQ{" {"}</span>
              )}
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                name="Answer"
                type="text"
                className="flex-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:border-green-400 focus:ring-green-400"
                required
              />
              {modeSelection["Practice"] && (
                <span className="text-white">{"}"}</span>
              )}
            </div>
            {modeSelection["Practice"] && (
              <p className="mt-1 text-red-400 text-sm">
                Warning: In practice mode your answer will be wrapped by CTFCQ
                {"{YourAnswer}"}
              </p>
            )}
          </div>

          {/* Points */}
          <div className="mb-4">
            <label className="block text-base font-medium mb-1 text-green-400">
              Points
            </label>
            <input
              name="point"
              type="number"
              min="0"
              max="10000000"
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:border-green-400 focus:ring-green-400"
              required
              onKeyDown={(e) => {
                if (
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "+" ||
                  e.key === "-"
                )
                  e.preventDefault();
              }}
              value={point}
              onChange={handleNumberChange}
            />
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-base font-medium mb-2 text-green-400">
              Upload File
            </label>
            <div className="flex gap-2 items-center">
              {/* Hidden file input */}
              <input
                id="file-upload"
                type="file"
                name="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                ref={(input) => {
                  if (input && file === null) input.value = "";
                }}
              />
              {/* Custom file upload button */}
              <label
                htmlFor="file-upload"
                className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium cursor-pointer hover:bg-blue-600 transition-all duration-300"
              >
                Choose File
              </label>
              {/* File Name Display */}
              {file && typeof file !== "string" && (
                <span className="text-white">{file.name}</span>
              )}
              {/* Delete Button */}
              <button
                type="button"
                className="px-3 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  setFile(null);
                }}
              >
                Delete
              </button>
            </div>
            {/* File Download (if applicable) */}
            {file && typeof file === "string" && (
              <div className="mt-1 text-white text-sm">
                Current file:
                {id && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      DownloadQuestionsByID(id);
                    }}
                    className="ml-1 text-green-400 hover:text-green-300"
                  >
                    {file}
                  </button>
                )}
              </div>
            )}
            {/* File Size Limit Notice */}
            <p className="mt-2 text-sm text-gray-400">
              * Maximum file size: 200MB
            </p>
            <p className="mt-2 text-sm text-gray-400">
              * Only .zip files are allowed
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-bold text-base transition-all duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white shadow-md"
            }`}
          >
            {loading ? "Creating Question..." : "Create Question"}
          </button>
        </form>
      </div>
    </div>
  );
}
