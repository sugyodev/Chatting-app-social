import * as React from 'react';
import {useEffect, useState} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Navbar from "./Navbar";
import GuestComponent from "./GuestComponent";
import MainMenu from "../features/chat/components/MainMenu";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthenticated, loadUser} from "../store";
import Alert from "./Alert";
import Loader from "./Loader/Loader";
import PrivateComponent from "./PrivateComponent";

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));


const AppBar = styled(Navbar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Layout({children}) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);

    let width = window.innerWidth;
    const [show, setShow] = useState(width > 748);
    const [smallDevice, setSmallDevice] = useState(width <= 748);
    const loader = useSelector(state => state.loader);



    useEffect(() => {
        dispatch(checkAuthenticated());
        dispatch(loadUser())
    }, []);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    window.addEventListener('resize', () => {
        let width = window.innerWidth;
        if (width <= 748) {
            setSmallDevice(true);
            setShow(false)
        } else {
            setSmallDevice(false);
            setShow(true)
        }
    })




    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Alert/>
            {loader.loader ? <Loader/> : ''}
            <PrivateComponent>
                <AppBar handleDrawerOpen={handleDrawerOpen}/>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <MainMenu/>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader/>
                    {children}
                </Main>
            </PrivateComponent>
            <GuestComponent>
                {children}
            </GuestComponent>
        </Box>
    );
}
