import React from "react";
import Header from "components/Header";
import Icon from "components/Icon";
import RoundButton from "components/RoundButton";
import "./RulesLayout.css";

const RulesLayout = ({ returnToMenu }) => {
  return (
    <div className="RulesLayout">
      <Header
        fixed
        leftButton={
          <RoundButton small ghost {...returnToMenu}>
            <Icon name="Back" />
          </RoundButton>
        }
      >
        <h1>Rules</h1>
      </Header>
      <div className="RulesLayout-textContainer">
        <p>
          <i>
            The goal is to get your teammates to guess the word you are
            describing, but there’s a list of words you can’t say.
          </i>
        </p>
        <p>
          If your explanation was good enough to the correct guess, congrats!
          You made a hit — swipe a card to the right, and you will get another
          card. If you can't explain this word now or struggling with some
          troubles while explaining — swipe left to skip the card. If you say
          any taboo words while explaining — you made a buzz — push the red
          button with the cross, and you will probably get a new card.
        </p>
        <p>
          When your set of cards or round time ends, you will see your team's
          efficiency in the round. A team who do better results wins.
        </p>

        <h2>Game Modes</h2>
        <p>
          Here are two competitive game modes — Time attack, Set of cards, and
          Free play for practice.
        </p>
        <p>
          Time attack — means do as many as possible hits in a limited amount of
          time.
        </p>
        <p>
          Set of cards — means you get a fixed number of cards and have to
          explain it as quickly as possible.
        </p>

        <h2>Quick start</h2>
        <ol>
          <li>Select the mode of the game</li>
          <li>Divide your group into teams</li>
          <li>Start the game</li>
          <li>Do your best</li>
        </ol>

        <div className="contribute">
          <div>
            <img src="/images/help.jpg" alt="Help" />
          </div>
          <h3>Want to contribute?</h3>
          <p>
            Hi there! I need some help with dictionaries, spellchecking, code
            review, and getting Service Workers to work and make the game less
            online-ish.
          </p>
          <p>
            If you want to share your feedback, suggest a feature, or have
            little time and want to help, write to me at:
          </p>

          <ul>
            <li>
              Telegram:{" "}
              <a href="https://t.me/litvinovich_alexander">
                @litvinovich_alexander
              </a>
            </li>
            <li>
              Email:{" "}
              <a href="mailto:litvinovich.alexander@gmail.com">
                litvinovich.alexander@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RulesLayout;
