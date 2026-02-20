// React Imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// React Icons
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// Formik Imports
import { Form, Formik, FormikProps } from "formik";
// Utils Imports
import { onKeyDown } from "../../utils";
// Validation Schema
import { signupSchema } from "./components/validationSchema";
// MUI Imports
import { Box, Button, MenuItem, Select, FormControl, FormHelperText } from "@mui/material";
// Custom Imports
import { Heading, SubHeading } from "../../components/Heading";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
// Images Imports
import NextWhiteLogo from "../../assets/images/nexCenterLogo.svg";
// Redux API
import { useSignupMutation } from "../../redux/api/authApiSlice";
import { setUser } from "../../redux/auth/authSlice";
import PrimaryPhoneInput from "../../components/PhoneInput";
import BackgroundImage from "../../assets/images/doc.png";


interface ISSignupForm {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  userType: string;
}

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // states
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<ISSignupForm>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    userType: "",
  });
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  // Sign Up Api Bind
  const [signupUser, { isLoading }] = useSignupMutation();

  const signupHandler = async (data: ISSignupForm) => {
    const payload = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      isDoctor: data.userType === "doctor",
    };
    try {
      const user: any = await signupUser(payload);
      
      console.log("Signup Response:", user);
      console.log("User Data:", user?.data);
      console.log("Is Doctor:", user?.data?.data?.user?.isDoctor);

      if (user?.data?.status) {
        setToast({
          ...toast,
          message: data.userType === "doctor" ? "Doctor Account Created! Please complete your profile." : "User Successfully Created",
          appearence: true,
          type: "success",
        });
        setTimeout(() => {
          if (data.userType === "doctor") {
            // Store user data and redirect to apply doctor page
            dispatch(setUser(user?.data));
            localStorage.setItem("user", JSON.stringify(user?.data));
            console.log("Dispatched user data:", user?.data);
            console.log("LocalStorage user data:", JSON.parse(localStorage.getItem("user") || "{}"));
            navigate("/apply-doctor");
          } else {
            navigate("/login");
          }
        }, 1500);
      }
      if (user?.error) {
        setToast({
          ...toast,
          message: user?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("SignUp Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            bottom: "0",
            left: "-110px",
            "@media (max-width: 576px)": {
              display: "none",
            },
          }}
        >
          <img src={NextWhiteLogo} alt="logo" style={{ height: 200 }} />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            "@media (max-width: 768px)": {
              flexDirection: "column-reverse",
            },
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              backgroundImage: `url(${BackgroundImage})`,
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            <Box sx={{ position: "relative", margin: "0 auto" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#000",
                }}
              >
                <Heading sx={{ fontSize: "45px", color: "#000",
                 
                    display: "block",
                    alignItems: "center",
                    alignSelf: "baseline",
                    justifyContent: "center", }}>
                
                </Heading>
                <SubHeading
                  sx={{
                    color: "#000",
                    display: "block",
                    alignItems: "center",
                    alignSelf: "baseline",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  
                  <Box>
                    <Link
                      to="/login"
                      style={{
                        fontWeight: "bold",
                        color: "#000",
                        textDecoration: "none",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.textDecoration = "none")
                      }
                    >
                      
                    </Link>
                  </Box>
                </SubHeading>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                padding: "0 100px",
                "@media (min-width: 1500px)": {
                  padding: "0 50px",
                  width: "550px",
                },
                "@media (min-width: 768px) and (max-width: 991px)": {
                  padding: "0 45px",
                },
                "@media (min-width: 576px) and (max-width: 767px)": {
                  padding: "0 50px",
                  width: "550px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Heading
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Create an Account
                </Heading>
                <Box>
                <Formik
  initialValues={formValues}
  onSubmit={(values: ISSignupForm) => {
    signupHandler(values);
  }}
  validationSchema={signupSchema}
>
  {(props: FormikProps<ISSignupForm>) => {
    const {
      values,
      touched,
      errors,
      handleBlur,
      handleChange,
    } = props;

    return (
      <Form onKeyDown={onKeyDown}>
        <Box sx={{ marginTop: "20px", height: "95px" }}>
          <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>Name</SubHeading>
          <PrimaryInput
            type="text"
            label=""
            name="name"
            placeholder="Name"
            value={values.name}
            helperText={errors.name && touched.name ? errors.name : ""}
            error={errors.name && touched.name ? true : false}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>
        <Box sx={{ height: "95px" }}>
          <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>Email</SubHeading>
          <PrimaryInput
            type="text"
            label=""
            name="email"
            placeholder="Email"
            value={values.email}
            helperText={errors.email && touched.email ? errors.email : ""}
            error={errors.email && touched.email ? true : false}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>

        <Box sx={{ height: "95px" }}>
          <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>Mobile Number</SubHeading>
          <PrimaryPhoneInput
            value={props.values.phoneNumber || '+91'}
            name="phoneNumber"
            formik={props}
            variant="outlined"
            label=""
          />
        </Box>

        <Box sx={{ height: "95px" }}>
          <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>Register As</SubHeading>
          <FormControl 
            fullWidth 
            error={errors.userType && touched.userType ? true : false}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '&:hover fieldset': {
                  borderColor: '#667eea',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
            }}
          >
            <Select
              name="userType"
              value={values.userType}
              onChange={handleChange}
              onBlur={handleBlur}
              displayEmpty
              sx={{
                borderRadius: '8px',
                backgroundColor: '#ffffff',
              }}
            >
              <MenuItem value="" disabled>
                Select Account Type
              </MenuItem>
              <MenuItem value="user">User (Patient)</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </Select>
            {errors.userType && touched.userType && (
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.userType}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box sx={{ height: "95px" }}>
          <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>Password</SubHeading>
          <PrimaryInput
            type={showPassword ? "text" : "password"}
            label=""
            name="password"
            placeholder="Password"
            value={values.password}
            helperText={errors.password && touched.password ? errors.password : ""}
            error={errors.password && touched.password ? true : false}
            onChange={handleChange}
            onBlur={handleBlur}
            onClick={hideShowPassword}
            endAdornment={
              showPassword ? (
                <AiOutlineEye color="disabled" />
              ) : (
                <AiOutlineEyeInvisible color="disabled" />
              )
            }
          />
        </Box>

        {/* Already Have an Account Section */}
        <Box sx={{ textAlign: "center", marginTop: "15px" }}>
          <SubHeading sx={{ color: "#4a5568", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                fontWeight: "600",
                color: "#667eea",
                textDecoration: "none",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Login
            </Link>
          </SubHeading>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              padding: "12px 30px",
              textTransform: "capitalize",
              margin: "20px 0",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #653a8b 100%)",
                boxShadow: "0 6px 16px rgba(102, 126, 234, 0.4)",
              },
              "&:disabled": {
                background: "#e0e0e0",
                color: "#9e9e9e",
              },
            }}
          >
            {isLoading ? "Sign Up..." : "Sign Up"}
          </Button>
        </Box>
      </Form>
    );
  }}
</Formik>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default Signup;
