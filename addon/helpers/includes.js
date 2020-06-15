import { helper } from '@ember/component/helper';

export default helper(function includes([array, selected] /*, hash*/) {
  return array.includes(selected);
});
