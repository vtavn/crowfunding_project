import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuthPage = ({ allowPermissions }) => {
  const { user } = useSelector((state) => state.auth);
  const userPermissions = user?.permissions || [];
  const location = useLocation();

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user || !user.email) {
  //     navigate("/sign-in");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  // if (!user || !user.email) return;

  return userPermissions.find((p) => allowPermissions?.includes(p)) ? (
    <Outlet></Outlet>
  ) : user ? (
    <Navigate to="/unauthorize" state={{ form: location }} replace />
  ) : (
    <Navigate to="/sign-in" state={{ form: location }} />
  );
};

export default RequireAuthPage;
