export const mode = "jit";
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./public/index.html",
  "node_modules/flowbite-react/lib/esm/**/*.js",
];
export const media = false;
export const theme = {
  extend: {
    screens: {
      md: "880px",
      "custom-lg": "1024",
    },
  },
};
export const variants = {
  extend: {},
};
// eslint-disable-next-line no-undef
export const plugins = [require("flowbite/plugin")];
