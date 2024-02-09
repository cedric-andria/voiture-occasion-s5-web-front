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
// import Api from "../../service/Api.js";
import { useState, useEffect } from "react";
import { callGet, callPut } from "service/api/Api.js";

const ListeAnnonce = () => {
const [annoncesNonValidees, setAnnoncesNonValidees] = useState([]);
const [error, setError] = useState(null);
const [updateCalled, setUpdateCalled] = useState(0);
// const [annonceToUpdate, setAnnonceToUpdate] = useState({});

const validateAnnonce = async(annonce) => {
  try {
    // console.log('annonce to update.id = ' + annonce.id);
    // console.log('annonce to update : ')
    // console.log(annonce);
    // const token = localStorage.getItem("token");
    // await callPut('https://unnatural-coat-production.up.railway.app/annonces/' + annonce.id, annonce);
    // await callPut('http://localhost:8080/annonces/' + annonce.id, annonce);
    await callPut('https://back-end-voiture-occasion-production.up.railway.app/annonces/' + annonce.id, annonce);


    // console.log('updateCalled + 1 : ' + (updateCalled + 1));
    console.log('updateCalled avant set : ' + updateCalled);

    // const annonce_ws_response = await callGet('https://unnatural-coat-production.up.railway.app/annonces/etat/lessthan/10');
    // const annonce_ws_response = await callGet('http://localhost:8080/annonces/etat/lessthan/10');
    const annonce_ws_response = await callGet('https://back-end-voiture-occasion-production.up.railway.app/annonces/etat/lessthan/10');


    // const annonce_ws_response = await fetch('http://localhost:8080/annonces/etat/lessthan/10');
    // if (!annonce_ws_response.ok) {
    //   throw new Error('Bad HttpStatus');
    // }
    // const annonce_ws_result = annonce_ws_response;
    console.log("annonce_ws_response : ");
    console.log(annonce_ws_response);

    setUpdateCalled(updateCalled + 1);
    // console.log('niova ny updateCalled : ' + updateCalled);
      
    //re fetch annonces non validees
    // const annonce_ws_response = await callGet('http://localhost:8080/annonces/etat/lessthan/10');
    // // if (!annonce_ws_response.ok) {
    // //   throw new Error('Bad HttpStatus');
    // // }
    // const annonce_ws_result = annonce_ws_response;
    // setAnnoncesNonValidees(annonce_ws_result);
  } catch (error) {
    console.log(error);
    setError(error);
  }
};

const fetchAnnonces = async() =>
{
  try {
    // const annonce_ws_response = await callGet('https://unnatural-coat-production.up.railway.app/annonces/etat/lessthan/10');
    // const annonce_ws_response = await callGet('http://localhost:8080/annonces/etat/lessthan/10');
    const annonce_ws_response = await callGet('https://back-end-voiture-occasion-production.up.railway.app/annonces/etat/lessthan/10');

    // if (!annonce_ws_response.ok) {
    //   throw new Error('Bad HttpStatus');
    // }
    // const annonce_ws_result = annonce_ws_response;
    console.log("annonce_ws_response : ");
    console.log(annonce_ws_response);

    setAnnoncesNonValidees(annonce_ws_response);
    // console.log("annonces non validees : ");
    // console.log(annoncesNonValidees);

  } catch (error) {
    setError(error)
  }
};

useEffect(() => {
  fetchAnnonces();
}, [updateCalled]);


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
              <h3 className="mb-0">Listes Annonces</h3>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              
              <thead className="thead-light">
                <tr>
                  <th scope="col">Voiture</th>
                  <th scope="col">Prix de vente</th>
                  <th scope="col">Date publication</th>
                  <th scope="col">Annonceur</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                { annoncesNonValidees && annoncesNonValidees.map((annonce) => (
                  <tr>
                    <th scope="row">
                      {annonce.voiture.modele.nom}
                    </th>
                    <td>{annonce.prix}</td>
                    <td>
                      {annonce.date_publication}
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{annonce.voiture.vendeur.nom}</span>
                        <div>
                          </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <Button className="my-4" color="primary" onClick={() => {validateAnnonce(annonce)}}>
                            Valider
                        </Button>
                      </div>
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
export default ListeAnnonce;
