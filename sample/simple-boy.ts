import { SimplePerson } from './simple-person';
import { Entity, FlagDiscriminator, SubTypeDiscriminator } from '../src';

@Entity({
  title: 'SimpleBoy',
  description: 'SimpleBoy类',
  flags: FlagDiscriminator.define({
    value: 'SimpleBoy',
  }),
  includes: SubTypeDiscriminator.define(
    {
      sex: 1,
    },
    {
      sex: '男',
    },
    {
      sex: 'boy',
    }
  ),
})
/**
 * @SimpleBoy
 */
export class SimpleBoy extends SimplePerson {}
