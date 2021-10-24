import { Storage } from '@capacitor/storage';
import initData from "../initData";

export const KEYS = {
    RUN_START_UP_KEY: 'runStartUp',
    MENU_LIST: 'menuList',
    GENERATED_MENU: 'generated_menu'
}

const runStartUp = async () => {
    let { value } = await Storage.get({ key: KEYS.RUN_START_UP_KEY });
    value = JSON.parse(value);
    if (!value) {
        await Storage.set({
            key: KEYS.RUN_START_UP_KEY,
            value: JSON.stringify(true)
        });
        await updateMenuList(initData.menuList);
    }
}

const createMenu = async (newMenu) => {
    const menuList = await getMenuList();
    menuList.push(newMenu);
    return updateMenuList(menuList, newMenu).then(value => {
        return value;
    });
}

const updateMenu = async (menuToUpdate) => {
    const menuList = await getMenuList();
    menuList.forEach((item, index) => {
        if (menuToUpdate.uuid === item.uuid) {
            menuList[index] = menuToUpdate;
        }
    });
    return updateMenuList(menuList, menuToUpdate);
};


const deleteMenu = async (menuToDelete) => {
    let menuList = await getMenuList();
    menuList = [...menuList.filter((item) => item.uuid !== menuToDelete.uuid)];
    return updateMenuList(menuList, menuToDelete).then(value => {
        return value;
    });
};

const retrieveMenu = async (menuUuid) => {
    const menuList = await getMenuList();
    return menuList.find(menu => menu.uuid === menuUuid);
};

const updateMenuList = async (menuList, menu) => {
    return Storage.set({
        key: KEYS.MENU_LIST,
        value: JSON.stringify(menuList)
    }).then(() => menu);
};

const getMenuList = async () => {
    const { value } = await Storage.get({
        key: KEYS.MENU_LIST
    })
    return JSON.parse(value);
}

const getGeneratedMenu = async () => {
    const { value } = await Storage.get({ key: KEYS.GENERATED_MENU });
    return JSON.parse(value);
}

const updateGeneratedMenu = async (generated_menu) => {
    return Storage.set({
        key: KEYS.GENERATED_MENU,
        value: JSON.stringify(generated_menu)
    }).then(() => generated_menu);
}

export const StorageService = {
    runStartUp,
    getMenuList,
    updateMenuList,
    // individual menu
    createMenu,
    retrieveMenu,
    deleteMenu,
    updateMenu,
    //generated menu
    getGeneratedMenu,
    updateGeneratedMenu
}