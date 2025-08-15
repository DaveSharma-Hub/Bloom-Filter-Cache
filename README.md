# Bloom-Filter-Cache

#### How it works

The Bloom Filter Cache is an in-memory database cache mechanism that will allow you to determine whether a value has been cached or not without having to make a request to a cache server. Since the data is already present near/at the server side it is much more efficient to query in-memory and verify if the data is present in the cache or not before making a database request. The bloom filter can yield false positives, meaning that it may not actually exist in the cache, however if the value doesnt exist in the filter then it does not exist in the cache and needs to be read from the database. 

### Usage

Initialize the filter by passing in callback methods for get and set to update the actual cache. These can be async functions that will make network requests calls to a cache server database such as Redis, or Memcached.

```
const filter = new CacheFilter({
    get: get,
    set: set,
});

```

The returned value will be in the format of 
```
{
    result: null,
    isInCache: false
}
```

```
const { result, isInCache } = await filter.get('key_123_unique');
if(isInCache){
    return result;
}
// Otherwise make a database request to retrieve the actual data
```
```
await filter.set(
    'another_key_123_unique', 
    {'id':'123','name':'John', age:45}
);
```