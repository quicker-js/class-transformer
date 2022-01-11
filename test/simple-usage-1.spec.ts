import 'reflect-metadata';
import { describe, it } from 'mocha';
import classTransformer from '../src';
import { SimpleBoy, SimpleGirl, SimpleUsage1 } from '../sample';
import { expect } from 'chai';

describe('simple-usage-1.spec.ts', () => {
  it('should plain cast to array 1.', () => {
    const simpleUsage1 = classTransformer.plainToInstance(
      SimpleUsage1,
      {
        id: 2,
        person: {
          path: '^aaa$',
          id: 1,
          name: '小芳',
          sex: 0,
          age: 18,
          createDate: '2020-01-01',
        },
        children: [
          {
            path: '^aaa$',
            id: 1,
            name: '小芳',
            sex: 0,
            age: 18,
            createDate: '2020-01-01',
          },
          {
            path: '^aaa$',
            id: 2,
            name: '小芳',
            sex: 0,
            age: 18,
            createDate: '2020-01-01',
          },
        ],
      },
      {
        scene: 0,
      }
    );
    expect(simpleUsage1.id).eq(2);
    expect(simpleUsage1.children).instanceOf(Array);
    expect(simpleUsage1.children.length).eq(2);
    expect(simpleUsage1.children[0]).instanceOf(SimpleGirl);
    expect(simpleUsage1.children[1]).instanceOf(SimpleGirl);

    // console.log(classTransformer.instanceToPlain(simpleUsage1));
  });

  it('should plain cast to array 2.', () => {
    const simpleUsage1 = classTransformer.plainToInstance(
      SimpleUsage1,
      {
        id: 2,
        person: {
          path: '^aaa$',
          id: 1,
          name: '小芳',
          sex: 0,
          age: 18,
          createDate: '2020-01-01',
        },
        children: [
          {
            path: '^aaa$',
            id: 1,
            name: '小芳',
            sex: 0,
            age: 18,
            createDate: '2020-01-01',
            child: {
              path: '^aaa$',
              id: 1,
              name: '小芳',
              sex: 0,
              age: 18,
              createDate: '2020-01-01',
            },
          },
          {
            path: '^aaa$',
            id: 2,
            name: '小芳',
            sex: 0,
            age: 18,
            createDate: '2020-01-01',
            child: {
              path: '^aaa$',
              id: 1,
              name: '小芳',
              sex: 0,
              age: 18,
              createDate: '2020-01-01',
            },
          },
        ],
      },
      {
        scene: 1,
      }
    );

    expect(simpleUsage1.id).eq(2);
    expect(simpleUsage1.children).instanceOf(Array);
    expect(simpleUsage1.children.length).eq(2);
    expect(simpleUsage1.children[0]).instanceOf(SimpleBoy);
    expect(simpleUsage1.children[1]).instanceOf(SimpleBoy);
  });
});
