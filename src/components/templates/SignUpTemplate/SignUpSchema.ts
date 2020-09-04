import * as yup from 'yup'

export const SignUpSchema = {
  email: yup.string().required(),
  password: yup.string().required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), 'test'])
    .required('Password confirm is required'),
}
