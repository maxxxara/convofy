import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
  isRestrictedForLogginedUser?: boolean;
}

function PublicRoute({
  children,
  isRestrictedForLogginedUser = true,
}: PublicRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isRestrictedForLogginedUser) {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/");
      }
    }
  }, [navigate, isRestrictedForLogginedUser]);

  return <>{children}</>;
}

export default PublicRoute;
