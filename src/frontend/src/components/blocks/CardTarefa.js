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
import EditCardButton from "./EditCardButton";
import DeleteCardButton from "./DeleteCardButton";
import ScheduleIcon from "@mui/icons-material/Schedule";

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

export default function CardTarefa({
  id,
  name,
  description,
  content,
  index,
  author,
  deadline,
  taskColor,
  isSelected,
  onSelectCard,
  onCardChange,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [taskName, setTaskName] = React.useState(name);
  const [taskDescription, setTaskDescription] = React.useState(description);
  const [taskContent, setTaskContent] = React.useState(content);
  const [taskDeadline, setTaskDeadline] = React.useState(deadline);

  React.useEffect(() => {
    setTaskName(name);
    setTaskDescription(description);
    setTaskContent(content);
    setTaskDeadline(deadline);
  }, [name, description, content, deadline]);

  const handleClick = () => {
    onSelectCard(id);
  };

  const handleSaveChanges = (name, description, content, deadline) => {
    setTaskName(name);
    setTaskDescription(description);
    setTaskContent(content);
    setTaskDeadline(deadline);
    onCardChange(id, { name, description, content, deadline });
  };

  return (
    <Card
      className={`card ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
      elevation={2}
      sx={{ mt: 2, borderLeft: `solid 4px ${taskColor}` }}
    >
      <CardHeader
        sx={{ py: 1 }}
        title={
          <Typography color="GrayText" variant="h6" sx={{ fontSize: 18 }}>
            {taskName}
          </Typography>
        }
        action={
          <ExpandMore
            expand={expanded}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="Expandir Card"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ py: 0 }}>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ textTransform: "uppercase" }}
          >
            {taskDescription}
          </Typography>
          <Stack sx={{ pt: 2 }} direction="row" spacing={1}>
            <Chip size="small" icon={<ScheduleIcon />} label={taskDeadline} />
            <Chip
              size="small"
              icon={<AccountCircleIcon />}
              label={author}
            />
          </Stack>
          <Typography variant="body2" color="text" sx={{ pt: 2 }}>
            {taskContent}
          </Typography>
        </CardContent>
        <CardActions sx={{ pt: 1, pb: 2, pr: 2, float: "right" }}>
          <Stack direction="row" spacing={1}>
            <DeleteCardButton />
            <EditCardButton
              onSaveChanges={handleSaveChanges}
              initialName={taskName}
              initialDescription={taskDescription}
              initialContent={taskContent}
              initialDeadline={taskDeadline}
            />
          </Stack>
        </CardActions>
      </Collapse>
    </Card>
  );
}
