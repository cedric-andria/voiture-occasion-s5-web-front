import "../../assets/css/style-perso.css";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Table,
    Col,
    Input,
    Button,
    Form,
  //   UncontrolledTooltip,
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  
  import { useState, useEffect } from "react";
  import { callGet, callPost, callPut } from "service/api/Api";
  
  const MarqueVoiture = () => {
      const [marques, setMarques] = useState([]);
      const [credentials, setCredentials] = useState({
        nom : ""
      });
      const [updateMarque,setUpdateMarque] = useState({
        id :1,
        newName :""
      });
      const [insert,setInsert] = useState(0);
  
      /* useEffect(() => {
          fetch('http://localhost:8080/marque/all').then(response => response.json()).then(data => setMarques(data))
          .catch(error => console.error('error fetching marques', error))
      }, []); */

      // ----------------------------------------------------------------------------------------------------------------------------------------------
      const fetchData = async() => {
          try {
            // const response = await fetch('https://unnatural-coat-production.up.railway.app/Marque');
            const response = await callGet('http://localhost:8080/Marque', true);

            
            // if (!response.ok) {
            //   throw new Error('Erreur lors de la récupération des marques');
            // }
            const data = response;
            // console.log(data)
            setMarques(data);
          } catch (error) {
            console.error('Erreur lors de la récupération des marques :', error);
          }
      };
      useEffect(() => {
        fetchData();
        // console.log("Fetch ehhhhh")
      }, [insert]);

      // ----------------------------------------------------------------------------------------------------------------------------------------------
      const onChange =(e)=>{
        e.preventDefault();
        setCredentials({
            ...credentials,
            [e.target.name] : e.target.value, 
        })
        console.log(JSON.stringify(credentials));
      }

      // ----------------------------------------------------------------------------------------------------------------------------------------------
      /* Mampiditra Marque any anaty base de données */
      const CreateMarque = async(e) =>{
          e.preventDefault();
          // await fetch('https://unnatural-coat-production.up.railway.app/Marque',
          // await fetch('http://localhost:8080/Marque',
          // {method:"post",body:
          // JSON.stringify(
          //   {...credentials}
          // )
          // ,headers:{"Content-Type":"application/json"}})
          await callPost('http://localhost:8080/Marque', JSON.stringify(credentials), true)
          .catch(error => console.error('Error eo @ insert',error));
          console.log("Nety eh");
          // alert("Insert of Marque: "+JSON.stringify(credentials)+" success");
          setInsert(insert+1);
          setCredentials({
            ...credentials,
            nom : ""
          })
      }
      // ----------------------------------------------------------------------------------------------------------------------------------------------
      /* Manova ilay updateMarque */
      const changeSelect=(e)=>{
        e.preventDefault();
          setUpdateMarque({
            ...updateMarque,
            id : e.target.value
          })
          console.log("----------------------------- updtCat : "+JSON.stringify(updateMarque))
      }

      // ----------------------------------------------------------------------------------------------------------------------------------------------
      /* Manova ilay updatemarque.newname refa sendra miova ilay soratra eo @ input */
      const changeNewName=(e)=>{
        e.preventDefault();
        setUpdateMarque({
          ...updateMarque,
          newName : e.target.value
        })
        // console.log("New name : "+updateMarque.newName)
      }
      
      // ----------------------------------------------------------------------------------------------------------------------------------------------
      /* Manao update an'ilay izy makany anaty base*/
      const updatingMarque = async(e) =>{
        e.preventDefault();
        // await fetch("https://unnatural-coat-production.up.railway.app/Marque/"+updateMarque.id+"?nom="+updateMarque.newName,{method:"PUT"})
        await callPut("http://localhost:8080/Marque/"+updateMarque.id, {'id': updateMarque.id, 'nom': updateMarque.newName} , true)
        .catch(error => console.error("Error eo @ Modification de l'id:"+updateMarque.id+" avec comme nom:"+updateMarque.newName,error));
        setInsert(insert+1);
        setUpdateMarque({
            ...updateMarque,
            newName : ""
          });
      }
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>

          <Row>
            <Col className="order-xl-1" xl="7">
                <Card className="card-profile shadow">
                  <Col md="12">
                    <Form role="form" onSubmit={CreateMarque}>
                      <div class="ct-page-title"><h1 class="ct-title" id="content">Insertion de marque</h1><div class="avatar-group mt-3"></div></div>
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="Nom de la marque"
                          name="nom"
                          type="text"
                          value={credentials.nom}
                          onChange={onChange}
                        />
                      <Button block color="primary" size="lg" type="submit">
                        Valider 
                      </Button>
                    </Form>
                  </Col>
                </Card>
            </Col>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="5">
              {/* Modification de  */}
              <Card className="card-profile shadow">
                <div class="ct-page-title"><h1 class="ct-title" id="content">Modification d'une Marque</h1><div class="avatar-group mt-3"></div></div>
                <Form role="form" onSubmit={updatingMarque}>
                    <select block size="lg" name="marq" id="marq" onChange={changeSelect} className="select_perso">
                        <option desable>Choisir une marque</option>
                        {marques.map((marq,index) =>(
                          <option value={marq.id}>{marq.nom}</option>        
                        ))}
                    </select>
                    <Input
                        id="newname"
                        placeholder="Nouveau Nom"
                        name="newname"
                        value={updateMarque.newName}
                        onChange={changeNewName}
                        type="text"
                    />
                  <Button block color="primary" size="lg" type="submit">
                        Update 
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>

          {/* Table marque */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">marques</h3>
                </CardHeader>
                <CardBody>
                    <Row className="icon-examples">
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nom</th>
                            </tr>
                            </thead>
                            <tbody>
                            {marques.map((marque,index) =>(
                                <tr>
                                    <td>{marque.id}</td>
                                    <td>{marque.nom}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
  
  export default MarqueVoiture;
  