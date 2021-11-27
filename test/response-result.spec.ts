// import 'reflect-metadata';
// import { describe, it } from 'mocha';
// import classTransformer from '../src';
// import { PageList, ResponseResult, SimpleBoy, SimpleGirl } from '../sample';
// import { ClassConstructor } from '@quicker-js/class-decorator';
// import { expect } from 'chai';
//
// describe('response-result.spec.ts', () => {
//   it('should ResponseResult<SimpleBoy[]>', function () {
//     const plainToInstance = classTransformer.plainToInstance<
//       ClassConstructor<ResponseResult<SimpleBoy[]>>
//     >(
//       ResponseResult,
//       {
//         code: 1,
//         msg: 'ok',
//         data: [
//           {
//             sex: 1,
//             id: 1,
//             age: 10,
//             name: '张三',
//           },
//         ],
//       },
//       {
//         scene: 'List<SimpleBoy>',
//       }
//     );
//
//     expect(plainToInstance.msg).eq('ok');
//     expect(plainToInstance.data).instanceof(Array);
//     expect(plainToInstance.data[0]).instanceof(SimpleBoy);
//     expect(plainToInstance.data[0].sex).eq(1);
//     expect(plainToInstance.data[0].name).eq('张三');
//     expect(plainToInstance.data[0].age).eq(10);
//     expect(plainToInstance.data[0].id).eq(1);
//     expect(plainToInstance.code).eq(1);
//   });
//
//   it('should ResponseResult<SimpleBoy>', function () {
//     const plainToInstance = classTransformer.plainToInstance<
//       ClassConstructor<ResponseResult<SimpleBoy>>
//     >(
//       ResponseResult,
//       {
//         code: 1,
//         msg: 'ok',
//         data: {
//           sex: 1,
//           id: 1,
//           age: 10,
//           name: '张三',
//           createTime: '2020-12-30 01:00:00',
//         },
//       },
//       {
//         scene: 'SimpleBoy',
//       }
//     );
//
//     expect(plainToInstance.msg).eq('ok');
//     expect(plainToInstance.data).instanceof(SimpleBoy);
//     expect(plainToInstance.data.sex).eq(1);
//     expect(plainToInstance.data.age).eq(10);
//     expect(plainToInstance.data.id).eq(1);
//     expect(plainToInstance.data.name).eq('张三');
//     expect(plainToInstance.code).eq(1);
//   });
//
//   it('should ResponseResult<SimpleGirl[]>', function () {
//     const plainToInstance = classTransformer.plainToInstance<
//       ClassConstructor<ResponseResult<SimpleGirl[]>>
//     >(
//       ResponseResult,
//       {
//         code: 1,
//         msg: 'ok',
//         data: [
//           {
//             sex: 0,
//             id: 1,
//             age: 18,
//             name: '小芳',
//           },
//         ],
//       },
//       {
//         scene: 'List<SimpleGirl>',
//       }
//     );
//
//     expect(plainToInstance.msg).eq('ok');
//     expect(plainToInstance.data).instanceof(Array);
//     expect(plainToInstance.data[0]).instanceof(SimpleGirl);
//     expect(plainToInstance.data[0].sex).eq(0);
//     expect(plainToInstance.data[0].name).eq('小芳');
//     expect(plainToInstance.data[0].age).eq(18);
//     expect(plainToInstance.data[0].id).eq(1);
//     expect(plainToInstance.code).eq(1);
//   });
//
//   it('should ResponseResult<SimpleGirl>', function () {
//     const plainToInstance = classTransformer.plainToInstance<
//       ClassConstructor<ResponseResult<SimpleGirl>>
//     >(
//       ResponseResult,
//       {
//         code: 1,
//         msg: 'ok',
//         data: {
//           sex: 0,
//           id: 1,
//           age: 10,
//           name: '小芳',
//         },
//       },
//       {
//         scene: 'SimpleGirl',
//       }
//     );
//
//     expect(plainToInstance.msg).eq('ok');
//     expect(plainToInstance.data).instanceof(SimpleGirl);
//     expect(plainToInstance.data.sex).eq(0);
//     expect(plainToInstance.data.age).eq(10);
//     expect(plainToInstance.data.id).eq(1);
//     expect(plainToInstance.data.name).eq('小芳');
//     expect(plainToInstance.code).eq(1);
//   });
//
//   it('should ResponseResult<SimpleGirl>', function () {
//     const plainToInstance = classTransformer.plainToInstance<
//       ClassConstructor<ResponseResult<PageList<SimpleGirl>>>
//     >(
//       ResponseResult,
//       {
//         msg: 'ok',
//         code: 0,
//         data: {
//           list: [
//             {
//               id: 1,
//               sex: 0,
//               name: '小芳',
//               age: 15,
//               createTime: '2020-12-12',
//             },
//           ],
//           pageNo: 1,
//           pageSize: 10,
//           totalCount: 1,
//           totalPage: 1,
//         },
//       },
//       {
//         scene: 'PageList<SimpleGirl>',
//       }
//     );
//
//     expect(plainToInstance.msg).eq('ok');
//     expect(plainToInstance.code).eq(0);
//     expect(plainToInstance.data).instanceof(PageList);
//     expect(plainToInstance.data.list).instanceof(Array);
//     expect(plainToInstance.data.pageNo).eq(1);
//     expect(plainToInstance.data.pageSize).eq(10);
//     expect(plainToInstance.data.totalPage).eq(1);
//     expect(plainToInstance.data.totalCount).eq(1);
//     expect(plainToInstance.data.list[0]).instanceof(SimpleGirl);
//     expect(plainToInstance.data.list[0].id).eq(1);
//     expect(plainToInstance.data.list[0].age).eq(15);
//     expect(plainToInstance.data.list[0].sex).eq(0);
//     expect(plainToInstance.data.list[0].name).eq('小芳');
//   });
//
//   it('should ResponseResult<SimpleBoy>', function () {
//     const plainToInstance = classTransformer.plainToInstance<
//       ClassConstructor<ResponseResult<PageList<SimpleBoy>>>
//     >(
//       ResponseResult,
//       {
//         msg: 'ok',
//         code: 0,
//         data: {
//           list: [
//             {
//               id: 1,
//               sex: 1,
//               name: '小明',
//               age: 18,
//               createTime: '2020-12-12',
//             },
//           ],
//           pageNo: 1,
//           pageSize: 10,
//           totalCount: 1,
//           totalPage: 1,
//         },
//       },
//       {
//         scene: 'PageList<SimpleBoy>',
//       }
//     );
//
//     expect(plainToInstance.msg).eq('ok');
//     expect(plainToInstance.code).eq(0);
//     expect(plainToInstance.data).instanceof(PageList);
//     expect(plainToInstance.data.list).instanceof(Array);
//     expect(plainToInstance.data.pageNo).eq(1);
//     expect(plainToInstance.data.pageSize).eq(10);
//     expect(plainToInstance.data.totalPage).eq(1);
//     expect(plainToInstance.data.totalCount).eq(1);
//     expect(plainToInstance.data.list[0]).instanceof(SimpleBoy);
//     expect(plainToInstance.data.list[0].id).eq(1);
//     expect(plainToInstance.data.list[0].age).eq(18);
//     expect(plainToInstance.data.list[0].sex).eq(1);
//     expect(plainToInstance.data.list[0].name).eq('小明');
//   });
// });
