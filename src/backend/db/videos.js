import { v4 as uuid } from "uuid";
/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */

export const videos = [
  {
    _id: uuid(),
    title: "Dr.Strange teaser Trailer",
    channelName: "Marvel Entertainment",
    categoryName: "movie",
    videoPath: "https://www.youtube.com/embed/UNnKAk79wws",
    type : "video/mp4",
    description:
      "The fate of the Multiverse awaits. Tickets for Marvel Studios’ Doctor Strange in the Multiverse of Madness go on sale April 6. Experience it only in theaters May 6."
  },

  {
    _id: uuid(),
    title: `Marvel Studios Moon Knight | Official Trailer | Disney+`,
    channelName: "Marvel Entertainment",
    categoryName: "ott",
    videoPath: "https://www.youtube.com/embed/x7Krla_UxRg",
    type : "video/mp4",
    description:
      "Welcome to chaos 🌙 Watch the new trailer for Marvel Studios Moon Knight and start streaming the Original series March 30 on Disney+"
   },
   
  {
    _id: uuid(),
    title: `Black Holes | National Geographic`,
    channelName: "Nat Geo",
    categoryName: "documentary",
    videoPath: "https://www.youtube.com/embed/kOEDG3j1bjs",
    type : "video/mp4",
    description:
    "At the center of our galaxy, a supermassive black hole churns. Learn about the types of black holes, how they form, and how scientists discovered these invisible, yet extraordinary objects in our universe."
   }
   ,
   {
    _id: uuid(),
    title: `Tekken | Bloodlines`,
    channelName: "Netflix",
    categoryName: "anime",
    videoPath: "https://www.youtube.com/embed/WTc2xXcJFwU",
    type : "video/mp4",
    description:
    `"Power is everything." Jin Kazama learned the family self-defense arts, Kazama-Style Traditional Martial Arts, from his mother at an early age. Even so, he was powerless when a monstrous evil suddenly appeared, destroying everything dear to him, changing his life forever.`
   }
];
