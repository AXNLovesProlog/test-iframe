import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const Index: React.FC = () => {
  const [path, setPath] = useState<string>("");

  return (
    <div className="grid grid-rows-[auto_1fr] gap-4 w-screen h-screen p-4 bg-slate-400">
      <div className="flex flex-col gap-4">
        <button onClick={() => setPath("")}>/</button>
        <button onClick={() => setPath("/my-naos")}>/my-naos</button>
        <button onClick={() => setPath("/my-naos/my-profile")}>
          /my-naos/my-profile
        </button>
        <button onClick={() => setPath("/my-naos/my-dashboard")}>
          /my-naos/my-dashboard
        </button>
        <button onClick={() => setPath("/my-naos/my-dashboard/event")}>
          /my-naos/my-dashboard/event
        </button>
      </div>

      <iframe
        src={`http://localhost:3000${path}`}
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
