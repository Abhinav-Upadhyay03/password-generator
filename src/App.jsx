import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState();

  const passwordRef = useRef(null);

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
  }, [length, numbers, character]);

  const onCopy = useCallback(() => {
    // passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, character, passwordGenerator]);

  return (
    <div className="text-center mt-20 m-auto w-7/12 p-16 shadow-xl rounded-3xl text-white text-2xl bg-gray-800">
      <h1 className="lg:text-6xl font-bold ">Password Generator</h1>
      <div className="mt-8">
        <div className="flex mb-4 gap-0">
          <input
            type="text"
            value={password}
            className="outline-none rounded-l-xl w-full py-1 px-3 bg-gray-100 text-black"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={() => {
              onCopy;
              toast.success("Copied");
            }}
            className="text-xl font-semibold outline-none bg-blue-700 text-white p-2 px-4 shrink-0 rounded-r-xl hover:bg-blue-600"
          >
            Copy
            <Toaster className="cursor-default select-none pointer-events-none" richColors position="top-center" />
          </button>
        </div>
        <div className="mt-8 flex md:text-base sm:text-sm lg:text-lg justify-between overflow-hidden">
          <div className="flex gap-2">
            <input
              type="range"
              min={6}
              max={33}
              value={length}
              className="cursor-pointer "
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              defaultChecked={setNumbers}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setNumbers((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              defaultChecked={setCharacter}
              id="charInput"
              className="cursor-pointer"
              onChange={() => {
                setCharacter((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
          <button onClick={passwordGenerator} className="cursor-pointer">
            <i className="ri-loop-right-line mr-2"></i>
            Regenerate Password
          </button>
        </div>
      </div>
      <div className="text-sm fixed flex justify-center inset-x-0 bottom-8 ">
        Developed by Abhinav
      </div>
    </div>
  );
}

export default App;
