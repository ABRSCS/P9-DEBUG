/* eslint-disable no-return-assign */
import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";

import "./Menu.scss";

const Menu = () => {
  const [activeLink, setActiveLink] = useState("");

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.location.hash = sectionId;
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      setActiveLink(window.location.hash);
    };

    // Initialiser l'état actif
    handleHashChange();

    // Écouter les changements de hash
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <nav>
      <Logo />
      <ul>
        <li>
          <a 
            href="#nos-services" 
            className={activeLink === "#nos-services" ? "active" : ""}
            onClick={(e) => scrollToSection(e, "nos-services")}
          >
            Nos services
          </a>
        </li>
        <li>
          <a 
            href="#nos-realisations" 
            className={activeLink === "#nos-realisations" ? "active" : ""}
            onClick={(e) => scrollToSection(e, "nos-realisations")}
          >
            Nos réalisations
          </a>
        </li>
        <li>
          <a 
            href="#notre-equipe" 
            className={activeLink === "#notre-equipe" ? "active" : ""}
            onClick={(e) => scrollToSection(e, "notre-equipe")}
          >
            Notre équipe
          </a>
        </li>
      </ul>
      <Button 
        title="contact" 
        onClick={(e) => scrollToSection(e, "contact")}
        className={activeLink === "#contact" ? "active" : ""}
      >
        Contact
      </Button>
    </nav>
  );
};

export default Menu;
