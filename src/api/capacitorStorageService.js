import { Storage } from '@capacitor/storage';
import initData from "../initData";
import { MENU_KEYS } from "./storageService";

export const INIT_KEYS = {
    RUN_START_UP_KEY: 'runStartUp',
}

const runStartUp = async () => {
    let { value } = await Storage.get({ key: INIT_KEYS.RUN_START_UP_KEY });
    value = JSON.parse(value);
    if (!value) {
        await set('runStartUp', true);
        await set(MENU_KEYS.MENU_LIST, initData.menuList);
        await set(MENU_KEYS.USER_PREFERENCES_LIST, initData.user_preferences);
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

