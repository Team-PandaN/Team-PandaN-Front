import React from "react";
/* == Library - style */
import styled from "styled-components";
import { t }  from "../../util/remConverter";
/* == Custom - Component */
import { Template, SubHeader, InnerHeader, KanbanBoard } from "../../components";

// * == ( note - Kanban ) -------------------- * //
const Kanban = ({ history, match, ...rest }) => {
  const projectId = match.params.projectId;
  return (
    <Template>
      <div className="content">
        <SubHeader />
        <InnerHeader history={history} match={match} projectId={projectId}/>
        <Container>
          <KanbanBoard history={ history }/>
        </Container>
      </div>
    </Template>
  );
};

const Container = styled.div(...t`
  width: 100%;
  height: calc( 100% - 120px );
  padding: 0 36px;
  white-space: nowrap;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
`)

export default Kanban;
