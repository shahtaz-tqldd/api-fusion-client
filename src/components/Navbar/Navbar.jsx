import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import CropIcon from '@mui/icons-material/Crop';
import {navItems} from '../../data/navItems'
const drawerWidth = 240;

function Navbar(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const supabase = useSupabaseClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ navLink, title }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link to={navLink}>{title}</Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  function HideOnScroll(props) {
    const { window, children } = props
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar sx={{ backgroundColor: '#252B48' }} component="nav">
          <Container sx={{ maxWidth: '1200px', mx: 'auto' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Button
                variant="text"
                size='lg'
                disableElevation
                disableRipple
                href='/'
                sx={{ display: { xs: 'none', sm: 'flex', color: '#47B5FF', textTransform: 'none', fontSize: '20px' } }}
                startIcon={<CropIcon />}
              >
                <b>API</b>Fusion
              </Button>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '40px', alignItems: 'center' }}>
                {navItems.map(({ navLink, title }, index) => (
                  <Link to={navLink} key={index} sx={{ color: '#fff !important' }}>
                    {title}
                  </Link>
                ))}
              </Box>
              <Button variant='outlined' sx={{ ml: 5, textTransform: 'none', borderRadius: 5, color: '#fff' }} onClick={() => handleLogout()}>Logout</Button>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {children}
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
