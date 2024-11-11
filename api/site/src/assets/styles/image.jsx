import styled from 'styled-components';

export const Image = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url(${({ url }) => url});
  z-index: -1;
  top: 0;
  background-repeat: no-repeat;
`;
