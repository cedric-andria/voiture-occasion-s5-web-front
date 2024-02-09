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
    // Badge,
    Card,
    CardHeader,
    CardFooter,
    // DropdownMenu,
    // DropdownItem,
    // UncontrolledDropdown,
    // DropdownToggle,
    Media,
    Button,
    // Pagination,
    // PaginationItem,
    // PaginationLink,
    // Progress,
    Table,
    Container,
    Row,
    Col,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input
    // UncontrolledTooltip,
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
import { useState, useEffect } from "react";
import { callGet } from "service/api/Api";
import Modal from 'react-modal';  

  const ListeDetailAnnonce = () => {
    const [annoncesValidees, setAnnoncesValidees] = useState([]);
    const [threeimages, setThreeimages] = useState([]);
    const [prixfiche, setPrixfiche] = useState(0);
    const [modelefiche, setModelefiche] = useState({});
    const [marquefiche, setMarquefiche] = useState({});
    const [datefiche, setDatefiche] = useState({});
    // const [linkContactFiche, setLinkContactFiche] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [anneemin, setAnneemin] = useState(0);
    const [anneemax, setAnneemax] = useState(3000);
    // const [wantFavorites, setWantFavorites] = useState(false);
    const [urlannonce, setUrlannonce] = useState('http://localhost:8080/annonces/exceptuser');
    const [colorBoutonfavori, setColorBoutonfavori] = useState("secondary");
    const [annoncesValideesInit, setAnnoncesValideesInit] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const fetchAnnonces = async(passedurl) =>
    {
        try {
            // const annonce_ws_response = await callGet('https://unnatural-coat-production.up.railway.app/annonces/etat/lessthan/10');
            var annonce_ws_annonce = await callGet(passedurl, true);

            // console.log(searchTerm);
            // if (!annonce_ws_annonce.ok) {
            //   throw new Error('Bad HttpStatus');
            // }
            // const annonce_ws_result = annonce_ws_annonce;
            console.log("annonce_ws_annonce : ");
            console.log(annonce_ws_annonce);

            setAnnoncesValidees(annonce_ws_annonce);
            setAnnoncesValideesInit(annonce_ws_annonce);
            // console.log("annonces non validees : ");
            // console.log(annoncesValidees);

        } catch (error) {
            console.log("erreur fetch react");
            // console.error(error);

        }
    };

    useEffect(() => {
        fetchAnnonces(urlannonce)
    }, [urlannonce]);

    const handleSearch = (event) => {
        setAnnoncesValidees(annoncesValideesInit);
        console.log(searchTerm);

        setSearchTerm(event.target.value);
        const filteredAnnonces = annoncesValidees.filter(annonce =>
            annonce.description.toLowerCase().includes(event.target.value.toLowerCase()) && (annonce.voiture.annee_sortie >= anneemin) && (annonce.voiture.annee_sortie <= anneemax)
        );
        if (document.getElementById('inputsearch').value === "") {
            setAnnoncesValidees(annoncesValideesInit);
        }
        else
        {
            setAnnoncesValidees(filteredAnnonces);
        }
    };

    const handleChangeanneemin = (event) => {
        // setSearchTerm(event.target.value);
        setAnnoncesValidees(annoncesValideesInit);
        setAnneemin(event.target.value);

        const filteredAnnonces = annoncesValidees.filter(annonce =>
            annonce.description.toLowerCase().includes(document.getElementById('inputsearch').value.toLowerCase()) && (annonce.voiture.annee_sortie >= event.target.value) && (annonce.voiture.annee_sortie <= anneemax)
        );
        if ((document.getElementById('inputsearch').value === "") && (document.getElementById('input_annee_minimum').value === "") && (document.getElementById('input_annee_maximum').value === "")) {
            setAnnoncesValidees(annoncesValideesInit);
        }
        else
        {
            setAnnoncesValidees(filteredAnnonces);
        }
    };

    const handleChangeanneemax = (event) => {
        // setSearchTerm(event.target.value);
        setAnnoncesValidees(annoncesValideesInit);
        setAnneemax(event.target.value);
        const filteredAnnonces = annoncesValidees.filter(annonce =>
            annonce.description.toLowerCase().includes(document.getElementById('inputsearch').value.toLowerCase()) && (annonce.voiture.annee_sortie >= anneemin) && (annonce.voiture.annee_sortie <= event.target.value)
        );
        if ((document.getElementById('inputsearch').value === "") && (document.getElementById('input_annee_minimum').value === "") && (document.getElementById('input_annee_maximum').value === "")) {
            setAnnoncesValidees(annoncesValideesInit);
        }
        else
        {
            setAnnoncesValidees(filteredAnnonces);
        }
    };
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
                    <h3 className="mb-0">Liste des annonces</h3>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-4">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="ni ni-zoom-split-in" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    className="form-control-alternative"
                                    id="inputsearch"
                                    placeholder="Search"
                                    type="text"
                                    onChange={handleSearch}
                                />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <Input
                                className="form-control-alternative"
                                id="input_annee_minimum"
                                placeholder="annee minimum"
                                type="number"
                                onChange={handleChangeanneemin}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <Input
                                className="form-control-alternative"
                                id="input_annee_maximum"
                                placeholder="annee maximum"
                                type="number"
                                onChange={handleChangeanneemax}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                    <Button id="boutonfavori" color={colorBoutonfavori} size="lg" type="button" onClick={() => {setUrlannonce('http://localhost:8080/annonces/favoris'); setColorBoutonfavori("primary")}}>
                        Afficher favoris
                    </Button>
                    </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Description</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {annoncesValidees && annoncesValidees.map((annonce) => (
                        <tr>
                            <th scope="row">
                                <Media className="align-items-center">
                                <a
                                    className="avatar rounded-circle mr-3"
                                    href="#pablo"
                                    onClick={(e) => {
                                            e.preventDefault(); 
                                            setModalIsOpen(true); 
                                            setThreeimages(annonce.photos_voiture);
                                            setModelefiche(annonce.voiture.modele);
                                            setMarquefiche(annonce.voiture.modele.marque);
                                            setPrixfiche(annonce.prix);
                                            setDatefiche(annonce.voiture.annee_sortie);
                                        }
                                    }
                                >
                                    <img
                                    alt="..."
                                    src={annonce.photos_voiture[0].chemin}
                                    />
                                </a>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={() => setModalIsOpen(false)}
                                    contentLabel="This is a modal"
                                >
                                    <Button className="active" color="warning" onClick={() => setModalIsOpen(false)}>Close Modal</Button>

                                    {/* <h2>This is a modal</h2> */}
                                    <div className="card-profile-image">
                                        {threeimages.map((image) => (<img style={{position: 'relative', "margin-top": '10vh', paddingRight: '5vh'}} src={image.chemin} alt=""></img>))}
                                        <div className="py-3 text-center">
                                            <i className="ni ni-single-copy-04 ni-3x" />
                                            <h4 className="heading mt-4">Fiche descriptive</h4>
                                            <h5 className="heading mt-4">{marquefiche.nom + " " + modelefiche.nom}</h5>
                                            <h5 className="heading mt-4">Prix : {prixfiche} FMG</h5>
                                            <h5 className="mt-4">Date de mise en circulation : {datefiche}</h5>
                                        </div>
                                    </div>
                                    
                                </Modal>
                                <Media>
                                    <span className="mb-0 text-sm">
                                        {annonce.description}
                                    </span>
                                </Media>
                                </Media>
                            </th>
                            <td>
                                <Button
                                aria-pressed={true}
                                className="active"
                                color="primary"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                                role="button"
                                size="lg"
                                >
                                    Contacter vendeur
                                </Button>
                            </td>
                            <td>
                                {/* <Badge color="" className="badge-dot mr-4">
                                <i className="bg-warning" />
                                pending
                                </Badge> */}
                                <Button
                                aria-pressed={true}
                                className="active"
                                color="success"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                                role="button"
                                size="lg"
                                >
                                    Favori
                                </Button>
                            </td>
                            <td>
                                {/* <div className="avatar-group">
                                <a
                                    className="avatar avatar-sm"
                                    href="#pablo"
                                    id="tooltip742438047"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                                    />
                                </a>
                                <UncontrolledTooltip
                                    delay={0}
                                    target="tooltip742438047"
                                >
                                    Ryan Tompson
                                </UncontrolledTooltip>
                                <a
                                    className="avatar avatar-sm"
                                    href="#pablo"
                                    id="tooltip941738690"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("../../assets/img/theme/team-2-800x800.jpg")}
                                    />
                                </a>
                                <UncontrolledTooltip
                                    delay={0}
                                    target="tooltip941738690"
                                >
                                    Romina Hadid
                                </UncontrolledTooltip>
                                <a
                                    className="avatar avatar-sm"
                                    href="#pablo"
                                    id="tooltip804044742"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("../../assets/img/theme/team-3-800x800.jpg")}
                                    />
                                </a>
                                <UncontrolledTooltip
                                    delay={0}
                                    target="tooltip804044742"
                                >
                                    Alexander Smith
                                </UncontrolledTooltip>
                                <a
                                    className="avatar avatar-sm"
                                    href="#pablo"
                                    id="tooltip996637554"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                    />
                                </a>
                                <UncontrolledTooltip
                                    delay={0}
                                    target="tooltip996637554"
                                >
                                    Jessica Doe
                                </UncontrolledTooltip>
                                </div> */}
                            </td>
                            <td>
                                {/* <div className="d-flex align-items-center">
                                <span className="mr-2">60%</span>
                                <div>
                                    <Progress
                                    max="100"
                                    value="60"
                                    barClassName="bg-danger"
                                    />
                                </div>
                                </div> */}
                            </td>
                            <td className="text-right">
                                {/* <UncontrolledDropdown>
                                <DropdownToggle
                                    className="btn-icon-only text-light"
                                    href="#pablo"
                                    role="button"
                                    size="sm"
                                    color=""
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                    <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    >
                                    Action
                                    </DropdownItem>
                                    <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    >
                                    Another action
                                    </DropdownItem>
                                    <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    >
                                    Something else here
                                    </DropdownItem>
                                </DropdownMenu>
                                </UncontrolledDropdown> */}
                            </td>
                        </tr>
                    ))}
                    
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    {/* <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination> */}
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* Dark table */}
          
        </Container>
      </>
    );
  };
  
  export default ListeDetailAnnonce;
  