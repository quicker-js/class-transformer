// import { PageList } from './page-list';
// import { SimpleGirl } from './simple-girl';
// import { SimpleBoy } from './simple-boy';
// import { Entity, Prop, Scene, SubType } from '../src';
// import moment, { Moment } from 'moment';
//
// @Entity.decorate
// /**
//  * 响应数据类型
//  */
// export class ResponseOk<T> {
//   @Prop.default
//   public msg: string;
//
//   @Prop.default
//   public code: number;
//
//   @Prop({
//     type: String,
//     toPlainOnly: true,
//   })
//   @Prop({
//     scenes: Scene.fromTypes(PageList, SimpleGirl, SimpleBoy),
//     toInstanceOnly: true,
//   })
//   public data: T;
//
//   @Prop({
//     subTypes: SubType.fromTypes(SimpleGirl, SimpleBoy),
//   })
//   public person: Set<SimpleGirl | SimpleBoy>;
//
//   @Prop({
//     type: SimpleBoy,
//   })
//   public child: Promise<SimpleGirl | SimpleBoy>;
//
//   @Prop({
//     scenes: Scene.fromTypes(PageList, SimpleGirl, SimpleBoy),
//   })
//   public child1: Promise<SimpleGirl | SimpleBoy>;
//
//   @Prop({
//     transform: (value: Date) => moment(value).format('YYYY-MM-DD hh:mm:ss'),
//     toPlainOnly: true,
//   })
//   public createTime: Date;
//
//   @Prop.default
//   public test: string;
//
//   @Prop.default
//   public isOk: boolean;
// }
