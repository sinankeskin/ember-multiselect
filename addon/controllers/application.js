import { A } from '@ember/array';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  letters = A([
    {
      id: '1',
      name: 'A',
    },
    {
      id: '2',
      name: 'B',
    },
    {
      id: '3',
      name: 'C',
    },
  ]);
}
