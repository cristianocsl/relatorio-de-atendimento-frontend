import { createTheme } from '@mui/material';

declare module '@mui/material/' {
  interface Palette {
    wine: Palette['primary'];
  }
  interface PaletteOptions {
    wine: PaletteOptions['primary'];
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
    wine: { main: '#FFE3F1' },
  },
  custom2: { main2: '#FF0000' },
})

export default theme;
