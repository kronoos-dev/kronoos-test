import { AppBar, Menu, MenuItem } from '@mui/material'
import kronoos from '../../assets/logo-kronoos.webp'
import S from './Header.module.css'
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {

    setAnchorEl(null);
  };


  return (
    <>
    <AppBar classes={{root: S.header}} position="static">
        <a href="https://kronoos.com/" target="_blank">
          <img src={kronoos} className={S.logo} alt="Vite logo" />
        </a>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}><Link to={'/'}>Home</Link></MenuItem>
          <MenuItem onClick={handleClose}><Link to={'/'}>Teste</Link></MenuItem>
        </Menu>
      </AppBar>
    </>
  )
}

export default Header
