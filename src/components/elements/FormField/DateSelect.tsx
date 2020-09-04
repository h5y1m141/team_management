import { FormControl, makeStyles } from '@material-ui/core'
import { Japanese } from 'flatpickr/dist/l10n/ja'
import { Field, FieldProps, getIn } from 'formik'
import React from 'react'
import Flatpickr from 'react-flatpickr'

export type Props = {
  name: string
  defaultValue: string
}

export const DateSelect: React.FC<Props> = ({ name, defaultValue }) => {
  const classes = useStyles({})

  return (
    <Field name={name}>
      {({ form }: FieldProps) => {
        const { touched, errors, isSubmitting } = form

        const fieldError = getIn(errors, name)
        const showError = getIn(touched, name) && !!fieldError
        const onChange = (value: Date[]) => {
          form.setFieldValue(name, value[0])
        }

        return (
          <FormControl fullWidth error={showError} disabled={isSubmitting}>
            <div className={classes.root}>
              <Flatpickr
                defaultValue={defaultValue}
                className={classes.calendar}
                onChange={onChange}
                options={{
                  locale: {
                    ...Japanese,
                    firstDayOfWeek: 0,
                  },
                  enableTime: true,
                  dateFormat: 'Y-m-d',
                  showMonths: 1,
                }}
              />
            </div>
          </FormControl>
        )
      }}
    </Field>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {},
  // Note:borderの色は本来は#DD0000ですがMuiInputBaseで透明度設定された色が実際の画面に反映されるため
  // 実際に画面に表示されてるの#A31312
  calendar: {
    marginTop: theme.spacing(3),
    border: '1px solid #BFBFBF',
    backgroundColor: '#F9F9F9',
    padding: theme.spacing(1),
    width: '100%',
    fontFamily: '"Noto Sans", "Noto Sans CJK JP", sans-serif',
    fontSize: '0.875rem',
    lineHeight: '2rem',
    borderRadius: '4px',
  },
}))
