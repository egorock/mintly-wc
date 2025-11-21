// Polyfill for Buffer in browser
window.Buffer = window.Buffer || require("buffer").Buffer;

// Polyfill crypto.getRandomValues in some webviews
if (!window.crypto || !window.crypto.getRandomValues) {
  window.crypto = {
    getRandomValues: function (arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    }
  };
}
