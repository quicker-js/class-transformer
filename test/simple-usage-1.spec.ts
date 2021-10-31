import 'reflect-metadata';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { ClassTransformer } from '../src';
import { SimplePerson, SimpleUsage1 } from '../sample';

describe('simple-usage-1.spec.ts', () => {
  const classTransformer = new ClassTransformer({
    flag: 1,
  });

  it('should SimpleUsage1.', function () {
    const simpleUsage = classTransformer.plainToInstance(SimpleUsage1, {
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
          sex: 0,
          test: /^test/,
        },
        {
          id: 202,
          name: '菜单1',
          age: 18,
          sex: 1,
          test: new RegExp('^name$', 'g'),
        },
      ],
    });

    expect(simpleUsage.id).eq(1);
    expect(simpleUsage.person).instanceof(Array);
    expect(simpleUsage.children).instanceof(Array);

    simpleUsage.children.map((o) => {
      expect(o).instanceof(SimplePerson);
    });

    simpleUsage.person.map((o) => {
      expect(o).instanceof(SimplePerson);
    });
  });
});
