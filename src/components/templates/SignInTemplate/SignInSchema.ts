import * as yup from 'yup'

export const SignInSchema = {
  email: yup.string().required(),
  password: yup.string().required(),
}
