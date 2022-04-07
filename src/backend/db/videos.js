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
    title: `Moon Knight | Official Trailer | Disney+`,
    channelName: "Marvel Entertainment",
    categoryName: "ott",
    videoPath: "https://www.youtube.com/embed/x7Krla_UxRg",
    type : "video/mp4",
    description:
      "Welcome to chaos 🌙 Watch the new trailer for Marvel Studios Moon Knight and start streaming the Original series March 30 on Disney+"
   },

   {
    _id: uuid(),
    title: `Lost treasures of Egypt`,
    channelName: "National Geographic",
    categoryName: "documentary",
    videoPath: "https://www.youtube.com/embed/FNfgdk2CU4Y",
    type : "video/mp4",
    description:
      "Dr. Basem Gehad and his team discover the remains of a burial portrait in a catacomb in the deserts of Philadelphia, Egypt."
   },

   {
    _id: uuid(),
    title: `Volcanoes 101`,
    channelName: "National Geographic",
    categoryName: "documentary",
    videoPath: "https://www.youtube.com/embed/VNGUdObDoLk",
    type : "video/mp4",
    description:
      "About 1,500 active volcanoes can be found around the world. Learn about the major types of volcanoes, the geological process behind eruptions, and where the most destructive volcanic eruption ever witnessed occurred."
   },

   {
    _id: uuid(),
    title: `No Vacancy (Lyric Video)`,
    channelName: "One Republic",
    categoryName: "music",
    videoPath: "https://www.youtube.com/embed/qXiuVQ-GgA4",
    type : "video/mp4",
    description:
      `Stream & Download OneRepublic latest album Human`
   } , 

   {
    _id: uuid(),
    title: `Post Malone Swae Lee - SunFlower`,
    channelName: "Post Malone",
    categoryName: "music",
    videoPath: "https://www.youtube.com/embed/ApXoWvfEYVU",
    type : "video/mp4",
    description:
      `Stream & Download Post Malone latest songs`
   }
];


