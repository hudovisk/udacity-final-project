import React from "react";

export default function WikipediaSection({ nearbyWikipediaPages }) {
  if (!nearbyWikipediaPages) {
    return null;
  }

  return (
    <section className="place-details__wikipedia">
      <h2>Nearby Wikipedia pages:</h2>

      {nearbyWikipediaPages.length === 0 ? (
        "No pages nearby"
      ) : (
        <ul>
          {nearbyWikipediaPages.map(page => (
            <li key={page.pageid}>
              <a title={page.title} href={`http://en.wikipedia.org/?curid=${page.pageid}`}>
                {page.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
