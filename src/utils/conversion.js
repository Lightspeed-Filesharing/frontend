export const fromHexString = async (hexString) => new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

export const toHexString = async (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');