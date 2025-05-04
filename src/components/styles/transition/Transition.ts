import { BaseStyle } from "../BaseStyle";

type AnimationOptions = {
    target: string;
    duration: string;
    timingFunction: string;
    delay: string;
};

export abstract class Transition extends BaseStyle {
    constructor(private readonly options: AnimationOptions) {
        super();
    }

    public target(target: string): Transition {
        this.options.target = target;
        return this;
    }

    public style() {
        return `${this.options.target} ${this.options.duration} ${this.options.timingFunction} ${this.options.delay}`;
    }
}
