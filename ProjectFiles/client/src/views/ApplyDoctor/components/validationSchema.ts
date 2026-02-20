import * as Yup from "yup";

export const applyDoctorSchema = Yup.object().shape({
  prefix: Yup.string().required("Prefix is required"),
  fullName: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  //   website is not required
  website: Yup.string().nullable(),
  address: Yup.string().required("Address is required"),
  specialization: Yup.string().required("Specialization is required"),
  experience: Yup.string().required("Experience is required"),
  feePerConsultation: Yup.string().required("Fee Per Consultation is required"),
  fromTime: Yup.string().required("From Time is required"),
  toTime: Yup.string().required("To Time is required"),
  certificate: Yup.mixed()
    .required("MBBS Certificate is required")
    .test("fileSize", "File size must be less than 5MB", (value: any) => {
      if (!value) return false;
      return value.size <= 5000000;
    })
    .test("fileType", "Only PDF, JPG, JPEG, and PNG files are allowed", (value: any) => {
      if (!value) return false;
      return ["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(value.type);
    }),
});
