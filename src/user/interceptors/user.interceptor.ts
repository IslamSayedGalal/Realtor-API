/* eslint-disable prettier/prettier */
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import jwt from 'jsonwebtoken';
export class UserInterceptor implements NestInterceptor {
 async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(" ")[1];
    const user = await jwt.decode(token)
    request.user = user;
    console.log({ user});
    return handler.handle();
  }
}
