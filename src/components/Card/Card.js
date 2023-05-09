import React from "react";
import Swipeable from "react-swipy";
import classNames from "classnames";
import "./Card.css";

const SwipeableContainer = (props) => {
  const { cardIndex, children } = props;
  if (cardIndex === 1) return <Swipeable {...props} />;
  return <>{children}</>;
};

let swipeDirection;

const onSwipe = (direction) => {
  swipeDirection = direction;
};

function Card(props) {
  const {
    currentCard,
    cardSet,
    word,
    tabooWords,
    category,
    setForceSwipe,

    gameMode,
    freePlay,
    cardIndex,
    isCardBack,
    isLoading,
    
    onSwipeStart,
    onSwipeLeft,
    onSwipeRight,
  } = props;

  const onAfterSwipe = () => {
    if (isCardBack) {
      onSwipeStart();
    } else {
      if (swipeDirection === "left") onSwipeLeft();
      if (swipeDirection === "right") onSwipeRight();
    }
    swipeDirection = null;
  };

  if (isCardBack)
    return (
      <SwipeableContainer
        isLoading={isLoading}
        cardIndex={cardIndex}
        onSwipe={onSwipe}
        onAfterSwipe={onAfterSwipe}
      >
        <div className={classNames("CardBack", `is-layer${cardIndex}`)}>
          <div className="CardBack-inner">
            <div className="CardBack-pattern">
              <h2 className="CardBack-title">Swipe to&nbsp;start!</h2>
              <label className="CardBack-subTitle">
                or tap the button below
              </label>
            </div>
          </div>
        </div>
      </SwipeableContainer>
    );

  return (
    <SwipeableContainer
      isLoading={isLoading}
      cardIndex={cardIndex}
      onSwipe={onSwipe}
      onAfterSwipe={onAfterSwipe}
      buttons={({ left, right }) => {
        // Dirty hack to drill up forceSwipe func to container
        setForceSwipe(left, false);
        setForceSwipe(right, true);
      }}
    >
      {!isCardBack && (
        <div className={classNames("Card", `is-layer${cardIndex}`)}>
          <div className="Card_inner">
            {!gameMode && !freePlay && (
              <div className="Card_number">
                {currentCard} of {cardSet}
              </div>
            )}

            <div className="Card_title">
              <label className="Card_title_category">{category}</label>
              <h2 className="Card_title_word">{word}</h2>
            </div>

            <div className="Cards_tabooWords">
              <label className="Cards_tabooWords_title">taboo words:</label>
              {tabooWords.map((tabooWord, i) => (
                <div className="Cards_tabooWords_word" key={i}>
                  {tabooWord}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </SwipeableContainer>
  );
}

export default Card;
