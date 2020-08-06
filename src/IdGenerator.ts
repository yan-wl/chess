let count = 0;

export function generateId(): string {
  count++;

  return count.toString();
}
