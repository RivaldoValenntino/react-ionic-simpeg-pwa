/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useHistory } from "react-router";
import { startViewTransition } from "./viewTransition";

function AppWrapper({ children: children }: any) {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      requestAnimationFrame(() => {
        startViewTransition(() => {
          // Di sini DOM udah ready, transisi mulus
        });
      });
    });

    return () => {
      unlisten();
    };
  }, [history]);

  return children;
}

export default AppWrapper;
