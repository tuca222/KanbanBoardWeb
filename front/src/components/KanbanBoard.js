import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanbanBoard.css'
import Card from './Card';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    column1: {
      id: 'column1',
      title: 'To Do',
      cards: [
        { id: 'card1', name: 'Card 1', description: 'Description 1', content: 'Content 1' },
        { id: 'card2', name: 'Card 2', description: 'Description 2', content: 'Content 2' },
        { id: 'card3', name: 'Card 3', description: 'Description 3', content: 'Content 3' },
      ],
    },
    column2: {
      id: 'column2',
      title: 'In Progress',
      cards: [
        { id: 'card4', name: 'Card 4', description: 'Description 4', content: 'Content 4' },
        { id: 'card5', name: 'Card 5', description: 'Description 5', content: 'Content 5' },
      ],
    },
    column3: {
      id: 'column3',
      title: 'Done',
      cards: [
        { id: 'card6', name: 'Card 6', description: 'Description 6', content: 'Content 6' },
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

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceCards = [...sourceColumn.cards];
    const destinationCards = [...destinationColumn.cards];
    const [draggedCard] = sourceCards.splice(source.index, 1);

    destinationCards.splice(destination.index, 0, draggedCard);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        cards: sourceCards,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        cards: destinationCards,
      },
    });

    setSelectedCard(null);
  };

  const handleCardChange = (cardId, field, value) => {
    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };
      const column = Object.values(updatedColumns).find((col) =>
        col.cards.find((card) => card.id === cardId)
      );
      const card = column.cards.find((card) => card.id === cardId);

      card[field] = value;

      return updatedColumns;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
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
                            card={card}
                            isSelected={card.id === selectedCard}
                            onSelectCard={setSelectedCard}
                            onCardChange={(field, value) =>
                              handleCardChange(card.id, field, value)
                            }
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
    </DragDropContext>
  );
};

export default KanbanBoard;
