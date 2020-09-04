import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00C5F0',
    },
    secondary: {
      main: '#E62A00',
    },
  },
  typography: {
    fontFamily: '"Noto Sans", "Noto Sans CJK JP", sans-serif',
    button: {
      fontWeight: 'bold',
      textTransform: 'inherit',
    },
  },
})
