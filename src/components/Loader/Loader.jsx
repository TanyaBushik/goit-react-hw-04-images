import { RotatingLines } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderContainer>
      <RotatingLines
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </LoaderContainer>
  );
};
