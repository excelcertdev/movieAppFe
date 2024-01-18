import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlices";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedRememberMe = localStorage.getItem("rememberMe");
    if (storedRememberMe === "true") {
      navigate("/movieList");
    }
  }, [navigate]);

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col md={12} className="mx-auto">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email is Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invaild Email Address";
              }
              if (!values.password) {
                errors.password = "Password is Required";
              }
              return errors;
            }}
            onSubmit={async (values) => {
              try {
                // Make the login API call
                const response = await dispatch(
                  login({ ...values, rememberMe })
                );

                // Check if the login was successful
                if (response.payload.status) {
                  if (rememberMe) {
                    localStorage.setItem("rememberMe", "true");
                  } else {
                    localStorage.removeItem("rememberMe");
                  }
                  navigate("/movieList");
                } else {
                  console.error("Login failed:", response.payload.message);
                }
              } catch (error) {
                console.error("Error during login:", error);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">{t("sign-in")}</h2>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Control
                    onChange={handleChange}
                    value={values.email}
                    type="email"
                    placeholder="Email"
                    className="custom-input text-light"
                    style={{
                      backgroundColor: "#224957",
                      borderColor:
                        errors.email && touched.email ? "#EB5757" : "#224957",
                    }}
                  />
                  {errors.email && touched.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Control
                    onChange={handleChange}
                    value={values.password}
                    type="password"
                    placeholder="Password"
                    className="custom-input text-light"
                    style={{
                      backgroundColor: "#224957",
                      borderColor:
                        errors.password && touched.password
                          ? "#EB5757"
                          : "#224957",
                    }}
                  />
                  {errors.password && touched.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </Form.Group>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input custom-bg-color"
                      type="checkbox"
                      id="flexCheckDefault"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="flexCheckDefault"
                    >
                      {t("remember-me")}
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <button className="custom-btn" type="submit">
                    {t("login")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
