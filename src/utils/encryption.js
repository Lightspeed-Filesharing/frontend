
import {generatePassword} from './generation';

const {SodiumPlus} = require('sodium-plus');
export const createKeys = async (sodium) => { // Creates cryptography keys derived from a randomly generated password and salt.
    let password = await generatePassword(16);
    let plainSalt = await generatePassword(16);
    let salt = new TextEncoder().encode(plainSalt);
    console.log(`Password: ${password}\nSalt: ${plainSalt}`)

    const key = await sodium.crypto_pwhash(32, password, salt, sodium.CRYPTO_PWHASH_OPSLIMIT_INTERACTIVE, sodium.CRYPTO_PWHASH_MEMLIMIT_INTERACTIVE);
    console.log("Keys generated.");
    return [key, password, plainSalt];
}

export const deriveKeys = async (sodium, password, plainSalt) => {
    let salt = new TextEncoder().encode(plainSalt);
    console.log(`Password: ${password}\nSalt: ${plainSalt}`)

    const key = await sodium.crypto_pwhash(32, password, salt, sodium.CRYPTO_PWHASH_OPSLIMIT_INTERACTIVE, sodium.CRYPTO_PWHASH_MEMLIMIT_INTERACTIVE);
    console.log("Keys generated.");
    return [key, password, plainSalt];

}

export const encrypt = async (sodium, unencryptedData, key, nonce=null) => { // Encrypts data using the keys and a randomly generated nonce.
    if (!nonce) {
        nonce = await sodium.randombytes_buf(24);
    }
    
    let ciphertext = await sodium.crypto_secretbox(unencryptedData, nonce, key);
    return [ciphertext, nonce];
}

export const decrypt = async (sodium, encryptedData, nonce, key, disableStringification=false) => { // Decrypts encrypted data using a provided nonce.
    let decrypted = await sodium.crypto_secretbox_open(encryptedData, nonce, key);
    if (!disableStringification) {
        return decrypted.toString('utf8');
    }

    return decrypted;
}
