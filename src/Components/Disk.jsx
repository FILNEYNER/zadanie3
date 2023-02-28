import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import ListFolder from "./List-folder";

const Disk = () => {
    const [current, setCurrent] = useState('root')
    const [data, setData] = useState()
    console.log(data)
    useEffect(() => {
        fetch(`http://91.193.183.139:7000/drive/folder/${current}`, {
        method: 'GET',
            headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
    }).then((res) => res.json())
        .then((value) => {
            setData(value.data)
        })
        .catch((err) => console.error(err))

}, [current])

    const [open, setOpen] = React.useState(false);
    const [nameFolder, setNameFolder] = React.useState(``);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createFolder = () => {
        fetch(`http://91.193.183.139:7000/drive/folder/`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'content-type': 'application/json'},
            body: JSON.put({parentId: current, name: nameFolder})
        }).then((res) => handleClose())
    }
    
    return (
        <div>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open alert dialog
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <label htmlFor="userName">Создание папки</label>
                    <input type="text" id="userName" name="userName"
                           required value={nameFolder} onChange={e => setNameFolder(e.target.value)}
                           minLength="4" maxLength="8" size="10"/>

                        <Button onClick={createFolder}>Подтвердить</Button>
                        <Button onClick={handleClose} autoFocus>Отмена</Button>
                </Dialog>
            </div>
            папка {current}
            {/*{data.children?.map(()=><p></p>)}*/}
            <ListFolder children={data?.children}/>
        </div>
    );
};

export default Disk;
