import { useMemo, useState } from "react";

import Header from "./components/Header.jsx";
import Homepage from "./components/Homepage.jsx";
import Introduction from "./components/Introduction.jsx";
import Card from "./components/Card.jsx";
import Section from "./components/Section.jsx";
import ModeToggle from "./components/ModeToggle.jsx";
import AddProfileForm from "./components/AddProfileForm.jsx";

import "./App.css";

import henryPhoto from "./assets/henry.jpeg";
import dogsPhoto from "./assets/dogs.jpeg";

export default function App() {
  // ✅ Cards are now STATE so new profiles can be added into the same grid
  const [cards, setCards] = useState([
    {
      id: "henry",
      title: "Me",
      description: "A photo of me for my Lab 3 About Me site.",
      image: henryPhoto,
    },
    {
      id: "dogs",
      title: "My Dogs",
      description: "A photo of my dogs.",
      image: dogsPhoto,
    },
  ]);

  // mode state
  const [mode, setMode] = useState("light");

  const [spinningId, setSpinningId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [filterTitle, setFilterTitle] = useState("All");
  const [searchText, setSearchText] = useState("");

  function handleCardClick(id) {
    setSpinningId(id);
    setTimeout(() => {
      setSpinningId(null);
      setSelectedId(id);
    }, 600);
  }

  function handleReset() {
    setFilterTitle("All");
    setSearchText("");
    setSelectedId(null);
  }

  // ✅ called when form submits successfully
  function handleAddCard(newCard) {
    setCards((prev) => [newCard, ...prev]);

    // optional: clear selection so the user sees the new card unselected
    setSelectedId(null);
  }

  const titleOptions = useMemo(() => {
    const uniqueTitles = Array.from(new Set(cards.map((c) => c.title)));
    return ["All", ...uniqueTitles.sort()];
  }, [cards]);

  const visibleCards = useMemo(() => {
    const q = searchText.trim().toLowerCase();

    return cards.filter((card) => {
      const matchesFilter = filterTitle === "All" || card.title === filterTitle;

      const matchesSearch =
        !q ||
        card.title.toLowerCase().includes(q) ||
        card.description.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [cards, filterTitle, searchText]);

  return (
    <div className={`page ${mode === "dark" ? "page--dark" : "page--light"}`}>
      <ModeToggle mode={mode} setMode={setMode} />
      <Header mode={mode} />

      <main className="content">
        <Homepage mode={mode} />
        <Introduction />

        {/* ✅ Add Profile form that adds directly into the cards list */}
        <Section id="add-profile" title="Add Profile">
          <AddProfileForm onAddCard={handleAddCard} />
        </Section>

        <Section id="cards" title="Cards">
          <div className="controls">
            <label className="control">
              Filter
              <select
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
              >
                {titleOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </label>

            <label className="control">
              Search
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </label>

            <button onClick={handleReset}>Reset</button>
          </div>

          <div className="cardGrid">
            {visibleCards.map((card) => (
              <Card
                key={card.id}
                {...card}
                isSelected={selectedId === card.id}
                isSpinning={spinningId === card.id}
                onClick={() => handleCardClick(card.id)}
                mode={mode}
              />
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}