import { Outlet, Route, Routes } from "react-router-dom";
import { Home, SignUp, SignIn } from "./pages";
import Layout from "./layouts";
import { Toaster } from "@/components/ui/sonner";
import { Auth, NonAuth } from "./components/shared";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route path="" element={<Auth />}>
            <Route path="" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="books" element={<>books</>} />
            </Route>
          </Route>
          <Route path="" element={<NonAuth />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
