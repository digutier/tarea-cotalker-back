import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppParser } from './app.parser';

@Module({
  imports: [CsvModule],
  controllers: [AppController],
  providers: [AppService, AppParser],
})
export class AppModule {}

