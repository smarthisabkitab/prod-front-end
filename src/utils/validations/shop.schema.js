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