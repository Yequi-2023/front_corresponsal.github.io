import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '@mui/icons-material/Logout';
import '../styles/Navbar.css'
import {
    Avatar,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip
} from '@mui/material';
import { useEffect, useState } from 'react';

export const Navbar = () => {
    const [inputValida, setInputValida] = useState(['']);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const logout = () => {
        localStorage.removeItem('usuarioCorresponsal');
        localStorage.removeItem('userLoginCorresponsal');
        window.location.reload(true);
    };

    const fetchData = async () => {
        try {
            const datos = await fetch('http://127.0.0.1:8000/mi_api/mostrar_datos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario: localStorage.getItem('usuarioCorresponsal') }),
            });
            if (datos.ok) {
                const data = await datos.json();
                setInputValida(data[0]);
            }
        } catch (error) {
            console.log('El error es', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <nav className='navbar'>
            <div className='logo-usuario'>
                <h2 className="nombre-usuario">{inputValida.nombre}</h2>
                <Tooltip title="Account settings">
                    <IconButton className='icon-button'
                        onClick={handleClick}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}>
                        <Avatar className='avatar-icon'
                            src="/logo-usuario.png"></Avatar>
                    </IconButton>
                </Tooltip>
                <Menu className='avatar-menu'
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                    <MenuItem className='nombre-avatar'>
                        {inputValida.nombre}
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </nav>
    )
}
