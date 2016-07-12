(() => {
  const script = document.createElement('script');
  document.body.appendChild(script);
  script.src = 'https://gifs.bjacobel.com/uploader.js';
  script.onload = () => {
    window.uploadGif();
  };
})();
