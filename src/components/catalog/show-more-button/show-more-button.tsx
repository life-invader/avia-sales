import { TICKETS_SHOW_AMOUNT } from '../../../constants/constants';
import { ShowMoreButtonType } from './types';
import './show-more-button.scss';

function ShowMoreButton({
  isError,
  isLoading,
  showMoreClickHandler,
  remainingTickets,
}: ShowMoreButtonType) {
  const textContent =
    remainingTickets < TICKETS_SHOW_AMOUNT
      ? remainingTickets
      : TICKETS_SHOW_AMOUNT;

  if (isError) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  if (remainingTickets === 0) {
    return null;
  }

  return (
    <button
      className="more-button"
      type="button"
      onClick={showMoreClickHandler}
    >
      Показать еще {textContent} билетов
    </button>
  );
}

export default ShowMoreButton;
