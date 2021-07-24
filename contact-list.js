class ContactList extends HTMLElement {
    static get observedAttributes() { return ['data-contacts']; };
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
        const ul = Object.assign(document.createElement("ul"), {id:"contactList"});
        this._shadowRoot.appendChild(ul);
    }
    
    build(elements){
        this._shadowRoot.innerHTML = "";
        const ul = document.createElement("ul");
        const createLi = (contact) => ul.appendChild(Object.assign(document.createElement("li"), 
                                                    {innerHTML: `${contact.name} <br/> ${contact.phone}`}));
        elements.map(createLi);

        this._shadowRoot.appendChild(ul);
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this.innerHTML = "";
        if(name ==="data-contacts"){
            this.build(JSON.parse(newValue));
        }
        
      }
}

customElements.define('contact-list', ContactList);