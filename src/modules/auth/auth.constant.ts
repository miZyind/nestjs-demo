export enum AuthStrategy {
  JWT = 'JWT',
  Secret = 'SECRET',
}

export enum AuthError {
  InvalidLoginCredentials = 'Invalid login credentials',
  InvalidToken = 'Invalid token',
  InvalidSecret = 'Invalid secret',
}
