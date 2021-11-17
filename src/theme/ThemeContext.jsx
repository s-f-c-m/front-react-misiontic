import { createContext, useReducer } from 'react';

const ThemeContext = createContext();

const defaultTheme = {
  light: false,
  mainColor1: "#289dff",
  mainColor2: "#ff8a28",
  secondaryColor1: "#7bc3ff",
  mainColor1Shadow1: "#2285d9",
  mainColor1Shadow2: "#2eb5ff",
  icon: "fa fa-sun-o",
  iconPosition: "flex-start"
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'LIGHTTHEME':
      return (
        {
          light: true,
          mainColor1: "#4a73b5",
          mainColor1Shadow2: "#5584d0",
          mainColor1Shadow1: "#3f629a",
          mainColor2: "#d2a65e",
          secondaryColor1: "#7bc3ff",
          icon: "fa fa-moon-o",
          iconPosition: "flex-end"
        }
      );
    case 'DARKTHEME':
      return (
        {
          light: false,
          mainColor1: "#289dff",
          mainColor2: "#ff8a28",
          secondaryColor1: "#7bc3ff",
          mainColor1Shadow1: "#2285d9",
          mainColor1Shadow2: "#2eb5ff",
          icon: "fa fa-sun-o",
          iconPosition: "flex-start"
        }
      );
    default:
      return state;
  }
};

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, defaultTheme);

  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>
}

export { ThemeContext, ThemeProvider }
