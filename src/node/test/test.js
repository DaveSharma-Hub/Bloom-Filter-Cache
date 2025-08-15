import { CacheFilter } from "../main.js";

const setup = () => {
    const cache = {};
    return {
        get: (key) => {
            return cache[key];
        },
        set: (key, value) => {
            cache[key] = value;
        }  
    }
}

const assertion = (expected) => (actual) => {
    if(expected != actual){
        throw new Error(`${expected} not equal to ${actual}`);
    }
}

const test = async() => {
    const {get, set} = setup();
    const filter = new CacheFilter({
        get: get,
        set: set,
    });
    await filter.set('a', 90);
    await filter.set('kjnkjn', 1);
    await filter.set('jknjkn', 2);
    await filter.set('nnejnw', 3);
    await filter.set('oopop', 4);


    assertion(JSON.stringify({
        result: 1,
        isInCache: true
    }))(JSON.stringify(await filter.get('kjnkjn')));
    assertion(JSON.stringify({
        result: 90,
        isInCache: true
    }))(JSON.stringify(await filter.get('a')));
    assertion(JSON.stringify({
        result: null,
        isInCache: false
    }))(JSON.stringify(await filter.get('kkjan93203')));
    console.log('Test case passed');
}

test();