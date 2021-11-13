import { SimplePerson } from './simple-person';
import { Entity } from '../src';

@Entity({
  title: 'SimpleGirl',
  description: 'SimpleGirl Entity',
  scenes: [{ value: 'SimpleGirl' }],
  subTypes: [
    {
      sex: 0,
    },
    {
      sex: '女',
    },
    {
      sex: 'girl',
    },
  ],
})
/**
 * @class SimpleGirl
 */
export class SimpleGirl extends SimplePerson {}
