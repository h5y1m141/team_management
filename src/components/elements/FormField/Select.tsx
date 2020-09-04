import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core'
import { Field, FieldProps, getIn } from 'formik'
import React from 'react'

export type Options = {
  id: string
  name: string
}

type Props = {
  name: string
  label: string
  options: Options[]
  fieldStyle: 'normal' | 'required'
}

export const Select: React.FC<Props> = ({
  name,
  label,
  options,
  fieldStyle = 'normal',
}) => {
  const classes = useStyles({})
  return (
    <Field name={name}>
      {({ form, field }: FieldProps) => {
        const { touched, errors, isSubmitting } = form

        const fieldError = getIn(errors, name)
        const showError = getIn(touched, name) && !!fieldError

        return (
          <FormControl
            fullWidth
            variant="outlined"
            error={showError}
            disabled={isSubmitting}
          >
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <MuiSelect
              {...field}
              className={
                fieldStyle === 'normal' ? classes.normal : classes.required
              }
              name={name}
              inputProps={{
                name,
                id: name,
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </MuiSelect>
            <FormHelperText>{showError ? fieldError : ' '}</FormHelperText>
          </FormControl>
        )
      }}
    </Field>
  )
}
const useStyles = makeStyles(() => ({
  normal: {},
  required: {},
}))
