import henryPhoto from "../assets/henry.jpeg";

export default function Card() {
  // hard-coded content inside the component (no props)
  const title = "Me";
  const bio = "A photo of me";
  const featured = true;

  const cardClass = `card ${featured ? "card--featured" : ""}`;

  return (
    <article className={cardClass}>
      <img className="cardImg" src={henryPhoto} alt="Photo of Henry" />
      <h3>{title}</h3>
      <p>{bio}</p>
    </article>
  );
}