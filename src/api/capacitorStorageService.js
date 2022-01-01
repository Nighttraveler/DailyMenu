import { Storage } from '@capacitor/storage';
import initData from "../initData";

export const INIT_KEYS = {
    RUN_START_UP_KEY: 'runStartUp',
}

const runStartUp = async () => {
    let { value } = await Storage.get({ key: INIT_KEYS.RUN_START_UP_KEY });
    value = JSON.parse(value);
    if (!value) {
        await Storage.set({
            key: 'runStartUp',
            value: JSON.stringify(true)
        });
        await set('menuList', initData.menuList);
    }
}


const set = async (key, value) => {
    return Storage.set({
        key: key,
        value: JSON.stringify(value)
    });
}

const get = async (key) => {
    const { value } = await Storage.get({ key: key });
    return JSON.parse(value);
}


const remove = async (key) => {
    return Storage.remove({
        key: key
    });

}

export const capacitorStorageService = {
    set,
    get,
    remove,
    runStartUp
}

