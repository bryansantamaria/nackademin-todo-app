import React, { Component } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

class ToDoItem extends Component {
  state = {};

  getLineThrough = () => {
    const { done } = this.props.todo;
    return {
      textDecoration: done ? "line-through" : "none",
    };
  };

  render() {
    const { title, created, lastUpdated, _id } = this.props.todo;

    return (
      <List>
        <ListItem className="toDoItem" style={this.getLineThrough()}>
          <Checkbox
            edge="start"
            onChange={() => this.props.complete(_id)}
            className="checkboxes"
            tabIndex={-1}
            disableRipple
          />
          <ListItemText primary={title}> </ListItemText>
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments">
              <Button
                type="button"
                onClick={() => this.props.update(_id)}
                variant="contained"
                color="primary"
                size="small"
              >
                Edit
              </Button>{" "}
              <Button
                type="button"
                onClick={() => this.props.delete(_id)}
                variant="contained"
                color="secondary"
                size="small"
              >
                Delete
              </Button>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}

{
  /* <FormControlLabel
control={<Checkbox color="primary" />}
labelPlacement="start"
onChange={() => this.props.complete(_id)}
/>
{title}{" "}
<Button
type="button"
onClick={() => this.props.update(_id)}
variant="contained"
color="primary"
size="small"
>
Edit
</Button>{" "}
<Button
type="button"
onClick={() => this.props.delete(_id)}
variant="contained"
color="secondary"
size="small"
>
Delete
</Button> */
}

export default ToDoItem;
