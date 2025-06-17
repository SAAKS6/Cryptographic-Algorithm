// Greatest Common Divisor
export function gcd(a, b) {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Modular Inverse
export function modInverse(a, m) {
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) return i;
  }
  return null;
}
