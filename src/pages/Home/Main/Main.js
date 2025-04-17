import React from "react";
import BannerLayout from "../../../layouts/BannerLayout";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/contextValues/useAuth";
import { getAvailableFeatures } from "./features";
import "./Main.scss";

function Main(props) {
  const { setCallLogin } = props;
  const { currentEnterprise } = useAuth();
  const menuSetting = currentEnterprise?.menu;
  const features = getAvailableFeatures(menuSetting);

  if (!currentEnterprise) return null;

  return (
    <BannerLayout setCallLogin={setCallLogin}>
      <div className="main-page">
        <div className="hero-section">
          <h1>Bienvenido a Communities App</h1>
          <p className="subtitle">Tu plataforma integral para la gestión comunitaria</p>
        </div>

        {features.length > 0 && (
          <Row className="features-section">
            {features.map((feature, index) => (
              <Col key={index} md={6} lg={3} className="feature-col">
                <Card className="feature-card h-100">
                  <Card.Body>
                    <div className="icon-wrapper" style={{ backgroundColor: feature.color }}>
                      <FontAwesomeIcon icon={feature.icon} />
                    </div>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                    <Link to={feature.link}>
                      <Button variant="outline-primary" className="mt-3">
                        Acceder
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Row className="quick-stats">
          <Col md={12}>
            <Card className="stats-card">
              <Card.Body>
                <h3>Acceso Rápido</h3>
                <p>
                  {features.length > 0 
                    ? "Selecciona una de las opciones anteriores para comenzar a gestionar tu comunidad"
                    : "No hay opciones disponibles en este momento"}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </BannerLayout>
  );
}

export default Main; 