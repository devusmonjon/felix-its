import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { iSignUpForm } from "./signin.interface";
import { useSignInMutation } from "../../store/api/user-api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/auth-slice";
import styled from "styled-components";

const SignUp = () => {
  const StyledBox = styled(Box)`
    width: 100%;
    height: 100vh;
    background-color: #f8f8f8;
    background-image: url("/bg.png");
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const [loginUser, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <StyledBox>
      <Box
        sx={{
          padding: "48px 28px",
          backgroundColor: "#FEFEFE",
          color: "black",
          borderRadius: "12px",
          boxShadow: "0px 4px 32px 0px rgba(51, 51, 51, 0.04)",
          maxWidth: "430px",
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          fontSize={"32px"}
          fontWeight={"700"}
          color="#151515"
          textAlign={"center"}
          pb={"32px"}
        >
          Sign In
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors: iSignUpForm = {} as iSignUpForm;
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            } else if (!values.email) {
              errors.email = "Required";
            } else if (values.password.length < 6) {
              errors.password = "Must be 6 characters or more";
            } else if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const loading = toast.loading("Loading...", {
              position: "top-center",
            });

            loginUser(values)
              .unwrap()
              .then((res) => {
                toast.success("User logged in successfully", {
                  position: "top-center",
                  id: loading,
                });
                dispatch(login(res.token));
                setSubmitting(false);
                navigate("/");
              })
              .catch((error) => {
                toast.error(error.data.message, {
                  position: "top-center",
                  id: loading,
                });
                setSubmitting(false);
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    // error
                    fullWidth
                    type="email"
                    id="outlined-required"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={
                      errors.email && touched.email && errors.email
                        ? true
                        : false
                    }
                  />
                </FormControl>
                <span style={{ color: "red" }}>
                  {errors.email && touched.email && errors.email}
                </span>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    // error
                    fullWidth
                    type="password"
                    id="outlined-required"
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={
                      errors.password && touched.password && errors.password
                        ? true
                        : false
                    }
                  />
                </FormControl>
                <span style={{ color: "red" }}>
                  {errors.password && touched.password && errors.password}
                </span>
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "#6200EE",
                  marginTop: "36px",
                  padding: "10px 24px",
                }}
                fullWidth
                disabled={isLoading || isSubmitting}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
        {/* Don't have an account yet */}
        <Typography
          variant="body1"
          fontSize={"14px"}
          fontWeight={"400"}
          color="#151515"
          textAlign={"center"}
          mt={"24px"}
        >
          Don't have an account yet?{" "}
          <Link
            to="/signup"
            style={{
              color: "#6200EE",
              textDecoration: "none",
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </StyledBox>
  );
};

export default SignUp;
