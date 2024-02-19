import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants/index";

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const removeDuplicateObjectsFromArray = (list) => {
  const listSet = new Set();
  return list.filter((item) => {
    if (listSet.has(item._id)) {
      return false;
    }
    listSet.add(item._id);
    return true;
  });
};
