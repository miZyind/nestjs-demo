export function hasValue<T>(obj: T | undefined | null | void): obj is T {
  return typeof obj !== 'undefined' && obj !== null;
}
