import * as yup from 'yup';

export const userSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
  role: yup
    .string()
    .oneOf(['admin', 'manager', 'staff'], 'Role must be admin, manager, or staff')
    .required('Role is required'),
  shopId: yup
    .string()
    .required('Shop assignment is required'),
  status: yup
    .string()
    .oneOf(['active', 'inactive'], 'Status must be either active or inactive')
    .required('Status is required'),
});

export const userCreateSchema = userSchema.concat(
  yup.object({
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  })
);
