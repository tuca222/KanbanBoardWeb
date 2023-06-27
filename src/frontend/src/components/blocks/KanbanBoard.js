import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import CardTarefa from './CardTarefa';
import AddCardButton from './AddCardButton';
import BoardUsersList from './BoardUsersList';
import AddUserButton from './AddUserButton';
import EditBoardButton from './EditBoardButton';
import DeleteBoardButton from './DeleteBoardButton';


export default function KanbanBoard() {

  const servidor = 'http://localhost:3333' // Define a porta do servidor 
  
  const [columns, setColumns] = React.useState({
    column1: {
      id: 'column1',
      title: 'PENDENTES',
      color: '#ef5350',
      cards: [
        {
          id: 'tarefa1',
          name: 'Tarefa 01',
          description: 'Breve descrição da tarefa',
          content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
          index: 0,
          author: 'Fulano da Silva',
          deadline: '07/10/1978',
          taskColor: '#ef5350'
        },
        {
          id: 'tarefa2',
          name: 'Tarefa 02',
          description: 'Breve descrição da tarefa',
          content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
          index: 1,
          author: 'Fulano da Silva',
          deadline: '07/10/1978',
          taskColor: '#ef5350'
        },
        {
          id: 'tarefa3',
          name: 'Tarefa 03',
          description: 'Breve descrição da tarefa',
          content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
          index: 2,
          author: 'Fulano da Silva',
          deadline: '07/10/1978',
          taskColor: '#ef5350'
        },
      ],
    },
    column2: {
      id: 'column2',
      title: 'EM ANDAMENTO',
      color: '#ff9800',
      cards: [
        {
          id: 'tarefa4',
          name: 'Tarefa 04',
          description: 'Breve descrição da tarefa',
          content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
          index: 3,
          author: 'Fulano da Silva',
          deadline: '07/10/1978',
          taskColor: '#ff9800'
        },
        {
          id: 'tarefa5',
          name: 'Tarefa 05',
          description: 'Breve descrição da tarefa',
          content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
          index: 4,
          author: 'Fulano da Silva',
          deadline: '07/10/1978',
          taskColor: '#ff9800'
        },
      ],
    },
    column3: {
      id: 'column3',
      title: 'REVISADAS',
      color: '#03a9f4',
      cards: [
        {
          id: 'tarefa6',
          name: 'Tarefa 06',
          description: 'Breve descrição da tarefa',
          content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
          index: 5,
          author: 'Fulano da Silva',
          deadline: '07/10/1978',
          taskColor: '#03a9f4'
        },
      ],
    },
    column4: {
      id: 'column4',
      title: 'FINALIZADAS',
      color: '#4caf50',
      cards: [
      ],
    },
  });

  // const [columns, setColumns] = React.useState([]); // Inicializar a lista de colunas do board
  const navigate = useNavigate(); // Navegação usando react  
  let { userId } = useParams();

  
  const fetchColumns = async () => {
    try {
      const response = await axios.get(`${servidor}/users/${userId}/boards`);
      setColumns(response.boards[0]);
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  React.useEffect(() => {
    fetchColumns();
  }, []);

  const [newCardName, setNewCardName] = React.useState('Nova Tarefa');
  const [newCardDescription, setNewCardDescription] = React.useState('Breve descrição da tarefa');
  const [newCardContent, setNewCardContent] = React.useState('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.');
  const [newCardAuthor, setNewCardAuthor] = React.useState('Fulano da Silva');
  const [newCardDeadline, setNewCardDeadline] = React.useState('07/10/1978');
  const [newCardTaskColor, setNewCardTaskColor] = React.useState('#ef5350');


  const handleAddCard = () => {
    const newCard = {
      id: `card${Date.now()}`, // Gerar um ID único para o novo card
      name: newCardName,
      description: newCardDescription,
      content: newCardContent,
      index: columns.column1.cards.length, // Definir o índice com base na quantidade atual de cards      
      author: newCardAuthor,
      deadline: newCardDeadline,
      taskColor: newCardTaskColor,
    };

    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };
      updatedColumns.column1.cards.push(newCard); // Adicionar o novo card à coluna "column1"
      return updatedColumns;
    });

    setNewCardName('Nova Tarefa');
    setNewCardDescription('Breve descrição da tarefa')
    setNewCardContent('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.')
    setNewCardAuthor('Fulano da Silva')
    setNewCardDeadline('07/10/1978')
    setNewCardTaskColor('#ef5350')
  };

  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleDragEnd = (result) => {
    // Mover cartões nas colunas
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;
    const sourceColumn = columns[sourceColumnId];
    const destinationColumn = columns[destinationColumnId];

    if (sourceColumnId === destinationColumnId) {
      // Movendo dentro da mesma coluna
      const sourceCards = Array.from(sourceColumn.cards);
      const [draggedCard] = sourceCards.splice(source.index, 1);
      sourceCards.splice(destination.index, 0, draggedCard);

      setColumns((prevColumns) => ({
        ...prevColumns,
        [sourceColumnId]: {
          ...prevColumns[sourceColumnId],
          cards: sourceCards.map((card, index) => ({
            ...card,
            index,
          })),
        },
      }));
    } else {
      // Movendo para uma coluna diferente
      const sourceCards = Array.from(sourceColumn.cards);
      const destinationCards = Array.from(destinationColumn.cards);
      const [draggedCard] = sourceCards.splice(source.index, 1);

      // Manter as informações do cartão ao mover para outra coluna
      const updatedCard = {
        ...draggedCard,
        index: destination.index,
        taskColor: destinationColumn.color,
      };

      destinationCards.splice(destination.index, 0, updatedCard);

      setColumns((prevColumns) => ({
        ...prevColumns,
        [sourceColumnId]: {
          ...prevColumns[sourceColumnId],
          cards: sourceCards.map((card, index) => ({
            ...card,
            index,
          })),
        },
        [destinationColumnId]: {
          ...prevColumns[destinationColumnId],
          cards: destinationCards.map((card, index) => ({
            ...card,
            index,
          })),
        },
      }));
    }

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
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        minHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <CssBaseline />
      {/* Cabeçalho */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid component='main' container spacing={4} sx={{ p: 4 }}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant='h4' component='h1' sx={{ pr: 4 }}>Nome do Board</Typography>
              <DeleteBoardButton />
              <EditBoardButton />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <BoardUsersList />
              <AddUserButton />
            </Stack>
          </Grid>
          {/* Colunas */}
          {columns.map((column) => (
            <Grid item xs={12} md={6} lg={3} sx={{ pb: 4 }} key={column.id}>
              <Paper sx={{ bgcolor: column.color, py: 0.5 }} elevation={1}>
                <Typography variant='subtitle2' align='center' color='white'>
                  {column.title}
                </Typography>
              </Paper>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {column.cards.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <CardTarefa
                              id={card.id}
                              name={card.name}
                              description={card.description}
                              content={card.content}
                              index={index}
                              author={card.author}
                              deadline={card.deadline}
                              taskColor={column.color}
                              isSelected={card.id === selectedCard}
                              onSelectCard={setSelectedCard}
                              onCardChange={handleCardChange}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    <Divider sx={{ pt: 2 }} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Grid container justifyContent='center' sx={{ pt: 2 }}>
                {column.id === 'column1' && (
                  <AddCardButton onCardAdd={handleAddCard} />
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Box>
  );
};
