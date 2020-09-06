import { FormikActions } from 'formik'
import React, { useCallback, useState } from 'react'
import { Redirect } from 'react-router-dom'

import {
  FormValues,
  SignInTemplate,
} from '../../components/templates/SignInTemplate'
import firebase from '../../services/Firebase'

export const SignIn: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false)
  const onSubmit = useCallback(
    async (values: FormValues, { setSubmitting }: FormikActions<any>) => {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password)
        if (response.user) {
          setIsComplete(true)
        } else {
          setIsComplete(false)
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e)
      } finally {
        setSubmitting(false)
      }
    },
    []
  )

  if (isComplete) {
    return <Redirect to="/" />
  }
  return (
    <>
      <SignInTemplate onSubmit={onSubmit} />
    </>
  )
}
