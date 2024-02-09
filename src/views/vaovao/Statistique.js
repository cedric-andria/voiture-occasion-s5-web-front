import classNames from "classnames";
import Header from "components/Headers/Header";
import { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Nav, NavItem, Row } from "reactstrap";
import { callGet } from "service/api/Api";
// import {
//     chartOptions,
//     parseOptions,
//     chartExample1,
//     chartExample2,
//   } from "variables/charts.js";
// import {
//     chartExample1
//   } from "variables/charts.js";


const Statistique = () =>{
    // const [statistiques,setStatistiques] = useState([]);
    const [activeNav, setActiveNav] = useState(1);
    // const [iscritereChanged, setIscritereChanged] = useState(0);
    const [critereStat, setCritereStat] = useState("marque");
    // const [chartExample1Data, setChartExample1Data] = useState("data1");
    const [donneesStat, setDonneesStat] = useState([]);
    const [marques, setMarques] = useState([]);
    const [categories, setCategories] = useState([]);

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        // setChartExample1Data("data" + index);
      };
      const fetchData = async(critere) => {
        try {
          // const response = await fetch('https://unnatural-coat-production.up.railway.app/Marque');
          const response = await callGet('http://localhost:8080/vente/stat' + critere, true);
          
          const response_categorie = await callGet('http://localhost:8080/Categorie', true);
          const response_marque= await callGet('http://localhost:8080/Marque', true);

          // if (!response.ok) {
          //   throw new Error('Erreur lors de la récupération des marques');
          // }
          const data = response;
          // console.log(data)
          setDonneesStat(data);
          setCategories(response_categorie);
          setMarques(response_marque);
        //   console.log("donneesStat : ");

        //   console.log(donneesStat);
        } catch (error) {
          console.error('Erreur lors de la récupération des stats :', error);
        }
    };
    useEffect(() => {
      fetchData(critereStat);
      // console.log("Fetch ehhhhh")
    }, [critereStat]);

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                <div className="col">
                                    <h5 className="text-uppercase text-dark ls-1 mb-1">Statistique de vente</h5>
                                    {/* <h2 className="text-white mb-0">Statistique de Vente</h2> */}
                                </div>
                                <div className="col">
                                    <Nav className="justify-content-end" pills>
                                        <NavItem>
                                            <NavLink
                                                className={classNames("py-2 px-3", {
                                                    active: activeNav === 1,
                                                })}
                                                href="#pablo"
                                                onClick={(e) => {
                                                        toggleNavs(e, 1); 
                                                        setCritereStat("categorie");
                                                    }}
                                            >
                                            <span className="d-none d-md-block">Categorie</span>
                                            <span className="d-md-none">M</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classNames("py-2 px-3", {
                                                    active: activeNav === 2,
                                                })}
                                                data-toggle="tab"
                                                href="#pablo"
                                                onClick={(e) => {
                                                        toggleNavs(e, 2);
                                                        setCritereStat("marque");
                                                    }}
                                            >
                                            <span className="d-none d-md-block">Marque</span>
                                            <span className="d-md-none">W</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                {/* <div className="chart"> */}
                                    {/* <Line
                                        data={chartExample1[chartExample1Data]}
                                        options={chartExample1.options}
                                        getDatasetAtEvent={(e) => console.log(e)}
                                    /> */}
                                    <table class="table table-striped">
                                        <tr>
                                            <th>{critereStat} 
                                            </th>
                                            <th>Pourcentage de vente</th>

                                        </tr>
                                        {(critereStat === 'categorie') ? 
                                        (categories && categories.map(
                                            (categorie, index)=>(
                                                <tr>
                                                    <td>{categorie.nom}</td><td>{donneesStat[categorie.nom]}</td>
                                                </tr>
                                            )
                                        )) : 
                                        marques.map(
                                            (marque, index)=>(
                                                <tr>
                                                    <td>{marque.nom}</td><td>{donneesStat[marque.nom] + '%'}</td>
                                                </tr>
                                            ))
                                        }

                                        {/* <tr> */}
                                            {/* <td th:text="${genre.getDescription()}"> </td> */}
                                            {/* <td th:each=" stat_par_genre : ${hashmap_genre_stat.get(genre.getDescription())}" th:text="${stat_par_genre.getStat() + '%'}"></td> */}
                                        
                                        {/* </tr> */}
                                        <tr>
                                            <th>Total</th>
                                            <td></td>
                                        </tr>
                                    </table>
                                {/* </div> */}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Statistique;