import { Grid, Typography } from '@material-ui/core'
import React from 'react'

export const Header: React.FC = () => {
  return (
    <>
      <Grid container justify="flex-end">
        <Typography component="h1" variant="h1">
          名前
        </Typography>
      </Grid>
    </>
  )
}
