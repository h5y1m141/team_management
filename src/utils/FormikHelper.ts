import { FormikActions, FormikErrors } from 'formik'

export type FormikValidate<T> = (values: T) => FormikErrors<T>
export type FormikOnSubmit<T> = (values: T, actions: FormikActions<T>) => void
