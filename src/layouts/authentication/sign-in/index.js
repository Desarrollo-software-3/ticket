/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";
import input from "./estilos.css"

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/logo.png";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const handleSignIn = () => {
    // Realiza una solicitud POST al backend Django para autenticar al usuario
    fetch('http://127.0.0.1:9000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          // Inicio de sesión exitoso, podrías redirigir al usuario a otra página
          // alert(data.message);
          const userData = data.user;
          // console.log(userData)
          if (userData.admin){
            setError("  " +userData.id.toString() + " admon")
          }else{
            setError("  " +userData.id.toString() +" noadmon")
          }
          // alert(data.message)
          document.cookie = document.cookie = `emailA=${userData.email}; path=/;`;
          console.log(document.cookie);
          
          window.location.href = data.redirect_url;
        } else if (data.error) {
          // Autenticación fallida, muestra un mensaje de error
          alert('Credenciales erroneas')
          alert(data.message)
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });
  };
  

  return (
    
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold" name="email" >
              Email{error}
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" name="email" placeholder="Email" onChange={handleInputChange}/>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold" name="password" >
              Password
            </SoftTypography>
          </SoftBox> 
          <SoftInput type="password" name="password" placeholder="Password" onChange={handleInputChange}/>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
