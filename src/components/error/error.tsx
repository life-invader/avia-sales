import './error.scss';

type ErrorType = {
  clickHandler?: () => void;
};

function Error({ clickHandler }: ErrorType) {
  return (
    <div className="error">
      <p className="error-msg">Упс, что-то пошло не так (</p>
      <button className="error-btn" type="button" onClick={clickHandler}>
        Попробовать еще раз
      </button>
    </div>
  );
}

export default Error;
