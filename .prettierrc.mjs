/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  bracketSameLine: true,
  printWidth: 160,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
