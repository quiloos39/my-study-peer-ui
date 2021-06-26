import queryString from "query-string";
import isBrowser from "./is_browser";

function getSearchParameters() {
  if (isBrowser) {
    return queryString.parse(window.location.search);
  }
  return {};
}

export default getSearchParameters;
