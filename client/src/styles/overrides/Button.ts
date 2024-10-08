import { palette } from '../palette'
import shadows from '../shadows'

export default function Button(theme: any) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          // minWidth: 100,
          borderRadius: 8,
          fontWeight: 800,
          lineHeight: '20px',
        },
        containedPrimary: {
          '&:disabled': {
            color: theme.palette?.primary.dark,
          },
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        },
        containedSecondary: {
          backgroundColor: theme.palette?.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.grey[300],
          },
        },
        outlinedInherit: {
          border: `2px solid ${theme.palette.secondary.light}`,
          backgroundColor: theme.palette.grey[0],
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            boxShadow: theme.shadows[2],
          },
        },
      },
    },
  }
}