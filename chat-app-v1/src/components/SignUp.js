import React, { useState , useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import '../App.css';
import axios from "axios";
import styled from 'styled-components';

// validationSchema trong Formik. Sử dụng thư viện bên thứ 3 là Yup để xác thực
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z]{4,8}$/, "Username phải là chữ cái có từ 4-8 ký tự")
    .required("Username là bắt buộc"),
  email: Yup.string()
    .email("Email không tồn tại")
    .required("Email là bắt buộc"),  
  password: Yup.string()
    .min(4, "Password phải có tối thiểu 4 kí tự")
    .matches(/^[a-zA-Z0-9!@#$%^&*)/(+=._-]*$/, "Password chứa ký tự không cho phép" )
    .required("Password là bắt buộc"),  
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Password không trùng khớp")
    .required("Confirm Password là bắt buộc")
});

export default function SignUp() {
  
  const [user, setUser] = useState({});
  const [file, setFile] = useState({});
  const navigate = useNavigate();
  let {username} = useParams();

    const handleSignUp = (newUser) => {
    axios
          .post("http://localhost:8080/save", newUser)
          .then(navigate('/'))
          .catch(err => {
            throw err;
          });
        }
// _______________________________________________________________________________________________________

  return (
    <div className="container text-center">
      <h1 className="h1 mb-3 fw-large" style={{marginTop:'2rem'}}>Sign Up</h1>
      
      <div className="form-signin text-left">
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        console.log(values);

        setUser({
          ...user,
          username: values.username,
          email: values.email,
          password: values.password
        });

        handleSignUp(values)
      }}
    >
      {({ values, errors, touched}) => (
        <Form style={{margin: 'auto',width: '250px'}}>
          <div className='custom-input'>
            <label htmlFor="un">Username</label>
            <Field  id = 'un' name="username" type="text" className = 'form-control' />
            {errors.username && touched.username ? (<div  className="error-message">{errors.username}</div>) : null}
            {console.log(errors.username)}
          </div>

          <div className='custom-input'>
            <label htmlFor="email">Email</label>
            <Field id = 'email' name="email" type="email" className = 'form-control'/>
            {errors.email && touched.email ? <div className="error-message">{errors.email}</div> : null}
          </div>
          
          <div className='custom-input'>
            <label htmlFor="password">Password</label>
            <Field id = 'password' name="password" type='password' className = 'form-control'/>
            {errors.password && touched.password ? (<div className="error-message">{errors.password}</div>) : null}
          </div>
          
          <div className='custom-input'>
            <label htmlFor="cpw">Confirm Password</label>
            <Field id = 'cpw' name="confirmpassword" type='password' className = 'form-control'/>
            {errors.confirmpassword && touched.confirmpassword ? (<div className="error-message">{errors.confirmpassword}</div>) : null}
          </div>

          <button type="submit" className="w-100 btn btn-lg btn-primary">Submit</button>
        </Form>
      )}
    </Formik>
    
    </div>
    </div>
  );
}


// khi sử dụng validationSchema dùng thẻ<Field/> thay cho <input/>
