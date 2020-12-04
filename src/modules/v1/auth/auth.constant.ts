export enum AuthStrategy {
  JWT = 'JWT',
}

export enum AuthError {
  InvalidLoginCredentials = 'Invalid login credentials',
  ThisAccountHasNotBeenApproved = 'This account has not been approved',
  ThisAccountHasBeenBanned = 'This account has been banned',
}
