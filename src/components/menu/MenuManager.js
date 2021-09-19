import Container from '@mui/material/Container';
import React from 'react';
import initData from '../../initData'
import useMenu from '../../lib/useMenu';
import AddMenu from './AddMenu';
import ListMenu from './ListMenu';


export default function MenuManager() {
    const { menuList, handleCreate, handleDelete, handleUpdate } = useMenu(initData.menuList);

    return (
        <Container maxWidth={'lg'}>
            <ListMenu menuListProp={menuList} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
            <AddMenu key={'add-menu-form'} handleCreate={handleCreate}/>
        </Container>
    )

}