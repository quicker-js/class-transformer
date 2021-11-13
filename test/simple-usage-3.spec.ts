// import 'reflect-metadata';
// import { describe, it } from 'mocha';
// import classTransformer from '../src';
// import { SimpleBoy, SimpleGirl, SimpleUsage2, SimpleUsage3 } from '../sample';
// import { expect } from 'chai';
//
// describe('simple-usage-3.spec.ts', () => {
//   it('should plain to instance 1.', () => {
//     const simpleUsage = classTransformer.plainToInstance(
//       SimpleUsage3,
//       {
//         id: 2,
//         person: {
//           id: 1,
//           name: '小芳',
//           sex: 0,
//           age: 18,
//           createTime: '2020/01/01',
//         },
//         children: [
//           {
//             id: 1,
//             name: '小明',
//             sex: 1,
//             age: 19,
//             createTime: '2020/01/01',
//           },
//           {
//             id: 2,
//             name: '小芳',
//             sex: 0,
//             age: 18,
//             createTime: '2020/01/01',
//           },
//         ],
//       },
//       {
//         scene: 0,
//       }
//     );
//
//     expect(simpleUsage.id).eq(2);
//     expect(simpleUsage.person).instanceof(SimpleGirl);
//     expect(simpleUsage.children).instanceof(Array);
//     expect(simpleUsage.children[0]).instanceof(SimpleBoy);
//     expect(simpleUsage.children[1]).instanceof(SimpleGirl);
//
//     expect(simpleUsage.children[0].createTime).instanceof(Date);
//     expect(simpleUsage.children[1].createTime).instanceof(Date);
//
//     expect(simpleUsage.children[0].name).eq('小明');
//     expect(simpleUsage.children[1].name).eq('小芳');
//   });
//
//   it('should plain to instance 2.', () => {
//     const simpleUsage = classTransformer.plainToInstance(
//       SimpleUsage3,
//       {
//         id: 2,
//         person: {
//           id: 1,
//           name: '张三',
//           sex: 1,
//           age: 18,
//           createTime: '2020/01/01',
//         },
//         children: [
//           {
//             id: 1,
//             name: '小芳',
//             sex: 0,
//             age: 19,
//             createTime: '2020/01/01',
//           },
//           {
//             id: 1,
//             name: '张三',
//             sex: 1,
//             age: 18,
//             createTime: '2020/01/01',
//           },
//         ],
//       },
//       {
//         scene: 1,
//       }
//     );
//
//     expect(simpleUsage.id).eq(2);
//     expect(simpleUsage.person).instanceof(SimpleBoy);
//     expect(simpleUsage.children).instanceof(Array);
//
//     expect(simpleUsage.children[0]).instanceof(SimpleGirl);
//     expect(simpleUsage.children[1]).instanceof(SimpleBoy);
//
//     expect(simpleUsage.children[0].id).eq(1);
//     expect(simpleUsage.children[0].name).eq('小芳');
//     expect(simpleUsage.children[0].sex).eq(0);
//     expect(simpleUsage.children[0].age).eq(19);
//     expect(simpleUsage.children[0].createTime).instanceof(Date);
//
//     expect(simpleUsage.children[1].id).eq(1);
//     expect(simpleUsage.children[1].name).eq('张三');
//     expect(simpleUsage.children[1].sex).eq(1);
//     expect(simpleUsage.children[1].age).eq(18);
//     expect(simpleUsage.children[1].createTime).instanceof(Date);
//
//     expect(simpleUsage.person.id).eq(1);
//     expect(simpleUsage.person.name).eq('张三');
//     expect(simpleUsage.person.sex).eq(1);
//     expect(simpleUsage.person.age).eq(18);
//     expect(simpleUsage.person.createTime).instanceof(Date);
//   });
//
//   it('should SimpleUsage1 plain list', () => {
//     const simpleUsage = classTransformer.plainToInstance(
//       SimpleUsage2,
//       {
//         id: 2,
//         person: [
//           {
//             id: 1,
//             name: '张三',
//             sex: 1,
//             age: 18,
//             createTime: '2020/01/01',
//           },
//         ],
//         children: [
//           {
//             id: 1,
//             name: '小芳',
//             sex: 0,
//             age: 19,
//             createTime: '2020/01/01',
//           },
//         ],
//       },
//       {
//         scene: 1,
//       }
//     );
//
//     expect(simpleUsage.id).eq(2);
//
//     // person and children not array type.
//     expect(simpleUsage.person).eq(undefined);
//     expect(simpleUsage.children).eq(undefined);
//   });
// });
