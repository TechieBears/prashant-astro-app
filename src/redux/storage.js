import { MMKV } from 'react-native-mmkv';

let mmkvInstance;

try {
  mmkvInstance = new MMKV();
} catch (error) {
  console.warn(
    'MMKV unavailable, falling back to in-memory storage. Disable remote debugging for persistent storage.',
    error
  );
}

const memoryStore = {};

const getMemoryValue = (key) => {
  if (Object.prototype.hasOwnProperty.call(memoryStore, key)) {
    return memoryStore[key];
  }
  return null;
};

export const mmkvStorage = mmkvInstance
  ? {
      setItem: (key, value) => {
        mmkvInstance.set(key, value);
        return Promise.resolve(true);
      },
      getItem: (key) => {
        const value = mmkvInstance.getString(key);
        return Promise.resolve(value);
      },
      removeItem: (key) => {
        mmkvInstance.delete(key);
        return Promise.resolve();
      },
    }
  : {
      setItem: (key, value) => {
        memoryStore[key] = value;
        return Promise.resolve(true);
      },
      getItem: (key) => Promise.resolve(getMemoryValue(key)),
      removeItem: (key) => {
        delete memoryStore[key];
        return Promise.resolve();
      },
    };

export default mmkvStorage;
