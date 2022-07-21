export const RulesPage = () => {
  return (
    <div className="rules-container">
      <h1>Rules</h1>
      <div className="rules-section">
        <h2>What is bidbybid?</h2>
        <p>
          You are the cultural elite, the quintessential bon vivants, the true
          icons of the age. The competition is fierce amidst highborn and
          nouveau riche to assert your status and earn prestige in the eyes of
          your peers.
        </p>

        <p>
          Show off your exquisite palette and excellent tastes, but don't be
          caught penniless or be cast out as an impostor! Fashion is fickle but
          style is forever. Show them what it really means to be a member of{" "}
          <strong>bidbybid</strong>.
        </p>
      </div>

      <div className="rules-section">
        <h2>Objective of the game</h2>
        <p>
          Gain the most points by bidding on luxury goods. But beware, if you
          are the poorest player by the end of the game you have no chance of
          being a member of the High Society (aka YOU LOSE)
        </p>
      </div>

      <div className="rules-section">
        <h2>Setup</h2>
        <ul className="rules-list">
          <li>Each player is handed a set of eleven money cards</li>
          <li>The game has a deck of 11 status cards that will be shuffled</li>
          <li>
            A random player will start by revealing the first card of the deck
          </li>
        </ul>
      </div>

      <div className="rules-section">
        <h2>Objective of the game</h2>
        <p>
          Gain the most points by bidding on luxury goods. But beware, if you
          are the poorest player by the end of the game you have no chance of
          being a member of the High Society (aka YOU LOSE)
        </p>
      </div>

      <div className="rules-section">
        <h2>Bidding</h2>
        <p>
          At the start of each round, a new status card of the deck will be
          revealed. The starting player must either bid or pass. To bid you must
          play one or more money cards, the total of these cards will be your
          bid.
        </p>

        <p>
          <strong>
            If you have already placed a bid this round, you can only increase
            your bid by adding new cards to the ones you already used.
          </strong>
        </p>

        <p>
          You cannot pick up card you have already played. You can only bid if
          your new total is higher than the previous bid made this round.
        </p>
      </div>

      <div className="rules-section">
        <h2>Passing</h2>
        <p>
          If you don’t want to bid, you may pass instead. If you have already
          bid this round, all your money cards will be returned to your hand.
          You may no longer bid this round. When a player has either bid or
          passed, the turn moves on to the next player. The last remaining
          player after everyone else has passed wins the auction! The winner of
          the auction becomes the starting player for the new round and reveals
          the next status card from the deck.
        </p>
      </div>

      <div className="rules-section">
        <h2>Disgrace!</h2>
        <p>
          If the revealed status card is a disgrace card, the auction works
          slightly differently. This time you are bidding to avoid taking the
          card, and{" "}
          <strong>the round will end as soon as any one player passes.</strong>{" "}
          That player picks up their money cards as usual, but must take the
          disgrace card. All other players hand in their money cards. The
          passing player starts the next round.
        </p>
      </div>

      <div className="rules-section">
        <h2>End of the game</h2>
        <p>
          Four cards in the status deck have a dark green background - the three
          prestige cards and the Scandale card.
        </p>

        <p>
          <strong>
            As soon as the fourth one is revealed, the game ends immediately,
            with no bidding for the revealed card.
          </strong>
        </p>

        <p>
          The player that has the least amount of money by the end of the game
          cannot win. The player with highest status (i.e. points) wins!
        </p>
      </div>
    </div>
  );
};
