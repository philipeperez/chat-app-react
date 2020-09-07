import emojiList from "./emojis.json";
import {
  faCat,
  faSmile,
  faHamburger,
  faFutbol,
  faPlane,
  faLightbulb,
  faHashtag,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

export const categories = [
  {
    name: "Smileys & People",
    icon: faSmile,
  },
  {
    name: "Animals & Nature",
    icon: faCat,
  },
  {
    name: "Food & Drink",
    icon: faHamburger,
  },
  {
    name: "Travel & Places",
    icon: faPlane,
  },
  {
    name: "Activities",
    icon: faFutbol,
  },
  {
    name: "Objects",
    icon: faLightbulb,
  },
  {
    name: "Symbols",
    icon: faHashtag,
  },
  {
    name: "Flags",
    icon: faFlag,
  },
];

export const getEmojisByCategory = (category: string) =>
  emojiList.filter((emoji) => emoji.group === category);
