import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card'
import './KanbanBoard.css'


const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    column1: {
      id: 'column1',
      title: 'A fazer',
      cards: [
        { id: 'card1', name: 'Card 1', description: 'Description 1', content: 'Content 1', index: 0 },
        { id: 'card2', name: 'Card 2', description: 'Description 2', content: 'Content 2', index: 1 },
        { id: 'card3', name: 'Card 3', description: 'Description 3', content: 'Content 3', index: 2 },
      ],
    },
    column2: {
      id: 'column2',
      title: 'Em andamento',
      cards: [
        { id: 'card4', name: 'Card 4', description: 'Description 4', content: 'Content 4', index: 0 },
        { id: 'card5', name: 'Card 5', description: 'Description 5', content: 'Content 5', index: 1 },
      ],
    },
    column3: {
      id: 'column3',
      title: 'Testando',
      cards: [
        { id: 'card6', name: 'Card 6', description: 'Description 6', content: 'Content 6', index: 0 },
      ],
    },
    column4: {
      id: 'column4',
      title: 'Concluído',
      cards: [
      ],
    },
  });

  const [selectedCard, setSelectedCard] = useState(null);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;
    const sourceColumn = columns[sourceColumnId];
    const destinationColumn = columns[destinationColumnId];
    const sourceCards = Array.from(sourceColumn.cards);
    const destinationCards = Array.from(destinationColumn.cards);
    const [draggedCard] = sourceCards.splice(source.index, 1);

    if (sourceColumnId === destinationColumnId) {
      sourceCards.splice(destination.index, 0, draggedCard);
    } else {
      destinationCards.splice(destination.index, 0, { ...draggedCard });
    }

    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };
      updatedColumns[sourceColumnId].cards = sourceCards.map((card, index) => ({
        ...card,
        index,
      }));
      updatedColumns[destinationColumnId].cards = destinationCards.map((card, index) => ({
        ...card,
        index,
      }));
      return updatedColumns;
    });

    setSelectedCard(null);
  };

  const handleCardChange = (cardId, field, value) => {
    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };
      const columnToUpdate = Object.values(updatedColumns).find((column) =>
        column.cards.find((card) => card.id === cardId)
      );
      const cardToUpdate = columnToUpdate.cards.find((card) => card.id === cardId);

      cardToUpdate[field] = value;

      return updatedColumns;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        <div className="kanban-columns">
          {Object.values(columns).map((column) => (
            <div className="kanban-column" key={column.id}>
              <h3>{column.title}</h3>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="card-list"
                  >
                    {column.cards.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="card"
                          >
                            <Card
                              id={card.id}
                              name={card.name}
                              description={card.description}
                              content={card.content}
                              index={index}
                              isSelected={card.id === selectedCard}
                              onSelectCard={setSelectedCard}
                              onCardChange={handleCardChange}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
