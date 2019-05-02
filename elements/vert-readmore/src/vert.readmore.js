let tmpl = document.createElement('template');
tmpl.innerHTML = `
    <link rel="stylesheet" href="../node_modules/font-awesome/css/font-awesome.min.css">
    <style>
        :host {
            
        }
        
        :host([hidden]) {
            display: none;
        }
        
        .readmore__content {
            display: none;
        }
        
        :host([show]) .readmore__content {
            display: block;
        }
        
        .readmore__trigger {
            color: green;
        }
        
        .readmore__trigger::after {
            display: inline-block;
            font-family: "Font Awesome 5 Free";
            font-weight: 900;
            font-style: normal;
            font-variant: normal;
            text-rendering: auto;
            -webkit-font-smoothing: antialiased;
            content: '\f105';
            margin-left: 10px;
        }
        :host([show]) .readmore__trigger {
            color: red;
        }
    </style>
    
    <a href="#readmore" class="readmore__trigger js-readmore__trigger">
        <slot name="readmore-label">Read more Default text</slot>
        <i class="fas fa-angle-right"></i>
    </a>
    <div class="readmore__content">
        <slot name="readmore-content">Please provide Content via slot="readmore-content")</slot>
    </div>`;

class VertReadmore extends HTMLElement {

    // Can define constructor arguments if you wish.
    constructor() {
        // If you define a constructor, always call super() first!
        // This is specific to CE and required by the spec.
        super();

        // Attach a shadow root to the element.
        let _shadowRoot = this.attachShadow({mode: 'open'});
        _shadowRoot.appendChild(tmpl.content.cloneNode(true));

        // Setup a click listener on <vert-readmore> trigger with the class .readmore__trigger__js
        let $readmoreTrigger = _shadowRoot.querySelector(".js-readmore__trigger");
        $readmoreTrigger.addEventListener('click', e => {
            // Don't toggle readmore if element has attribute disabled.
            if (this.disabled) {
                return;
            }
            this.toggleReadMore();
        });

    }

    // A getter/setter for show property.
    get show() {
        return this.hasAttribute('show');
    }

    set show(val) {
        // Reflect the value of the show property as an HTML attribute.
        if (val) {
            this.setAttribute('show', '');
        } else {
            this.removeAttribute('show');
        }
        this.toggleReadMore();
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

        //TODO: elipsis the current readmore__content with (…) and put it infront of the readmore link

    }

    /*	Called every time the element is removed from the DOM. Useful
        for running clean up code. */
    disconnectedCallback() {
        console.log("element is disconnected");
    }

    //attributes to be observed by attributeChangedCallback
    static get observedAttributes() {
        return ['show', 'disabled'];
    }

    // Only called for the disabled and show attributes due to observedAttributes
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name + " " + oldValue +  " " + newValue);
        if (name === "disabled" && oldValue === false) {
            this.setAttribute("tabindex", "-1");
            this.setAttribute("aria-disabled", "true");
            return false;
        }else {
            this.setAttribute("tabindex", "0");
            this.removeAttribute("aria-disabled");
        }
        if (this.show) {
            console.log("we read more");
        } else {
            console.log("we read less");
        }
    }

    /**
     * Toggle function toggles show attribute
     */
    toggleReadMore() {
        this.toggleAttribute("show");
    }


}

customElements.define('vert-readmore', VertReadmore);

export default VertReadmore;

