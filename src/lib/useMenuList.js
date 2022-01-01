import { useReducer } from "react";
import { StorageService } from "../api/storageService";
import initData from "../initData";


const ACTIONS = {
    CREATE: 'create',
    RETRIEVE: 'retrieve',
    UPDATE: 'update',
    DELETE: 'delete',
}

const SORT_TYPES = {
    ALPHABETICAL : 'A',
    BY_TYPE : 'B'
}

const sortMenuList = (menuList, sortType) => {
    if (sortType === SORT_TYPES.ALPHABETICAL) {
        menuList.sort(function (a, b) {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            if (aName< bName) {
                return -1;
            }
            if (aName > bName) {
                return 1;
            }
            return 0;
        });
    } else if (sortType === SORT_TYPES.BY_TYPE) {
        //TODO
    }
}

const defaultReducer = (menuList, { type, payload }) => {
    switch (type) {
        case ACTIONS.CREATE:
            const { menu: newMenu } = payload;
            menuList.push(newMenu);
            sortMenuList(menuList, SORT_TYPES.ALPHABETICAL);
            return [...menuList];
        case ACTIONS.RETRIEVE:
            const { updatedMenuList } = payload;
            sortMenuList(updatedMenuList, SORT_TYPES.ALPHABETICAL);
            return [...updatedMenuList]
        case ACTIONS.UPDATE:
            const { menu: menuToUpdate } = payload;
            menuList.forEach((item, index) => {
                if (menuToUpdate.uuid === item.uuid) {
                    menuList[index] = menuToUpdate;
                }
            });
            sortMenuList(menuList, SORT_TYPES.ALPHABETICAL);
            return [...menuList];
        case ACTIONS.DELETE:
            const { menu: menuToDelete } = payload;
            const updatedMenu = menuList.filter((item) => item.uuid !== menuToDelete.uuid);
            sortMenuList(updatedMenu, SORT_TYPES.ALPHABETICAL);
            return [...updatedMenu];
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
}

export default function useMenuList(initialMenuList = initData.menuList, reducer = defaultReducer) {
    const [menuList, dispatch] = useReducer(reducer, initialMenuList);

    const handleCreate = (menu) => {
        StorageService.createMenu(menu).then(newMenu => {
            return dispatch({ type: ACTIONS.CREATE, payload: { menu: newMenu } })
        }).catch(reason => {
            alert(reason);
            return handleRetrieve();
        });
    }

    const handleDelete = (menu) => {
        StorageService.deleteMenu(menu).then(deletedMenu => {
            return dispatch({ type: ACTIONS.DELETE, payload: { menu: deletedMenu } })
        }).catch(reason => {
            alert(reason);
            return handleRetrieve();
        });
    }

    const handleUpdate = (menu) => {
        StorageService.updateMenu(menu).then(updatedMenu => {
            return dispatch({ type: ACTIONS.UPDATE, payload: { menu: updatedMenu } })
        });
    }
    const handleRetrieve = () => {
        StorageService.retrieveMenuList().then(updatedMenuList => {
            if (updatedMenuList !== null) {
                return dispatch({ type: ACTIONS.RETRIEVE, payload: { updatedMenuList } })
            } else {
                throw new Error('Please reload app');
            }
        }).catch(reason => {
            alert(reason);
            return dispatch({ type: ACTIONS.RETRIEVE, payload: { updatedMenuList: initData.menuList } })
        });
    }
    // handle other actions

    return {
        menuList,
        handleCreate,
        handleDelete,
        handleUpdate,
        handleRetrieve//// return other handlers
    }
}

useMenuList.reducer = defaultReducer;
useMenuList.types = ACTIONS;

export { useMenuList };