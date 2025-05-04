import { TransitionSlide } from "./transition/TransitionSlide";
import { TransitionFade } from "./transition/TransitionFade";

export class StyleSystem {
    private constructor() {}

    public static text = {
        disableSelection: "select-none",
    };

    public static transition = {
        slide: new TransitionSlide().style(),
        fade: new TransitionFade().style(),
    };
}
