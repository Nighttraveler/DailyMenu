import { capacitorStorageService } from "./capacitorStorageService";

export const MENU_KEYS = {
    MENU_LIST: 'menuList',
    GENERATED_MENU: 'generated_menu'
}


/**
 *
 * @param newMenu a menu to be created
 * @returns {Promise<*>} a promise with menu
 */
const createMenu = async (newMenu) => {
    const menuList = await retrieveMenuList();
    menuList.push(newMenu);
    return updateMenuList(menuList, newMenu).then(value => {
        return value;
    });
}

const retrieveMenu = async (menuUuid) => {
    const menuList = await retrieveMenuList();
    return menuList.find(menu => menu.uuid === menuUuid);
};

const updateMenu = async (menuToUpdate) => {
    const menuList = await retrieveMenuList();
    menuList.forEach((item, index) => {
        if (menuToUpdate.uuid === item.uuid) {
            menuList[index] = menuToUpdate;
        }
    });
    return updateMenuList(menuList, menuToUpdate);
};


const deleteMenu = async (menuToDelete) => {
    let menuList = await retrieveMenuList();
    menuList = [...menuList.filter((item) => item.uuid !== menuToDelete.uuid)];
    return updateMenuList(menuList, menuToDelete).then(value => {
        return value;
    });
};

////////////////////////////////////////////////

const updateMenuList = async (menuList, menu) => {
    return capacitorStorageService.set(
        MENU_KEYS.MENU_LIST,
        menuList).then(() => menu);
};

const retrieveMenuList = async () => {
    return await capacitorStorageService.get(MENU_KEYS.MENU_LIST);
}

////////////////////////////////////////////////

const retrieveGeneratedMenu = async () => {
    return capacitorStorageService.get(MENU_KEYS.GENERATED_MENU);
}

const updateGeneratedMenu = async (generated_menu) => {
    return capacitorStorageService.set(
        MENU_KEYS.GENERATED_MENU,
        generated_menu)
        .then(() => generated_menu);
}

// TODO: this can be separated into MenuList, GeneratedMenu and Menu services
export const StorageService = {
    retrieveMenuList,
    updateMenuList,
    // individual menu
    createMenu,
    retrieveMenu,
    deleteMenu,
    updateMenu,
    //generated menu
    retrieveGeneratedMenu,
    updateGeneratedMenu
}