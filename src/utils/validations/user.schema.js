import * as yup from "yup";

export const userSchema = yup.object({
  fullname: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  phone_no: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  address: yup.string().required("Address is required"),
  role: yup
    .string()
    .oneOf(
      ["admin", "manager", "staff"],
      "Role must be admin, manager, or staff"
    )
    .required("Role is required"),
  // status: yup
  //   .string()
  //   .oneOf(["active", "inactive"], "Status must be either active or inactive")
  //   .required("Status is required"),
});
