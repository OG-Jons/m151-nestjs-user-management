import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('M151 User management')
    .setDescription('Manage Users and authenticate using jwt')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  app.enableCors({
    origin: true,
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
