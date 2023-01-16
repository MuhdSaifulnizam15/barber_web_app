// IMPORTANT:
// Change this mode depends on environment
const mode = 'dev'; // dev | prod | local

const configuration = {
    local: {
        apiUrl: 'http://localhost:3001/api/v1/',
    },
    dev: {
        apiUrl: 'https://api.rolexbarbershop.com/api/v1/', // to be changed
    },
    prod: {
        apiUrl: 'https://test-api.rolexbarbershop.com/api/v1/', // to be changed
    }
};

const config = configuration[mode];

const devMode = (mode != 'prod') ? true :  false;

const IS_PROD = process.env.NODE_ENV === 'production'

const CACHE_REVALIDATION = 60 // 1 minute

export default {
    config,
    devMode,
    IS_PROD,
    CACHE_REVALIDATION
};