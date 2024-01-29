/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { callPost } from "service/api/Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: 'jean@gmail.com',
    password: 'jean'
  });

  const navigate = useNavigate();
  // const [token, setToken] = useState({});

  const onChange = (e) => {
    setCredentials({
        ...credentials,
        [e.target.name] : e.target.value, 
    })
  }

  const Proceedlogin = async(e) => {
    e.preventDefault();
    let data = {
        "identifiant": credentials.email,
        "mdp": credentials.password,
    }
    console.log(data);
    let temp = await callPost("https://unnatural-coat-production.up.railway.app/user/login", JSON.stringify(data), false);
    localStorage.setItem('token', temp.access_token);
    if (localStorage.getItem('token') === 'undefined') {
      console.log("undefined tokoa");
      navigate('/user/login');
    }
    else
    {
      console.log("tsy undefined")
      navigate('/admin/CategorieVoiture');

    }
    //callPost("http://localhost:8080/ws/sendmessages/jean/jean2", JSON.stringify(dt), false);
    //console.log(token);
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in</small>
            </div>
            <Form role="form" onSubmit={Proceedlogin}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={onChange}
                    value={credentials.email}
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={credentials.password}
                    onChange={onChange}
                    name="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          
        </Row>
      </Col>
    </>
  );
};

export default Login;
