import Container from '@mui/material/Container';
import React, { useEffect } from 'react';
import useMenuList from '../../lib/useMenuList';
import AddMenu from './AddMenu';
import ListMenu from './ListMenu';


export default function MenuManager() {
    let { menuList, handleCreate, handleDelete, handleUpdate, handleRetrieve } = useMenuList([]);

    useEffect(() => {
        handleRetrieve()
        console.log("MenuManager useEffect")
    }, [])

    return (
        <Container maxWidth={'lg'}>
            <ListMenu menuListProp={menuList} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
            <AddMenu key={'add-menu-form'} handleCreate={handleCreate}/>
        </Container>
    )

}