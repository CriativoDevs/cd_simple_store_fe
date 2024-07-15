import React, { useState, useEffect } from "react";
import { Button, Form, Collapse, Row, Col } from "react-bootstrap";
import api from "../api";

function Filter({ onFilterChange }) {
  const [min_price, setMinPrice] = useState(1);
  const [max_price, setMaxPrice] = useState(10000);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const { data } = await api.get("/api/products/filters/");
      setBrands(data.brands);
      setCategories(data.categories);
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = () => {
    onFilterChange({
      min_price,
      max_price,
      brands: selectedBrand,
      category: selectedCategory,
      orderBy,
    });
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  const handleClearFilters = () => {
    setMinPrice(1);
    setMaxPrice(10000);
    setSelectedBrand("");
    setSelectedCategory("");
    setOrderBy("");
    onFilterChange({
      min_price: 1,
      max_price: 10000,
      brands: "",
      category: "",
      orderBy: "",
    });

    // Collapse the filter section if the screen width is less than 768px (mobile view)
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  return (
    <div className="filter-container d-flex flex-column align-items-center">
      <Button
        variant="primary"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="my-3 d-md-none"
      >
        {isFilterOpen ? "Close Filters" : "Open Filters"}
      </Button>
      <Collapse
        in={isFilterOpen}
        className="d-md-none"
      >
        <div>
          <h3 className="my-4">Filters</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Price Range</Form.Label>
              <Form.Range
                min="1"
                max="1000" // Adjust max value as needed
                value={min_price}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <Form.Label className="mt-2">Min: € {min_price}</Form.Label>
              <Form.Range
                min="0"
                max="10000" // Adjust max value as needed
                value={max_price}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <Form.Label className="mt-2">Max: € {max_price}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Brand:</Form.Label>
              <Form.Select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">All</option>
                {brands.map((brand, index) => (
                  <option
                    key={index}
                    value={brand}
                  >
                    {brand}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category:</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All</option>
                {categories.map((category, index) => (
                  <option
                    key={index}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Order By:</Form.Label>
              <Form.Select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                <option value="">Select</option>
                <option value="cheap">Cheapest</option>
                <option value="expensive">Most Expensive</option>
              </Form.Select>
            </Form.Group>
            <Row className="mt-2 d-flex justify-content-center">
              <Col xs="auto">
                <Button
                  type="button"
                  onClick={handleFilterChange}
                >
                  Apply
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Collapse>
      <div className="d-none d-md-block">
        <h3 className="my-4">Filters</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Price Range</Form.Label>
            <Form.Range
              min="1"
              max="1000" // Adjust max value as needed
              value={min_price}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <Form.Label className="mt-2">Min: € {min_price}</Form.Label>
            <Form.Range
              min="0"
              max="10000" // Adjust max value as needed
              value={max_price}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <Form.Label className="mt-2">Max: € {max_price}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Brand:</Form.Label>
            <Form.Select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All</option>
              {brands.map((brand, index) => (
                <option
                  key={index}
                  value={brand}
                >
                  {brand}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category:</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((category, index) => (
                <option
                  key={index}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Order By:</Form.Label>
            <Form.Select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="">Select</option>
              <option value="cheap">Cheapest</option>
              <option value="expensive">Most Expensive</option>
            </Form.Select>
          </Form.Group>
          <Row className="mt-2 d-flex justify-content-center">
            <Col xs="auto">
              <Button
                type="button"
                onClick={handleFilterChange}
              >
                Apply
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default Filter;
