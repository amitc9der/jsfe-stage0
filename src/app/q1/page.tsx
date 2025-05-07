"use client";

import { useState } from "react";

/** Q1. Missing Number
 *
 * Implement the handleFindClick function to find the missing number.
 * Given an array of numbers from the `inputArray`, find the missing number and set it to the `number` state.
 * The missing number is the only number that is not in the array.
 * The array will not be sorted.
 * The array will always have a missing number.
 */

export default function NumbersPage() {
  const [number, setNumber] = useState<number>(0);
  const [inputArray, setInputArray] = useState<string>("");

  const handleArrayInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputArray(e.target.value);
    try {
      const parsedValue = JSON.parse(e.target.value);
      if (
        Array.isArray(parsedValue) &&
        parsedValue.length > 0 &&
        typeof parsedValue[0] === "number"
      ) {
        setNumber(parsedValue[0]);
      } else {
        setNumber(0);
      }
    } catch (error) {
      console.error("Invalid JSON input:", error);
      setNumber(0);
    }
  };

  const handleFindClick = () => {
    // const randomNumber = Math.floor(Math.random() * 100); // Generates a random integer between 0 and 100
    const missingNumber = FindMissing(inputArray)
    if (missingNumber === null){
      setNumber(0);
    }else{
      setNumber(missingNumber);
    }
  };

  return (
    <div className="grid grid-rows-[1fr_auto] min-h-screen p-8">
      <div className="flex items-center justify-center">
        <span className="text-8xl font-bold">{number}</span>
      </div>

      <div className="w-full max-w-2xl mx-auto mb-8">
        <textarea
          className="w-full p-4 border rounded-lg"
          rows={4}
          value={inputArray}
          onChange={handleArrayInput}
          placeholder="Enter array of numbers in JSON format (e.g., [1,2,3])"
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleFindClick} // Add onClick handler here
        >
          Find the missing number
        </button>
      </div>
    </div>
  );
}

export function FindMissing(arrStr:string):number|null{
  try {
    const parsedValue = JSON.parse(arrStr);
    if (
      Array.isArray(parsedValue) &&
      parsedValue.length > 0 &&
      typeof parsedValue[0] === "number"
    ) {
      const sorted_array:number[] = parsedValue.sort();
      for (let i = 0; i < sorted_array.length -1; i++){
        if(sorted_array[i]+1 !== sorted_array[i+1]){
          return sorted_array[i]+1
        }
      }
      return null
    } else {
      return null
    }
  } catch (error) {
    console.error("Invalid JSON input:", error);
    return null
  }
}