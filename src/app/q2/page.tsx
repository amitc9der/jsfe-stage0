"use client";

import React, { useState, useEffect } from "react";

type Fact = {
  fact: string;
  length: number;
};

export default function Q2Page() {
  const [catFact, setCatFact] = useState<Fact | null>(null);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchCatFact = async () => {
      setError(null); // Reset error state on new fetch attempt
      GET(
        "https://catfact.ninja/fact",
        (data: Fact) => setCatFact(data),
        (err: string) => {
          setError(err);
        }
      );
    };

    fetchCatFact();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Q2 - Random Cat Fact</h1>

      {error ? (
        <p className="text-red-500">Error fetching cat fact: {error}</p> // Display error message
      ) : (
        <DisplayCatFactWithLoading isLoading={!catFact} catFact={catFact} />
      )}
    </div>
  );
}

//Using withLoading HOC
const DisplayCatFactWithLoading = withLoading(DisplayFact);

//Seperating Display Fact for Readiability
function DisplayFact({ catFact }: { catFact: Fact }) {
  return (
    <div className="fact-container mt-4 p-4 border rounded bg-gray-50">
      <p className="fact text-lg mb-2">{catFact.fact}</p>
      <p className="fact-length text-sm text-gray-600">
        Character count: {catFact.length}
      </p>
    </div>
  );
}

//Loading HOC
export function withLoading(ChildComponent: any) {
  return function WithLoadingComponent({ isLoading = false, ...props }) {
    if (isLoading) {
      return LoadingIndicator();
    }
    return <ChildComponent {...props} />;
  };
}

//Seperating so that when we have an svg we can use it on multiple times
function LoadingIndicator() {
  return <p>Loading cat fact...</p>; // Show loading state
}

//To Avoid Code Duplication better code readiability
function handleError(response: Response) {
  switch (response.status) {
    case 404: //implment the rest of codes like 401,403,etc.
      throw new Error(`Cat Fact Not Found`);
    default:
      throw new Error(`Unexpected Error: ${response.status}`);
  }
}

export async function GET(
  url: string,
  onSuccess: (data: any) => void,
  onError: (err: string) => void
) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      handleError(response);
    }
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    console.error("Failed to fetch cat fact:", error);
    onError(
      error instanceof Error ? error.message : "An unknown error occurred"
    ); // Set error state
  }
}
