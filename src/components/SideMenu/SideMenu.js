import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import SideBar from "../SideBar/SideBar";
import './SideMenu.scss';

export default function SideMenu({ setCallLogin, menuSetting }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="side-menu-container">
      <Button 
        className="d-lg-none menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className="navbar-toggler-icon"></span>
      </Button>

      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <SideBar 
          setCallLogin={setCallLogin} 
          menuSetting={menuSetting}
        />
      </div>
      
      {isOpen && (
        <div 
          className="menu-overlay d-lg-none" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 