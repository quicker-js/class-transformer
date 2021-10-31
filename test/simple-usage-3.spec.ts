import 'reflect-metadata';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { ClassTransformer } from '../src';
import { SimplePerson, SimpleUsage3 } from '../sample';

describe('simple-usage-3.spec.ts', () => {
  const classTransformer = new ClassTransformer({
    flag: 0,
  });

  it('should SimpleUsage3.', function () {
    const simpleUsage = classTransformer.plainToInstance(SimpleUsage3, {
      id: 1,
      person: {
        id: 103,
        age: 18,
        name: '张三',
        test: '124',
      },
      children: [
        {
          id: 201,
          name: '菜单1',
          age: 20,
          sex: 1,
          test: /^test/,
        },
        {
          id: 202,
          name: '菜单1',
          age: 18,
          sex: 0,
          test: new RegExp('^name$', 'g'),
        },
      ],
    });

    expect(simpleUsage.id).eq(1);
    expect(simpleUsage.person).instanceof(SimplePerson);
    expect(simpleUsage.children).instanceof(Array);
    expect(simpleUsage.children).length(2);
  });
});
