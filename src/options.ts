
export class ActionOptions {

    /**
     * By default if the method result is a promise the view will be refreshed
     * only after the promise is resolved. Set this flag to `true` to skip the
     * wait for the promise.
     * Note that this flag also affects the time when the onMethodInvokeEnd event is
     * raised.
     *
     * Default: `false`
     */
    public immediate?= false;

    constructor(initial?: Partial<ActionOptions>) {
        Object.assign(this, initial);
    }
}
