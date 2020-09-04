import { Typography } from '@material-ui/core'
import { FormikActions } from 'formik'
import React, { useCallback, useState } from 'react'

import {
  FormValues,
  SignUpTemplate,
} from '../../components/templates/SignUpTemplate'
import firebase from '../../services/Firebase'

export const SignUp: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false)

  const onSubmit = useCallback(
    async (values: FormValues, { setSubmitting }: FormikActions<any>) => {
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
        if (response.user) {
          console.log(response.user)
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
    return (
      <>
        <Typography component="h3" variant="h3">
          会員登録を受け付けました
        </Typography>
      </>
    )
  }
  return (
    <>
      <SignUpTemplate onSubmit={onSubmit} />
    </>
  )
}
