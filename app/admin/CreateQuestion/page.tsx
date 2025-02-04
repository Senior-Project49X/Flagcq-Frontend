"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
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
import { useRouter } from "next/navigation";
interface CreateNewQuestion {
  CategoriesId: string | null;
  Title: string;
  Description: string;
  Answer: string;
  Point: number;
  DifficultyId: string;
  FilePath: File | null;
  Mode: string[];
}
interface ButtonStates {
  [key: string]: boolean; // Define a dynamic object where keys are strings and values are boolean
}
interface Category {
  [x: string]: any;
  id: string;
  name: string;
}
interface EditQuestionProps {
  id: number | null | undefined;
}
export default function CreateQuestion({ id }: Readonly<EditQuestionProps>) {
  const router = useRouter();
  const [modeSelection, setModeSelection] = useState<ButtonStates>({
    Practice: false,
    Tournament: false,
    UnPublic: true,
  });
  const [role, setRole] = useState<boolean | undefined | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [selectedTournament, setSelectedTournament] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>(
    [] as unknown as Category[]
  );
  const [newCategory, setNewCategory] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [hints, setHints] = useState<
    { id: string | number | null; detail: string; penalty: number }[]
  >([]);
  const [category, setCategory] = useState<string>("");
  const [difficultysID, setDifficultysID] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [point, setPoint] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    if (id !== null && id !== undefined) {
      console.log("Edit question with ID:", id);
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
        setDescription(getQuestion.description);
        setFile(getQuestion.file_path); // Update to handle file path string
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
    formData.append(
      "isFileEdited",
      typeof file === "string" ? "false" : "true"
    );
    console.log(id);

    if (id !== null && id !== undefined) {
      if (id) {
        EditQuestionAPI(
          formData,
          { setIsFailed, setMessage, setIsSuccess },
          id
        );
      }
    } else {
      CreateQuestionAPI(formData, { setIsFailed, setMessage, setIsSuccess });
    }
    setLoading(true);
    // setFile(null); // Reset file state to avoid InvalidStateError
  };

  const handleToggle = (buttonKey: string): void => {
    if (buttonKey === "UnPublic") {
      setModeSelection((prevStates) => ({
        Practice: false,
        Tournament: false,
        UnPublic: true,
      }));
    } else if (buttonKey === "Tournament") {
      setModeSelection((prevStates) => ({
        Practice: false,
        Tournament: true,
        UnPublic: false,
      }));
    } else if (buttonKey === "Practice") {
      setModeSelection((prevStates) => ({
        Practice: true,
        Tournament: false,
        UnPublic: false,
      }));
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
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
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
  }, []);

  return (
    <>
      {loading && (
        <LoadingPopup
          setLoading={setLoading}
          isFailed={isFailed}
          isSuccess={isSuccess}
          Message={message}
        />
      )}
      {isModalVisible && (
        <CreateCategories
          onClose={async (Category: string) => {
            setIsModalVisible(false);
            setCategories(await GetCategories());
            setSelectedCategory(Category);
            console.log("CIDC,", Category);
          }}
        >
          {/* Modal content goes here */}
          <h2>Create New Category</h2>
          {/* Add form or other content for creating a new category */}
        </CreateCategories>
      )}
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-white ">
          CreateQuestion
        </h1>

        <div className="max-w-3xl mx-auto p-8 bg-gray-100 p-6 rounded-lg shadow-md text-black">
          <form onSubmit={onCreateQuestion}>
            <label className="mr-2">
              Topic{" "}
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                type="text"
                name="title"
                className="w-full p-2 border-2 border-gray-300 rounded"
              />
            </label>
            <br />
            <label>
              Category{" "}
              <select
                name="categories_id"
                className="w-full p-2 border-2 border-gray-300 rounded"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value={category}>---please select category---</option>
                {categories.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                <option value={"New Category"}>[New Category]</option>
              </select>
              {newCategory && (
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="ml-2 text-red-400 border-2 border-stone-950 rounded-md p-1  "
                />
              )}
            </label>
            <br />
            <label>
              Difficulty{" "}
              <select
                value={difficultysID}
                name="difficultys_id"
                className="w-full p-2 border-2 border-gray-300 rounded"
                onChange={(e) => setDifficultysID(e.target.value)}
              >
                <option value={""}>---please select Difficulty---</option>
                <option value={"Easy"}>Easy</option>
                <option value={"Medium"}>Medium</option>
                <option value={"Hard"}>Hard</option>
              </select>
            </label>
            <br />
            <div>
              <p>Mode</p>
              {Object.keys(modeSelection).map((buttonKey) => (
                <button
                  key={buttonKey}
                  type="button"
                  className={`px-4 py-2 font-bold rounded transition ${
                    modeSelection[buttonKey]
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                  onClick={() => handleToggle(buttonKey)}
                >
                  {buttonKey}
                </button>
              ))}
            </div>
            <label>
              Description{" "}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="Description"
                className="w-full p-2 border-2 border-gray-300 rounded"
              />
            </label>
            <br />
            <p>Hint</p>
            <div>
              {hints.length < 3 && (
                <button
                  type="button"
                  onClick={addHint}
                  className="p-2 border rounded border-gray-300 mb-2 bg-green-500 text-white hover:bg-green-600 transition-colors duration-100 "
                >
                  Add Hint
                </button>
              )}
            </div>
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

            <br />
            <label>{`Answer: CTFCQ{ `}</label>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              name="Answer"
              type="text"
              className=" p-2 border-2 border-gray-300 rounded"
            />
            <span>{` }`}</span>
            <br />
            <label>
              Point{}
              <input
                name="point"
                type="number"
                min="0"
                max="10000000"
                className="p-2 border-2 border-gray-300 rounded"
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
            </label>
            <br />
            <label>
              File{}
              <input
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                name="file"
                type="file"
                className="p-2 border border-gray-300 rounded"
                ref={(input) => {
                  if (input && file === null) input.value = "";
                }}
              />
              <button
                type="button"
                className={`px-4 py-2 font-bold rounded transition 
                bg-red-500 text-white
              `}
                onClick={(e) => {
                  e.preventDefault();
                  setFile(null);
                }}
              >
                {" "}
                Delete File that Exists
              </button>
              {file && typeof file === "string" && (
                <p>
                  Current file:
                  {id && (
                    <button
                      type="button" // Ensure the button does not submit the form
                      onClick={(e) => {
                        e.preventDefault(); // Prevent form submission
                        DownloadQuestionsByID(id);
                      }}
                    >
                      {file}
                    </button>
                  )}
                </p>
              )}
            </label>
            <br />
            <button
              type="submit"
              className={`w-full p-2 rounded font-bold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
