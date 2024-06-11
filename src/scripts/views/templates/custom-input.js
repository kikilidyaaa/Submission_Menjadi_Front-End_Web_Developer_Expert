class CustomInput extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const placeholder = this.getAttribute('placeholder') || 'Placeholder';
    const required = this.getAttribute('required') !== null;

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', placeholder);

    shadow.appendChild(input);

    const style = document.createElement('style');
    style.textContent = `
        :host {
            display: block;
            margin: 8px 0;
            min-width: 44px;
            min-height: 44px;
        }
        label {
            font-weight: bold;
        }
        input {
            border: 1px solid #6C757D;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 15px;
            padding: 12px;
            width: 100%;
        }
    `;
    shadow.appendChild(style);

    if (required) {
      input.setAttribute('required', '');
      this.setAttribute('required', '');
    }
  }
}
customElements.define('custom-input', CustomInput);
