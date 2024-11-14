"use client";
import React, { useState } from "react";
import Navbar from "../component/navbar";
import { CreateQuestionAPI } from "../lib/API/QuestionAPI";

export default function CreateQuestion() {
  const [Title, setTitle] = useState<string>("");
  const [CategoriesId, setCategoriesId] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const [Answer, setAnswer] = useState<string>("");
  const [Point, setPoint] = useState<number | string>("");
  const [DifficultyId, setDifficultyId] = useState<string>("");
  const [FilePath, setFilePath] = useState<string[]>([]);
  const [Mode, setMode] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);
  return (
    <div className="bg-[#fc7b03]">
      <Navbar />
      <label>Topic</label>
      <input
        type="text"
        value={Title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <label>Category</label>
      <select
        value={CategoriesId}
        onChange={(e) => {
          setCategoriesId(e.target.value);
        }}
      >
        <option value={""}>---please select category---</option>
        <option value={"General Skills"}>General Skills</option>
        <option value={"Cryptography"}>Cryptography</option>
        <option value={"Network"}>Network</option>
        <option value={"Forensics"}>Forensics</option>
      </select>
      <br />
      <label>Difficulty</label>
      <select
        value={DifficultyId}
        onChange={(e) => {
          setDifficultyId(e.target.value);
        }}
      >
        <option value={""}>---please select Difficulty---</option>
        <option value={"Easy"}>Easy</option>
        <option value={"Medium"}>Medium</option>
        <option value={"Hard"}>Hard</option>
      </select>
      <br />
      <label>Mode</label>
      <select
        value={Mode}
        onChange={(e) => {
          setMode(e.target.value);
        }}
      >
        <option value={""}>---please select Mode---</option>
        <option value={"Practice"}>Practice</option>
        <option value={"Tournament"}>Tournament</option>
      </select>
      <br />
      <label>Description</label>
      <textarea
        value={Description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      <label>Answer</label>
      <input
        type="text"
        value={Answer}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
      />
      <br />
      <label>Point</label>
      <input
        type="text"
        value={Point}
        onChange={(e) => {
          if (/^\d*\.?\d*$/.test(e.target.value)) {
            if (e.target.value.length !== 0) setPoint(parseInt(e.target.value));
            else setPoint("");
          }
        }}
      />
      <br />
      <label>File</label>
      <input
        type="file"
        multiple
        onChange={(e) => {
          if (e.target.files !== null && e.target.files[0].name !== null) {
            console.log(e.target.files[0].name);
            const newFile = [e.target.files[0].name];
            setFilePath([...FilePath, ...newFile]);
          }
        }}
      />
      <br />
      {FilePath.map((file, i) => (
        <label key={i}>
          <p>{file}</p>
        </label>
      ))}
      <button
        className="m-5 p-5 bg-[#ffffff] rounded-lg"
        onClick={() => {
          const res = CreateQuestionAPI(
            CategoriesId,
            Title,
            Description,
            Answer,
            Point,
            DifficultyId,
            FilePath,
            Mode
          );
          setLoading(true);
        }}
      >
        Confirm
      </button>
      {Loading && <p>Loading</p>}
    </div>
  );
}
