import React, { useState, useEffect } from "react";
/* == Library - style */
import styled from "styled-components";
import { t } from "../../util/remConverter";
import { Form, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { history } from "../../modules/configStore";
import { actionCreators as commentActions } from "../../modules/comment";

const CommentInput = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const noteId = props.match.params.noteId;

  const CreateComment = () => {
    if (comment === "") {
      window.alert("댓글을 입력해주세요!");
      return;
    }

    const Comment = {
      content: comment,
    };
    console.log(noteId, comment);
    dispatch(commentActions.__postComment(noteId, Comment));
  };

  const changeComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <div style={{ width: "90%", margin: "0px 10px", boxSizing: "borderBox" }}>
      <Comment>
        <CommentForm>
          <CommentTextArea type="text" placeholder="댓글을 입력하세요." value={comment} onChange={changeComment} />

          <CommentInner>
            <CommnetBtnSide>
              <CommentBtn
                variant="primary"
                type="summit"
                onClick={() => {
                  CreateComment();
                }}
              >
                저장
              </CommentBtn>
            </CommnetBtnSide>
          </CommentInner>
        </CommentForm>
      </Comment>
    </div>
  );
};
const Comment = styled.div`
  flex-shrink: 0;
  position: relative;
  min-height: 114px;
  margin-left: 6px;
  margin-right: 8px;
  margin-top: auto;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #d3d3d3;
  padding-bottom: 11px;
`;
const CommentForm = styled.div`
  width: 100%;
  margin-top: 14px;
  padding-left: 14px;
  padding-right: 14px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const CommentInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 13px;
  flex-basis: 100%;
`;
const CommentTextArea = styled.textarea`
  border: none;
  min-height: 40px;
  width: 100%;
  position: relative;
  outline: none;

  resize: none;
`;

const CommentBtn = styled.button`
  font-size: 12px;
  padding: 5px 10px;
  background-color: #387e4b;
  border-radius: 3px;
  color: #fff;
  align-content: space-between;
  float: right;
`;

const CommnetBtnSide = styled.div`
  width: 100%;
`;

export default CommentInput;
