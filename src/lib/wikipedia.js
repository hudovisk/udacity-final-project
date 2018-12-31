import querystring from "./querystring";

const defaultOptions = {
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json"
  }
}

export async function getNearbyPages(lat, lng) {
  const gscoord = `${lat}|${lng}`;
  const qs = querystring.encode({
    action: "query",
    list: "geosearch",
    gscoord,
    gsradius: 1000,
    gslimit: 5,
    origin: "*",
    format: "json"
  });
  const response = await fetch("https://en.wikipedia.org/w/api.php"+qs, defaultOptions);
  return response.json();
}
