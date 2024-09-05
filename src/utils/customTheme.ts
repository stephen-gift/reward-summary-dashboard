import { mode } from "@chakra-ui/theme-tools";
import { Colors, extendTheme, StyleProps, ThemeConfig } from "@chakra-ui/react";

export const colors: Colors = {};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: (props: StyleProps) => ({
    body: {
      bg: mode("white", "dark.900")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
      fontVariant: "normal",
    },
  }),
};

const customTheme = extendTheme({
  colors,
  config,
  styles,
});

export default customTheme;
