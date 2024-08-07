import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { navList } from '../../data/NavList';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

function MainLayout({children, props}) {
//   const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const currentPath = location.pathname;

  const list = navList;

  const StyledListItem = styled(ListItem)(({theme}) => ({
    // marginBottom: '10px',
    '&:hover ,&.active': {
      backgroundColor: grey[400],
      color: 'white'
    }
  }))

  const drawer = (
    <div>
      <Toolbar sx={{backgroundColor: 'primary.main', color: 'white'}}>
        <p className="text-4xl">Feliza</p>
      </Toolbar>
      <Divider />
      <List>
        {list.map((item, idx) => (
          <Box>
            <StyledListItem
              onClick={() => navigate(item.path)} 
              className={currentPath.startsWith(item.path)? 'active': 'inactive'} 
              key={item.title + idx} 
              disablePadding
            >
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
            </StyledListItem>
            <Divider/>
          </Box>
        ))}
      </List>
      
      
    </div>
  );

  

//   const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar display='flex'>
            <Box flex={1}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin dashbord
            </Typography>
            </Box>

            <IconButton sx={{color: 'white'}} onClick={() => navigate('/')}>
                <LogoutIcon />
            </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
        //   container={container}
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Toolbar/>
      <Box
        component="main"
        sx={{ flexGrow: 1, paddingRight: 5, paddingTop: 9, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        
        {children}
      </Box>
    </Box>
  );
}



export default MainLayout;