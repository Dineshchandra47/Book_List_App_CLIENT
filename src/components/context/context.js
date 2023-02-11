import { createContext, useState } from "react";

export const context = createContext();
export default function ContextProvider(props) {
  const [bookdetails, setBookdetails] = useState({});

  return (
    <>
      <context.Provider value={{ bookdetails, setBookdetails }}>
        {props.children}
      </context.Provider>
    </>
  );
}
