import React from "react";

import Rating from "../Rating";

export default function RatingSection({ rating }) {
  if (rating === undefined) {
    return null;
  }

  return (
    <section className="place-details__rating">
      <Rating rate={rating} /> ({rating})
    </section>
  );
}
