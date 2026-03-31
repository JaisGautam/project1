import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '../modules/category/category.module';
import { ProposalModule } from '../modules/proposal/proposal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CategoryModule,
    ProposalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}