import { A } from '@ember/array';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import Component from '@glimmer/component';

export default class MultiSelectComponent extends Component {
  elementId = guidFor(this);

  @tracked
  focused = false;

  @tracked
  selectedItems = A(this.args.selected || []);

  @computed('args.selector')
  get selector() {
    return this.args.selector || 'id';
  }

  @computed('args.label')
  get label() {
    return this.args.label || 'name';
  }

  @computed('args.options.{,length}', 'args.size')
  get size() {
    if (this.args.size) {
      return this.args.size;
    }

    return this.args.options.length < 5 ? this.args.options.length : 5;
  }

  @action
  onFocus() {
    document.querySelector(`#${this.elementId}-list`).classList.add('focus');
    document.querySelector(`#${this.elementId}-box`).classList.remove('d-none');
    document.querySelector(`#${this.elementId}-box`).classList.add('d-block');
    document.querySelector(`#${this.elementId}-select`).focus();

    this.focused = true;
  }

  @action
  onBlur() {
    document.querySelector(`#${this.elementId}-list`).classList.remove('focus');
    document.querySelector(`#${this.elementId}-box`).classList.remove('d-block');
    document.querySelector(`#${this.elementId}-box`).classList.add('d-none');

    this.focused = false;
  }

  @action
  addItem(event) {
    const option = this.args.options.findBy(this.selector, event.target.value);

    if (!this.selectedItems.includes(option)) {
      this.selectedItems.pushObject(option);

      if (this.args.onChange !== undefined && typeof this.args.onChange === 'function') {
        this.args.onChange(this.selectedItems);
      }
    }

    this.onFocus();
  }

  @action
  removeItem(selected) {
    if (this.selectedItems.includes(selected)) {
      this.selectedItems.removeObject(selected);

      if (this.args.onChange !== undefined && typeof this.args.onChange === 'function') {
        this.args.onChange(this.selectedItems);
      }
    }

    this.onFocus();
  }
}
