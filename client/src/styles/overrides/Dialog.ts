export default function Dialog(theme: any) {
    return {
      MuiDialog: {
        styleOverrides: {
          root: {
            color: theme.palette.grey[0],
          },
          paper: {
            boxShadow: 'none',
          },
        },
      },
    }
  }