import 'reflect-metadata';
import { describe, it } from 'mocha';
import { SwaggerApi } from '../sample/swagger';
import classTransformer from '../src';

describe('swagger-transform.spec.ts', () => {
  it('should SwaggerApi v2.', function () {
    const swaggerApi = classTransformer.plainToInstance(
      SwaggerApi,
      require('./v2.json')
    );

    // console.log(swaggerApi.definitions);

    // const responseResult = swaggerApi.definitions.get(
    //   'ResponseResult«List«Order»»'
    // );
    // if (responseResult) {
    //   console.log(responseResult);
    // }

    //@ts-ignore
    console.log(swaggerApi.paths.get('/sys/update/password').put.parameters);
  });

  // it('should SwaggerApi v3.', function () {
  //   const swaggerApi = classTransformer.plainToInstance(
  //     SwaggerApi,
  //     require('./v3.json')
  //   );
  //
  //   // console.log(swaggerApi);
  // });
});
