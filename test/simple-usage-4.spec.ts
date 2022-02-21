import 'reflect-metadata';
import { describe, it } from 'mocha';
import classTransformer from '../src';
import { expect } from 'chai';
import { SimpleUsage4 } from '../sample/simple-usage-4';

describe('simple-usage-4.spec.ts', () => {
  it('should SimpleUsage4.type is undefined', function () {
    const data = classTransformer.plainToInstance(SimpleUsage4, {
      type: 'aa',
    });
    expect(data.type).eq(undefined);
    expect(data.data).eq(undefined);
  });

  it('should SimpleUsage4.type is boy', function () {
    const data = classTransformer.plainToInstance(SimpleUsage4, {
      type: 'boy',
      data: 1,
    });
    expect(data.type).eq('boy');
    expect(data.data).eq(1);
  });

  it('should SimpleUsage4.type is girl', function () {
    const data = classTransformer.plainToInstance(SimpleUsage4, {
      type: 'girl',
      data: 'xxx',
    });
    expect(data.type).eq('girl');
    expect(data.data).eq('xxx');
  });
});
