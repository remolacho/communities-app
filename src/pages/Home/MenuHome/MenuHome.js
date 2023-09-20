import React,  { useState }  from "react";
import {Container, Navbar} from 'react-bootstrap';
import SideBar from "../../../components/SideBar/SideBar";


function MenuHome(props) {
    const {setCallLogin, menuSetting } = props
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar
            className={`sidebar ${expanded ? 'expanded' : ''}`}
            variant="dark"
            expand="md"
        >
            <Container>
                <Navbar.Toggle
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="sidebar-nav"
                    className="mobile-toggle ml-auto"
                />
                <Navbar.Collapse id="sidebar-nav">
                    <SideBar setCallLogin={setCallLogin} menuSetting={menuSetting}/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MenuHome;