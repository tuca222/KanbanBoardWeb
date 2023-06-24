import React from "react";
import './Card.css'

const Card = ({ id, name, description, content, index, isSelected, onSelectCard, onCardChange }) => {
  const handleClick = () => {
    onSelectCard(id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onCardChange(id, name, value);
  };

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="content"
        value={content}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Card;
