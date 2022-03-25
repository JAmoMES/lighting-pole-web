import { fetch } from ".";

export function getPmStatus(poleId) {
  return fetch("GET", `pm/${poleId}`);
}
