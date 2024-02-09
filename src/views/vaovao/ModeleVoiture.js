import Header from "components/Headers/Header";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Input, Row, Form } from "reactstrap";
import { callPost } from "service/api/Api";
import { callGet } from "service/api/Api";


const ModeleVoiture = () =>{
    const [nom,setNom] = useState("");
    const [marque,setMarque] = useState(0);
    const [marques,setMarques] = useState([]);

    /* Données dans le Select */
    const fetchData = async() => 
    {
        try {
        //   const response = await fetch('https://unnatural-coat-production.up.railway.app/Marque');
          const response = await callGet('http://localhost:8080/Marque');

          
        //   if (!response.ok) {
        //     throw new Error('Erreur lors de la récupération des marques');
        //   }
        //   const data = await response.json();
            const data = response;

          // console.log(data)
          setMarques(data);
        } catch (error) {
          console.error('Erreur lors de la récupération des marques :', error);
        }
    };
    useEffect(() => 
        {
        fetchData();
        }, []
    );

    /* Traitement des données input */

    const onChange =(e)=>
    {
        e.preventDefault();
        setNom(e.target.value);
        console.log("Nom : ",nom);
    }
    const changeSelect=(e)=>
    {
        e.preventDefault();
        setMarque(e.target.value)
        console.log("----------------------------- marque : "+JSON.stringify(marque));
    }

    /* Insertion des données input */

    const createModele = async(e) =>
    {
        e.preventDefault();
        console.log("Datas : ",JSON.stringify({"nom" : nom,"id_marque" : marque}));
        // await fetch('https://unnatural-coat-production.up.railway.app/modele',
        // {method:"post",body:
        //     JSON.stringify(
        //         {
        //             "nom" : nom,
        //             "id_marque" : marque
        //         }
        //     ),headers:{"Content-Type":"application/json"}
        // })
        await callPost('http://localhost:8080/modele',
            JSON.stringify(
                {
                    "nom" : nom,
                    "id_marque" : marque
                }), true)
        .catch(error => console.error('Error eo @ insert',error));
        console.log("Nety eh");
        setNom("");
        setMarque(0);
    }
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12" >
                        <Card className="card-profile shadow">
                            <Col md="12">
                                <Form role="form" onSubmit={createModele}>
                                <div class="ct-page-title"><h1 class="ct-title" id="content">Insertion de Modele</h1><div class="avatar-group mt-3"></div></div>
                                    <Input
                                        id="exampleFormControlInput1"
                                        placeholder="Nom du Modele"
                                        name="nom"
                                        type="text"
                                        value={nom}
                                        onChange={onChange}
                                    />
                                    <select block size="lg" name="marq" id="marq" onChange={changeSelect} className="select_perso">
                                        <option desable>Choisir une marque</option>
                                        {
                                            marques.map((marq,index) =>
                                            (
                                                <option value={marq.id}>{marq.nom}</option>        
                                            ))
                                        }
                                    </select>
                                <Button block color="primary" size="lg" type="submit">
                                    Valider 
                                </Button>
                                </Form> 
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default ModeleVoiture;