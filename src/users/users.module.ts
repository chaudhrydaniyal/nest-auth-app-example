import { Module , NestModule, MiddlewareConsumer} from '@nestjs/common';
import { LoggerMiddleware } from './../common/middleware/logger.middleware';
import { UsersService } from './users.service';
import { UsersAuthController, UsersController } from './users.controller';
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "./users.model"


@Module({
  imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController, UsersAuthController],
  exports: [UsersService],

})
// export class UsersModule {}
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}