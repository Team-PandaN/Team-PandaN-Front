import React from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
/* == Library - drag & drop */
import { Draggable } from "react-beautiful-dnd";
/* == Custom - Component */
import { KanbanCard } from "..";

// * == ( kanban / NoteList ) -------------------- * //
const KanbanList = ({ notes, history, projectId, step, ...rest }) => {
  if (!notes) {
    return (<div></div>);
  }
  return (
    <React.Fragment>
      {notes.map((note, index) => {
        const noteId = note?.noteId;
        return (
          <Draggable draggableId={String(noteId)} key={noteId} index={index}>
            {(provided, snapshot) => {
              return (
                <CardWrapper
                  ref={provided.innerRef}
                  isDragging={snapshot.isDragging}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  onClick={() => {history.push(`/projects/${projectId}/notes/${noteId}`)}}
                  className="card-wrapper"
                >
                  <KanbanCard note={note} step={step} />
                </CardWrapper>
              );
            }}
          </Draggable>
        );
      })}
    </React.Fragment>
  );
};

const CardWrapper = styled.div(...t`
  background-color: 
  ${(props) => props.isDragging ? "#f7f7f7" : "#fff"};
`);

export default KanbanList;
