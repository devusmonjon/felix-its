import { Button } from "@/components/ui/button";
import { Button as ButtonMui, FormControl, TextField } from "@mui/material";
import { IBook } from "@/store/api/books-api.props";
import { Box, Fade, List, Modal, Typography } from "@mui/material";
import { CircleX } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { toast } from "sonner";
import {
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "@/store/api/books-api";
import { Link } from "react-router-dom";

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

const Book = ({ book }: { book: IBook }) => {
  const [modal, setModal] = useState(false);
  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);
  const BookBox = styled(Box)`
    width: 100%;
    padding: 32px;
    border-radius: 12px;
    border: 1px solid #ebebeb;
    background: #fefefe;
    box-shadow: 0px 4px 24px 0px rgba(51, 51, 51, 0.08);
    color: #151515;
    position: relative;
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
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  //   console.log(book);
  const [deleteBook, { isLoading: isLoadingDeleteBook }] =
    useDeleteBookMutation();

  return (
    <BookBox className="book-item" tabIndex={0}>
      <Box className={`absolute left-[100%] duration-300 options`}>
        <Button
          title="Delete"
          className="rounded-[6px_6px_6px_0px] bg-[#FF4D4F] shadow-[0px_6px_32px_0px_rgba(21,21,21,0.48)] hover:bg-[#FF4D4F] focus:ring-0 focus:outline-none"
          variant={"ghost"}
          size={"sm"}
          disabled={isLoadingDeleteBook}
          onClick={() => deleteBook(book._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
          >
            <path
              d="M11.3334 3.99998V3.46665C11.3334 2.71991 11.3334 2.34654 11.1881 2.06133C11.0603 1.81044 10.8563 1.60647 10.6054 1.47864C10.3202 1.33331 9.94682 1.33331 9.20008 1.33331H8.13341C7.38668 1.33331 7.01331 1.33331 6.72809 1.47864C6.47721 1.60647 6.27324 1.81044 6.14541 2.06133C6.00008 2.34654 6.00008 2.71991 6.00008 3.46665V3.99998M7.33341 7.66665V11M10.0001 7.66665V11M2.66675 3.99998H14.6667M13.3334 3.99998V11.4666C13.3334 12.5868 13.3334 13.1468 13.1154 13.5746C12.9237 13.951 12.6177 14.2569 12.2414 14.4487C11.8136 14.6666 11.2535 14.6666 10.1334 14.6666H7.20008C6.07998 14.6666 5.51992 14.6666 5.0921 14.4487C4.71578 14.2569 4.40982 13.951 4.21807 13.5746C4.00008 13.1468 4.00008 12.5868 4.00008 11.4666V3.99998"
              stroke="#FEFEFE"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <Button
          title="Edit"
          className="rounded-[6px_6px_6px_0px] bg-[#6200EE] shadow-[0px_6px_32px_0px_rgba(21,21,21,0.48)] mt-[5px] hover:bg-[#6200EE] focus:ring-0 focus:outline-none"
          variant={"ghost"}
          size={"sm"}
          onClick={handleOpenModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
          >
            <path
              d="M14.6667 12L14 12.7294C13.6464 13.1161 13.1668 13.3333 12.6668 13.3333C12.1668 13.3333 11.6873 13.1161 11.3337 12.7294C10.9796 12.3434 10.5001 12.1267 10.0002 12.1267C9.50033 12.1267 9.02084 12.3434 8.66673 12.7294M2.66675 13.3333H3.78311C4.10923 13.3333 4.27229 13.3333 4.42574 13.2965C4.56179 13.2638 4.69185 13.21 4.81115 13.1369C4.9457 13.0544 5.061 12.9391 5.2916 12.7085L13.6668 4.33334C14.219 3.78106 14.219 2.88563 13.6668 2.33334C13.1145 1.78106 12.219 1.78106 11.6668 2.33334L3.29159 10.7085C3.06099 10.9391 2.94568 11.0544 2.86323 11.189C2.79012 11.3083 2.73625 11.4383 2.70359 11.5744C2.66675 11.7278 2.66675 11.8909 2.66675 12.217V13.3333Z"
              stroke="#FEFEFE"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
                <ButtonMui
                  sx={{
                    color: "#151515",
                    p: "3px !important",
                    minWidth: "min-content",
                    borderRadius: "50%",
                  }}
                  onClick={handleCloseModal}
                >
                  <CircleX size={25} />
                </ButtonMui>
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
                    name: book.name || "",
                    description: book.description || "",
                    pages: book.pages || 0,
                    published: book.published || 0,
                    image: book.image || "",
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

                    updateBook({ _id: book._id, ...values })
                      .unwrap()
                      .then(() => {
                        toast.success("Book updated successfully", {
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
                      <ButtonMui
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
                      </ButtonMui>
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
      <Typography variant="h5" sx={{ fontWeight: "600", fontSize: 16 }}>
        {book.name}
      </Typography>
      <List
        sx={{
          lineHeight: "150%",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "400", fontSize: 14 }}>
          Cover: {book.image}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "400", fontSize: 14 }}>
          Pages: {book.pages}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "400", fontSize: 14 }}>
          Published year: {book.published}
        </Typography>
      </List>
    </BookBox>
  );
};

export default Book;
