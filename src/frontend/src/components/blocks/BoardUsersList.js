import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function BoardUsersList() {
  const [nomes, setNomes] = React.useState([
    'boardAutor',
    'boardUser01',
    'boardUser02',
    'boardUser03',
  ]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        
        listStyle: 'none',
        p: 0,
        m: 0,
      }}
      component="ul"
    >
      {nomes.map((nome, posicao) => {
        let variante = 'outlined';

        if (posicao === 0) {
          variante = 'filled';
        }

        return (
          <ListItem key={posicao}>
            <Chip
              variant={variante}
              size='small'
              icon={<AccountCircleIcon />}
              label={nome}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}