// React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// MUI Imports
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// Utils
import { onKeyDown } from "../../utils";
// Formik Imports
import { Form, Formik, FormikProps } from "formik";
// Hooks
import useTypedSelector from "../../hooks/useTypedSelector";
// Redux
import {
  selectedUserEmail,
  selectedUserId,
  selectedUserName,
  selectedUserPhoneNumber,
} from "../../redux/auth/authSlice";
import {
  useDoctorSignupMutation,
  useGetDoctorQuery,
} from "../../redux/api/doctorSlice";
// Custom Imports
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import PrimaryPhoneInput from "../../components/PhoneInput";
import { Heading, SubHeading } from "../../components/Heading";
import Navbar from "../../components/Navbar";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
// Validation Schema
import { applyDoctorSchema } from "./components/validationSchema";

interface applyDoctorForm {
  prefix: string;
  fullName: string;
  phoneNumber: string;
  website: string;
  address: string;
  specialization: string;
  experience: string;
  feePerConsultation: string;
  fromTime: string | null;
  toTime: string | null;
  certificate: File | null;
}

const stepsStyle = {
  position: "absolute",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#fff",
  left: "-40px",
  width: "35px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderTopLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  fontWeight: 600,
};

const ApplyDoctor = () => {
  const navigate = useNavigate();
  const userEmail = useTypedSelector(selectedUserEmail);
  const userId = useTypedSelector(selectedUserId);
  const userPhoneNumber = useTypedSelector(selectedUserPhoneNumber);
  const userName = useTypedSelector(selectedUserName);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<applyDoctorForm>({
    prefix: "Dr.",
    fullName: userName,
    phoneNumber: userPhoneNumber,
    website: "",
    address: "",
    specialization: "",
    experience: "",
    feePerConsultation: "",
    fromTime: null,
    toTime: null,
    certificate: null,
  });

  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const [applyDoctor, { isLoading }] = useDoctorSignupMutation();

  const applyDoctorHandler = async (data: applyDoctorForm) => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('prefix', data.prefix);
      formData.append('fullName', data.fullName);
      formData.append('email', userEmail);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('website', data.website);
      formData.append('address', data.address);
      formData.append('specialization', data.specialization);
      formData.append('experience', data.experience);
      formData.append('feePerConsultation', data.feePerConsultation);
      formData.append('fromTime', data?.fromTime ? String(data.fromTime) : '');
      formData.append('toTime', data?.toTime ? String(data.toTime) : '');
      if (data.certificate) {
        formData.append('certificate', data.certificate);
      }

      // Debug: log what we're submitting
      console.log('Submitting doctor application with certificate:', data.certificate?.name);

      const user: any = await applyDoctor(formData);

      if (user?.data?.status) {
        setToast({
          ...toast,
          message: "Doctor Account Applied Successfully",
          appearence: true,
          type: "success",
        });
        setTimeout(() => {
          navigate("/");
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
      console.error("Doctor Sign Up Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  // Doctor Get API
  const { data, isLoading: doctorLoading } = useGetDoctorQuery({
    userId,
  });

  return (
    <>
      {doctorLoading && <OverlayLoader />}

      <Navbar>
        <Box>
          <Heading>Apply For Doctor</Heading>
          {data?.data?.status ? (
            <Grid container rowSpacing={2} columnSpacing={4}>
              <Box
                sx={{
                  margin: "30px 0 20px 0",
                  background: "linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%)",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  boxShadow: "0 4px 16px rgba(245, 166, 35, 0.15)",
                  border: "1px solid #f5a623",
                  color: "#8b5a00",
                  fontWeight: 500,
                  fontSize: "15px",
                }}
              >
                You already applied please wait for Admin Approval
              </Box>
            </Grid>
          ) : (
            <Box
              sx={{
                margin: "20px 0",
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
                borderRadius: "12px",
                padding: "20px 25px",
                boxShadow: "0 8px 32px rgba(102, 126, 234, 0.12)",
                border: "1px solid #e8ecf1",
              }}
            >
              <SubHeading
                sx={{
                  marginBottom: "20px",
                  fontSize: "17px",
                  position: "relative",
                  color: "#4a5568",
                  fontWeight: 600,
                }}
              >
                <Box sx={stepsStyle}>1</Box>
                Basic Information
              </SubHeading>
              <Box>
                <Formik
                  initialValues={formValues}
                  onSubmit={(values: applyDoctorForm) => {
                    applyDoctorHandler(values);
                  }}
                  validationSchema={applyDoctorSchema}
                >
                  {(props: FormikProps<applyDoctorForm>) => {
                    const {
                      values,
                      touched,
                      errors,
                      handleBlur,
                      handleChange,
                      setFieldValue,
                    } = props;

                    return (
                      <Form onKeyDown={onKeyDown}>
                        <Grid container rowSpacing={2} columnSpacing={4}>
                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>
                                Prefix
                              </SubHeading>
                              <PrimaryInput
                                type="text"
                                label=""
                                name="prefix"
                                placeholder="Prefix"
                                value={values.prefix}
                                readOnly={true}
                                helperText={
                                  errors.prefix && touched.prefix
                                    ? errors.prefix
                                    : ""
                                }
                                error={
                                  errors.prefix && touched.prefix ? true : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>
                                Full Name
                              </SubHeading>
                              <PrimaryInput
                                type="text"
                                label=""
                                name="fullName"
                                placeholder="Full Name"
                                value={values.fullName}
                                readOnly={true}
                                sx={{ cursor: "not-allowed" }}
                                helperText={
                                  errors.fullName && touched.fullName
                                    ? errors.fullName
                                    : ""
                                }
                                error={
                                  errors.fullName && touched.fullName
                                    ? true
                                    : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box
                              sx={{
                                marginBottom: "10px",
                              }}
                            >
                              <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>
                                Mobile Number
                              </SubHeading>
                              <PrimaryPhoneInput
                                value={values.phoneNumber}
                                name="phoneNumber"
                                formik={props}
                                variant="outlined"
                                label=""
                                readOnly={true}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>
                                Website
                              </SubHeading>
                              <PrimaryInput
                                type="text"
                                label=""
                                name="website"
                                placeholder="Website"
                                value={values.website}
                                helperText={
                                  errors.website && touched.website
                                    ? errors.website
                                    : ""
                                }
                                error={
                                  errors.website && touched.website
                                    ? true
                                    : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>
                                Address
                              </SubHeading>
                              <PrimaryInput
                                type="text"
                                label=""
                                name="address"
                                placeholder="Address"
                                value={values.address}
                                helperText={
                                  errors.address && touched.address
                                    ? errors.address
                                    : ""
                                }
                                error={
                                  errors.address && touched.address
                                    ? true
                                    : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                        <SubHeading
                          sx={{
                            margin: "20px 0",
                            fontSize: "17px",
                            position: "relative",
                            color: "#4a5568",
                            fontWeight: 600,
                          }}
                        >
                          <Box sx={stepsStyle}>2</Box>
                          Professional Information
                        </SubHeading>

                        <Grid container rowSpacing={2} columnSpacing={4}>
                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>
                                Specialization
                              </SubHeading>
                              <PrimaryInput
                                type="text"
                                label=""
                                name="specialization"
                                placeholder="Specialization"
                                value={values.specialization}
                                helperText={
                                  errors.specialization &&
                                  touched.specialization
                                    ? errors.specialization
                                    : ""
                                }
                                error={
                                  errors.specialization &&
                                  touched.specialization
                                    ? true
                                    : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>
                                Experience
                              </SubHeading>
                              <PrimaryInput
                                type="number"
                                label=""
                                name="experience"
                                placeholder="Experience"
                                value={values.experience}
                                helperText={
                                  errors.experience && touched.experience
                                    ? errors.experience
                                    : ""
                                }
                                error={
                                  errors.experience && touched.experience
                                    ? true
                                    : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>
                                Fee Per Consultation
                              </SubHeading>
                              <PrimaryInput
                                type="number"
                                label=""
                                name="feePerConsultation"
                                placeholder="Fee Per Consultation"
                                value={values.feePerConsultation}
                                helperText={
                                  errors.feePerConsultation &&
                                  touched.feePerConsultation
                                    ? errors.feePerConsultation
                                    : ""
                                }
                                error={
                                  errors.feePerConsultation &&
                                  touched.feePerConsultation
                                    ? true
                                    : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>
                                Start Time
                              </SubHeading>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                  <TimePicker
                                    label=""
                                    value={values.fromTime}
                                    onChange={(value) => {
                                      setFieldValue("fromTime", value);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </Stack>
                                {errors.fromTime && touched.fromTime && (
                                  <Box
                                    sx={{
                                      color: "#d32f2f",
                                      marginLeft: "2px",
                                      fontSize: "0.7rem",
                                    }}
                                  >
                                    {errors.fromTime}
                                  </Box>
                                )}
                              </LocalizationProvider>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>
                                End Time
                              </SubHeading>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                  <TimePicker
                                    label=""
                                    value={values.toTime}
                                    onChange={(value) => {
                                      setFieldValue("toTime", value);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </Stack>
                                {errors.toTime && touched.toTime && (
                                  <Box
                                    sx={{
                                      color: "#d32f2f",
                                      marginLeft: "2px",
                                      fontSize: "0.7rem",
                                    }}
                                  >
                                    {errors.toTime}
                                  </Box>
                                )}
                              </LocalizationProvider>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px", color: "#4a5568", fontWeight: 500 }}>
                                MBBS Certificate *
                              </SubHeading>
                              <Button
                                variant="outlined"
                                component="label"
                                sx={{
                                  width: "100%",
                                  padding: "10px",
                                  textTransform: "none",
                                  justifyContent: "flex-start",
                                }}
                              >
                                {values.certificate ? values.certificate.name : "Upload Certificate"}
                                <input
                                  type="file"
                                  hidden
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={(event) => {
                                    if (event.target.files && event.target.files[0]) {
                                      setFieldValue("certificate", event.target.files[0]);
                                    }
                                  }}
                                  onBlur={handleBlur}
                                  name="certificate"
                                />
                              </Button>
                              {errors.certificate && touched.certificate && (
                                <Box
                                  sx={{
                                    color: "#d32f2f",
                                    marginLeft: "2px",
                                    fontSize: "0.7rem",
                                    marginTop: "5px",
                                  }}
                                >
                                  {errors.certificate}
                                </Box>
                              )}
                            </Box>
                          </Grid>
                        </Grid>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            marginTop: "20px",
                          }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                              padding: "12px 40px",
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
                            {isLoading ? "Apply..." : "Apply"}
                          </Button>
                        </Box>
                      </Form>
                    );
                  }}
                </Formik>
              </Box>
            </Box>
          )}
        </Box>
      </Navbar>
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default ApplyDoctor;
