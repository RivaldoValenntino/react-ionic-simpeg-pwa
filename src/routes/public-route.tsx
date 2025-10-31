/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";

interface PublicRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const token = useAuthStore((state) => state.token);

  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};

export default PublicRoute;
