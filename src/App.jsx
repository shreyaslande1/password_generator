import { useCallback, useState, useEffect, useRef } from "react";
function App() {
  const [length, setlength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  //useref
  const passwodRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*()[]{}_+-=<>?/:;`~'|.,";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      console.log(`char: ${char}`);

      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberallowed, charallowed, setpassword]);

  const copypassword = useCallback(() => {
    passwodRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordgenerator();
  }, [length, numberallowed, charallowed, passwordgenerator]);
  return (
    <div className="min-h-screen bg-black flex items-start justify-center pt-40">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl text-center text-white mb-4 font-medium">
          Password generator
        </h1>

        <div className="flex overflow-hidden rounded-xl bg-white ">
          <input
            ref={passwodRef}
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            className="w-full px-5 py-3 text-2xl outline-none text-gray-700"
          />
          <button
            onClick={copypassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-5m gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label className="text-white">length:{length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              id="numberinput"
              onChange={() => {
                setnumberallowed((prev) => !prev);
              }}
            />
            <label htmlFor="charecterinput" className="text-white">
              numbers
            </label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="charecterinput"
              onChange={() => {
                setcharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="charecterinput" className="text-white">
              charecters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
