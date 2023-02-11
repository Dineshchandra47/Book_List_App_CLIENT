import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
const SignIn = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [formError, setFormError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(details));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      // console.log(details);
      axios
        .post(
          "https://booklist-server-10x-test.onrender.com/api/user/login",
          // http://localhost:5000
          details
        )
        .then((res) => {
          // console.log(res);
          const myToken = res.data.token;
          localStorage.setItem("token", myToken);
        //   window.alert(res.data.status);
          toast.success(res.data.status, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

          navigate("/booklist");
        })
        .catch((err) => {
          console.log(err);
        //   window.alert(err.response.data.message);
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        });
    }
    // eslint-disable-next-line
  }, [formError]);
  function validate(data) {
    let error = {};
    if (data.email === "") {
      error.email = "Email is Required";
    }
    if (!data.password) {
      error.password = "Enter Password";
    }

    return error;
  }
  return (
    <>
      <div className="signup-form-container">
        <h1>SignUp</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div className="signup-input-controll">
            <div>email</div>
            <input
              type="email"
              name="email"
              value={details.email}
              onChange={handleChange}
            />
            <p>{formError.email}</p>
          </div>
          <div className="signup-input-controll">
            <div>Password</div>
            <input
              type="password"
              name="password"
              value={details.password}
              onChange={handleChange}
            />
            <p>{formError.password}</p>
          </div>
          <div>
            <button>login</button>
          </div>
        </form>
        <div>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
