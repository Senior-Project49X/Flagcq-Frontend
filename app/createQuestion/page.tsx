"use client";
import React, { FormEvent, useState } from "react";
import Navbar from "../component/navbar";
import { CreateQuestionAPI } from "../lib/API/QuestionAPI";

interface typeOfNewData {
  CategoriesId: string | null;
  Title: string;
  Description: string;
  Answer: string;
  Point: number;
  DifficultyId: string;
  FilePath: File | null;
  Mode: string;
}

export default function CreateQuestion() {
  const [Title, setTitle] = useState<string>("");
  // const [CategoriesId, setCategoriesId] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const [Answer, setAnswer] = useState<string>("");
  const [Point, setPoint] = useState<number | string>("");
  const [DifficultyId, setDifficultyId] = useState<string>("");
  const [FilePath, setFilePath] = useState<File | null>(null);
  const [Mode, setMode] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);
  const onCreateQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log();
    const formData = new FormData(event.currentTarget);
    const newData: typeOfNewData = {
      CategoriesId: "",
      Title: "",
      Description: "",
      Answer: "",
      Point: 0,
      DifficultyId: "",
      FilePath: null,
      Mode: "",
    };
    console.log(formData);

    CreateQuestionAPI(formData);

    setLoading(true);
  };

  return (
    <div className="bg-[#fc7b03]">
      <Navbar />
      <form onSubmit={onCreateQuestion}>
        <label>Topic</label>
        <input type="text" name="Title" />
        <br />
        <label>Category</label>
        <select name="CategoriesId">
          <option value={""}>---please select category---</option>
          <option value={"General Skill"}>General Skill</option>
          <option value={"Cryptography"}>Cryptography</option>
          <option value={"Network"}>Network</option>
          <option value={"Forensics"}>Forensics</option>
        </select>
        <br />
        <label>Difficulty</label>
        <select name="DifficultyId">
          <option value={""}>---please select Difficulty---</option>
          <option value={"Easy"}>Easy</option>
          <option value={"Medium"}>Medium</option>
          <option value={"Hard"}>Hard</option>
        </select>
        <br />
        <label>Mode</label>
        <select name="Mode">
          <option value={""}>---please select Mode---</option>
          <option value={"Practice"}>Practice</option>
          <option value={"Tournament"}>Tournament</option>
        </select>
        <br />
        <label>Description</label>
        <textarea name="Description" />
        <br />
        <label>{`Answer: CTFCQ{ `}</label>
        <input name="Answer" type="text" />
        <span>{` }`}</span>
        <br />
        <label>Point</label>
        <input
          name="Point"
          type="number"
          min="0"
          max="10000000"
          onKeyDown={(e) => {
            if (
              e.key === "e" ||
              e.key === "E" ||
              e.key === "+" ||
              e.key === "-"
            )
              e.preventDefault();
          }}
        />
        <br />
        <label>File</label>
        <input name="file" type="file" />
        <br />
        <button type="submit" className="m-5 p-5 bg-[#ffffff] rounded-lg">
          Confirm
        </button>
      </form>
      {Loading && <p>Loading</p>}
    </div>
  );
}
