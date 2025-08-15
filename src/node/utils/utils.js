import crypto from 'crypto';

export const randomNumberGenerator = () => {
    const bytes = new Uint8Array(5)
    crypto.getRandomValues(bytes);
    return bytes.reduce((acc,value, i)=>{
        return acc * 10 * i + value;
    },0);
}

export const hashFunction = (randomSalt) => (data) => {
    return crypto.createHash('sha256').update(`${data}_${randomSalt}`).digest('hex');
}

export const kthHash = (random) => (data) => {
    const hash = hashFunction(random)(data);
    return Number.parseInt(hash,16);
}   

export const typeCheck = (expected) => (actual) => {
    return typeof actual === expected;
}