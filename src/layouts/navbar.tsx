import { Box, Button } from "@mui/material";
import { Logo, Search } from "../icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/auth-slice";

const Navbar = () => {
  const auth = useSelector((state: any) => state.auth);

  const StyledNav = styled.nav`
    padding: 12px 0;
  `;
  const StyledBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  const Form = styled.form`
    display: flex;
    max-width: 320px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
  `;
  const Input = styled.input`
    display: flex;
    max-width: 264px;
    width: 100%;
    height: 48px;
    outline: none;
    color: white;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
    color: #fefefe;
    font-weight: 400;
    letter-spacing: 0.16px;
    background: transparent;
  `;
  const dispatch = useDispatch();
  return (
    <StyledNav>
      <div className="container">
        <StyledBox>
          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{ width: "100%", gap: "24px" }}
          >
            <Logo />
            <Form>
              <Search />
              <Input
                type="text"
                placeholder="Search for any training you want "
                name="q"
              />
              <input type="hidden" />
            </Form>
          </Box>
          <Box>
            {auth.isAuthenticated ? (
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(logout());
                  window.location.href = "/signin";
                }}
              >
                LOGOUT
              </Button>
            ) : (
              <>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </Box>
        </StyledBox>
      </div>
    </StyledNav>
  );
};

export default Navbar;
