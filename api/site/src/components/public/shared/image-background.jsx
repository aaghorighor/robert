import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* width: 100%; */
  background-image: url(${(props) => props.imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 2;
  width:100%;
  height:100%;
  position: relative;
`;

const ImageContainer = ({ imageUrl, children }) => (
  <Container imageUrl={imageUrl}>{children}</Container>
);

export default ImageContainer;
