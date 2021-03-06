import React from "react";

/* == Custom - elements */
import { ReactComponent as Storage } from "../../styles/images/icon-status-todolist.svg";
import { ReactComponent as IconBookMark } from "../../styles/images/ico-bookmark.svg";

/* == Custom - Component */
import { IssueCard } from "..";

// * == ( IssueList / Note ) -------------------- * //
const IssueList = ({ history, notes, type, projectId, ...rest }) => {
  /* 
  - 상위 페이지 : Bookmark, MyNote, ProjectIssue, ProjectMyNote
  - 상위 페이지에서 넘겨받은 notes의 각 노트 해당 속성값을 issue card에 props로 넣어줍니다.  
  - 상위 페이지가 "pages/notes/Bookmark" 일 경우 type="bookmark"를 issue card 내부로 전달해야 합니다.
    이 속성을 주어야 북마크 페이지 내에서 북마크 아이콘이 출력됩니다.
  */

  return (
    <>
      <div className="table-responsive">
        <p style={{ fontWeight: "500" }}>
          {type === "bookmark" && "북마크 "}
          {type === "myNote" && "내가 작성한 문서 "}
          {type === "projectIssue" && `[${rest.projectTitle}]의 문서 `}
          {type === "projectMyNote" && `[${rest.projectTitle}]에 내가 작성한 문서 `}총
          <span style={{ color: "#387E4B", fontWeight: "700", fontSize: "16px", margin: "0px 4px" }}>{rest.totalElements}</span>개
        </p>
        <table className="table note-issue-table">
          <colgroup className="note-issue-colgroup">
            <col width="7%" />
            <col width="7%" />
            <col />
            <col />
            <col width="20%" />
            <col width="20%" />
            <col width="5%" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <Storage fill="#767676" width="20" height="20" />
              </th>
              <th>NO.</th>
              <th>제목</th>
              <th>{type === "bookmark" || type === "myNote" ? "프로젝트" : ""}</th>
              <th>{type === "bookmark" ? "작성자" : "마지막 수정"}</th>
              <th>상태</th>
              <th>{type === "bookmark" ? <IconBookMark width="24px" height="24px" fill="#767676" /> : ""}</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => {
              return (
                <tr key={index}>
                  <IssueCard
                    history={history}
                    index={index}
                    projectId={note.projectId ? note.projectId : projectId}
                    projectTitle={note.projectTitle}
                    noteId={note.noteId}
                    title={note.title}
                    content={note.content}
                    writer={note.writer}
                    deadline={note.deadline}
                    createdAt={note.createdAt}
                    step={note.step}
                    type={type}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default IssueList;
