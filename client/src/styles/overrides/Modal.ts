export default function Modal(theme: any) {
    return {
      MuiModal: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            border: `1px solid ${theme.palette.primary.light}`,
          },
        },
      },
    }
  }