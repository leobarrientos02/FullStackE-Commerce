import styled from "styled-components";

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
  // Auto-fit lets the elements auto resise, minimuim of 20rem and max 1fr
`;
