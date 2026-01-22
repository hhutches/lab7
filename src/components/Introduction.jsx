export default function Introduction() {
  const name = "Henry Hutcheson";
  const bio =
    "This is my website for Purdue to work on my React skills. ";
  const email = "hhutches@purdue.brightspace.com";

  const showContact = true;

  return (
    <section id="intro" className="intro">
      <h2>Introduction</h2>

      <p>
        Hey! I’m <strong>{name}</strong>. {bio}
      </p>

      {showContact && (
        <p>
          Contact: <a href={`mailto:${email}`}>{email}</a>
        </p>
      )}
    </section>
  );
}