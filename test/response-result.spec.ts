import 'reflect-metadata';
import { describe, it } from 'mocha';
import { ClassTransformer } from '../src';
import { PageList, ResponseResult, SimpleBoy, SimpleGirl } from '../sample';
import { expect } from 'chai';

describe('response-result.spec.ts', () => {
  it('should ResponseResult<PageList<SimpleGirl>>.', function () {
    const classTransformer = new ClassTransformer({
      flag: 'PageList<SimpleGirl>',
    });

    const responseResult = classTransformer.plainToInstance<
      ResponseResult<PageList<SimpleGirl>>
    >(ResponseResult, {
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

    expect(responseResult).instanceof(ResponseResult);
    expect(responseResult.code).eq(0);
    expect(responseResult.msg).eq('ok');
    expect(responseResult.data).instanceof(PageList);

    expect(responseResult.data.list).instanceof(Array);
    expect(responseResult.data.pageNo).eq(1);
    expect(responseResult.data.pageSize).eq(10);
    expect(responseResult.data.totalCount).eq(10);
    expect(responseResult.data.totalPage).eq(1);
    responseResult.data.list.forEach((o) => {
      expect(o.name).eq('张三');
      expect(o).instanceof(SimpleGirl);
    });
  });

  it('should ResponseResult<SimpleGirl>.', function () {
    const classTransformer = new ClassTransformer({
      flag: 'SimpleGirl',
    });

    const responseResult = classTransformer.plainToInstance<
      ResponseResult<SimpleGirl>
    >(ResponseResult, {
      msg: 'ok',
      code: 0,
      data: {
        id: 1,
        name: '张三',
      },
    });

    expect(responseResult).instanceof(ResponseResult);
  });

  it('should ResponseResult<PageList<SimpleBoy>>.', function () {
    const classTransformer = new ClassTransformer({
      flag: 'PageList<SimpleBoy>',
    });

    const responseResult = classTransformer.plainToInstance<
      ResponseResult<PageList<SimpleBoy>>
    >(ResponseResult, {
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

    expect(responseResult).instanceof(ResponseResult);
    expect(responseResult.code).eq(0);
    expect(responseResult.msg).eq('ok');
    expect(responseResult.data).instanceof(PageList);

    expect(responseResult.data.list).instanceof(Array);
    expect(responseResult.data.pageNo).eq(1);
    expect(responseResult.data.pageSize).eq(10);
    expect(responseResult.data.totalCount).eq(10);
    expect(responseResult.data.totalPage).eq(1);
    responseResult.data.list.forEach((o) => {
      expect(o.name).eq('张三');
      expect(o).instanceof(SimpleBoy);
    });
  });

  it('should ResponseResult<List<SimpleBoy>>.', function () {
    const classTransformer = new ClassTransformer({
      flag: 'List<SimpleBoy>',
    });

    const responseResult = classTransformer.plainToInstance<
      ResponseResult<SimpleBoy[]>
    >(ResponseResult, {
      code: 0,
      msg: 'ok',
      data: [
        {
          id: 1,
          name: '测试',
          age: 10,
          sex: 1,
        },
      ],
    });

    expect(responseResult.data).instanceof(Array);
  });

  it('should ResponseResult<Set<SimpleBoy>>.', function () {
    const classTransformer = new ClassTransformer({
      flag: 'Set<SimpleBoy>',
    });

    const responseResult = classTransformer.plainToInstance<
      ResponseResult<Set<SimpleBoy>>
    >(ResponseResult, {
      code: 0,
      msg: 'ok',
      data: [
        {
          id: 1,
          name: '测试',
          age: 10,
          sex: 1,
        },
      ],
    });

    expect(responseResult).instanceof(ResponseResult);
    expect(responseResult.data).instanceof(Set);
  });
});
