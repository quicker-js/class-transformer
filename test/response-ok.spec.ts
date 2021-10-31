import 'reflect-metadata';
import { describe, it } from 'mocha';
import { ClassTransformer } from '../src';
import { PageList, ResponseOk, SimpleBoy, SimpleGirl } from '../sample';
import { expect } from 'chai';

describe('response-ok.spec.ts', () => {
  it('should ResponseResult<PageList<SimpleGirl>>.', function () {
    const classTransformer = new ClassTransformer({
      flag: 'PageList<SimpleGirl>',
    });

    const responseOk = classTransformer.plainToInstance<
      ResponseOk<PageList<SimpleGirl>>
    >(ResponseOk, {
      msg: 'ok',
      code: 0,
      data: {
        pageNo: 1,
        pageSize: 10,
        totalCount: 10,
        totalPage: 1,
        list: [
          {
            id: 1,
            name: '张三',
          },
        ],
      },
    });
    expect(responseOk).instanceof(ResponseOk);
    expect(responseOk.data).instanceof(PageList);
    expect(responseOk.data.list).instanceof(Array);
    responseOk.data.list.forEach((o) => {
      expect(o).instanceof(SimpleGirl);
    });
  });

  it('should ResponseResult<SimpleGirl>.', function () {
    const classTransformer = new ClassTransformer({
      flag: 'SimpleGirl',
    });

    const responseOk = classTransformer.plainToInstance<ResponseOk<SimpleGirl>>(
      ResponseOk,
      {
        msg: 'ok',
        code: 1,
        person: {
          id: 1,
          name: '张三',
          sex: 1,
          age: 18,
        },
        data: {
          id: 1,
          name: '张三',
          sex: 1,
          age: 18,
        },
      }
    );

    expect(responseOk.data).instanceof(SimpleGirl);

    console.log(responseOk);
  });

  it('should ResponseResult<SimpleBoy>.', function () {
    const classTransformer = new ClassTransformer({
      flag: 'SimpleBoy',
    });

    const responseOk = classTransformer.plainToInstance<ResponseOk<SimpleBoy>>(
      ResponseOk,
      {
        msg: 'ok',
        code: 1,
        data: {
          id: 1,
          name: '张三',
          sex: 1,
          age: 18,
        },
      }
    );

    expect(responseOk).instanceof(ResponseOk);
    expect(responseOk.data).instanceof(SimpleBoy);
  });
});
