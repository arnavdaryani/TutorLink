import React from "react";

const Navbar = () => {
  const styles = {
    navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 2rem",
      borderBottom: "1px solid #333",
    },
    navLeft: {
      display: "flex",
      alignItems: "center",
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#fff",
    },
    navRight: {
      display: "flex",
      alignItems: "center",
    },
    navLink: {
      marginLeft: "1.5rem",
      textDecoration: "none",
      color: "#ccc",
      fontSize: "1rem",
      transition: "color 0.2s",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navLeft}>
        <span style={styles.logo}>TutorLink</span>
      </div>
      <div style={styles.navRight}>
        <a href="#story" style={styles.navLink}>Product and Services</a>
        <a href="#news" style={styles.navLink}>Testimonials</a>
        <a href="#login" style={styles.navLink}>Contact</a>
        <a href="#signup" style={styles.navLink}>Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
