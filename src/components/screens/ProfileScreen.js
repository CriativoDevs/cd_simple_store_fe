import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../actions/userActions";

import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const [profile, setProfile] = useState({
    phone_number: "",
    address1: "",
    address2: "",
  });

  useEffect(() => {
    if (!user.username) {
      dispatch(getUserProfile());
    } else {
      setProfile({
        phone_number: user.profile.phone_number || "",
        address1: user.profile.address1 || "",
        address2: user.profile.address2 || "",
      });
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
    dispatch(updateUserProfile(profile));
  };

  return (
    <Container>
      <div>
        <Link
          className="btn btn-light my-3"
          to="/"
        >
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row className="justify-content-center">
            <Col md={6}>
              <h2>{user.name}'s Profile</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="phone_number">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phone_number"
                    value={profile.phone_number}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="address1"
                  className="my-3"
                >
                  <Form.Label>First Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the first address"
                    name="address1"
                    value={profile.address1}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="address2">
                  <Form.Label>Second Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the second address"
                    name="address2"
                    value={profile.address2}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="my-3"
                >
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default ProfileScreen;
