const API_KEY = "AIzaSyCoHhq-078QaLuiSUWMyBhT-DbXhHLHjwA";
const CALLBACK_NAME = "gmapsCallback";
let initialized = !!window.google;
let resolveInitPromise;
let rejectInitPromise;

const iniitPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve;
  rejectInitPromise = reject;
});

export default function init() {
  if (initialized) return iniitPromise;
  initialized = true;
  window[CALLBACK_NAME] = () => resolveInitPromise(window.google);
  //
  //
  //

  const script = document.createElement("script");
  script.async = true;
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=" +
    API_KEY +
    "&callback=" +
    CALLBACK_NAME +
    "&libraries=places";
  script.onerror = rejectInitPromise;
  document.querySelector("head").appendChild(script);

  return iniitPromise;
}
