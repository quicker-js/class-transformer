import { Entity, FlagDiscriminator, SubTypeDiscriminator } from '../src';
import { SimplePerson } from './simple-person';

@Entity({
  title: 'SimpleGirl',
  description: 'SimpleGirl Entity',
  flags: FlagDiscriminator.define({
    value: 'SimpleGirl',
  }),
  includes: SubTypeDiscriminator.define(
    {
      sex: 0,
    },
    {
      sex: '女',
    },
    {
      sex: 'girl',
    }
  ),
})
/**
 * @class SimpleGirl
 */
export class SimpleGirl extends SimplePerson {}
