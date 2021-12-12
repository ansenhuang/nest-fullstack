import React from 'react';
import styled from 'styled-components';
import { Spin, SpinProps } from 'antd';

const SpinWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export interface LoadingProps extends SpinProps {}

export const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <SpinWrapper>
      <Spin {...props} />
    </SpinWrapper>
  );
};
