import {
  Typography,
  Box,
  Button,
  Modal,
  Fade,
  TextField,
  FormControl,
} from "@mui/material";
import { Formik } from "formik";
import { CircleX, Plus } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "sonner";
import { useCreateBookMutation } from "@/store/api/books-api";
import { IBook } from "@/store/api/books-api.props";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "@/store/api/user-api";
import { Book } from "@/components/shared";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FEFEFE",
  p: "24px 28px",
  borderRadius: "12px",
  boxShadow: "0px 4px 32px 0px rgba(51, 51, 51, 0.04)",
  display: "flex",
  flexDirection: "column",
  gap: "28px",
};

const Home = () => {
  const [modal, setModal] = useState(false);
  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);
  const Span = styled.span`
    color: #6200ee;
  `;

  const Backdrop = styled.div`
    z-index: -1;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    -webkit-tap-highlight-color: transparent;
  `;
  const [createBook, { isLoading }] = useCreateBookMutation();
  const { data: user } = useGetUserQuery();
  return (
    <Box className="container mt-[48px_!important]">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: "36px",
            color: "#EEEEEE",
          }}
        >
          You’ve got{" "}
          <Span>
            {user?.products.length ?? 0}{" "}
            {user?.products.length === 1 ? "book" : "books"}
          </Span>
        </Typography>
        <Button
          variant="contained"
          sx={{ background: "#6200ee" }}
          onClick={handleOpenModal}
        >
          <Plus /> Create a book
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modal}
          onClose={handleCloseModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={modal}>
            <Box sx={style}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontSize: 20, fontWeight: 600, color: "#151515" }}
                >
                  Create a book
                </Typography>
                <Button
                  sx={{
                    color: "#151515",
                    p: "3px !important",
                    minWidth: "min-content",
                    borderRadius: "50%",
                  }}
                  onClick={handleCloseModal}
                >
                  <CircleX size={25} />
                </Button>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#FEFEFE",
                  color: "black",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 32px 0px rgba(51, 51, 51, 0.04)",
                  width: "100%",
                }}
              >
                <Formik
                  initialValues={{
                    name: "",
                    description: "",
                    pages: 0,
                    published: 0,
                    image: "",
                  }}
                  validate={(values) => {
                    const errors: IBook = {} as IBook;
                    if (!values.name) {
                      errors.name = "Required";
                    } else if (!values.description) {
                      errors.description = "Required";
                    } else if (!values.image) {
                      errors.image = "Required";
                    } else if (!values.pages) {
                      // @ts-ignore
                      errors.pages = "Required";
                    } else if (!values.published) {
                      // @ts-ignore
                      errors.published = "Required";
                    }
                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    const loading = toast.loading("Loading...", {
                      position: "top-center",
                    });

                    createBook(values as IBook)
                      .unwrap()
                      .then(() => {
                        toast.success("Book created successfully", {
                          position: "top-center",
                          id: loading,
                        });
                        setSubmitting(false);
                        handleCloseModal();
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
                            type="text"
                            id="outlined-required"
                            label="Name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={
                              errors.name && touched.name && errors.name
                                ? true
                                : false
                            }
                          />
                        </FormControl>
                        <span style={{ color: "red" }}>
                          {errors.name && touched.name && errors.name}
                        </span>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            // error
                            fullWidth
                            type="text"
                            id="outlined-required"
                            label="Description"
                            name="description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            error={
                              errors.description &&
                              touched.description &&
                              errors.description
                                ? true
                                : false
                            }
                          />
                        </FormControl>
                        <span style={{ color: "red" }}>
                          {errors.description &&
                            touched.description &&
                            errors.description}
                        </span>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            // error
                            fullWidth
                            type="text"
                            id="outlined-required"
                            label="Cover image path"
                            name="image"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.image}
                            error={
                              errors.image && touched.image && errors.image
                                ? true
                                : false
                            }
                          />
                        </FormControl>
                        <span style={{ color: "red" }}>
                          {errors.image && touched.image && errors.image}
                        </span>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            // error
                            fullWidth
                            type="number"
                            id="outlined-required"
                            label="Pages count"
                            name="pages"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.pages}
                            error={
                              errors.pages && touched.pages && errors.pages
                                ? true
                                : false
                            }
                          />
                        </FormControl>
                        <span style={{ color: "red" }}>
                          {errors.pages && touched.pages && errors.pages}
                        </span>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            // error
                            fullWidth
                            type="text"
                            id="outlined-required"
                            label="Published year"
                            name="published"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.published}
                            error={
                              errors.published &&
                              touched.published &&
                              errors.published
                                ? true
                                : false
                            }
                          />
                        </FormControl>
                        <span style={{ color: "red" }}>
                          {errors.published &&
                            touched.published &&
                            errors.published}
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
                {/* already have account */}
                <Typography
                  variant="body1"
                  fontSize={"14px"}
                  fontWeight={"400"}
                  color="#151515"
                  textAlign={"center"}
                  mt={"24px"}
                >
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    style={{
                      color: "#6200EE",
                      textDecoration: "none",
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
      {/* @ts-ignore */}
      <Box
        sx={{
          width: "100%",
          mt: "36px",
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gap: "56px",
        }}
        className={"books-container"}
      >
        {user?.products?.map((book: IBook) => (
          <Book key={book._id} book={book} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
