import { useMemo } from "react";

// material
import { CssBaseline } from "@mui/material";

import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
//
import { palette } from "./palette";
import { typography } from "./typography";
//import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";
import ComponentsOverrides from "./overrides";
import breakpoints from "./breakpoints";
import { light } from "@mui/material/styles/createPalette";

// ----------------------------------------------------------------------

export const objectTheme = {
  palette,
  shape: { borderRadius: 8 },
  typography,
  shadows,
  customShadows,
  breakpoints,
};

// eslint-disable-next-line react/prop-types
export default function ThemeProvider({ children }) {
  const themeOptions = useMemo(() => objectTheme, []);

  const theme = createTheme(themeOptions);

  theme.components = ComponentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <>
          <CssBaseline />
          {children}
        </>
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}