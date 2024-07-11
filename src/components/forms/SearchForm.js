import React, { useState } from "react";
import api from "../../api";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button
import Product from "../Product"; // Import Product component

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProduct, setSearchedProduct] = useState([]); // State to hold the searched product
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await searchProducts();
    setSearchTerm(""); // Clear the search field after search is done
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission on Enter
      await searchProducts();
    }
  };

  const searchProducts = async () => {
    try {
      const response = await api.get(`/api/products/?search=${searchTerm}`);
      if (response.data.results && response.data.results.length > 0) {
        setSearchedProduct(response.data.results); // Set the searched products
        setShowModal(true); // Show the modal
      } else {
        // Handle case where no product is found
        console.log("No product found.");
      }
    } catch (error) {
      // Handle error
      console.error("Error searching products:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSearchedProduct([]); // Reset the searched products when modal is closed
  };

  const handleProductClick = () => {
    closeModal(); // Close the modal when a product is clicked
  };

  return (
    <>
      <form
        className="d-flex"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-sm-2"
          type="search"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} // Listen for Enter key press
        />
        <button
          className="btn btn-secondary my-2 my-sm-0"
          type="submit"
        >
          Pesquisar
        </button>
      </form>

      {/* Modal to display searched product */}
      <Modal
        show={showModal}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Searched Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {searchedProduct.length > 0 ? (
            <div>
              {searchedProduct.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          ) : (
            <p>No products found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchForm;
