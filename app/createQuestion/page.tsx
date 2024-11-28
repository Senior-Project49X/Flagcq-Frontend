"use client";
import React, { FormEvent, use, useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../component/navbar";
import { CreateQuestionAPI } from "../lib/API/QuestionAPI";
import LoadingPopup from "../component/LoadingPopup";
import { log } from "console";

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
  const [Loading, setLoading] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const onCreateQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    CreateQuestionAPI(formData, { setIsFailed, setMessage, setIsSuccess });

    setLoading(true);
  };
  useEffect(() => {
    setMessage("");
    setIsFailed(false);
    setIsSuccess(false);
  }, [Loading]);

  return (
    <>
      {Loading && (
        <LoadingPopup
          setLoading={setLoading}
          isFailed={isFailed}
          isSuccess={isSuccess}
          Message={message}
        />
      )}
      <div className="bg-[#fc7b03]">
        <Navbar />
        <form onSubmit={onCreateQuestion}>
          <label>Topic</label>
          <input type="text" name="title" />
          <br />
          <label>Category</label>
          <select name="categories_id">
            <option value={""}>---please select category---</option>
            <option value={"General Skill"}>General Skill</option>
            <option value={"Cryptography"}>Cryptography</option>
            <option value={"Network"}>Network</option>
            <option value={"Forensics"}>Forensics</option>
          </select>
          <br />
          <label>Difficulty</label>
          <select name="difficultys_id">
            <option value={""}>---please select Difficulty---</option>
            <option value={"Easy"}>Easy</option>
            <option value={"Medium"}>Medium</option>
            <option value={"Hard"}>Hard</option>
          </select>
          <br />
          <label>Mode</label>
          <select name="type">
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
            name="point"
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
      </div>
    </>
  );
}
