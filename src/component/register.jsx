import React from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from 'formik';
import * as yup from 'yup';
import "../App.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const FormValidationSchema = yup.object({
        email: yup.string().email().required("please enter email"),
        password: yup
            .string()
            .required("Please Enter your password")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            )
            .min(8, "Password is too short - should be 8 chars minimum."),

    });
    const { handleChange, handleBlur, handleSubmit, values, touched, errors } = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: FormValidationSchema,
        onSubmit: (values) => {
            console.log(values)
            addquotationmaker(values);

        }
    });
    const addquotationmaker = (data) => {
        fetch("http://localhost:5002/projectone/register",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.error) {
                    console.log(data.error);
                    toast.error(data.error);
                } else {
                    console.log(data);
                    console.alert("successfully loged")
                    toast.success(data.msg);
                    // navigate("/login");
                }
            }).catch((error) => { console.log(error) })
    }
  return (
      <>
          <form onSubmit={handleSubmit} className='user p-5'>
          <div className="form-group">
                <TextField className="form-control form-control-user"
                    type="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email ? errors.email : ""}
                />
            </div>
            <div >
                < TextField
                    className="form-control form-control-user"
                    type="password"
                    name="password"
                    label="Password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.password && touched.password}
                    helperText={errors.password && touched.password ? errors.password : ""}
                />
            </div>
            <Button
                // onClick={()=>{window.location.href='/login'}}
                type="submit"
                className="btn btn-primary btn-user btn-block form-control form-control-user"
                variant="contained">Register</Button>
              
      </form>
      </>
  )
}

export default Register