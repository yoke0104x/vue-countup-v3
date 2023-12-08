import VueCountUp, { CountUpProps } from "./vueCountUp/index.vue"
import { App } from "vue";


export {
    VueCountUp
};

export type { CountUpProps };

export default {
    install: (app: App) => {
        app.component(VueCountUp.name, VueCountUp);
    },
};