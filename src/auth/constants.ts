export const jwtConstants = {
  secret: process.env.JVT_SECRET || 'secretKey',
};

export const basicConstants = {
  username: process.env.HTTP_BASIC_USER || 'admin',
  password: process.env.HTTP_BASIC_PASS || '123',
};

