import postcss from "./postcss.config.cjs";
import { sveltekit } from "@sveltejs/kit/vite";

const config = {
    plugins: [sveltekit()],
    css: {
        postcss,
    },
};

export default config;
