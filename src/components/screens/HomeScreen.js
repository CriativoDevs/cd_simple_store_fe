import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productsActions";
import Product from "../Product";
import Loader from "../Loader";
import Message from "../Message";

function HomeScreen() {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList);
  const { loading, error, products, pagination } = productsList;

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(listProducts(page));
  }, [dispatch, page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <h3 className="my-3 text-center">Filters</h3>
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
                    { length: Math.ceil(pagination.count / 20) },
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
