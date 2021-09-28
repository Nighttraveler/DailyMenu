import { useReducer } from "react";
import initData from "../initData";


const ACTIONS = {
    CREATE: 'create',
    RETRIEVE: 'retrieve',
    UPDATE: 'update',
    DELETE: 'delete'
}

const defaultReducer = (menuList, { type, payload }) => {
    switch (type) {
        case ACTIONS.CREATE:
            const { menu: newMenu } = payload;
            menuList.push(newMenu);
            return [...menuList];
        case ACTIONS.RETRIEVE:
            break;
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
            return [...menuList.filter((item) => item !== menuToDelete)];
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
}

export default function useMenu(initialMenuList = initData.menuList, reducer = defaultReducer) {
    const [menuList, dispatch] = useReducer(reducer, initialMenuList);

    const handleCreate = (menu) => {
        return dispatch({ type: ACTIONS.CREATE, payload: { menu } })
    }

    const handleDelete = (menu) => {
        return dispatch({ type: ACTIONS.DELETE, payload: { menu } })
    }

    const handleUpdate = (menu) => {
        return dispatch({ type: ACTIONS.UPDATE, payload: { menu } })
    }
    // handle other actions

    return {
        menuList,
        handleCreate,
        handleDelete,
        handleUpdate//// return other handlers
    }
}

useMenu.reducer = defaultReducer;
useMenu.types = ACTIONS;

export { useMenu };