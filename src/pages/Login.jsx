import React from 'react';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';
/* elements */
import { Button } from '../elements';
import { useDispatch } from 'react-redux';


const Login = ({ history }) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Container>
        <h1>PandaN</h1>
        <h1>🐼</h1>
        <h3>세상에서 제일 쉬운 협업툴 <br />PandaN을 만나보세요!</h3>
        <form>
          <Button>
            '카카오'로 시작하기
          </Button>
        </form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  text-align: center;
`;

export default Login;
