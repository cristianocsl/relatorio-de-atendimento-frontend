import { createTheme } from '@mui/material';

declare module '@mui/material/' {
  interface Palette {
    custom1: Palette['primary'];
  }
  interface PaletteOptions {
    custom1: PaletteOptions['primary'];
  }
  interface Theme {
    custom2: {
      main2: React.CSSProperties['color'];
    };
  }
  interface ThemeOptions {
    custom2: {
      main2: React.CSSProperties['color'];
    };
  }
}

const theme = createTheme({
  palette: {
    primary: { main: '#38001C' }, 
    custom1: { main: '#FFE3F1' },
  },
  custom2: { main2: '#114B5F' },
})

export default theme;
