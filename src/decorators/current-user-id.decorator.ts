import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext):number => {
    const request = context.switchToHttp().getRequest();
    if(!request.user?.id){throw Error('JwtAuthGuard must be used')}
    return request.user.id;
  },
);