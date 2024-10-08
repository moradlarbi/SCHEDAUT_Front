export default function TextField(theme: any) {
    return {
      MuiTextField: {
        styleOverrides: {
          defaultProps: {
            InputProps: {
              fontFamily: theme.typography.fontFamily,
              fontSize: '24px',
              fontWeight: 600,
            },
          },
          root: {
            borderRadius: 4,
          },
        },
      },
    }
  }