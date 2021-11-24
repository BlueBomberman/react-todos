import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from "formik";
import * as Yup from "yup"; //-> for obj schema validation
import ErrorText from "./ErrorText";

/* formik helps us with:
    -managing form state
    -handling form submission
    -validation and error messages */

const initialValues = {
  //le prop corrispondono all' attributo name di ogni campo
  name: "",
  email: "email@prova.com",
  channel: "",
  comments: "",
  address: "",
  social: {
    //nested object, to access in Field component use dot notation
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""], //array, to access in Field as name use [],
  phNumbers: [""],
};

const onSubmit = (values) => {
  console.log("form data", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Invalid email format"),
  channel: Yup.string().required("Required"),
});

const YoutubeForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="d-flex f-column">
        <div className="registration__form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage component={ErrorText} name="name" />{" "}
          {/* passing custom component */}
        </div>

        <div className="registration__form-control">
          <label htmlFor="email">E-mail</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email">
            {(errorMsg) => <div className="error op-8 fs-14">{errorMsg}!</div>}
          </ErrorMessage>{" "}
          {/* passing child element */}
        </div>

        <div className="registration__form-control">
          <label htmlFor="channel">Channel</label>
          <Field type="text" id="channel" name="channel" />
          <ErrorMessage component={ErrorText} name="channel" />
        </div>

        <div className="registration__form-control">
          <label htmlFor="address">Address</label>
          <FastField name="address">
            {(props) => {
              console.log('field render')
              return (
                <div>
                  <input id="address" {...props.field} />
                  {props.meta.touched && props.meta.error && (
                    <div>{props.meta.error}</div>
                  )}
                </div>
              );
            }}
          </FastField>
        </div>

        <div className="registration__form-control">
          <label htmlFor="comments">Comments</label>
          <Field as="textarea" type="text" id="comments" name="comments" />
        </div>

        <div className="registration__form-control">
          <label htmlFor="facebook">Facebook profile</label>
          <Field type="text" id="facebook" name="social.facebook" className="test" />
        </div>

        <div className="registration__form-control">
          <label htmlFor="twitter">twitter profile</label>
          <Field type="text" id="twitter" name="social.twitter" />
        </div>

        <div className="registration__form-control">
          <label htmlFor="">List of phone numbers</label>
          {/* render prop pattern -> function as child */}
          <FieldArray name="phNumbers">
            {
              /* delle fieldArrayProps ci servono push, remove e form.values.phNumbers */
              (fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const phNumbers = form.values.phNumbers;
                return (
                  <div>
                    {phNumbers.map((numb, index) => (
                      <div key={index} className="d-flex">
                        <Field name={`phNumbers[${index}]`} />
                        <button type="button" onClick={() => push("")}>
                          +
                        </button>
                        {index > 0 && (
                          <button type="button" onClick={() => remove(index)}>
                            -
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                );
              }
            }
          </FieldArray>
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default YoutubeForm;
