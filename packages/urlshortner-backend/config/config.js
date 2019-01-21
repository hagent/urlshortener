module.exports = {
  development: {
    username: 'urlshortener',
    password: 'password',
    database: 'urlshortener',
    host: 'postgres',
    port: '5432',
    dialect: 'postgres'
  },
  test: {
    username: 'urlshortner',
    password: 'password',
    database: 'urlshortner',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'urlshortner',
    password: 'password',
    database: 'urlshortner',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
}
