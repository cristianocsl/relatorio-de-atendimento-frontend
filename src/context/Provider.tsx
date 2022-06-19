import React, { ReactElement, FC } from "react";
import MyContext from "./MyContext";

type Props = { children: ReactElement | ReactElement[] };

const Provider: FC<Props> = ({ children }) => {
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
