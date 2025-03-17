"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoginUser } from "../lib/API/LoginAPI";
import Loading from "../loading";
import LoadingComponent from "../component/LoadingComponent";

export default function CmuOAuthCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [state, setState] = useState<boolean | null>(null);
  useEffect(() => {
    if (!code) return;
    const login = async () => {
      const result = await LoginUser(code);
      setState(result);
    };
    login();
  }, [code]);

  return (
    <div>
      {state === null && <LoadingComponent text="Login please wait..." />}
      {!state && state !== null && (
        <div>
          <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h1 className="text-4xl font-bold text-green-500 mb-4">
                Login failed plese try again
              </h1>
              <p>Code may not sending successfully</p>
              <p className="text-gray-700 mb-8">
                click the button below to try again.
              </p>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-600"
              >
                Refreseh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
