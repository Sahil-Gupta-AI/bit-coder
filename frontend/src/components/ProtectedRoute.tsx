import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to so we can drop them off there later if we want.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
