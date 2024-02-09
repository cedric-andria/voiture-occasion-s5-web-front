import {
    Card,
    CardHeader,
    Table,
    Container,
    Row,
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  // import Api from "../../service/Api.js";
  import { useState, useEffect } from "react";
  import { callGet } from "service/api/Api.js";
  
  const HistoriqueAnnonce = () => {
  const [historiques, setHistoriques] = useState([]);
  const [error, setError] = useState(null);
  const hashmapEtat = {};
  hashmapEtat['0'] = 'publiee';
  hashmapEtat['10'] = 'validee';
  hashmapEtat['20'] = 'vendue';

//   const [updateCalled, setUpdateCalled] = useState(0);
  // const [annonceToUpdate, setAnnonceToUpdate] = useState({});
  
  const fetchhistoriques = async() =>
  {
    try {
      // const annonce_ws_response = await callGet('https://unnatural-coat-production.up.railway.app/annonces/etat/lessthan/10');
      const histo_ws_response = await callGet('http://localhost:8080/historique_annonce/current_user', true);
      // if (!histo_ws_response.ok) {
      //   throw new Error('Bad HttpStatus');
      // }
      // const annonce_ws_result = histo_ws_response;
      console.log("histo_ws_response : ");
      console.log(histo_ws_response);
  
      setHistoriques(histo_ws_response);
      // console.log("annonces non validees : ");
      // console.log(annoncesNonValidees);
  
    } catch (error) {
      setError(error)
    }
  };
  
  useEffect(() => {
    fetchhistoriques();
  }, []);
  
  
  if (error) {
    return <p>{error.message}</p>
  }
  
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
                <h3 className="mb-0">Historique de mes annonces</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Description annonce</th>
                    <th scope="col">Etat</th>
                    <th scope="col">Date opération</th>
                    {/* <th scope="col">Annonceur</th> */}
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  { historiques && historiques.map((historique) => (
                    <tr>
                      <th scope="row">
                        {historique.annonce.description}
                      </th>
                      <td>{hashmapEtat[historique.nouvel_etat]}</td>
                      <td>
                        {historique.date_operation}
                      </td>
                      {/* <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{annonce.voiture.vendeur.nom}</span>
                          <div>
                            </div>
                        </div>
                      </td> */}
                      <td>
                        {/* <div className="text-center">
                          <Button className="my-4" color="primary" onClick={() => {validateAnnonce(annonce)}}>
                              Valider
                          </Button>
                        </div> */}
                      </td>
                    </tr>
                  ))}
                    
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
  };
  export default HistoriqueAnnonce;
  