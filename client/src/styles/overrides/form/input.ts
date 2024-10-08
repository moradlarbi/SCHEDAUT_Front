// React TS Base Styles
import { palette } from '../../palette'
import { typography } from '../../typography'

const { info, primary } = palette
const inputBorderColor = primary.main

// types
type Types = any

const InputBase = () => {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '15px',
          color: primary.dark,
          fontWeight: 500,

          '&:hover:not(.Mui-disabled):before': {
            borderBottom: `1px solid ${inputBorderColor}`,
          },

          '&:before': {
            borderColor: primary.main,
          },

          '&:after': {
            borderColor: info.main,
          },
        },
      },
    },
  }
}

export default InputBase