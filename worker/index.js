import {redisHost, redisPort} from './keys.js';
import redis from 'redis';

const redisClient = redis.createClient({
    host: redisHost,
    port: redisPort,
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

// a slow solution of calculating a fibonacci index value
// we do this on purpose to show how the complete setup works
function fib(index) {
    if(index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)));
});

sub.subscribe('insert');