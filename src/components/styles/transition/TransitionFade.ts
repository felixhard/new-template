import { Transition } from "./Transition";

export class TransitionFade extends Transition {
    constructor() {
        super({
            target: "transition-opacity",
            duration: "duration-300",
            timingFunction: "ease-in-out",
            delay: "delay-0",
        });
    }
}
