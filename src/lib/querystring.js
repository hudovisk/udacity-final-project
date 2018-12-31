export default {
  encode: function(obj) {
    const keys = Object.keys(obj);
    return keys.reduce((qs, key, index) => {
      const value = encodeURI(obj[key]);
      qs += `${key}=${value}`;
      
      if (index < keys.length - 1) {
        qs += "&";
      }

      return qs;
    }, "?")
  }
}