const libraries = ["places"];

let googleLoader;

export function init() {
  if (!googleLoader) {
    googleLoader = new Promise(resolve => {
      window._initMap = () => resolve(window.google);

      const tag = document.createElement("script");
      tag.src = `https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_MAPS_API_KEY
      }&libraries=${libraries.join(",")}&callback=_initMap`;
      tag.defer = true;
      tag.async = true;
      document.body.appendChild(tag);
    });
  }

  return googleLoader;
}
