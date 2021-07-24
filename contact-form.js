class ContactForm extends HTMLElement {
    _model = {};
    fieldnames = ["contact_name", "contact_phone", "contact_email"];
    _shadowRoot = this.attachShadow({
        mode: 'open'
    });
    constructor() {
        super();
        this.buildForm();
    }
    
    dispatchSaveEvent() {
        const eventName = this.dataset.saveEvent;
        const options = { detail: this._model, bubbles: true, composed:true};
        this.dispatchEvent(new CustomEvent(eventName, options));
    }
    formIsValid(){
        const validities = this.fieldnames.map(f => this._shadowRoot.getElementById(f).checkValidity());
        return validities.indexOf(false) < 0;
    }

    buildForm() {
        const cssLink = Object.assign(document.createElement("link"), {rel:"stylesheet", href:"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"})
        this._shadowRoot.appendChild(cssLink);
        const mainForm = document.createElement("form");
        //const 
        const getPropName = (prop) => prop.replace("contact_", "");

        this.fieldnames.forEach(f => {
            const label = Object.assign(document.createElement("label"), 
                            { htmlFor: f, innerHTML: `${f.replace("_", " ")}:`});
            const input = Object.assign(document.createElement("input"), {
                id: f,
                name: f,
                required: true,
                className: "form-control",
                type: f.indexOf("email") > -1 ? "email" : "text",
                onkeyup:(ev) => this._model[getPropName(ev.target.name)] = ev.target.value
            });
            
            const div = Object.assign(document.createElement("div"), { id: getPropName(f), className: "form-group" });
            div.appendChild(label);
            div.appendChild(input);
            mainForm.appendChild(div);

        });
        
        const btn = Object.assign(document.createElement("button"), {
            id: "save",
            innerHTML: "Save Contact",
            className: "btn btn-primary",
            onclick: (ev) => {
                if(this.formIsValid()){
                    this.dispatchSaveEvent();
                    this._model = {};
                    this.fieldnames.forEach(f => this._shadowRoot.getElementById(f).value = "");
                }
                
            }
        });
        mainForm.appendChild(btn);
        this._shadowRoot.appendChild(mainForm);
    }
}
customElements.define('contact-form', ContactForm);