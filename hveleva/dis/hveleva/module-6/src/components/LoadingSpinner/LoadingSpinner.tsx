import { Watch } from "react-loader-spinner";
import { StyledLoading } from "./LoadingSpinner.styles";
function LoadingSpinner() {
  return (
    <StyledLoading>
      <Watch
        visible={true}
        height="40"
        width="40"
        radius="30"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </StyledLoading>
  );
}

export default LoadingSpinner;
