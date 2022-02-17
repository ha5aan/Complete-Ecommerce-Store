import React from 'react'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Badge, Typography } from '@material-ui/core'
import logo from '../../Assets/Logo.png'
import { ShoppingCart } from '@material-ui/icons'
import useStyles from './styles'
import {Link,useLocation} from 'react-router-dom'
const Navbar = ({totalItems}) => {
  const classes = useStyles()
  const location = useLocation()
  return (
    <>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <Typography component={Link} to='/'>
            <img src={logo} alt="HA Stores" height="25px" className={classes.image} />
            HA Stores
          </Typography>
          <div className={classes.grow} />
          {(location.pathname=='/') &&(
          <div className={classes.button}>

            <IconButton component={Link} to='/cart' aria-label='Show Cart Items' color='inherit' >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

          </div>)
}
        </Toolbar>
      </AppBar>
    </>
  )
}
export default Navbar