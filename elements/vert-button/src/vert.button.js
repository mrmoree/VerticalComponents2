let tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>

        /* Declare Custom CSS Property API */
        :host {
            --vert-button-primary-bgColor: var(--btn-primary-bgColor, "#333333");
            --vert-button-primary-labelColor: var(--btn-primary-labelColor, "#ffffff");
            --vert-button-radius: var(--btn-primary-borderRadius, "4px");
            --vert-button-padding: var(--btn-primary-padding, "10px 20px");
            --vert-button-fontSize: var(--btn-primary-fontSize, "inherit");
            --vert-button-border: var(--btn-primary-border, "none");
        }
        
        [part="button"] {
            background-color: var(--vert-button-primary-bgColor);
	        color: var(--vert-button-primary-labelColor);
            border-radius: var(--vert-button-radius);
            padding: var(--vert-button-padding);
            font-size: var(--vert-button-fontSize);
            border: var(--vert-button-border);
        }
        /*TODO: setup webpack to compile sass into css and than compose the final module with inline css */
        
    </style>
    
    <button role="button" part="button" class="btn__primary js-btn__primary">
        <slot name="btn-label">Click me</slot>
        <i class="fas fa-angle-right"></i>
    </button>
   `;

class VertButton extends HTMLElement {

    // Can define constructor arguments if you wish.
    constructor() {
        // If you define a constructor, always call super() first!
        // This is specific to CE and required by the spec.
        super();

        // Attach a shadow root to the element.
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

        //set label from data-label
        let buttonLabelText = this.dataset.label;
        this._shadowRoot.querySelector("button").innerText = buttonLabelText;

    }


    //getter and setter
    set buttonLabel(value) {
        this._buttonLabel = value;
    }
    get buttonLabel() {
        return this._buttonLabel;
    }

    // A getter/setter for a disabled property.
    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(val) {
        // Reflect the value of the disabled property as an HTML attribute.
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    /* Called every time the element is inserted into the DOM.
       Useful for running setup code, such as fetching resources
       or rendering. Generally, you should try to delay work until this time. */
    connectedCallback() {
        console.log("the element is inserted into the DOM.");
        //this is the best time to load external data or just do
        //cool stuff with content
        console.log(this);
    }

    /*	Called every time the element is removed from the DOM. Useful
        for running clean up code. */
    disconnectedCallback() {
        console.log("element is disconnected");
    }

    //attributes to be observed by attributeChangedCallback
    static get observedAttributes() {
        return ['disabled', 'busy']; //TODO: add raised and busy attributes
    }

    // Only called for the disabled and busy attributes due to observedAttributes
    attributeChangedCallback(name, oldValue, newValue) {

    }

    /**
     * Toggle function toggles show attribute
     */
    toggleReadMore() {
        this.toggleAttribute("show");
    }


}

customElements.define('vert-button', VertButton);

export default VertButton;

