import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';
import { DateTime } from 'luxon';


async function bootstrap() {
  const appName = 'Main-Gateway';
  const d = DateTime.local();
  const timezone = d.zoneName;
  const appVersion = '1.0.0';

  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);
  await app.listen(envs.PORT);

  logger.log(`🚀  Server is running at ${await app.getUrl()}`);
  logger.log(`🚀  App Name: ${appName}`);
  logger.log(`🚀  Timezone:  ${timezone}`);
  logger.log(`🚀  Version:  ${appVersion}`);
}
bootstrap();
