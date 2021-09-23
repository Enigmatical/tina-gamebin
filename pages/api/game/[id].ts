import { parse } from "node-html-parser";
import { GENRES } from "../../../.tina/constants";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const response = await fetch(`https://howlongtobeat.com/game?id=${id}`);
    const html = await response.text();
    const document = parse(html);

    /**
     * Genre
     */
    const genresEl = Array.from(
      document.querySelectorAll("div.profile_info.medium")
    ).find((el) => RegExp(/^Genres:/).test(el.textContent.trim()));
    const genres = genresEl.textContent
      .replace(/(Genres:|\n|\r)/gm, "")
      .trim()
      .split(", ");
    const genre = GENRES.find((G) => genres.includes(G));

    /**
     * Date Released
     */
    const dateReleasedEl = Array.from(
      document.querySelectorAll("div.profile_info")
    ).find((el) => RegExp(/^NA:/).test(el.textContent.trim()));
    const dateReleased = dateReleasedEl.textContent.trim().replace("NA: ", "");

    /**
     * Average Playtime
     */
    const averagePlaytimeEl = document.querySelector(
      ".game_times ul li:nth-child(1) div"
    );
    const averagePlaytime = parseInt(averagePlaytimeEl.innerText);

    /**
     * Average Rating
     */
    const averageRatingEl = document.querySelector(
      ".game_chart:nth-child(1) > h5"
    );
    const averageRating = parseInt(averageRatingEl.innerText);

    /** Summary */
    const summaryEl = document.querySelector(".profile_info.large");
    const summary = `${summaryEl.innerHTML
      .trim()
      .replace(/<(.|\r|\n)*?>/g, "")
      .replace("...Read More", "")}`;

    /**
     * Learn More Link
     */
    const learnMoreLink = `https://howlongtobeat.com/game?id=${id}`;

    return res.status(200).json({
      id,
      dateReleased,
      averagePlaytime,
      averageRating,
      summary,
      learnMoreLink,
      genre,
    });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }
}
