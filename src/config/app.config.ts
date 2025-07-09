export const AppConfig = () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  databases: {
    businessConfigDB: {
      type: 'postgres',
      host: process.env.BUSINESS_DB_HOST || 'localhost',
      port: parseInt(process.env.BUSINESS_DB_PORT ?? '5432', 10),
      username: process.env.BUSINESS_DB_USER || 'postgres1',
      password: process.env.BUSINESS_DB_PASSWORD || 'password',
      database: process.env.BUSINESS_DB_NAME || 'business_db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    },

    employeeConfigDB: {
      type: 'postgres',
      host: process.env.EMPLOYE_DB_HOST || 'localhost',
      port: parseInt(process.env.EMPLOYE_DB_PORT ?? '5433', 10),
      username: process.env.EMPLOYE_DB_USER || 'postgres',
      password: process.env.EMPLOYE_DB_PASSWORD || 'password',
      database: process.env.EMPLOYE_DB_NAME || 'employe_db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    },
  },
});
