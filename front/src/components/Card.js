import React from 'react';

const Card = ({ card, isSelected, onSelectCard, onCardChange }) => {
  const handleClick = () => {
    onSelectCard(card.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onCardChange(card.id, name, value);
  };

  return (
    <div className={`card ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
      <input
        type="text"
        name="name"
        value={card.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        value={card.description}
        onChange={handleInputChange}
      />
      <textarea name="content" value={card.content} onChange={handleInputChange} />
    </div>
  );
};

export default Card;
