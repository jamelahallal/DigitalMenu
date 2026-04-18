import React from 'react';
import { Card, Button } from 'react-bootstrap';

const MenuCard = ({ item, onAddToCart }) => {
  return (
    <Card className="h-100 menu-card">
      <div className="card-img-wrapper">
        <Card.Img 
          variant="top" 
          src={item.image} 
          alt={item.name}
          className="menu-card-img"
        />
        {item.badge && <span className="card-badge">{item.badge}</span>}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="menu-card-title">{item.name}</Card.Title>
        <Card.Text className="menu-card-text">{item.description}</Card.Text>
        <div className="card-footer-row">
          <span className="price">${item.price.toFixed(2)}</span>
          <Button 
            variant="primary" 
            className="btn-add"
            onClick={() => onAddToCart(item)}
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MenuCard;