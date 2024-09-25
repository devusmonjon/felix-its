import { useGetUserQuery } from "@/store/api/user-api";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Auth = () => {
  const auth = useSelector(
    (state: { auth: { isAuthenticated: boolean; token: string } }) => state.auth
  );
  useGetUserQuery();

  return !auth.isAuthenticated ? null : <Outlet />;
};

export default Auth;
