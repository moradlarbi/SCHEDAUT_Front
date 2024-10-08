// React TS Base Styles
import { typography } from '../../typography'
import { palette } from '../../palette'
// React TS helper functions

const { secondary, info, grey, primary } = palette

// types
type Types = any

export default function InputOutlined() {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: grey[0],
          fontSize: typography.body2,
          borderRadius: 8,
          fontFamily: typography.fontFamily,

          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${primary.light}`,
          },

          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: info.main,
            },
          },
        },

        notchedOutline: {
          borderColor: secondary.light,
        },

        input: {
          color: primary.dark,
          padding: 12,
        },

        inputSizeSmall: {
          fontSize: 14,
          padding: 0,
        },
      },
    },
  }
}