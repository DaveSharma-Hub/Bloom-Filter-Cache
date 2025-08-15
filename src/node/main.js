import { kthHash, randomNumberGenerator, typeCheck } from "./utils/utils.js";

export class CacheFilter {
    #setMethod = null;
    #getMethod = null;
    #bitArray = [];
    #hashs = [];

    constructor({
        get,
        set,
        hashCount = 3,
        bitArraySize = 100000
    }){
        const isFunction = typeCheck('function');
        if(isFunction(get)){
            this.#getMethod = get;
        }
        if(isFunction(set)){
            this.#setMethod = set;
        }

        this.#initializeBitArray(bitArraySize);
        this.#initializeHashArray(hashCount);
    }   

    #initializeBitArray(bitArraySize){
        let size = bitArraySize;
        if(size < 0){
            size = 100000;
        }
        this.#bitArray = [...Array(size)].map(()=>0);
    }

    #initializeHashArray(hashCount){
        let hashSize = hashCount;
        if(hashSize < 0){
            hashSize = 100000;
        }
        this.#hashs = [...Array(hashSize)].map(()=>kthHash(randomNumberGenerator()));
    }

    #isInFilter(key) {
        const length = this.#bitArray.length; 
        for(const hash of this.#hashs){
            const index = hash(key) % length;
            if(this.#bitArray[index] === 0){
                return false;
            }
        }
        return true;
    }

    #addToFilter(key){
        const length = this.#bitArray.length; 
        for(const hash of this.#hashs){
            const index = hash(key) % length;
            this.#bitArray[index] = 1;
        }
    }

    async get(key){
        const output = {
            result: null,
            isInCache: false
        }
        if(this.#isInFilter(key)){
            const result = await this.#getMethod(key);
            output.result = result;
            output.isInCache = true;
        }
        return output;
    }

    async set(key, value){
        this.#addToFilter(key);
        await this.#setMethod(key, value);
    }

    clearFilter(){
        const length = this.#bitArray.length;
        this.#bitArray = [...Array(length)].map(()=>0);
    }
}
