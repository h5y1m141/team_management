import { FormControl, FormLabel, Grid, makeStyles } from '@material-ui/core'
import { Form } from 'formik'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import firebase, { storage } from '../../services/Firebase'

export const Team: React.FC = () => {
  const [imageURL, setImageURL] = useState('')
  const next = (snapshot: any) => {
    // eslint-disable-next-line no-console
    console.log(snapshot)
  }
  const error = () => {
    // eslint-disable-next-line no-console
    console.log('error')
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]

    const uploadTask = storage.ref(`/images/${file.name}`).put(file)
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, next, error, () => {
      storage
        .ref('images')
        .child(file.name)
        .getDownloadURL()
        .then((fireBaseUrl) => {
          setImageURL(fireBaseUrl)
        })
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'application/pdf, image/*',
    multiple: true,
    onDrop,
  })

  const classes = styles()

  return (
    <>
      <h3>チーム情報</h3>
      <p>ロゴのアップロード</p>
      <Form>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="flex-start"
        >
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <FormLabel className={classes.label}>
                アイコンアップロード
              </FormLabel>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div>
                  {isDragActive
                    ? 'ここにファイルをドラッグしてください'
                    : 'ここをタップしてファイルをアップロードしてください'}
                </div>
              </div>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {imageURL && <img src={imageURL} alt="アップロード画像" />}
          </Grid>
        </Grid>
      </Form>
    </>
  )
}
const styles = makeStyles((theme) => ({
  label: {
    marginBottom: theme.spacing(2),
  },
}))
