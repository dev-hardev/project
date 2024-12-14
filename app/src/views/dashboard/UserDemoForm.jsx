import React from 'react';
import { Button, Card, CardBody, Col, Form, Row } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';

const UserDemoForm = () => {
  const BaseQuery = useQuery(['GetQueryDemo'], () => fetch('http://localhost:3000/api').then((res) => res.json()));
  const FormMutation = useMutation(
    (body) => fetch('http://localhost:3000/submit-user-details', { method: 'POST', body: body }).then((res) => res.json()),
    {
      onSuccess: (json) => {
        alert(json.message + JSON.stringify(json.data));
      }
    }
  );
  return (
    <Row>
      <Col lg="6">
        <Card>
          <CardBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                FormMutation.mutate(formData);
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicChecbox">
                <Form.Check type="checkbox" name="keep_me_logged_in" label="Check me out" />
              </Form.Group>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <h3>{BaseQuery.isLoading ? 'Loading...' : BaseQuery?.data?.message}</h3>
      </Col>
    </Row>
  );
};

export default UserDemoForm;
