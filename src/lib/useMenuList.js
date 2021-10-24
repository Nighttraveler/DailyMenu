import { useReducer } from "react";
import { StorageService } from "../api/storageService";
import initData from "../initData";


const ACTIONS = {
    CREATE: 'create',
    RETRIEVE: 'retrieve',
    UPDATE: 'update',
    DELETE: 'delete',
}

const defaultReducer = (menuList, { type, payload }) => {
    switch (type) {
        case ACTIONS.CREATE:
            const { menu: newMenu } = payload;
            menuList.push(newMenu);
            return [...menuList];
        case ACTIONS.RETRIEVE:
            const { updatedMenuList } = payload;
            return [...updatedMenuList]
        case ACTIONS.UPDATE:
            const { menu: menuToUpdate } = payload;
            menuList.forEach((item, index) => {
                if (menuToUpdate.uuid === item.uuid) {
                    menuList[index] = menuToUpdate;
                }
            });
            return [...menuList];
        case ACTIONS.DELETE:
            const { menu: menuToDelete } = payload;
            return [...menuList.filter((item) => item.uuid !== menuToDelete.uuid)];
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
        StorageService.getMenuList().then(updatedMenuList => {
            if (updatedMenuList !== null) {
                return dispatch({ type: ACTIONS.RETRIEVE, payload: { updatedMenuList } })
            } else {
                throw new Error('Please reload app');
            }
        }).catch(reason => {
            alert(reason);
            return dispatch({ type: ACTIONS.GET_LIST, payload: { updatedMenuList: initData.menuList } })
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