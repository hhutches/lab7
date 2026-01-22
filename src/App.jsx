import { useState } from "react";

import Header from "./components/Header.jsx";
import Homepage from "./components/Homepage.jsx";
import Introduction from "./components/Introduction.jsx";
import "./App.css";

import henryPhoto from "./assets/henry.jpeg";
import dogsPhoto from "./assets/dogs.jpeg";

export default function App() {
  const cards = [
    {
      id: "henry",
      title: "Me",
      description: "A photo of me for my Lab 3 About Me site.",
      image: henryPhoto,
      featured: true,
    },
    {
      id: "dogs",
      title: "My Dogs",
      description: "A photo of my dogs.",
      image: dogsPhoto,
      featured: false,
    },
  ];

  const [spinningId, setSpinningId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  function handleCardClick(id) {
    // start spin
    setSpinningId(id);

    // after spin ends, apply selection outline
    window.setTimeout(() => {
      setSpinningId(null);
      setSelectedId(id);
    }, 600); // must match CSS animation duration
  }

  return (
    <div className="page">
      <Header />

      <main className="content">
        <Homepage />
        <Introduction />

        <section id="cards" className="cardsSection">
          <h2>Cards</h2>

          <div className="cardGrid">
            {cards.map((card) => {
              const isSelected = selectedId === card.id;
              const isSpinning = spinningId === card.id;

              return (
                <article
                  key={card.id}
                  className={[
                    "card",
                    card.featured ? "card--featured" : "",
                    isSpinning ? "card--spin" : "",
                    isSelected ? "card--selected" : "",
                  ].join(" ")}
                  onClick={() => handleCardClick(card.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleCardClick(card.id);
                  }}
                >
                  <img className="cardImg" src={card.image} alt={card.title} />
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}