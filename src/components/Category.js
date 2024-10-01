import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Header.css";
import api from "../api";

function Category({ onFilterChange }) {
  const [expanded, setExpanded] = useState(false);
  const [brands, setBrands] = useState([]);
  // eslint-disable-next-line
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const { data } = await api.get("/api/products/filters/");
      setBrands(data.brands.slice(0, 5)); // Limit to 5 brands
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (brand) => {
    setSelectedBrand(brand);
    onFilterChange({ brands: brand });
    setExpanded(false);
  };

  return (
    <>
      <Navbar
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "#FF0000" }}
        expanded={expanded}
      >
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="w-100 d-flex justify-content-center">
              <Nav>
                {brands.map((brand, index) => (
                  <Nav.Link
                    key={index}
                    onClick={() => handleFilterChange(brand)}
                    className="nav-item"
                    style={{ color: "white" }}
                  >
                    {brand}
                  </Nav.Link>
                ))}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Category;
