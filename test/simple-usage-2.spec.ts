import 'reflect-metadata';
import { describe, it } from 'mocha';
import classTransformer from '../src';
import { SimpleBoy, SimpleGirl, SimpleUsage2 } from '../sample';
import { expect } from 'chai';
import moment from 'moment';

describe('simple-usage-2.spec.ts', () => {
  it('should plain to instance 1.', () => {
    const simpleUsage = classTransformer.plainToInstance(
      SimpleUsage2,
      {
        id: 2,
        person: {
          id: 1,
          name: '小芳',
          sex: 0,
          age: 18,
          createTime: '2020-01-01',
        },
        children: {
          id: 1,
          name: '小明',
          sex: 1,
          age: '19',
          createTime: '2020-01-01',
        },
      },
      {
        scene: 0,
      }
    );

    expect(simpleUsage.id).eq(2);
    expect(simpleUsage.children).instanceof(SimpleBoy);
    expect(simpleUsage.person).instanceof(SimpleGirl);

    expect(simpleUsage.person.id).eq(1);
    expect(simpleUsage.person.name).eq('小芳');
    expect(simpleUsage.person.sex).eq(0);
    expect(simpleUsage.person.age).eq(18);
    expect(moment.isMoment(simpleUsage.person.createTime)).eq(true);

    expect(simpleUsage.children.id).eq(1);
    expect(simpleUsage.children.name).eq('小明');
    expect(simpleUsage.children.sex).eq(1);
    expect(simpleUsage.children.age).eq(19);
    expect(moment.isMoment(simpleUsage.children.createTime)).eq(true);
  });

  // it('should plain to instance 2.', () => {
  //   const simpleUsage = classTransformer.plainToInstance(
  //     SimpleUsage2,
  //     {
  //       id: 2,
  //       person: {
  //         id: 1,
  //         name: '张三',
  //         sex: 1,
  //         age: 18,
  //         createTime: '2020/01/01',
  //       },
  //       children: {
  //         id: 1,
  //         name: '小芳',
  //         sex: 0,
  //         age: 19,
  //         createTime: '2020/01/01',
  //       },
  //     },
  //     {
  //       scene: 1,
  //     }
  //   );
  //
  //   expect(simpleUsage.id).eq(2);
  //   expect(simpleUsage.person).instanceof(SimpleBoy);
  //   expect(simpleUsage.children).instanceof(SimpleGirl);
  //
  //   expect(simpleUsage.children.id).eq(1);
  //   expect(simpleUsage.children.name).eq('小芳');
  //   expect(simpleUsage.children.sex).eq(0);
  //   expect(simpleUsage.children.age).eq(19);
  //   expect(moment.isMoment(simpleUsage.children.createTime)).eq(true);
  //
  //   expect(simpleUsage.person.id).eq(1);
  //   expect(simpleUsage.person.name).eq('张三');
  //   expect(simpleUsage.person.sex).eq(1);
  //   expect(simpleUsage.person.age).eq(18);
  //   expect(moment.isMoment(simpleUsage.person.createTime)).eq(true);
  // });

  // it('should SimpleUsage1 plain list', () => {
  //   const simpleUsage = classTransformer.plainToInstance(
  //     SimpleUsage2,
  //     {
  //       id: 2,
  //       person: [
  //         {
  //           id: 1,
  //           name: '张三',
  //           sex: 1,
  //           age: 18,
  //           createTime: '2020/01/01',
  //         },
  //       ],
  //       children: [
  //         {
  //           id: 1,
  //           name: '小芳',
  //           sex: 0,
  //           age: 19,
  //           createTime: '2020/01/01',
  //         },
  //       ],
  //     },
  //     {
  //       scene: 1,
  //     }
  //   );
  //
  //   expect(simpleUsage.id).eq(2);
  //
  //   // person and children not array type.
  //   expect(simpleUsage.person).eq(undefined);
  //   expect(simpleUsage.children).eq(undefined);
  // });
});
