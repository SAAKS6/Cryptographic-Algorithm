// Caesar Cipher
export function caesarEncrypt(text, shift) {
  let result = "";
  for (let char of text) {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const offset = code >= 65 && code <= 90 ? 65 : 97;
      result += String.fromCharCode(
        ((code - offset + shift + 26) % 26) + offset
      );
    } else {
      result += char;
    }
  }
  return result;
}

export function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, 26 - (shift % 26));
}

// Affine Cipher
function modInverse(a, m) {
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) return i;
  }
  return null;
}

export function affineEncrypt(text, a, b) {
  if (gcd(a, 26) !== 1) {
    throw new Error("Key 'a' must be coprime to 26");
  }

  let result = "";
  for (let char of text) {
    if (char.match(/[a-z]/i)) {
      const offset = char === char.toUpperCase() ? 65 : 97;
      const x = char.charCodeAt(0) - offset;
      result += String.fromCharCode(((a * x + b) % 26) + offset);
    } else {
      result += char;
    }
  }
  return result;
}

export function affineDecrypt(text, a, b) {
  const aInv = modInverse(a, 26);
  if (!aInv) throw new Error("Key 'a' has no modular inverse");

  let result = "";
  for (let char of text) {
    if (char.match(/[a-z]/i)) {
      const offset = char === char.toUpperCase() ? 65 : 97;
      const y = char.charCodeAt(0) - offset;
      result += String.fromCharCode(((aInv * (y - b + 26)) % 26) + offset);
    } else {
      result += char;
    }
  }
  return result;
}

function gcd(a, b) {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Vigenère Cipher
export function vigenereEncrypt(text, key, setMatrix) {
  key = key.toUpperCase();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Create the matrix
  const matrix = [];
  for (let i = 0; i < alphabet.length; i++) {
    const row = [];
    for (let j = 0; j < alphabet.length; j++) {
      row.push(alphabet[(i + j) % 26]);
    }
    matrix.push(row);
  }

  setMatrix(matrix);

  let result = "";
  let keyIndex = 0;

  for (let char of text) {
    if (char.match(/[a-z]/i)) {
      const keyChar = key[keyIndex % key.length];
      const shift = keyChar.charCodeAt(0) - 65;

      if (char === char.toUpperCase()) {
        result += String.fromCharCode(
          ((char.charCodeAt(0) - 65 + shift) % 26) + 65
        );
      } else {
        result += String.fromCharCode(
          ((char.charCodeAt(0) - 97 + shift) % 26) + 97
        );
      }

      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

export function vigenereDecrypt(text, key, setMatrix) {
  key = key.toUpperCase();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Create the matrix
  const matrix = [];
  for (let i = 0; i < alphabet.length; i++) {
    const row = [];
    for (let j = 0; j < alphabet.length; j++) {
      row.push(alphabet[(i + j) % 26]);
    }
    matrix.push(row);
  }

  setMatrix(matrix);

  let result = "";
  let keyIndex = 0;

  for (let char of text) {
    if (char.match(/[a-z]/i)) {
      const keyChar = key[keyIndex % key.length];
      const shift = keyChar.charCodeAt(0) - 65;

      if (char === char.toUpperCase()) {
        result += String.fromCharCode(
          ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65
        );
      } else {
        result += String.fromCharCode(
          ((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97
        );
      }

      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

// One Time Pad
export function otpEncrypt(text, key) {
  const cleanText = text.replace(/[^a-zA-Z]/g, "");
  if (key.length < cleanText.length) {
    throw new Error(
      "Key must be at least as long as the text (excluding non-alphabetic characters)"
    );
  }

  key = key.toUpperCase();
  let result = "";
  let keyIndex = 0;

  for (let char of text) {
    if (char.match(/[a-z]/i)) {
      if (keyIndex >= key.length) {
        throw new Error("Key is too short");
      }

      const keyChar = key[keyIndex];
      if (!keyChar.match(/[A-Z]/)) {
        throw new Error("Key must contain only alphabetic characters");
      }

      const shift = keyChar.charCodeAt(0) - 65;

      if (char === char.toUpperCase()) {
        result += String.fromCharCode(
          ((char.charCodeAt(0) - 65 + shift) % 26) + 65
        );
      } else {
        result += String.fromCharCode(
          ((char.charCodeAt(0) - 97 + shift) % 26) + 97
        );
      }

      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

export function otpDecrypt(text, key) {
  const cleanText = text.replace(/[^a-zA-Z]/g, "");
  if (key.length < cleanText.length) {
    throw new Error(
      "Key must be at least as long as the text (excluding non-alphabetic characters)"
    );
  }

  key = key.toUpperCase();
  let result = "";
  let keyIndex = 0;

  for (let char of text) {
    if (char.match(/[a-z]/i)) {
      if (keyIndex >= key.length) {
        throw new Error("Key is too short");
      }

      const keyChar = key[keyIndex];
      if (!keyChar.match(/[A-Z]/)) {
        throw new Error("Key must contain only alphabetic characters");
      }

      const shift = keyChar.charCodeAt(0) - 65;

      if (char === char.toUpperCase()) {
        result += String.fromCharCode(
          ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65
        );
      } else {
        result += String.fromCharCode(
          ((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97
        );
      }

      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

// Rail Fence Cipher
export function railFenceEncrypt(text, rails) {
  if (rails <= 1) return text;

  const fence = Array.from({ length: rails }, () => []);
  let rail = 0;
  let direction = 1;

  for (let char of text) {
    fence[rail].push(char);
    rail += direction;

    if (rail === rails - 1 || rail === 0) {
      direction *= -1;
    }
  }

  return fence.flat().join("");
}

export function railFenceDecrypt(text, rails) {
  if (rails <= 1) return text;

  const fence = Array.from({ length: rails }, () => []);
  const positions = Array(text.length).fill(0);

  let rail = 0;
  let direction = 1;

  for (let i = 0; i < text.length; i++) {
    positions[i] = rail;
    rail += direction;

    if (rail === rails - 1 || rail === 0) {
      direction *= -1;
    }
  }

  let index = 0;
  for (let r = 0; r < rails; r++) {
    for (let i = 0; i < positions.length; i++) {
      if (positions[i] === r) {
        fence[r].push(text[index++]);
      }
    }
  }

  const result = [];
  rail = 0;
  direction = 1;

  for (let i = 0; i < text.length; i++) {
    result.push(fence[rail].shift());
    rail += direction;

    if (rail === rails - 1 || rail === 0) {
      direction *= -1;
    }
  }

  return result.join("");
}

// Playfair Cipher
function createPlayfairMatrix(key) {
  key = key.toUpperCase().replace(/J/g, "I");
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  const seen = new Set();
  const matrixChars = [];

  for (const char of key) {
    if (char.match(/[A-Z]/) && !seen.has(char)) {
      matrixChars.push(char);
      seen.add(char);
    }
  }

  for (const char of alphabet) {
    if (!seen.has(char)) {
      matrixChars.push(char);
    }
  }

  const matrix = [];
  for (let i = 0; i < 5; i++) {
    matrix.push(matrixChars.slice(i * 5, (i + 1) * 5));
  }

  return matrix;
}
//
//
//
//
function findPosition(matrix, char) {
  char = char.toUpperCase().replace(/J/g, "I");
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === char) {
        return [i, j];
      }
    }
  }
  return [null, null];
}

function preparePlayfairText(text) {
  text = text
    .toUpperCase()
    .replace(/J/g, "I")
    .replace(/[^A-Z]/g, "");
  let prepared = "";

  for (let i = 0; i < text.length; i++) {
    prepared += text[i];

    if (i + 1 < text.length && text[i] === text[i + 1]) {
      prepared += "X";
    } else if (i + 1 < text.length) {
      prepared += text[++i];
    }
  }

  if (prepared.length % 2 === 1) {
    prepared += "X";
  }

  return prepared;
}

export function playfairEncrypt(text, key, setMatrix) {
  const matrix = createPlayfairMatrix(key);
  setMatrix(matrix);

  const preparedText = preparePlayfairText(text);
  let result = "";

  for (let i = 0; i < preparedText.length; i += 2) {
    const char1 = preparedText[i];
    const char2 = preparedText[i + 1];
    const [row1, col1] = findPosition(matrix, char1);
    const [row2, col2] = findPosition(matrix, char2);

    if (row1 === row2) {
      result += matrix[row1][(col1 + 1) % 5];
      result += matrix[row2][(col2 + 1) % 5];
    } else if (col1 === col2) {
      result += matrix[(row1 + 1) % 5][col1];
      result += matrix[(row2 + 1) % 5][col2];
    } else {
      result += matrix[row1][col2];
      result += matrix[row2][col1];
    }
  }

  return result;
}

export function playfairDecrypt(text, key, setMatrix) {
  const matrix = createPlayfairMatrix(key);
  setMatrix(matrix);

  text = text.toUpperCase().replace(/[^A-Z]/g, "");
  let result = "";

  for (let i = 0; i < text.length; i += 2) {
    const char1 = text[i];
    const char2 = text[i + 1];
    const [row1, col1] = findPosition(matrix, char1);
    const [row2, col2] = findPosition(matrix, char2);

    if (row1 === row2) {
      result += matrix[row1][(col1 + 4) % 5];
      result += matrix[row2][(col2 + 4) % 5];
    } else if (col1 === col2) {
      result += matrix[(row1 + 4) % 5][col1];
      result += matrix[(row2 + 4) % 5][col2];
    } else {
      result += matrix[row1][col2];
      result += matrix[row2][col1];
    }
  }

  return result.replace(/X/g, "");
}

// RSA Cipher
function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function generatePrime(min, max) {
  while (true) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (isPrime(num)) return num;
  }
}

function extendedGcd(a, b) {
  if (a === 0) {
    return [b, 0, 1];
  }

  const [gcd, x1, y1] = extendedGcd(b % a, a);
  const x = y1 - Math.floor(b / a) * x1;
  const y = x1;

  return [gcd, x, y];
}

function modInverseExtended(a, m) {
  const [gcd, x] = extendedGcd(a, m);
  if (gcd !== 1) {
    return null;
  }
  return ((x % m) + m) % m;
}

export function rsaGenerateKeys(keySize = 8) {
  const min = 10 ** (Math.floor(keySize / 2) - 1);
  const max = 10 ** Math.floor(keySize / 2) - 1;

  const p = generatePrime(min, max);
  let q = generatePrime(min, max);
  while (q === p) {
    q = generatePrime(min, max);
  }

  const n = p * q;
  const phi = (p - 1) * (q - 1);

  let e = 65537;
  while (gcd(e, phi) !== 1) {
    e = Math.floor(Math.random() * (phi - 3)) + 3;
  }

  const d = modInverseExtended(e, phi);

  return {
    public_key: [n, e],
    private_key: [n, d],
    p,
    q,
    phi,
  };
}

export function rsaEncrypt(message, publicKey) {
  const [n, e] = publicKey;
  const encrypted = [];

  for (const char of message) {
    const m = char.charCodeAt(0);
    if (m >= n) {
      throw new Error(
        `Character '${char}' (ASCII ${m}) is too large for key size`
      );
    }
    const c = BigInt(m) ** BigInt(e) % BigInt(n);
    encrypted.push(Number(c));
  }

  return encrypted;
}

export function rsaDecrypt(ciphertext, privateKey) {
  const [n, d] = privateKey;
  const decrypted = [];

  for (const c of ciphertext) {
    const m = BigInt(c) ** BigInt(d) % BigInt(n);
    decrypted.push(String.fromCharCode(Number(m)));
  }

  return decrypted.join("");
}

export function rsaEncryptText(message, publicKey) {
  const encrypted = rsaEncrypt(message, publicKey);
  return encrypted.join(" ");
}

export function rsaDecryptText(ciphertext, privateKey) {
  const encrypted = ciphertext.split(" ").map(Number);
  return rsaDecrypt(encrypted, privateKey);
}

// Transposition Cipher Encryption
export function transpositionEncrypt(text, key, variant, setGrid, setSteps) {
  text = text.replace(/\s+/g, "").toUpperCase();
  const keyUpper = key.toUpperCase();
  const steps = [];

  if (variant === "column") {
    const keyLen = keyUpper.length;
    const grid = [];

    for (let i = 0; i < text.length; i += keyLen) {
      const row = text.slice(i, i + keyLen).split("");
      while (row.length < keyLen) {
        row.push("X");
      }
      grid.push(row);
    }

    setGrid(grid);

    const keyOrder = Array.from({ length: keyLen }, (_, i) => i).sort(
      (a, b) => keyUpper.charCodeAt(a) - keyUpper.charCodeAt(b) || a - b
    );

    steps.push(
      `Column order: ${keyOrder.map((i) => keyUpper[i]).join(" -> ")}`
    );

    let result = "";
    const columnResults = [];

    for (const col of keyOrder) {
      let colText = "";
      for (const row of grid) {
        colText += row[col];
      }
      result += colText;
      columnResults.push(`Col ${col} (${keyUpper[col]}): ${colText}`);
    }

    steps.push(...columnResults);
    setSteps(steps);
    return result;
  } else if (variant === "row") {
    const rows = keyUpper.length;
    const cols = Math.ceil(text.length / rows);
    while (text.length < rows * cols) {
      text += "X";
    }

    const grid = [];
    for (let i = 0; i < rows; i++) {
      grid.push(text.slice(i * cols, (i + 1) * cols).split(""));
    }

    setGrid(grid);

    const keyOrder = Array.from({ length: rows }, (_, i) => i).sort(
      (a, b) => keyUpper.charCodeAt(a) - keyUpper.charCodeAt(b) || a - b
    );

    steps.push(`Row order: ${keyOrder.map((i) => keyUpper[i]).join(" -> ")}`);

    let result = "";
    const rowResults = [];

    for (const rowIdx of keyOrder) {
      const rowText = grid[rowIdx].join("");
      result += rowText;
      rowResults.push(`Row ${rowIdx} (${keyUpper[rowIdx]}): ${rowText}`);
    }

    steps.push(...rowResults);
    setSteps(steps);
    return result;
  } else {
    throw new Error('Invalid variant: must be "column" or "row"');
  }
}

// Transposition Cipher Decryption
export function transpositionDecrypt(text, key, variant, setGrid, setSteps) {
  const keyUpper = key.toUpperCase();
  const textLen = text.length;
  const steps = [];

  if (variant === "column") {
    const keyLen = keyUpper.length;
    const rows = Math.ceil(textLen / keyLen);
    const grid = Array.from({ length: rows }, () => Array(keyLen).fill(""));

    const keyOrder = Array.from({ length: keyLen }, (_, i) => i).sort(
      (a, b) => keyUpper.charCodeAt(a) - keyUpper.charCodeAt(b) || a - b
    );

    steps.push(
      `Column order: ${keyOrder.map((i) => keyUpper[i]).join(" -> ")}`
    );

    let index = 0;
    const columnFills = [];

    for (const col of keyOrder) {
      let colText = "";
      for (let row = 0; row < rows && index < textLen; row++) {
        grid[row][col] = text[index++];
        colText += grid[row][col];
      }
      columnFills.push(`Col ${col} (${keyUpper[col]}): ${colText}`);
    }

    steps.push(...columnFills);
    setGrid(grid);
    setSteps(steps);

    let result = "";
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < keyLen; col++) {
        result += grid[row][col];
      }
    }

    while (result.endsWith("X")) {
      result = result.slice(0, -1);
    }
    return result;
  } else if (variant === "row") {
    const rows = keyUpper.length;
    const cols = Math.ceil(textLen / rows);
    const grid = Array.from({ length: rows }, () => Array(cols).fill(""));

    const keyOrder = Array.from({ length: rows }, (_, i) => i).sort(
      (a, b) => keyUpper.charCodeAt(a) - keyUpper.charCodeAt(b) || a - b
    );

    let index = 0;
    const rowFills = [];

    for (const rowIdx of keyOrder) {
      const rowText = text.slice(index, index + cols);
      for (let col = 0; col < cols; col++) {
        grid[rowIdx][col] = rowText[col] || "X";
      }
      rowFills.push(`Row ${rowIdx} (${keyUpper[rowIdx]}): ${rowText}`);
      index += cols;
    }

    steps.push(...rowFills);
    setGrid(grid);
    setSteps(steps);

    let result = "";
    for (let row = 0; row < rows; row++) {
      result += grid[row].join("");
    }

    while (result.endsWith("X")) {
      result = result.slice(0, -1);
    }
    return result;
  } else {
    throw new Error('Invalid variant: must be "column" or "row"');
  }
}

// SHA-256 Hash
function rightRotate(value, amount) {
  return (value >>> amount) | (value << (32 - amount));
}

export function sha256Hash(message) {
  const hash = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
    0x1f83d9ab, 0x5be0cd19,
  ]);

  const k = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
    0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ]);

  const msg = new TextEncoder().encode(message);
  const len = msg.length;
  const totalLen = (len + 1 + 8 + 63) & ~63;
  const data = new Uint8Array(totalLen);

  data.set(msg);
  data[len] = 0x80;

  const lenBits = len * 8;
  for (let i = 0; i < 8; i++) {
    data[totalLen - 8 + i] = (lenBits >>> (56 - i * 8)) & 0xff;
  }

  for (let chunk = 0; chunk < totalLen; chunk += 64) {
    const w = new Uint32Array(64);

    for (let i = 0; i < 16; i++) {
      w[i] =
        (data[chunk + i * 4] << 24) |
        (data[chunk + i * 4 + 1] << 16) |
        (data[chunk + i * 4 + 2] << 8) |
        data[chunk + i * 4 + 3];
    }

    for (let i = 16; i < 64; i++) {
      const s0 =
        rightRotate(w[i - 15], 7) ^
        rightRotate(w[i - 15], 18) ^
        (w[i - 15] >>> 3);
      const s1 =
        rightRotate(w[i - 2], 17) ^
        rightRotate(w[i - 2], 19) ^
        (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }

    let a = hash[0],
      b = hash[1],
      c = hash[2],
      d = hash[3];
    let e = hash[4],
      f = hash[5],
      g = hash[6],
      h = hash[7];

    for (let i = 0; i < 64; i++) {
      const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + k[i] + w[i]) >>> 0;
      const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }

    hash[0] = (hash[0] + a) >>> 0;
    hash[1] = (hash[1] + b) >>> 0;
    hash[2] = (hash[2] + c) >>> 0;
    hash[3] = (hash[3] + d) >>> 0;
    hash[4] = (hash[4] + e) >>> 0;
    hash[5] = (hash[5] + f) >>> 0;
    hash[6] = (hash[6] + g) >>> 0;
    hash[7] = (hash[7] + h) >>> 0;
  }

  return Array.from(hash)
    .map((val) => val.toString(16).padStart(8, "0"))
    .join("");
}
