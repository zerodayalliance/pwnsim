"use client";

import React, { useState } from "react";
import { useWindows } from "../context/WindowsContext";

export function CalculatorApp() {
  const { themeMode } = useWindows();

  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (n: string) => {
    if (newNumber) {
      setDisplay(n);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? n : display + n);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(`${display} ${op}`);
    setNewNumber(true);
  };

  const handleEqual = () => {
    if (!equation) return;
    try {
      const parts = equation.split(" ");
      const num1 = parseFloat(parts[0]);
      const op = parts[1];
      const num2 = parseFloat(display);
      let result = 0;

      if (op === "+") result = num1 + num2;
      else if (op === "−" || op === "-") result = num1 - num2;
      else if (op === "×" || op === "*") result = num1 * num2;
      else if (op === "÷" || op === "/") result = num2 !== 0 ? num1 / num2 : 0;

      setEquation(`${equation} ${display} =`);
      setDisplay(String(Number(result.toFixed(8))));
      setNewNumber(true);
    } catch {
      setDisplay("Error");
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
      setNewNumber(true);
    }
  };

  return (
    <div
      className={`flex flex-col h-full text-xs select-none p-3 ${
        themeMode === "dark"
          ? "bg-[#202020] text-white"
          : "bg-[#f3f3f3] text-neutral-800"
      }`}
    >
      <div className="h-6 text-right text-xs text-neutral-400 font-mono px-2 truncate">
        {equation}
      </div>

      <div className="h-14 flex items-center justify-end px-2 text-3xl font-bold font-mono tracking-tight">
        {display}
      </div>

      <div className="flex-1 grid grid-cols-4 gap-1.5 pt-2">
        <button
          type="button"
          onClick={() => {
            setDisplay(String(parseFloat(display) / 100));
            setNewNumber(true);
          }}
          className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 font-medium transition-colors"
        >
          %
        </button>
        <button
          type="button"
          onClick={() => setDisplay("0")}
          className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 font-medium transition-colors"
        >
          CE
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 font-medium transition-colors"
        >
          C
        </button>
        <button
          type="button"
          onClick={handleBackspace}
          className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 font-medium transition-colors"
        >
          ⌫
        </button>

        <button
          type="button"
          onClick={() => handleNumber("7")}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors"
        >
          7
        </button>
        <button
          type="button"
          onClick={() => handleNumber("8")}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors"
        >
          8
        </button>
        <button
          type="button"
          onClick={() => handleNumber("9")}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors"
        >
          9
        </button>
        <button
          type="button"
          onClick={() => handleOperator("÷")}
          className="p-3 rounded-lg bg-white/5 hover:bg-white/10 font-semibold text-base transition-colors"
        >
          ÷
        </button>

        <button
          type="button"
          onClick={() => handleNumber("4")}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors"
        >
          4
        </button>
        <button
          type="button"
          onClick={() => handleNumber("5")}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors"
        >
          5
        </button>
        <button
          type="button"
          onClick={() => handleNumber("6")}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors"
        >
          6
        </button>
        <button
          type="button"
          onClick={() => handleOperator("×")}
          className="p-3 rounded-lg bg-white/5 hover:bg-white/10 font-semibold text-base transition-colors"
        >
          ×
        </button>

        <button
          type="button"
          onClick={() => handleNumber("1")}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors"
        >
          1
        </button>
        <button
          type="button"
          onClick={() => handleNumber("2")}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors"
        >
          2
        </button>
        <button
          type="button"
          onClick={() => handleNumber("3")}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors"
        >
          3
        </button>
        <button
          type="button"
          onClick={() => handleOperator("−")}
          className="p-3 rounded-lg bg-white/5 hover:bg-white/10 font-semibold text-base transition-colors"
        >
          −
        </button>

        <button
          type="button"
          onClick={() => {
            const val = parseFloat(display);
            setDisplay(String(-val));
          }}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 font-medium transition-colors"
        >
          ±
        </button>
        <button
          type="button"
          onClick={() => handleNumber("0")}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors"
        >
          0
        </button>
        <button
          type="button"
          onClick={() => {
            if (!display.includes(".")) handleNumber(".");
          }}
          className="p-3 rounded-lg bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors"
        >
          .
        </button>
        <button
          type="button"
          onClick={() => handleOperator("+")}
          className="p-3 rounded-lg bg-white/5 hover:bg-white/10 font-semibold text-base transition-colors"
        >
          +
        </button>

        <div className="col-span-4 pt-1">
          <button
            type="button"
            onClick={handleEqual}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-md transition-colors"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
