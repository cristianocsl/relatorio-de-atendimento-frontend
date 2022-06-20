import React, { ReactElement } from "react";
import MyContext from "./MyContext";

type Props = { children: ReactElement | ReactElement[] };

const Provider = ({ children }: Props) => {
  const hello: string = 'Hello Word!';

  const context = {
    hello,
  };

  return (
    <MyContext.Provider value={context}>
      { children }
    </MyContext.Provider>
  );
};

export default Provider;
