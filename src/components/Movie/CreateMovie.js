import { useCallback, useState } from "react";
import { Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { images } from "../../constants/image.constant";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { addMovie } from "../../redux/slices/movieSlice";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [droppedImage, setDroppedImage] = useState(null);
  const [file, setFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the dropped
    const tempFile = acceptedFiles[0];
    if (tempFile.type.startsWith("image/")) {
      setFile(tempFile);
      setDroppedImage(URL.createObjectURL(tempFile));
    } else {
      toast.error("Invalid file type. Please select an image.", {
        position: "top-right",
      });
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <>
      <ToastContainer />

      <div className="top-container container py-5">
        <h2>{t("create-new-movie")}</h2>
        <div className="inner-div py-5">
          <div className="w-100">
            <div className="insert-image" {...getRootProps()}>
              {droppedImage ? (
                <img
                  src={droppedImage}
                  alt="dropped"
                  className="preview-image"
                />
              ) : (
                <>
                  <img src={images.DROP} className="text-light" alt="drop" />
                  <p className="text-light">Drop the image here</p>
                </>
              )}
              <input {...getInputProps()} accept="image/*" />
            </div>
          </div>
          <div className="w-100">
            <Formik
              initialValues={{ title: "", publishingYear: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = "Title is Required";
                }

                if (!values.publishingYear) {
                  errors.publishingYear = "Publishing Year is Required";
                } else if (!/^\d+$/.test(values.publishingYear)) {
                  errors.publishingYear = "Publishing Year must be a number";
                }

                return errors;
              }}
              onSubmit={async (values) => {
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                  formData.append(key, values[key]);
                });

                // Append the file to FormData
                formData.append("file", file);
                await dispatch(addMovie(formData));
                navigate("/movieList");
              }}
            >
              {({ errors, touched, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="Title" className="mb-4">
                    <Form.Control
                      onChange={handleChange}
                      name="title"
                      type="text"
                      placeholder="Title"
                      className="custom-input text-light"
                      style={{
                        backgroundColor: "#224957",
                        borderColor:
                          errors.title && touched.title ? "#EB5757" : "#224957",
                      }}
                    />
                    {errors.title && touched.title && (
                      <div className="text-danger">{errors.title}</div>
                    )}
                  </Form.Group>

                  <Form.Group
                    controlId="year"
                    className="mb-3 custom-width-216"
                  >
                    <input
                      type="text"
                      onChange={handleChange}
                      name="publishingYear"
                      placeholder="Publishing year"
                      className="text-light custom-width-216-input "
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-center align-items-center mt-5 inner2-div">
                    <button
                      className="custom-btn"
                      style={{
                        backgroundColor: "transparent",
                        color: "#FFFFFF",
                        border: "1px solid #FFFFFF",
                        marginRight: "10px",
                      }}
                    >
                      Cancel
                    </button>
                    <button className="custom-btn" type="submit">
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMovie;
