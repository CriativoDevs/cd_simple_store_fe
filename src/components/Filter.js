import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import api from "../api";

function Filter({ onFilterChange }) {
  const [min_price, setMinPrice] = useState(1);
  const [max_price, setMaxPrice] = useState(10000);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [orderBy, setOrderBy] = useState("");

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
    console.log("Filters applied:", max_price);
  };

  return (
    <div className="filter-container d-flex flex-column align-items-center">
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
        <Button
          type="button"
          className="mt-2 d-flex justify-content-center"
          onClick={handleFilterChange}
        >
          Apply
        </Button>
      </Form>
    </div>
  );
}

export default Filter;
