import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useNavigate } from "react-router-dom";
import "./form.css";
import * as Yup from "yup"; //-> for obj schema validation
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import ErrorText from "./ErrorText";

/* formik helps us with:
    -managing form state
    -handling form submission
    -validation and error messages */

const initialValues = {
  //le prop corrispondono all' attributo name di ogni campo
  name: "",
  email: "",
  description: "",
  phNumbers: [""],
  password: "",
  repeatPassword: "",
  gender: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Invalid email format"),
  phNumbers: Yup.array().of(Yup.string().matches(/^$|(\+\d{2})? ?\d{10}/,'es: 3334440088, +39 3334440088')),
  password: Yup.string().required("Required").min(8, "passwords must be at least 8 characters"),
  repeatPassword: Yup.string().required("Required").oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    try{
      console.log("form data", values);
      navigate("/submitRedirect");
    } catch(error){
      console.log("onSubmit error", error);
    }
  };
  
  const handleNumberFocus = (e) => {
    try {
      if (!e.target.value) e.target.value = "+39 ";
    } catch (error) {
      console.log("number focus error", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="d-flex f-column">
        <div className="registration__form-control">
          <label className="form-control__label" htmlFor="name">
            Fullname *
          </label>
          <Field type="text" id="name" name="name" placeholder="John" />
          <ErrorMessage component={ErrorText} name="name" />
        </div>

        <div className="registration__form-control">
          <label className="form-control__label" htmlFor="email">
            E-mail *
          </label>
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
          />
          <ErrorMessage component={ErrorText} name="email" />
        </div>

        <div className="registration__form-control">
          <label className="form-control__label" htmlFor="description">
            Description
          </label>
          <Field
            as="textarea"
            type="text"
            id="description"
            name="description"
            placeholder="I like pizza"
            className="pl-1 pt-1"
          />
        </div>

        <div className="registration__form-control">
          <label className="form-control__label" htmlFor="">
            List of phone numbers
          </label>
          {/* render prop pattern -> function as child */}
          <FieldArray name="phNumbers">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const phNumbers = form.values.phNumbers;
              return (
                <TransitionGroup>
                  {phNumbers.map((numb, index) => (
                    <Collapse key={index}>
                      <div className="d-flex">
                        <Field
                          name={`phNumbers[${index}]`}
                          placeholder="+00 0123456789"
                          onFocus={handleNumberFocus}
                        />
                        <div className="phone-buttons d-flex justify-content-center h100 ml-1">
                          <button
                            type="button"
                            className="br-5 bc-primary fl-grow1 hov-button"
                            onClick={() => push("")}
                          >
                            +
                          </button>
                          {index > 0 && (
                            <button
                              type="button"
                              className="br-5 bc-secondary fl-grow1 hov-button"
                              onClick={() => remove(index)}
                            >
                              -
                            </button>
                          )}
                        </div>
                      </div>
                      <ErrorMessage
                        component={ErrorText}
                        name={`phNumbers[${index}]`}
                      />
                    </Collapse>
                  ))}
                </TransitionGroup>
              );
            }}
          </FieldArray>
        </div>

        <div className="registration__form-control">
          <label className="form-control__label" htmlFor="password">
            Password *
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder=">= 8 letters"
          />
          <ErrorMessage component={ErrorText} name="password" />
        </div>

        <div className="registration__form-control">
          <label className="form-control__label" htmlFor="repeatPassword">
            Repeat password *
          </label>
          <Field
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            placeholder="match previous password"
          />
          <ErrorMessage component={ErrorText} name="repeatPassword" />
        </div>

        <button
          className="registration__submit-btn hov-button mt-1"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
