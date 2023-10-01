import React, { useEffect, useState } from 'react'

import { MdSpaceDashboard, MdBook, MdPermContactCalendar } from "react-icons/md";
import { FaUserPlus, FaBars } from "react-icons/fa";
import App from '../../App';
import { Drawer, Menu } from 'antd';
import "../../styles/layout.css"
import { useNavigate } from 'react-router-dom';
import Login from '../auth/Login';

const Layout = () => {

    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("loggedIn")) {
            setLogin(false);
            console.log("not logged in");
        }
    }, []);

    if (!login) {
        return (
            <div>
                <Login />
            </div>
        );
    }


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className='main_header'>
                <FaBars onClick={showDrawer} />
                <p>aamango Admin</p>
            </div>
            <div className='dashboard_layout'>
                <div className='left_dashboard_layout'>
                    <Drawer width={'250px'} title="Hello," placement="left" onClose={onClose} open={open} >
                        <Menu
                            defaultSelectedKeys={['/']}
                            className='layout_navigation'
                            onClick={({ key }) => {
                                if (key === "signout") {
                                    // e.preventDefault();
                                    localStorage.removeItem("loggedIn");
                                    localStorage.clear();
                                    window.location.reload();
                                } else {
                                    setOpen(false);
                                    navigate(key)
                                }
                            }}
                            items={[
                                { label: "Dashboard", key: '/', icon: <MdSpaceDashboard /> },
                                { label: "Orders", key: '/orders', icon: <MdBook /> },
                                { label: "Users", key: '/users', icon: <FaUserPlus /> },
                                { label: "Products", key: '/products', icon: <MdPermContactCalendar /> },
                                { label: "Signout", key: 'signout', icon: <MdSpaceDashboard />, danger: true },
                            ]}
                        >
                        </Menu>
                    </Drawer>
                </div>
            </div>
            <div className='right_dashboard_layout'>
                <App />
            </div>
        </div>
    )
}

export default Layout