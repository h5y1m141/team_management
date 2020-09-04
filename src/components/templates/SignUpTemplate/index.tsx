import { Box, Button, Grid, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

import { FormikOnSubmit } from '../../../utils/FormikHelper'
import FormField from '../../elements/FormField'
import { SignUpSchema } from './SignUpSchema'

const initialValues = {
  email: '',
  password: '',
}
export type FormValues = typeof initialValues
const validationSchema = yup.object(SignUpSchema)

type Props = {
  onSubmit: FormikOnSubmit<FormValues>
}

export const SignUpTemplate: React.FC<Props> = ({ onSubmit }) => {
  return (
    <>
      <Grid container spacing={1}>
        <Box p={4}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h2">
              会員登録ページ
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              render={({ isSubmitting }) => {
                return (
                  <Form>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <FormField.TextField
                          name="email"
                          label="Email"
                          fieldStyle="required"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormField.TextField
                          name="password"
                          label="パスワード"
                          fieldStyle="required"
                          type="password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormField.TextField
                          name="passwordConfirmation"
                          label="パスワード確認"
                          fieldStyle="required"
                          type="password"
                        />
                      </Grid>
                    </Grid>

                    <Button
                      color="secondary"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      上記内容で登録する
                    </Button>
                  </Form>
                )
              }}
            />
          </Grid>
        </Box>
      </Grid>
    </>
  )
}
