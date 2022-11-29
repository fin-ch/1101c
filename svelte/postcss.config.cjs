import tailwind from "tailwindcss";
import tailwindConfig from "./tailwind.config.cjs";
import autoprefixer from "autoprefixer";

// module.exports = {
//     plugins: {
//         tailwindcss: {},
//         autoprefixer: {},
//     },
// };

module.exports = {
    plugins: [tailwind(tailwindConfig), autoprefixer],
};
