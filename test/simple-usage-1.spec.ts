import 'reflect-metadata';
import { describe, it } from 'mocha';
import classTransformer from '../src';
import { SimpleBoy, SimpleGirl, SimpleUsage1 } from '../sample';
import { expect } from 'chai';
import moment from 'moment';

describe('simple-usage-1.spec.ts', () => {
  it('should plain cast to array 1.', () => {
    const simpleUsage1 = classTransformer.plainToInstance(
      SimpleUsage1,
      {
        id: 2,
        person: {
          id: 1,
          name: '小芳',
          sex: 0,
          age: 18,
          createTime: '2020/01/01',
        },
        children: {
          id: 1,
          name: '小明',
          sex: 1,
          age: 19,
          createTime: '2020/01/01',
        },
      },
      {
        scene: 0,
      }
    );

    expect(simpleUsage1.id).eq(2);
  });

  it('should plain cast to array 2.', () => {
    const simpleUsage1 = classTransformer.plainToInstance(
      SimpleUsage1,
      {
        id: 2,
        person: {
          id: 1,
          name: '张三',
          sex: 1,
          age: 18,
          createTime: '2020/01/01',
        },
        children: {
          id: 1,
          name: '小芳',
          sex: 0,
          age: 19,
          createTime: '2020/01/01',
        },
      },
      {
        scene: 1,
      }
    );

    expect(simpleUsage1.id).eq(2);
    expect(simpleUsage1.person).eq(undefined);
    expect(simpleUsage1.children).eq(undefined);
  });

  it('should SimpleUsage1 plain list1', () => {
    const simpleUsage1 = classTransformer.plainToInstance(
      SimpleUsage1,
      {
        id: 2,
        person: [
          {
            id: 1,
            name: '张三',
            sex: 1,
            age: 18,
            createTime: '2020/01/01',
          },
        ],
        children: [
          {
            id: 1,
            name: '小芳',
            sex: 0,
            age: 19,
            createTime: '2020/01/01',
          },
        ],
      },
      {
        scene: 1,
      }
    );

    expect(simpleUsage1.id).eq(2);
    expect(simpleUsage1.children).instanceof(Array);
    expect(simpleUsage1.person).instanceof(Array);
    expect(simpleUsage1.children[0]).instanceof(SimpleGirl);
    expect(simpleUsage1.person[0]).instanceof(SimpleBoy);

    expect(simpleUsage1.children[0].id).eq(1);
    expect(simpleUsage1.children[0].name).eq('小芳');
    expect(simpleUsage1.children[0].sex).eq(0);
    expect(simpleUsage1.children[0].age).eq(19);
    // expect(simpleUsage1.children[0].createTime).instanceof(Date);

    expect(simpleUsage1.person[0].id).eq(1);
    expect(simpleUsage1.person[0].name).eq('张三');
    expect(simpleUsage1.person[0].sex).eq(1);
    expect(simpleUsage1.person[0].age).eq(18);
    // expect(simpleUsage1.person[0].createTime).instanceof(Date);
  });

  it('should SimpleUsage1 plain list2', () => {
    const simpleUsage1 = classTransformer.plainToInstance(
      SimpleUsage1,
      {
        id: 2,
        person: [
          {
            id: 1,
            name: '小芳',
            sex: 0,
            age: 18,
            createTime: '2020/01/01',
          },
        ],
        children: [
          {
            id: 1,
            name: '小明',
            sex: 1,
            age: 19,
            createTime: '2020/01/01',
          },
        ],
      },
      {
        scene: 0,
      }
    );

    expect(simpleUsage1.id).eq(2);
    expect(simpleUsage1.children).instanceof(Array);
    expect(simpleUsage1.person).instanceof(Array);
    expect(simpleUsage1.person[0]).instanceof(SimpleGirl);
    expect(simpleUsage1.children[0]).instanceof(SimpleBoy);

    expect(simpleUsage1.person[0].id).eq(1);
    expect(simpleUsage1.person[0].name).eq('小芳');
    expect(simpleUsage1.person[0].sex).eq(0);
    expect(simpleUsage1.person[0].age).eq(18);
    // expect(simpleUsage1.person[0].createTime).instanceof(Date);

    expect(simpleUsage1.children[0].id).eq(1);
    expect(simpleUsage1.children[0].name).eq('小明');
    expect(simpleUsage1.children[0].sex).eq(1);
    expect(simpleUsage1.children[0].age).eq(19);
    // expect(simpleUsage1.children[0].createTime).instanceof(Date);
  });
});
