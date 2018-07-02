export class ActionOptions {

    /**
     * By default if the method result is a promise the action will be invoked
     * only after the promise is resolved. Set this flag to 'true' to skip the
     * wait for the promise.
     */
    public immediate = false;

    constructor(initial?: Partial<ActionOptions>) {
        Object.assign(this, initial);
    }
}