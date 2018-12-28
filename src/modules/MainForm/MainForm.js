import React from "react";

import AutoCompleteInput from "./AutoCompleteInput";

import "./MainForm.css";

const MainForm = () => {
  const handlePlaceChanged = (place) => {
    console.log(place);
  }

  return (
    <form className="main-form" onSubmit={e => e.preventDefault()}>
      <AutoCompleteInput
        className="main-form__place-input"
        placeholder="search places with autocomplete!"
        onPlaceChanged={handlePlaceChanged}
      />
      <button className="main-form__submit fas fa-search" type="submit" />
    </form>
  );
};

export default MainForm;
