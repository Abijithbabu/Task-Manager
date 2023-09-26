import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'
import { Button, Link, Stack, TextField, Typography } from '@mui/material';
import { Register, login } from '../utils/api';
import { useDispatch } from 'react-redux';

function App() {
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const validationSchema = {
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string().min(6).max(255).required("Password is required"),
  }
  if (!auth) validationSchema.name = Yup.string().max(255).required("Name is required")
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: '',
      submit: null,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values, helpers) => {
      try {
        setLoading(true)
        let res
        if (auth) {
          res = await login(values)
        } else {
          res = await Register(values)
        }
        if (res) dispatch({ type: "login", payload: res.data }).then(navigate("/"));
      } catch (err) {
        setLoading(false)
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err?.response?.data?.message || err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    formik.setTouched({ email: false, password: false })
  }, [auth])

  return (
    <MDBContainer fluid style={{ minHeight: '100vh' }} className='p-4 background-radial-gradient overflow-hidden'>
      <MDBRow style={{ paddingTop: '10vh' }}>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            The best offer <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your business</span>
          </h1>

          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>
        </MDBCol>

        <MDBCol md='6' lg={5} className='position-relative'>
          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <MDBTypography style={{ color: 'hsl(232, 89%, 75%)' }} className="mb-3 display-6 fw-bold ls-tight ">{auth ? 'Login' : 'Register'}</MDBTypography>
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                  {!auth && <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.name}
                  />}
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  {loading && <span className="spinner-border spinner-border-sm px-6" role="status" aria-hidden="true"></span>}&nbsp;&nbsp;&nbsp;
                  {auth ? 'Sign up' : 'Register'}
                </Button>
              </form>
              <div className="text-center mt-4">
                {auth ? <p>New here <Link style={{ cursor: 'pointer' }} onClick={() => !loading && setAuth(false)}>Register</Link></p>
                  : <p>Already have an account <Link style={{ cursor: 'pointer' }} onClick={() => !loading && setAuth(true)}>login</Link></p>}
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;