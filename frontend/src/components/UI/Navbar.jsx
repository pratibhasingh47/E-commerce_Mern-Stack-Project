import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
import { logOut } from '../../redux/slices/authSlice';
import { toggleTheme } from '../../redux/slices/themesSlice';
import '../css/Navbar.css';
import logo from '../../assets/logo1_white.png';
import logo_light from '../../assets/logo1.png'
import { GrCart } from "react-icons/gr";
import { AiTwotoneCarryOut } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { AiFillShopping } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa";
import { HiMiniUserPlus } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Badge from '@mui/material/Badge';
import { AiFillCaretDown } from "react-icons/ai";




const Navbar = () => {
    const { isAuth, role } = useSelector((state) => state.auth);
    const theme = useSelector((state) => state.theme?.theme);
    const { cartItem } = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logOut());
    }

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const categories = [
        { name: 'Beauty', route: '/beauty' },
        { name: 'Home & Furniture', route: '/home&Kitchen' },
        { name: 'Clothes (Women)', route: '/clothes-women' },
        { name: 'Clothes (Men)', route: '/clothes-men' },
        { name: 'Kids Section', route: '/kids' },
        { name: 'TV', route: '/tv' },
        { name: 'Smart Phones', route: '/smart-phones' }
    ];



    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7.5,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: '#aab4be',
                    ...theme.applyStyles('dark', {
                        backgroundColor: '#8796A5',
                    }),
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: '#001e3c',
            width: 32,
            height: 32,
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
            ...theme.applyStyles('dark', {
                backgroundColor: '#003892',
            }),
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: '#aab4be',
            borderRadius: 20 / 2,
            ...theme.applyStyles('dark', {
                backgroundColor: '#8796A5',
            }),
        },
    }));

    return (
        <div className={`navbar_header ${theme}`}>
            <div className='navbar_logo'>
                <Link to="/">
                    <img src={theme === 'dark' ? logo : logo_light} alt="Logo" />
                </Link>
            </div>
            {/* <div className='search_box'>
                <input type="text" placeholder='Search...' className='navbar_search' /><IoSearch className='search_icon' />

            </div> */}

            <div className='search_box'>
                {/* Dropdown to select product category */}
                <div className="dropdown">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                        All <AiFillCaretDown />
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            {categories.map((category, index) => (
                                <Link key={index} to={category.route} className="dropdown-item">
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <input type="text" placeholder='Search...' className='navbar_search' />
                <IoSearch className='search_icon' />
            </div>

            <div className='navbar_menu'>
                {
                    isAuth
                        ?
                        (
                            role === "User"
                                ?
                                (
                                    <div className='menu-items'>
                                        <Link className={`navbar_link ${theme === 'dark' ? 'dark-link' : 'light-link'}`} to="/cart">
                                            <div className='flex flex-col items-center hover:transform hover:scale-105'>
                                                <Badge badgeContent={cartItem.length} color="error">
                                                    <div className='flex flex-col items-center'>
                                                        <GrCart className='icons' />
                                                        <p className='text-xl'>Cart</p>
                                                    </div>

                                                </Badge>
                                            </div>
                                        </Link>
                                        <Link className={`navbar_link ${theme === 'dark' ? 'dark-link' : 'light-link'}`} to="/myorder"> <AiTwotoneCarryOut className='icons' /> My-Orders</Link>
                                        <Link className={`navbar_link ${theme === 'dark' ? 'dark-link' : 'light-link'}`} to="/profile"> <FaUser className='icons' /> Profile</Link>
                                    </div>
                                )
                                :
                                (
                                    <div className='menu-items-admin'>
                                        <Link className={`navbar_link ${theme === 'dark' ? 'dark-link' : 'light-link'}`} to="/dashboard"> <MdDashboard className='icons' />Dashboard</Link>
                                        <Link className={`navbar_link ${theme === 'dark' ? 'dark-link' : 'light-link'}`} to="/adminUser"> <RiAdminFill className='icons' />Users</Link>
                                        <Link className={`navbar_link ${theme === 'dark' ? 'dark-link' : 'light-link'}`} to="/adminProduct"> <MdProductionQuantityLimits className='icons' />
                                            Products</Link>
                                        <Link className={`navbar_link ${theme === 'dark' ? 'dark-link' : 'light-link'}`} to="/adminOrder"> <AiFillShopping className='icons' />Orders</Link>
                                        <Link className={`navbar_link ${theme === 'dark' ? 'dark-link' : 'light-link'}`} to="/profile"> <FaUser className='icons' /> Profile</Link>
                                    </div>
                                )
                        )
                        :
                        (
                            <div className='menu-items'>

                                <Link className={`navbar_link ${theme === 'dark' ? 'dark-link' : 'light-link'}`} to="/cart">
                                    <div className='flex flex-col items-center hover:transform hover:scale-105'>
                                        <Badge badgeContent={cartItem.length} color="error">
                                            <div className='flex flex-col items-center'>
                                                <GrCart className='icons' />
                                                <p className='text-xl'>Cart</p>
                                            </div>

                                        </Badge>
                                    </div>
                                </Link>

                                <Link className={`navbar_link ${theme === 'dark' ? 'dark-link' : 'light-link'}`} to="/login"> <FaUserCheck className='icons' />
                                    Login</Link>
                                <Link className={`navbar_link ${theme === 'dark' ? 'dark-link' : 'light-link'}`} to="/signup"><HiMiniUserPlus className='icons' />
                                    Signup</Link>
                            </div>
                        )
                }

                <FormGroup>
                    <FormControlLabel
                        control={<MaterialUISwitch sx={{ m: 0 }} checked={theme === 'dark'} onChange={handleThemeToggle} />}

                    />
                </FormGroup>

                <div className="logout_button">

                    {isAuth && (
                        <button className={`logout ${theme === 'dark' ? 'dark-button' : 'light-button'}`} onClick={handleLogOut}><FiLogOut /><p>Logout</p></button>

                    )}
                </div>
            </div>

        </div>
    )
}

export default Navbar