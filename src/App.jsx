import { useState } from "react";
import "./App.css";
import spyIcon from "./assets/spyset.png";
import { Copy, Link as LinkIcon, CheckCircle } from "@phosphor-icons/react";

function App() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("to");
  const [copied, setCopied] = useState(false);

  const morseCodeMap = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    0: "-----",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "'": ".----.",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    _: "..--.-",
    '"': ".-..-.",
    $: "...-..-",
    "@": ".--.-.",
    " ": "/",
  };

  const reverseMap = Object.fromEntries(
    Object.entries(morseCodeMap).map(([k, v]) => [v, k])
  );

  const convert = () => {
    if (mode === "to") {
      const result = text
        .toUpperCase()
        .split("")
        .map((char) => morseCodeMap[char] || "")
        .join(" ");
      setOutput(result);
    } else {
      const result = text
        .trim()
        .split(" ")
        .map((m) => reverseMap[m] || "")
        .join("");
      setOutput(result);
    }
  };

  const clear = () => {
    setText("");
    setOutput("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#FFF3E4] min-h-screen flex flex-col">
      {/* Main content */}
      <div className="text-center flex-grow">
        {/* Heading */}
        <h1 className="text-6xl text-[#31261A] pt-20 circular-black leading-[0.7]">
          Turn your text
          <img
            src={spyIcon}
            className="inline-block w-24 h-24 mx-1 align-middle"
            alt="Spy Icon"
          />
          <br />
          into Morse code
        </h1>

        {/* Toggle buttons */}
        <div className="mt-10 flex justify-center rounded-full gap-0">
          <button
            onClick={() => setMode("to")}
            className={`px-8 py-4 rounded-tl-full rounded-bl-full circular-book transition  ${
              mode === "to"
                ? "bg-[#31261A] text-white shadow-[inset_0_-8px_4px_rgba(128,128,128,0.25)]"
                : "bg-white text-black border border-black shadow-[inset_0_-4px_4px_rgba(0,0,0,0.25)]"
            }`}
          >
            To Morse Code
          </button>

          <button
            onClick={() => setMode("from")}
            className={`px-7 py-4 rounded-tr-full rounded-br-full circular-book transition shadow-[inset_0_-4px_4px_rgba(0,0,0,0.25)] ${
              mode === "from"
                ? "bg-[#31261A] text-white"
                : "bg-white text-black border border-black"
            }`}
          >
            From Morse Code
          </button>
        </div>

        {/* Input */}
        <div className="max-w-2xl mx-auto mt-8">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              mode === "to"
                ? "Enter your message to Convert..."
                : "Enter Morse code (e.g. .... . .-.. .-.. ---)"
            }
            className="w-full py-6 px-8 circular-book rounded-full border border-gray-400 bg-white text-lg shadow-sm focus:outline-none focus:ring-none transition"
            autoComplete="off"
          />
        </div>

        {/* Convert + Clear buttons */}
        <div className="max-w-xl mx-auto flex gap-2 justify-center mt-2">
          <button
            onClick={convert}
            className="bg-[#31261A] w-1/2 circular-medium text-white px-6 py-4 rounded-full border border-gray-400 hover:opacity-90 transition shadow-[inset_0_-8px_4px_rgba(128,128,128,0.25)]"
          >
            Convert
          </button>
          <button
            onClick={clear}
            className="bg-white w-1/2 circular-medium text-black px-6 py-4 rounded-full border border-gray-400 transition shadow-[inset_0_-4px_4px_rgba(0,0,0,0.25)]"
          >
            Clear
          </button>
        </div>

        {/* Output box */}
        {output && (
          <div className="bg-white mt-10 p-6 rounded-2xl shadow-md relative max-w-2xl mx-auto text-left">
            <p className="text-lg break-words">{output}</p>
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={handleCopy}
            >
              <Copy size={24} />
            </button>
          </div>
        )}

        {/* Toast */}
        {copied && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white flex gap-2 circular-medium items-center text-[#31261A] px-4 py-4 rounded-full shadow-lg text-sm transition">
            <CheckCircle size={32} weight="fill" color="#007a1f" />
            Content Copied to Clipboard
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#31261A] py-4">
        <p className="text-sm circular-book mx-auto text-white flex  justify-center items-center">
          <a
            href="https://github.com/rohit-pandey/Morse-Code-Converter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-1"
          >
            <p>Created by Hemanth - Check the Project Repo</p>
            <LinkIcon size={16} />
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
