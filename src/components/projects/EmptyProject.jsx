import React from "react";

import styled from "styled-components";

/* == Custom - Component */
import { ProjectModal } from "..";
import ProjectJoin from "../modals/ProjectJoin";

/* == Custom - Icon */
import PandaEmpty from "../../styles/images/Panda_EmptyProject.svg";
import PlanBetterStartEasier from "../../styles/images/PlanBetter_StartEasier.svg";
import { ReactComponent as IconGuide } from "../../styles/images/ico-guide.svg";

// * == (EmptyProject) -------------------- * //
import { useDispatch } from "react-redux";
import { actionCreators as projectActions } from "../../modules/project";
import { history } from "../../modules/configStore";

const EmptyProject = () => {
  const dispatch = useDispatch();
  const getGuideProject = () => {
    dispatch(projectActions.__getGuideProject());
  };
  return (
    <Background>
      <CenterWrap>
        <CenterBox>
          <PandaEmptyImg src={PandaEmpty} alt={PandaEmpty} />
          <PlanBetterStartEasierImg src={PlanBetterStartEasier} alt={PlanBetterStartEasier} />
          <CenterText>
            세상에서 제일 쉬운 협업툴 <span style={{ color: "#387E4B", fontWeight: "700" }}>PandaN</span>으로 프로젝트를 관리하세요!
          </CenterText>
          <CenterBtn>
            <ProjectJoin />
            <ProjectModal />
            <GuideBtn className="btn-main" onClick={getGuideProject}>
              <IconGuide />
              <span>가이드 프로젝트 참여</span>
            </GuideBtn>
          </CenterBtn>
        </CenterBox>
      </CenterWrap>
    </Background>
  );
};

const GuideBtn = styled.div`
  background-color: #d9e9d9;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  &:hover {
    background-color: #387e4b;
  }

  span {
    margin-left: 10px;
  }
`;

const Background = styled.div`
  width: 90vw;
  height: 90vh;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const CenterWrap = styled.div`
  display: flex;
  position: relative;
  width: 90%;
  height: 100%;
  margin-left: 0px;
  @media (max-width: 767px) {
    margin: auto;
  }
`;

const CenterBox = styled.div`
  display: block;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const PandaEmptyImg = styled.img`
  width: 454px;
  height: 336px;
  @media (max-width: 767px) {
    height: 70%;
  }
`;
const PlanBetterStartEasierImg = styled.img`
  margin: 20px 0px;
  width: 781px;
  height: 36px;
`;
const CenterBtn = styled.div`
  display: flex;
  margin: 50px auto;
  // width: 700px;

  @media (max-width: 767px) {
    flex-direction: column;
    max-width: 250px;
    max-height: 150px;
    margin: auto;
  }
`;
const CenterText = styled.div`
  color: #767676;
  font-weight: 500;
  font-size: 22px;
  line-height: 36px;
  display: flex;
  @media (max-width: 767px) {
    display: none;
  }
`;

export default EmptyProject;
