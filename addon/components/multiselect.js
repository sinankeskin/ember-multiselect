import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class MultiselectComponent extends Component {
  elementId = guidFor(this);

  @tracked
  selectedItems;

  constructor() {
    super(...arguments);

    this.selectedItems = [1, 2, 3];
  }

  @action
  onFocus() {
    document.querySelector(`#${this.elementId}-ul`).classList.add('focus');
    document.querySelector(`#${this.elementId}-select`).classList.remove('d-none');
    document.querySelector(`#${this.elementId}-select`).classList.add('d-block');
    document.querySelector(`#${this.elementId}-select`).focus();
  }

  @action
  onBlur() {
    document.querySelector(`#${this.elementId}-ul`).classList.remove('focus');
    document.querySelector(`#${this.elementId}-select`).classList.remove('d-block');
    document.querySelector(`#${this.elementId}-select`).classList.add('d-none');
  }

  @action
  addItem(selected) {
    console.log('selected', selected);

    const index = this.selectedItems.indexOf(selected);

    if (index === -1) {
      this.selectedItems.push(selected);
    }
  }

  @action
  removeItem(selected) {
    console.log('selected', selected);

    const index = this.selectedItems.indexOf(selected);

    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
  }
}
