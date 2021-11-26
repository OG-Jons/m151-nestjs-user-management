import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './task-management.sqlite',
  autoLoadEntities: true,
  synchronize: !!!process.env.NODE_ENV,
};
