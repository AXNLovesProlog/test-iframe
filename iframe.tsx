import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const IFrame: React.FC = () => {
  const [hash, setHash] = useState<{ firstRender: true } | string>({
    firstRender: true,
  });

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return <pre>hash = {JSON.stringify(hash)}</pre>;
};

const rootEltId = "root";
const rootElt = document.getElementById(rootEltId);

if (rootElt === null) {
  // eslint-disable-next-line functional/no-throw-statements
  throw Error(`root element not found: #${rootEltId}`);
}

const root = createRoot(rootElt);

root.render(<IFrame />);
