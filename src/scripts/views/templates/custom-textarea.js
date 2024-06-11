class CustomTextarea extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const placeholder = this.getAttribute('placeholder') || 'Placeholder';
    const required = this.getAttribute('required') !== null;

    const textarea = document.createElement('textarea');
    textarea.setAttribute('placeholder', placeholder);

    shadow.appendChild(textarea);

    const style = document.createElement('style');
    style.textContent = `
            :host {
                display: block;
                margin: 8px 0;
            }
            label {
                font-weight: bold;
            }
            textarea {
                border: 1px solid #6C757D;
                border-radius: 5px;
                box-sizing: border-box;
                font-size: 15px;
                padding: 12px;
                width: 100%;
                height: 100px;
            }
        `;
    shadow.appendChild(style);

    if (required) {
      textarea.setAttribute('required', '');
      this.setAttribute('required', '');
    }
  }
}
customElements.define('custom-textarea', CustomTextarea);
