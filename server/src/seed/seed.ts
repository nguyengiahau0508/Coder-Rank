
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeederService } from './seeder.service';

async function runSeeder() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(SeederService);
  await seeder.seed();
  await app.close();
}

runSeeder().catch((err) => {
  console.error('❌ Seeding failed!', err);
});
