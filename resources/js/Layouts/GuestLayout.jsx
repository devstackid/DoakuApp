import BottomNavbar from '@/Components/BottomNavbar';
import NavBar from '@/Components/NavBar';
import NavbarOffcanvas from '@/Components/NavbarOffcanvas';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Guest({ children }) {
    const { auth } = usePage().props;
    const [isNavVisible, setIsNavVisible] = useState(false);

    const handleDropdownButtonClick = () => {
        setIsNavVisible(!isNavVisible);
    };

    const handleLinkClick = () => {
        setIsNavVisible(false);
    };
    return (
        <>
        <NavBar isNavVisible={isNavVisible} handleDropdownButtonClick={handleDropdownButtonClick} />
        <NavbarOffcanvas auth={auth} handleLinkClick={handleLinkClick} isNavVisible={isNavVisible} handleDropdownButtonClick={handleDropdownButtonClick} />
        {children}
        <BottomNavbar />
        </>
    );
}
