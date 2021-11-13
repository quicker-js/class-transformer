import { SimplePerson } from './simple-person';
import { Entity } from '../src';

@Entity({
  title: 'SimpleBoy',
  description: 'SimpleBoy类',
  scenes: [{ value: 'SimpleBoy' }],
  subTypes: [
    {
      sex: 1,
    },
    {
      sex: '男',
    },
    {
      sex: 'boy',
    },
  ],
})
/**
 * @SimpleBoy
 */
export class SimpleBoy extends SimplePerson {}
