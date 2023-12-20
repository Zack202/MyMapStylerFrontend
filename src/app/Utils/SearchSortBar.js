import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import UserIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
// Search functionality
import GlobalStoreContext from '../store';
import AuthContext from '../auth';

import { useContext, useState, useEffect } from 'react';
// Filter UI and functionality
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const {auth} = useContext(AuthContext);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { store } = useContext(GlobalStoreContext);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([])

  // Filtering
  const mapTypes = [
    'Color',
    'Text',
    'Choropleth',
    'Dot',
    'Sized Dot',
  ];

  // can use for a prettier UI

  const handleBlurSearch = () => {
    store.updateSearch(search);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleKeyDownSearch = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleBlurSearch();
    }
  };

  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
      if(auth.user){
          if(auth.user.userName === "GUEST"){
              setIsGuest(true);
          }
      }
  }, [auth]);

  const handleFilterChange = async (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = async (event) => {
    store.updateSort(event.target.value);
  };


  const handleSubmitFilter = (event) => {
      store.updateFilter(filter);
  };


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box flex
    sx={{
        width: '100%'
    }}>
      <AppBar position="static" style={{ color: 'maroon', background: 'lightgrey' }}>
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1 }}
          >
            <UserIcon />
          </IconButton>
          <Search style={{ backgroundColor: "#F1F1F1" }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              id="searchBar"
              inputProps={{ 'aria-label': 'search' }}
              onBlur={handleBlurSearch}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDownSearch}

            />
          </Search>
          {/* <CreateMapModal /> */}
          <Box item xs={12} sx={{}}>
                <Button sx={{ backgroundColor: "maroon", color: "white",
                    marginLeft: 5, marginRight: 0, marginTop: .75, display:
                        isGuest
                            ? "none"
                            : "inline-block",
                }} href="/createNewMap" variant='contained'>
                    Create New Map
                </Button>
            </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box style={{ color: "black", backgroundColor: "#F1F1F1", borderRadius: '7px',  marginLeft: '50px', marginRight: '50px', display: 'inline-block' }}>
              <FormControl fullWidth>
                <InputLabel id="select-filter">Filter</InputLabel>
                <Select
                  labelId="select-filter"
                  id="select-filter"
                  value={filter}
                  label="select-filter"
                  multiple
                  sx={{ width: 300 }}
                  onChange={handleFilterChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {mapTypes.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={filter.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={handleSubmitFilter}
            id="applyFilter"
            style={{backgroundColor: "maroon", color: "white"}}
          >
            Apply Filter
          </Button>
          <Box style={{ color: "Black", width: '200px', backgroundColor: "#F1F1F1", borderRadius: '7px', padding: '8px', marginLeft: '40px', marginRight: '40px', paddingLeft: '10px', paddingRight: '10px', display: 'inline-block' }}>
          <FormControl fullWidth>
          <InputLabel id="sort-select">Sorting Type</InputLabel>
          <Select
          labelId="sort-select"
          id="sort-select"
          value={store.sort}
          label="sorting"
          onChange={handleSortChange}
         >
          <MenuItem value={"Likes"}>Sort by Likes</MenuItem>
          <MenuItem value={"Dislikes"}>Sort by Disikes</MenuItem>
          <MenuItem value={"Date"}>Sort by Date</MenuItem>
          <MenuItem value={"Name"}>Sort by Name</MenuItem>
        </Select>
      </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}