import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
{ 
  id: uuid(),
  categoryName: "Documentary",
  description:
    "Computer programming is the process of designing and building an executable computer program to accomplish a specific computing",
  },
{
  _id: uuid(),
  categoryName: "Movie",
  description:
    "Front-end web development, also known as client-side development is the practice of producing HTML, CSS and JavaScript for a website or Web Application",
  },
{
  _id: uuid(),
  categoryName: "Anime",
  description:
    "Backend Development is also known as server-side development. It is everything that the users don't see and contains behind-the-scenes activities that occur when performing any action on a website.",
  },
{   
  _id: uuid(),
  categoryName: "Education",
  description:
  "Computer programming is the process of designing and building an executable computer program to accomplish a specific computing",
  },
{
  _id: uuid(),
  categoryName: "Music",
  description:
  "Front-end web development, also known as client-side development is the practice of producing HTML, CSS and JavaScript for a website or Web Application",
  },
{
  _id: uuid(),
  categoryName: "News",
  description:
  "Backend Development is also known as server-side development. It is everything that the users don't see and contains behind-the-scenes activities that occur when performing any action on a website.",
  },
{ 
  id: uuid(),
  categoryName: "OTT",
  description:
  "Computer programming is the process of designing and building an executable computer program to accomplish a specific computing",
  },

];
