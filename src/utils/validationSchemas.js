import * as yup from 'yup';

export const shopSchema = yup.object({
  name: yup
    .string()
    .required('Shop name is required')
    .min(2, 'Shop name must be at least 2 characters')
    .max(100, 'Shop name must not exceed 100 characters'),
  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must not exceed 200 characters'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  owner: yup
    .string()
    .required('Owner name is required')
    .min(2, 'Owner name must be at least 2 characters'),
  description: yup
    .string()
    .max(500, 'Description must not exceed 500 characters'),
  status: yup
    .string()
    .oneOf(['active', 'inactive'], 'Status must be either active or inactive')
    .required('Status is required'),
});

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
