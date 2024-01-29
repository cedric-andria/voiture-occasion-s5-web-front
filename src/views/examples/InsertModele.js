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
    Col,
  } from "reactstrap";
  import DropdownList from "./DropdownList";
  const InsertModele = () => {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Insertion Modele</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Modele"
                      type="test"
                    />
                  </InputGroup>
                </FormGroup>
                <p>
                 Marque: <DropdownList/>

                </p>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button">
                    Valider
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
              </Col>
      </>
    );
  };
  
  export default InsertModele;
  