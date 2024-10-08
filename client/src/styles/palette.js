function createGradient(color1, color2) {
    return `linear-gradient(to bottom, ${color1}, ${color2})`;
  }
  
  const SHADES = {
    0: "#FFFFFF",
    100: "#F5F5F5",
    200: "#1976D2",
    300: "#E8F3FF",
  };
  
  const PRIMARY = {
    // lighter: "#a0ecff",
    light: "#E8F3FF",
    main: "#0A70E2",
    dark: "#626262",
    darker: "#000000",
    contrastText: "#fff",
  };
  
  const SECONDARY = {
    lighter: "#F6F6F6",
    light: "#E9E9E9",
    main: "#ACACAC",
    dark: "#0AA1E2",
    // darker: "#091A7A",
    contrastText: "#fff",
  };
  
  const INFO = {
    lighter: "#D0F2FF",
    light: "#74CAFF",
    main: "#1890FF",
    dark: "#0C53B7",
    darker: "#04297A",
    contrastText: "#fff",
  };
  
  const SUCCESS = {
    lighter: "#E9FCD4",
    light: "#AAF27F",
    main: "#66BB6A",
    dark: "#229A16",
    darker: "#08660D",
    contrastText: "#fff",
  };
  
  const WARNING = {
    lighter: "#FFF7CD",
    light: "#FFE16A",
    main: "#ED6C02",
    dark: "#B78103",
    darker: "#7A4F01",
    dialog: "#EF7E21",
    datagrid: "#FFF0F0",
    contrastText: "#fff",
  };
  
  const ERROR = {
    lighter: "#FFE7D9",
    light: "#FFA48D",
    main: "#FF2828",
    dark: "#B72136",
    dialog: "#FF5A5A",
    darker: "#7A0C2E",
    contrastText: "#fff",
  };
  const GRADIENTS = {
    primary: createGradient(SECONDARY.lighter, SECONDARY.light),
  };
  
  export const palette = {
    primary: {
      ...PRIMARY,
    },
  
    secondary: {
      ...SECONDARY,
    },
    info: { ...INFO },
    success: { ...SUCCESS },
    warning: { ...WARNING },
    error: { ...ERROR },
    grey: SHADES,
    gradients: GRADIENTS,
  };