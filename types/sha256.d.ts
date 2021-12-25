declare module 'crypto-js/sha256' {
  interface Hash {
    toString: () => string;
  }
  export default function sha512(val: string): Hash;
}
