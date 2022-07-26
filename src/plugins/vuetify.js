// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const defaultTheme = {
  dark: true,
  colors: {
    background: '#25282c',
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
};

export default createVuetify({
  theme: {
    defaultTheme: "defaultTheme",
    themes: {
      defaultTheme
    }
  }
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
})
