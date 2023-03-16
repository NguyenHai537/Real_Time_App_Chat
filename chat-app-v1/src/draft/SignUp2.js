import React, { useState } from "react";
import { Formik } from "formik";
import "../App.css";

const REGEX = {
    username: /^[a-zA-Z]{4,8}$/,
    password: /^[a-zA-Z0-9!@#$%^&*)/(+=._-]*$/
  };
// đang validate với formik nhưng chưa hoàn thành

export default function SignUp2() {
    const [form, setForm] = useState({});
    function handleChange(event) {
        setForm({
          ...form,
          [event.target.name]: event.target.value
        });
      }

      function handleValidate() {
        const errors = {};
        if (!form.username) {
            errors.username = "Username là bắt buộc";
          } else if (!REGEX.username.test(form.username)) {
            errors.username = "Username phải là chữ cái có từ 4-8 ký tự";
            console.log("username error");
          }
        if (!form.email) {
          errors.email = "Email là bắt buộc";
        } else if (!test(form.email)) {
          errors.email = "Email không tồn tại";
          console.log("email error");
        }
        if (!form.password) {
          errors.password = "Password là bắt buộc";
        }
        return errors;
      }

      function handleSubmit() {
        alert("Login in successfully!!!");
      }

    return (
        <div>
      <h1>Sign up</h1>
      <Formik
        initialValues={form}
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
        {({ errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>

            <div
              className={`custom-input ${
                errors.username ? "custom-input-error" : ""
              }`}
            >
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={form.username || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.username}</p>
            </div>

            <div
              className={`custom-input ${
                errors.email ? "custom-input-error" : ""
              }`}
            >
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.email}</p>
            </div>

            <div
              className={`custom-input ${
                errors.password ? "custom-input-error" : ""
              }`}
            >
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.password}</p>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
    )
}
