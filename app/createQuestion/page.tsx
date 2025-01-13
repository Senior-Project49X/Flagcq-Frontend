"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../component/navbar";
import { CreateQuestionAPI, GetCategories } from "../lib/API/QuestionAPI";
import CreateCategories from "../component/CreateCategories";
import LoadingPopup from "../component/LoadingPopup";
import CreateHint from "../component/CreateHint";

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
export default function CreateQuestion() {
  const [modeSelection, setModeSelection] = useState<ButtonStates>({
    Practice: false,
    Tournament: false,
    UnPublic: true,
  });

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
    { id: string; detail: string; penalty: number }[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [point, setPoint] = useState("");
  //* API new question
  const onCreateQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Check if a category is selected
    if (selectedCategory === "") return;

    // Append the hints JSON to the form
    formData.append("Hints", JSON.stringify(hints));

    formData.append("Practice", modeSelection.Practice.toString());
    formData.append("Tournament", `[${selectedTournament.toString()}]`);

    CreateQuestionAPI(formData, { setIsFailed, setMessage, setIsSuccess });

    setLoading(true);
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
      [field]:
        field === "penalty"
          ? parseInt(value.replace(/^0+/, ""), 10) || 0
          : value,
    };
    setHints(newHints);
  };

  const addHint = () => {
    if (hints.length >= 3) return;
    console.log("Before addition:", hints);

    setHints([...hints, { id: crypto.randomUUID(), detail: "", penalty: 0 }]);
    console.log("After addition:", hints);
  };
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Allow single zero but remove leading zeros for other numbers
    if (value === "0") {
      setPoint(value);
    } else if (value === "00") {
      return;
    } else {
      value = value.replace(/^0+/, "");
      setPoint(value);
    }
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
    console.log(categories);
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
      <div className="max-w-3xl mx-auto p-8 bg-gray-100 p-6 rounded-lg shadow-md text-black">
        <form onSubmit={onCreateQuestion}>
          <label className="mr-2">
            Topic{" "}
            <input
              type="text"
              name="title"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <br />
          <label>
            Category{" "}
            <select
              name="categories_id"
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value={""}>---please select category---</option>
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
              name="difficultys_id"
              className="w-full p-2 border border-gray-300 rounded"
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
              name="Description"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <br />
          <p>Hint</p>
          <div>
            <button type="button" onClick={addHint}>
              Add Hint
            </button>
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
            name="Answer"
            type="text"
            className=" p-2 border border-gray-300 rounded"
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
              className="p-2 border border-gray-300 rounded"
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
              name="file"
              type="file"
              className="p-2 border border-gray-300 rounded"
            />
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
    </>
  );
}
