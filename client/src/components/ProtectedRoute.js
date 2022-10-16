import React, { Children, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const validateToken = () => {
    try {
      const response = axios.post(
        "/api/users/get-user-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status) {
        setLoading(false);
      } else {
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{loading ? <div>Loading...</div> : <>{Children}</>}</div>;
}

export default ProtectedRoute;
