import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from './settings/settings.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SavingsGoalModule } from './savings-goals/savings-goals.module';
import { InvestmentModule } from './investment/investment.module';
import { TaxModule } from './tax/tax.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'finApp',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SettingsModule,
    FeedbackModule,
    SavingsGoalModule,
    InvestmentModule,
    TaxModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
