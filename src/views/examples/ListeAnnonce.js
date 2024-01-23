import {
    Button,
    Card,
    CardHeader,
    Table,
    Container,
    Row,
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  
const ListeAnnonce = () => {
            return (
              <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                  {/* Table */}
                  <Row>
                    <div className="col">
                      <Card className="shadow">
                        <CardHeader className="border-0">
                          <h3 className="mb-0">Listes Annonces</h3>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Voiture</th>
                              <th scope="col">Prix</th>
                              <th scope="col">Proprietaire</th>
                              <th scope="col">Etat</th>
                              <th scope="col"></th>
                              <th scope="col" />
                            </tr>
                          </thead>
                        <tbody>
                            <tr>
                              <th scope="row">
                                FORD Raptor
                               </th>
                              <td>3.000.000.000,00</td>
                            <td>
                                    Mitia
                            </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="mr-2">90%</span>
                                  <div>
                                    </div>
                                </div>
                              </td>
                              <td>
                              <div className="text-center">
                                    <Button className="my-4" color="primary" type="button">
                                        Valider
                                    </Button>
                                    </div>
                              </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </div>
        </Row>
    </Container>
    </>
             );
};
export default ListeAnnonce;
