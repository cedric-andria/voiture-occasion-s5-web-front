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
// import { useNavigate } from "react-router-dom";
  
  const CategorieVoiture = () => {
      const [categories, setCategories] = useState([]);
      const [credentials, setCredentials] = useState({
        nom : ""
      });
      const [updateCategorie,setUpdateCategorie] = useState({
        id :1,
        newName :""
      });
      const [insert,setInsert] = useState(0);
      // const navigate = useNavigate();
  
      /* useEffect(() => {
          fetch('http://localhost:8080/Categorie/all').then(response => response.json()).then(data => setCategories(data))
          .catch(error => console.error('error fetching Categories', error))
      }, []); */

      // ----------------------------------------------------------------------------------------------------------------------------------------------
      const fetchData = async() => {
        /* window.setTimeout(async()=>{ */
          try {
            //check user proifile first
            

            // const response = await fetch('https://unnatural-coat-production.up.railway.app/Categorie');
            const response = await callGet('http://localhost:8080/Categorie', true);

            
            // if (!response.ok) {
            //   throw new Error('Erreur lors de la récupération des catégories');
            // }
            // const data = await response.json();
            const data = response;

            // console.log(data)
            setCategories(data);
          } catch (error) {
            console.error('Erreur lors de la récupération des catégories :', error);
            //je suppose ici hoe ny seul erreur mety misy eo amle fetchCategories ilay resaka token, du coup averiko any am login
          }
        /* },2000) */
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
      /* Mampiditra Categorie any anaty base de données */
      const CreateCategorie = async(e) =>{
          e.preventDefault();
          // await fetch('https://unnatural-coat-production.up.railway.app/Categorie',
          await callPost('http://localhost:8080/Categorie', JSON.stringify(credentials), true)
          .catch(error => console.error('Error eo @ insert',error));
          console.log("Nety eh");
          // alert("Insert of Categorie: "+JSON.stringify(credentials)+" success");
          setInsert(insert+1);
          setCredentials({
            ...credentials,
            nom : ""
          })
      }
      // ----------------------------------------------------------------------------------------------------------------------------------------------
      /* Manova ilay updateCategorie */
      const changeSelect=(e)=>{
        e.preventDefault();
          setUpdateCategorie({
            ...updateCategorie,
            id : e.target.value
          })
          console.log("----------------------------- updtCat : "+JSON.stringify(updateCategorie))
      }

      // ----------------------------------------------------------------------------------------------------------------------------------------------
      /* Manova ilay updateCategorie.newname refa sendra miova ilay soratra eo @ input */
      const changeNewName=(e)=>{
        e.preventDefault();
        setUpdateCategorie({
          ...updateCategorie,
          newName : e.target.value
        })
        // console.log("New name : "+updateCategorie.newName)
      }
      
      // ----------------------------------------------------------------------------------------------------------------------------------------------
      /* Manao update an'ilay izy makany anaty base*/
      const updatingCategorie = async(e) =>{
        e.preventDefault();
        // await fetch("https://unnatural-coat-production.up.railway.app/Categorie/"+updateCategorie.id+"?nom="+updateCategorie.newName,{method:"PUT"})
        await callPut("http://localhost:8080/Categorie/"+updateCategorie.id, {'id': updateCategorie.id, 'nom': updateCategorie.newName}, true)
        .catch(error => console.error("Error eo @ Modification de l'id:"+updateCategorie.id+" avec comme nom:"+updateCategorie.newName,error));
        setInsert(insert+1);
        setUpdateCategorie({
          ...updateCategorie,
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
                    <Form role="form" onSubmit={CreateCategorie}>
                      <div class="ct-page-title"><h1 class="ct-title" id="content">Insertion de Categorie</h1><div class="avatar-group mt-3"></div></div>
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="Nom de la categorie"
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
                <div class="ct-page-title"><h1 class="ct-title" id="content">Modification de Categorie</h1><div class="avatar-group mt-3"></div></div>
                <Form role="form" onSubmit={updatingCategorie}>
                    <select block size="lg" name="categ" id="categ" onChange={changeSelect} className="select_perso">
                          { categories && categories.map((categ,index) =>(
                        <option value={categ.id}>{categ.nom}</option>        
                        ))}
                    </select>
                    <Input
                        id="newname"
                        placeholder="Nouveau Nom"
                        name="newname"
                        value={updateCategorie.newName}
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

          {/* Table Categorie */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Categories</h3>
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
                            {categories && categories.map((categ,index) =>(
                                <tr>
                                    <td>{categ.id}</td>
                                    <td>{categ.nom}</td>
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
  
  export default CategorieVoiture;
  