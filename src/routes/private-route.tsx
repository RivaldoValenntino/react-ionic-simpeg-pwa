/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { token } = useAuthStore((state) => state);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
