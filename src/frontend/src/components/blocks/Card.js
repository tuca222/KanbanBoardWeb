import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EditCardButton from './EditCardButton'
import DeleteCardButton from './DeleteCardButton'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function KanbanCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card elevation={2} sx={{ mt: 2, borderLeft: 'solid 4px #909090' }}>      
      <CardHeader sx={{ py: 1 }}
        title={<Typography variant="h6" sx={{ fontSize: 18 }} >tarefaNome</Typography>}
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="expandir card"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ py: 0 }}>
          <Typography color="text.secondary" variant="body2" sx={{ textTransform: 'uppercase' }}>tarefaDescricao</Typography>
          <Stack sx={{ pt: 2 }} direction="row" spacing={1}>
            <Chip
              size="small"
              icon={<ScheduleIcon />}
              label="tarefaPrazo"
            />
            <Chip
              size="small"
              icon={<AccountCircleIcon />}
              label="tarefaCriador"
            />
          </Stack>
          <Typography variant="body2" color="text" sx={{ pt: 2 }}>
            tarefaConteudo = Et velit excepturi et nihil quia ea repellat temporibus. Et rerum quibusdam et facere quia id omnis placeat sed dolorem praesentium ut deserunt sint.
          </Typography>
        </CardContent>
        <CardActions sx={{ pt: 1, pb: 2, pr: 2, float: "right" }}>
          <Stack direction="row" spacing={1}>
            <DeleteCardButton />
            <EditCardButton />
          </Stack>
        </CardActions>
      </Collapse>
    </Card>
  );
}