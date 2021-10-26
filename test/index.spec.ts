import 'reflect-metadata';
import { describe, it } from 'mocha';
import { ClassMirror } from '@quicker-js/class-decorator';
import { SimpleUsage2 } from '../sample/simple-usage-2';

describe('index.spec.ts test SimpleUsage1.ts', () => {
  const classMirror = ClassMirror.reflect(SimpleUsage2);

  it('should ', function () {
    if (classMirror) {
      console.log(classMirror.getSelfMetadata());
    }
  });
});
