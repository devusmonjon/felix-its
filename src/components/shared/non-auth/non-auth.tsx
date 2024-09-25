import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const NonAtuh = () => {
  const auth = useSelector(
    (state: { auth: { isAuthenticated: boolean; token: string } }) => state.auth
  );
  return auth.isAuthenticated ? <Navigate replace to={"/"} /> : <Outlet />;
};

export default NonAtuh;
