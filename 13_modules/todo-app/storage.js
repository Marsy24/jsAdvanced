export async function getModule(key) {
    const isServerStorage = getLocalStorage(key);
    
    const module = await switchModule(isServerStorage, key);
    return module;
}

export function getLocalStorage(key) {
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, JSON.stringify(true));
        return true;
    } else {
        return JSON.parse(localStorage.getItem(key))
    }
}


export async function switchModule(isServerStorage) {
    if (!isServerStorage) return await import('./localStorage.js');
    else return await import('./api.js')
}

export function switchLocalStorage(key) {
    localStorage.setItem(key, JSON.stringify(JSON.parse(!getLocalStorage(key))));
}