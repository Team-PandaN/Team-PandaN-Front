import { React, useState } from "react";

/* == Library - style */
import styled, { keyframes } from "styled-components";

/* == Library -  */
import ModalPortal from "../../util/ModalPotal";

/* == Custom - Icon */
import { ReactComponent as InviteLetter } from "../../styles/images/icon_InviteLetter.svg";
import { ReactComponent as CloseModal } from "../../styles/images/Icon_ModalClose.svg";

/* == Redux - actions */
import { actionCreators as projectActions } from "../../modules/project";
import { useDispatch } from "react-redux";
import { history } from "../../modules/configStore";

const ProjectJoin = (props) => {
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState(false);
  const [InviteCode, setInviteCode] = useState("");

  const inviteCode = { inviteCode: InviteCode };

  /* == function */
  const JoinProject = () => {
    if (InviteCode === "") {
      window.alert("초대 코드를 입력해주세요!");
      return;
    }
    dispatch(projectActions.__joinProject(inviteCode));
    setTimeout(() => {
      dispatch(projectActions.__setProject());
    }, 100);

    setModalState(false);
    history.push("/");
  };

  const changeInviteCode = (e) => {
    setInviteCode(e.target.value);
  };

  const modalFalse = () => {
    if (!(InviteCode === "")) {
      setModalState(true);
    } else {
      setModalState(false);
    }
  };
  return (
    <>
      {props.sidebar === "sidebar" ? (
        <ProjectInviteBtn onClick={() => setModalState(true)}>프로젝트 초대코드 등록</ProjectInviteBtn>
      ) : (
        <EmptyProjectBtn onClick={() => setModalState(true)} className="btn-main">
          <InviteLetter />
          <EmptyProjectText>프로젝트 초대 코드 등록</EmptyProjectText>
        </EmptyProjectBtn>
      )}

      <ModalPortal>
        {modalState ? (
          <Background>
            <Overlay onClick={modalFalse} />
            <Window>
              <ModalHead>
                <ModalHeadInner>
                  <InviteLetter />
                  <ModalTitle>초대코드를 등록 해주세요! </ModalTitle>
                </ModalHeadInner>

                <CloseModal style={{ cursor: "pointer", width: "15px", marginBottom: "4px" }} onClick={() => setModalState(false)} />
              </ModalHead>
              <ModalBody>
                <ModalBodyInner>
                  <P>받은 초대 코드 등록하기 </P>
                  <Input placeholder="초대코드를 입력해주세요!" onChange={changeInviteCode} />
                  <p style={{ fontSize: "14px", wordBreak: "keep-all" }}>
                    협업을 위해 받은 초대 코드를 등록하세요! <br></br>만약, 초대 코드가 없다면 코드를 생성하세요.
                  </p>
                </ModalBodyInner>
              </ModalBody>
              <ModalFooter onClick={JoinProject}>프로젝트 참여하기</ModalFooter>
            </Window>
          </Background>
        ) : (
          ""
        )}
      </ModalPortal>
    </>
  );
};
const fadeIn = keyframes`
from {
  opacity:0; }
to{
    opacity:1;
}
`;
const ProjectInviteBtn = styled.div`
  display: block;
  width: 100%;
  height: 48px;
  background: #387e4b;
  border-radius: 10px;
  margin: auto;
  padding: 12px 40px;
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 2rem;
  cursor: pointer;
  &:hover {
    background: #e1ede4;
    color: #387e4b;
  }
`;
const EmptyProjectBtn = styled.div`
  background: #f7e8bd;

  &:hover {
    color: #ffffff;
    background: #ffcd40;
  }
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const EmptyProjectText = styled.p`
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
  color: #191919;
  text-align: center;
  margin-left: 10px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Background = styled.div`
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
`;
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Window = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 430px;
  background: #ffffff;
  border-radius: 20px;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  @media (max-width: 768px) {
    max-width: 350px;
    max-height: 400px;
  }
`;

const ModalHead = styled.div`
  width: 85%;
  height: 20%;
  display: flex;
  flex-shrink: 0;
  align-items: flex-end;
  justify-content: space-between;
  margin: auto;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
const ModalHeadInner = styled.div`
  display: flex;
  line-height: 30px;
`;

const ModalTitle = styled.p`
  font-weight: 700;
  color: #000000;
  font-size: 22px;
  line-height: 30px;
  margin: 0 0 0 10px;
  @media (max-width: 768px) {
    font-size: 20px;
    margin: 0 10px 0 10px;
  }
`;

const ModalBody = styled.div`
  display: flex;
  height: 60%;
  width: 100%;
  margin: auto;
`;

const ModalBodyInner = styled.div`
  position: relative;
  width: 80%;
  box-sizing: border-box;
  margin: auto;
  padding-bottom: 10px;
  br {
    display: none;
  }
  @media (max-width: 768px) {
    br {
      display: block;
    }
  }
`;

const P = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #387e4b;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Input = styled.input`
  position: relative;
  width: 100%;
  height: 48px;
  margin: 20px auto;
  padding: 0px 10px;
  border-radius: 5px;
  border: 1px solid #ededed;
  color: #9a9a9a;
  font-size: 15px;
`;

const ModalFooter = styled.div`
  box-sizing: border-box;
  height: 20%;
  display: flex;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: auto;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  align-items: center;
  background: #387e4b;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: #e1ede4;
    color: #767676;
  }
`;

export default ProjectJoin;
