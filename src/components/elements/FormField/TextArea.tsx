import { FormControl, FormHelperText, makeStyles } from '@material-ui/core'
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core/TextField'
import { Field, FieldProps, getIn } from 'formik'
import React from 'react'

export type Props = { name: string; fieldStyle: 'normal' | 'required' } & Pick<
  MuiTextFieldProps,
  'label' | 'placeholder' | 'type' | 'multiline' | 'rows' | 'onBlur'
>
const usesStyles = makeStyles(() => ({
  errorMessage: {
    textAlign: 'right',
  },
}))

export const TextArea: React.FC<Props> = ({ name, fieldStyle, ...props }) => {
  const classes = usesStyles()

  return (
    <Field name={name}>
      {({ form, field }: FieldProps) => {
        const { touched, errors, isSubmitting } = form

        const fieldError = getIn(errors, name)
        const showError = getIn(touched, name) && !!fieldError

        return (
          <FormControl fullWidth error={showError} disabled={isSubmitting}>
            <FormHelperText className={classes.errorMessage}>
              {showError ? fieldError : ' '}
            </FormHelperText>
            <MuiTextField
              {...field}
              {...props}
              multiline
              rows="5"
              variant="outlined"
              error={showError}
              disabled={isSubmitting}
              fullWidth
              inputProps={{
                style: {
                  backgroundColor: '#F9F9F9',
                  padding: '1rem',
                  borderRadius: '4px',
                },
              }}
            />
          </FormControl>
        )
      }}
    </Field>
  )
}
