import { storage } from "./store";

const Storage = {
    setItem: (key, value) => storage.set(key, typeof value === 'object' ? JSON.stringify(value) : value),
    getItem: (key) => {
        const value = storage.getString(key);
        try {
            return value && typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))
                ? JSON.parse(value)
                : value;
        } catch (error) {
            console.error("Error parsing JSON", error);
            return value;
        }
    },
    removeItem: (key) => storage.delete(key),
    clear: () => storage.clearAll(),
    multiRemove: (keys) => {
        keys.forEach(key => storage.delete(key));
    },
};

export default Storage;
