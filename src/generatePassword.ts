import sha256 from 'crypto-js/sha256';

import PublicKey from './publicKey';
import PrivateKey from './privateKey';

function mixStr(list: string[][]): string {
  const arr: string[] = [];
  const maxLen = Math.max(...list.map((item) => item.length));
  for (let i = 0; i < maxLen; i++) {
    for (let j = 0; j < list.length; j++) {
      if (list[j][i]) {
        arr.push(list[j][i]);
      }
    }
  }

  return arr.join('');
}

/**
 * ASCII Table
 * 0 - 9: 48 - 57
 * A - Z: 65 - 90
 * a - z: 97 - 122
 */
export default function generatePassword(
  publicKey: PublicKey,
  privateKey: PrivateKey
) {
  const hash = sha256(`${publicKey.name}-${privateKey.value}`).toString();
  console.log(publicKey.name, privateKey.value, hash);
  const arr: number[] = [];
  const stepLen = Math.ceil(hash.length / publicKey.expectedLen);

  for (let i = 0; i < hash.length; i += stepLen) {
    arr.push(
      hash
        .slice(i, i + stepLen)
        .split('')
        .reduce((pre, cur) => {
          return pre + cur.codePointAt(0)! || 0;
        }, 0)
    );
  }

  const numbers = arr.map((item) =>
    String.fromCodePoint((item % (57 - 48 + 1)) + 48)
  );
  const captials = arr.map((item) =>
    String.fromCodePoint((item % (90 - 65 + 1)) + 65)
  );
  const words = arr.map((item) =>
    String.fromCodePoint((item % (122 - 97 + 1)) + 97)
  );

  let specialWord = '';
  if (publicKey.specialStrList.length > 0) {
    const i =
      publicKey.specialStrList.reduce((pre, cur) => {
        return pre + cur.codePointAt(0)! || 0;
      }, 0) % publicKey.specialStrList.length;

    specialWord = publicKey.specialStrList[i];
  }

  if (!publicKey.isContainCaptial) {
    return `${specialWord}${mixStr([words, numbers])}`.slice(
      0,
      publicKey.expectedLen
    );
  }

  if (publicKey.isCaptialFirst) {
    if (specialWord) {
      return `${mixStr([captials, words, numbers])}`
        .slice(0, publicKey.expectedLen - 1)
        .concat(specialWord);
    }

    return mixStr([captials, words, numbers]).slice(0, publicKey.expectedLen);
  }

  return `${specialWord}${mixStr([words, captials, numbers])}`.slice(
    0,
    publicKey.expectedLen
  );
}
