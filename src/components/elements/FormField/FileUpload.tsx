import { FormControl, FormLabel, makeStyles } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

// ToDo: multipart/form-dataなフォームを送信する時のformの型定義
// すぐにわからずanyにしてるけど型定義を本来あるべき形に修正する必要ある
type Props = {
  label: string
  accept?: string
  multiple?: boolean
  formName: string
  uploadFile: (form: any) => void
}

export const FileUpload: React.FC<Props> = ({
  label,
  accept,
  multiple,
  formName,
  uploadFile,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (multiple) {
        const form = new FormData()
        acceptedFiles.forEach((file: File) => {
          form.append(formName, file)
        })
        ;(async () => {
          try {
            uploadFile(form)
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e)
          }
        })()
      } else {
        const file = acceptedFiles[0]
        if (file) {
          const form = new FormData()
          form.append(formName, file)
          ;(async () => {
            try {
              uploadFile(form)
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error(e)
            }
          })()
        }
      }
    },
    [formName, multiple, uploadFile]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    onDrop,
  })
  const classes = styles()
  return (
    <FormControl fullWidth>
      <FormLabel className={classes.label}>{label}</FormLabel>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div>
          {isDragActive
            ? 'ここにファイルをドラッグしてください'
            : 'ここをタップしてファイルをアップロードしてください'}
        </div>
      </div>
    </FormControl>
  )
}
const styles = makeStyles((theme) => ({
  label: {
    marginBottom: theme.spacing(2),
  },
}))
