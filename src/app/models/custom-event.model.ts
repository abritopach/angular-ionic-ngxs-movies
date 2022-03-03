export interface AsyncEvent extends CustomEvent {
  target: EventTarget & {
    /**
     * Disable the ability to trigger another async event.
     */
    disabled: boolean;
    /**
     * How far the user should have to scroll before loading the next chunk of content.
     */
    threshold: string;
    /**
     * The position of the infinite loading component.
     *
     * Possible values are top or bottom.
     */
    position: string;
    /**
     * Ends the async loading animation.
     */
    complete(): void;
  };
}
