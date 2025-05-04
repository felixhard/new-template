import { Transition } from "./Transition";

export class TransitionSlide extends Transition {
    constructor() {
        super({
            target: "transition",
            duration: "duration-300",
            timingFunction: "ease-in-out",
            delay: "delay-0",
        });
    }
}
