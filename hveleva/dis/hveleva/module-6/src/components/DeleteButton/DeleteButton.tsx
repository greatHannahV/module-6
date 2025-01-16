import { AiFillDelete } from "react-icons/ai";
import { Meta } from "../../services/StockServices.types";
import { ButtonStyle } from "./DeleteButton.styles";
import { useBookmarks } from "../../hooks/useBookmarks";

type DeleteButtonProps = {
  stock: Meta;
};

function DeleteButton({ stock }: DeleteButtonProps) {
  const { removeBookmark } = useBookmarks();

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    stock: Meta
  ) => {
    event.stopPropagation();
    removeBookmark(stock);
  };

  return (
    <ButtonStyle
      aria-label="Delete item"
      role="button"
      onClick={(e) => handleDeleteClick(e, stock)}
      data-testid="delete-button-container"
    >
      <AiFillDelete />
    </ButtonStyle>
  );
}

export default DeleteButton;
