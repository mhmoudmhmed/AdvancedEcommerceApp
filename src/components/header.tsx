import React from "react";
import styled from "styled-components/native";

const Header = ({ title }: { title: string }) => {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
