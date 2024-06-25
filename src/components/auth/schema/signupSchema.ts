import * as yup from "yup";

export const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
  phone_number: yup.string().required("Phone number is required"),
//   address: yup.string().required("Address is required"),
//   city: yup.string().required("City is required"),
//   country: yup.string().required("Country is required"),
//   postalCode: yup.string().required("Postal code is required"),
});
