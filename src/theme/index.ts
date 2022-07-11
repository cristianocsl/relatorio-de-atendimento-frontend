import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    green: {
      1: '#D7F5FF',
      2: '#A9DBEC',
      3: '#85BFD3',
      4: '#5EA3BB',
      5: '#3D8299',
      6: '#216177',
      7: '#114B5F',
      8: '#084155',
      9: '#032F3F',
    },
    wine: {
      1: '#FFE3F1',
      2: '#F3C9DE',
      3: '#D386AC',
      4: '#B9608C',
      5: '#9D3E6D',
      6: '#791F4C',
      7: '#55052D',
      8: '#38001C',
    },
    brown: {
      1: '#FFEDE4',
      2: '#F5D4C3',
      3: '#E9C2AE',
      4: '#D4A790',
      5: '#B9876E'
    },
    warning: '#9D0400',
  },
  breakpoints: {
    sm: '391px',
    ssm: '412px',
    smm: '540px',
    md: '768px',
    lg: '913px',
    xl: '1200px',
    '2xl': '1536px',
  },
  styles: {
    global: {
      body: {
        height: '100vh',
        margin: '0px',
        bg: 'linear-gradient(180deg, #A9DBEC 49.48%, #114B5F 100%) fixed',
        color: 'black',
        textAlign: 'center',
      },
      html: {
        height: '100vh',
      }
    },
    fonts: {
      heading: 'Roboto',
      body: 'Roboto',
    },
  },
  components: {
    Checkbox: { // can be Radio
      baseStyle: {
        container: {
          touchAction: 'none',
        },
      },
    },
  },
});

export default theme;