import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const Index: React.FC = () => {
  const [hash, setHash] = useState<string | undefined>(undefined);

  return (
    <div className="grid grid-rows-[auto_1fr] gap-4 w-screen h-screen p-4 bg-slate-400">
      <div className="flex flex-col gap-4">
        <button onClick={() => setHash(undefined)}>
          <pre>undefined</pre>
        </button>
        <button onClick={() => setHash("")}>#</button>
        <button onClick={() => setHash("toto")}>#toto</button>
        <button onClick={() => setHash("titi")}>#titi</button>
      </div>

      <iframe
        src={`http://localhost:1234/${hash === undefined ? "" : `#${hash}`}`}
        className="w-full h-full border-4 border-red-500"
      ></iframe>
    </div>
  );
};

const rootEltId = "root";
const rootElt = document.getElementById(rootEltId);

if (rootElt === null) {
  // eslint-disable-next-line functional/no-throw-statements
  throw Error(`root element not found: #${rootEltId}`);
}

const root = createRoot(rootElt);

root.render(<Index />);
