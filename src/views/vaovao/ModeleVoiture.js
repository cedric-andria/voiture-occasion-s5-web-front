import Header from "components/Headers/Header";
import { useState } from "react";
import { Button, Card, Col, Container, Row } from "reactstrap";


const ModeleVoiture = () =>{
    const [models,setModels] = useState([]);
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12" >
                        <h1>Modele de Voiture</h1>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default ModeleVoiture;