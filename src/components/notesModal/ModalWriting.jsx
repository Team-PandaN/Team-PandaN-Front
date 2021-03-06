import React, { useState } from "react";

/* == Library - Style / Bootstrap / Icon */
import styled from "styled-components";
import { Form } from "react-bootstrap";

/* == Library - route */
import { useParams } from "react-router-dom";

/* == Custom - Component & Element & Icon */
import { ModalWrapper, FileUploader } from "..";
import { ReactComponent as Write } from "../../styles/images/ico-kanban-write.svg";
import { ReactComponent as Status } from "../../styles/images/ico-step.svg";
import { ReactComponent as Close } from "../../styles/images/ico-close.svg";
import { ReactComponent as Title } from "../../styles/images/ico-title.svg";
import { ReactComponent as Calendar } from "../../styles/images/ico-calender.svg";
import { ReactComponent as Note } from "../../styles/images/ico-note.svg";
import { ReactComponent as Link } from "../../styles/images/ico-link.svg";

/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { noteKanbanActions } from "../../modules/noteKanban";

// * == ( Note - modal - for writing note ) -------------------- * //
const ModalWriting = ({ history, projectStep, modalType, ...rest }) => {
  // -----------------------------------------------------------
  // * == hooks
  // -----------------------------------------------------------
  const dispatch = useDispatch();
  const { projectId } = useParams();
  // -----------------------------------------------------------
  // * == subscribe state
  // -----------------------------------------------------------
  const fileList = useSelector((state) => state.noteKanban?.filePreview);
  // -----------------------------------------------------------
  // * == subscribe state
  // -----------------------------------------------------------
  const [modalVisible, setModalVisible] = useState(false);
  const [noteInputs, setNoteInputs] = useState({
    title: "",
    content: "",
    deadline: "",
    step: projectStep ? projectStep : "",
    files: [],
  });

  // -----------------------------------------------------------
  // * == functions : handler
  // -----------------------------------------------------------
  // ?????? ?????? : ?????? ??? ????????? ??????
  // -----------------------------------------------------------
  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(noteKanbanActions.resetPreview()); // ?????? ???????????? reset
    setModalVisible(true);
  };
  // -----------------------------------------------------------
  // ?????? ?????? : ?????? ??? ????????? ??????
  // -----------------------------------------------------------
  const handleCloseModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = window.confirm("????????? ?????? ?????????????????????? ????????? ????????? ???????????? ????????????.");
    if (result) {
      setModalVisible(false);
    } else return;
  };

  // -----------------------------------------------------------
  // ?????? ?????? ?????? : ?????? ??? ?????? ?????? ??????
  // -----------------------------------------------------------
  const handleAddNote = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (noteInputs.title === "") {
      window.alert("????????? ???????????????.");
      return;
    }
    if (noteInputs.content === "") {
      window.alert("??? ?????? ?????? ????????? ???????????????.");
      return;
    }
    if (noteInputs.step === "") {
      window.alert("??? ?????? ????????? ???????????????.");
      return;
    }
    if (noteInputs.deadline === "") {
      window.alert("???????????? ???????????????.");
      return;
    }

    let blank_pattern = /^\s+|\s+$/g;
    if (noteInputs.title.replace( blank_pattern, "" ) === "" ||
      noteInputs.content.replace( blank_pattern, "" ) === "" ||
      noteInputs.step.replace( blank_pattern, "" ) === "" ||
      noteInputs.deadline.replace( blank_pattern, "" ) === "" ){
      window.alert("????????? ?????? ????????? ?????? ???????????????.");
      return;
    }

    // ?????? ?????? ?????? ?????? ?????? ???
    if (fileList.length > 5) {
      alert("?????? 5?????? ???????????? ????????? ??? ??? ????????????.");
      return;
    }

    // ?????? noteId, ?????? ?????? ????????? ?????? ?????? ??? ????????? ??????, ?????? ?????? ??????????????? ?????? ???????????? ??????
    dispatch(noteKanbanActions.__addNote(projectId, noteInputs));
    setModalVisible(false);
    setNoteInputs({
      title: "",
      content: "",
      deadline: "",
      step: projectStep,
      files: [],
    });
    history.push(`/projects/${projectId}/kanban`);
  };

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Button --------------------------------------------------------- */}
      {/* case1. props.projectStep --------------------------------------- */}
      {/* ?????? ????????? ????????? ?????? ?????? ?????? ' + ' ?????? -------------------------- */}
      {/* ---------------------------------------------------------------- */}
      {projectStep && (
        <KanbanColBtn onClick={handleOpenModal}>
          <Write type={projectStep} width="24" height="24" />
        </KanbanColBtn>
      )}
      {/* ---------------------------------------------------------------- */}
      {/* case2. props.modalType === "projectMenu" ----------------------- */}
      {/* ???????????? ???????????? ????????? ?????? ?????? ?????? ' ??? ??? ????????? ' ?????? ------------ */}
      {/* ---------------------------------------------------------------- */}
      {modalType === "projectMenu" && (
        <>
          <div className="dropdown">
            <button className="dropbtn-writing-modal" onClick={handleOpenModal}>
              <Write fill="#FFFFFF" width="14" height="14" style={{ marginRight: "4px", marginTop: "2px" }} />??? ??? ?????????
            </button>
          </div>
        </>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Modal ---------------------------------------------------------- */}
      {/* case. modalVisible === true && ????????? ?????? ----------------------- */}
      {/* ---------------------------------------------------------------- */}
      {modalVisible && (
        <ModalWrapper visible={true} maskClosable={false} onClose={handleCloseModal}>
          <div tabIndex="0" className="note-modal-wrapper">
            <div className="note-modal-container">
              <div className="note-modal-header">
                <div>
                  <Write width="24" height="24" fill="#191919" />
                  <h1>??? ??? ?????????</h1>
                </div>
                <Close width="24" height="24" fill="#191919" className="note-modal-closer" onClick={handleCloseModal} />
              </div>
              <div className="note-modal-table">
                <div className="note-modal-tr">
                  <div className="note-modal-th">
                    <Title width="24" height="24" fill="#767676" />
                    <Form.Label>?????? ??????</Form.Label>
                  </div>
                  <div className="note-modal-td">
                    <Form.Control
                      className="note-modal-form-width"
                      type="text"
                      placeholder="????????? ????????? ?????????. ?????? 255????????? ?????? ???????????????."
                      maxLength={255}
                      onChange={(e) => {
                        setNoteInputs({ ...noteInputs, title: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="note-modal-tr">
                  <div className="note-modal-th">
                    <Calendar width="24" height="24" fill="#767676" />
                    <Form.Label>????????? ??????</Form.Label>
                  </div>
                  <div className="note-modal-td">
                    <Form.Control
                      className="note-modal-form-width"
                      type="date"
                      placeholder=""
                      onChange={(e) => {
                        setNoteInputs({ ...noteInputs, deadline: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="note-modal-tr">
                  <div className="note-modal-th">
                    <Status width="24" height="24" fill="#767676" className="note-modal-irregular-button" />
                    <Form.Label>?????? ??????</Form.Label>
                  </div>
                  <div className="note-modal-td">
                    <Form.Select
                      className="note-modal-form-width"
                      placeholder=""
                      defaultValue={projectStep}
                      onChange={(e) => {
                        setNoteInputs({ ...noteInputs, step: e.target.value });
                      }}
                    >
                      <option value="">??? ?????? ????????? ???????????????.</option>
                      <option value="STORAGE">STORAGE</option>
                      <option value="TODO">TO DO</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="DONE">DONE</option>
                    </Form.Select>
                  </div>
                </div>
                <div className="note-modal-tr cell-file-upload">
                  <div className="note-modal-th cell-align-top">
                    <Link width="24" height="24" fill="#767676" />
                    <Form.Label>????????????</Form.Label>
                  </div>
                  <div className="note-modal-td cell-align-top">
                    <FileUploader />
                  </div>
                </div>
                <div className="note-modal-tr cell-align-top">
                  <div className="note-modal-th cell-align-top">
                    <Note width="24" height="24" fill="#767676" />
                    <Form.Label>??? ??? ??????</Form.Label>
                  </div>
                  <div className="note-modal-td">
                    <Form.Control
                      placeholder="??? ?????? ?????? ????????? ????????? ?????????."
                      as="textarea"
                      className="note-modal-textarea"
                      onChange={(e) => {
                        setNoteInputs({ ...noteInputs, content: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="note-modal-footer-button" onClick={handleAddNote}>
              <h1>??? ??? ?????????</h1>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

const KanbanColBtn = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ModalWriting;
