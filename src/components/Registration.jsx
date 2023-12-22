import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
  const form = {
    userName: "",
    password: "",
    repeatPassword: "",
    emailAddress: "",
  };

  const [registrationForm, setRegistrationForm] = useState(form);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const updateForm = (event) => {
    const { name, value } = event.target;
    setRegistrationForm({ ...registrationForm, [name]: value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    setErrors(validateForm());
    setSubmit(true);
  };

  useEffect(() => {
    if (submit && Object.keys(errors).length === 0) {
      sessionStorage.setItem("userName", registrationForm.userName);
      navigate("/");
    }
  }, [errors, navigate, registrationForm, submit]);

  const validateForm = () => {
    const errorMessages = {};
    const emailAddressRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /[^A-Za-z0-9]/;

    //userName validation
    if (!registrationForm.userName) {
      errorMessages.userName = "Username is required!";
    } else if (
      !(
        registrationForm.userName.length >= 5 &&
        registrationForm.userName.length <= 30
      )
    ) {
      errorMessages.userName = "Username must be of length 5 to 30 characters.";
    }

    //email address validation
    if (!registrationForm.emailAddress) {
      errorMessages.emailAddress = "Email Address is required!";
    } else if (!emailAddressRegex.test(registrationForm.emailAddress)) {
      errorMessages.emailAddress = "Email Address is invalid.";
    }

    //password and repeat password validation
    if (!registrationForm.password) {
      errorMessages.password = "Password is required!";
    } else if (!registrationForm.repeatPassword) {
      errorMessages.repeatPassword = "Please confirm your password again!";
    } else if (
      !(
        registrationForm.password.length >= 6 &&
        registrationForm.password.length <= 12
      )
    ) {
      errorMessages.password =
        "Password length must be of length 6 to 12 characters.";
    } else if (!passwordRegex.test(registrationForm.password)) {
      errorMessages.password = "Include atleast one special character.";
    } else if (registrationForm.password !== registrationForm.repeatPassword) {
      errorMessages.repeatPassword = "Please enter the same password as above.";
    }

    return errorMessages;
  };

  return (
    <div className="registration-container">
      <form onSubmit={submitForm}>
        <div className="registration-form">
          <h1 className="form-title">Create Your Account</h1>
          <div className="name">
            <input
              className="user-Name"
              type="text"
              name="userName"
              placeholder="Username"
              value={registrationForm.userName}
              onChange={updateForm}
            />
          </div>
          <p className="error-message">{errors.userName} </p>
          <div className="email">
            <input
              className="email-address"
              type="email"
              name="emailAddress"
              placeholder="Email"
              value={registrationForm.emailAddress}
              onChange={updateForm}
            />
          </div>
          <p className="error-message">{errors.emailAddress}</p>
          <div className="password">
            <input
              className="user-password"
              type="password"
              name="password"
              placeholder="Password"
              value={registrationForm.password}
              onChange={updateForm}
            />
          </div>
          <p className="error-message">{errors.password}</p>
          <div className="rpassword">
            <input
              className="repeat-password"
              type="password"
              name="repeatPassword"
              placeholder="Repeat Password"
              value={registrationForm.repeatPassword}
              onChange={updateForm}
            />
          </div>
          <p className="error-message">{errors.repeatPassword}</p>
          <div>
            <button className="form-submit">Submit</button>
          </div>
          <Link to="/">
            <button className="back-button">Back to Home</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
