import React, { useEffect, useState } from "react";
import { Container, Row, Col, Pagination, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productsActions";
import Product from "../Product";
import Loader from "../Loader";
import Message from "../Message";
import Filter from "../Filter";
// import Category from "../Category";
import Criativo from "../../assets/img/Criativo.png";

function HomeScreen() {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList);
  const { loading, error, products, pagination } = productsList;

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    dispatch(listProducts({ page, ...filters }));
  }, [dispatch, page, filters]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <Container fluid>
      {/* <Category onFilterChange={handleFilterChange} />{" "} */}
      <Image
        src={Criativo}
        alt="Criativo"
        fluid
        className="mb-3"
        style={{ height: "300px", width: "100%" }}
      />
      <Row>
        <Col md={3}>
          <Filter onFilterChange={handleFilterChange} />
        </Col>
        <Col md={9}>
          <h2 className="my-3">Latest Products</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col
                    key={product._id}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={4}
                  >
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              {pagination && pagination.count > 1 && (
                <Pagination className="mt-3">
                  {pagination.previous && (
                    <Pagination.Prev
                      onClick={() => handlePageChange(page - 1)}
                    />
                  )}
                  {Array.from(
                    { length: Math.ceil(pagination.count / 15) },
                    (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === page}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    )
                  )}
                  {pagination.next && (
                    <Pagination.Next
                      onClick={() => handlePageChange(page + 1)}
                    />
                  )}
                </Pagination>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default HomeScreen;
