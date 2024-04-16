import { useCallback, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) {
      str += "0123456789";
    }
    if (character) {
      str += "!@#$%^&*()_+=-{}][~`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbers, character, setPassword]);

  return (
    <div className="text-center mt-20 m-auto w-7/12 p-16 shadow-xl rounded-3xl text-white text-2xl bg-gray-800">
      <h1 className="text-6xl font-bold ">Password Generator</h1>
      <div className="mt-8">
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            value={password}
            className="outline-none rounded-xl w-full py-1 px-3 bg-gray-100"
            placeholder="Password"
            readOnly
          />
          <button className="text-xl text-semibold outline-none bg-blue-700 text-white p-2 shrink-0 rounded-xl">
            Copy
          </button>
        </div>
        <div className="mt-8 flex text-lg gap-2">
          <div className="flex gap-2">
            <input 
              type="range" 
              min = {6}
              max = {33}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
