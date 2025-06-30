import BottomNavbar from "@/Components/BottomNavbar";
import NavBar from "@/Components/NavBar";
import NavbarOffcanvas from "@/Components/NavbarOffcanvas";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../Pages/Landing/Components/Footer";

export default function Guest({ children }) {
    const { auth } = usePage().props;
    const [isNavVisible, setIsNavVisible] = useState(false);

    const handleDropdownButtonClick = () => {
        setIsNavVisible(!isNavVisible);
        setSearchQuery2('');
    };

    const handleLinkClick = () => {
        setIsNavVisible(false);
    };

    const [content, setContent] = useState([]);
    useEffect(() => {
        axios
            .get("/api/content")
            .then((response) => {
                setContent(response.data.content);
            })
            .catch((error) => {});
    }, []);

    const [openSearchForm, setIsOpenSearchForm] = useState(false)

    const toggleSearchForm = () => {
        setIsOpenSearchForm(!openSearchForm)
        setSearchQuery('')
    }

    const [searchQuery, setSearchQuery] = useState("");
    const [searchQuery2, setSearchQuery2] = useState("");

    const filteredContent = content.filter((doa) => {
        return doa.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const filteredContent2 = content.filter((doa) => {
        return doa.title.toLowerCase().includes(searchQuery2.toLowerCase());
    });
    return (
        <>
            <NavBar
                isNavVisible={isNavVisible}
                handleDropdownButtonClick={handleDropdownButtonClick}
                filteredContent={filteredContent}
                openSearchForm={openSearchForm}
                toggleSearchForm={toggleSearchForm}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
            />
            <NavbarOffcanvas
                auth={auth}
                searchQuery2={searchQuery2}
                setSearchQuery2={setSearchQuery2}
                filteredContent2={filteredContent2}
                handleLinkClick={handleLinkClick}
                isNavVisible={isNavVisible}
            />
            {children}

            <Footer />
        </>
    );
}
