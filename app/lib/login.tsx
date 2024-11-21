"use client";
import { useState, useEffect } from "react";
import { isHasCookie } from "./cookies";
import { redirect } from "next/navigation";
import React from "react";
interface WrapperProps {
  children: React.ReactNode;
}

export const loginChecker = (setLoading: Function) => {
  // if (!isHasCookie("cmu-oauth-token")) { // login bypass
  //   redirect("/login");
  // }
  setLoading(false);
};
