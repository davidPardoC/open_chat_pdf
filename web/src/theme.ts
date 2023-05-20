import { extendTheme } from "@chakra-ui/react";

export const darkTheme = extendTheme({
  colors: { primary: "#7928CA" },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "primary",
          color: "white",
        },
        secondary: {
          bg: "white",
          color: "black",
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "rgb(6, 2, 36)",
        color: "white",
      },
    },
  },
});
