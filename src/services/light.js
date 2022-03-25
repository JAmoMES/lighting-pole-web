import { fetch } from ".";

export function getAllPoleData() {
  return fetch("GET", "light");
}
export function getPoleDataById(poleId) {
  return fetch("GET", `light/${poleId}`);
}

export function createPole(body) {
  return fetch("POST", "light", body);
}

export function updatePoleById(poleId, body) {
  return fetch("PATCH", `light/pole/${poleId}`, body);
}

export function deletePole(poleId) {
  return fetch("DELETE", `light/pole/${poleId}`);
}

export function updateLightStatusByAdmin(poleId) {
  return fetch("PATCH", `light/toggle/${poleId}`);
}
