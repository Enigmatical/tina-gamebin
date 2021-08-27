import { defineSchema } from "@tinacms/cli";

const MEDIUMS = ["Digital", "Emulation", "Physical"];

const PLATFORMS = [
  "Android, Google Play",
  "Nintendo 3DS",
  "Nintendo Advance",
  "Nintendo Switch",
  "Nintendo Wii",
  "Nintendo Wii U",
  "PC",
  "PC, EA Origin",
  "PC, Epic",
  "PC, Prime Gaming",
  "PC, Steam",
  "PC, Uplay",
  "PC, Xbox Game Pass",
  "Playstation 2",
  "Playstation 3",
  "Playstation 4",
  "Playstation Vita",
  "Playstation VR",
  "Xbox 360",
];

const GENRES = [
  "Action",
  "Adventure",
  "Platformer",
  "Puzzle",
  "Role-Playing",
  "Shooter",
  "Stealth",
  "Strategy",
];

const STATUS = ["Backlog", "Playing", "Finished"];

const INTEREST = ["Strong", "Weak"];

const STARS = ["1", "2", "3", "4", "5"];

export default defineSchema({
  collections: [
    {
      name: "game",
      label: "Games",
      path: "content/games",
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name",
        },
        {
          type: "string",
          name: "deck",
          label: "Deck",
          isBody: true,
          ui: {
            component: "textarea",
          },
        },
        {
          name: "status",
          label: "Status",
          type: "string",
          options: [...STATUS],
        },
        {
          type: "object",
          name: "meta",
          label: "Meta",
          fields: [
            {
              name: "genre",
              label: "Genre",
              type: "string",
              options: [...GENRES],
            },
            {
              name: "platform",
              label: "Platform",
              type: "string",
              options: [...PLATFORMS],
            },
            {
              name: "medium",
              label: "Medium",
              type: "string",
              options: [...MEDIUMS],
            },
          ],
        },
        {
          type: "object",
          name: "sections",
          label: "Sections",
          list: true,
          templates: [
            {
              name: "details",
              label: "Details",
              fields: [
                {
                  name: "dateReleased",
                  label: "Released On",
                  type: "datetime",
                  ui: {
                    dateFormat: "MMM D, YYYY",
                  },
                },
                {
                  name: "averageRating",
                  label: "Avg Rating (out of 100)",
                  type: "string",
                },
                {
                  name: "averagePlaytime",
                  label: "Avg Playtime (in hours)",
                  type: "string",
                },
                {
                  name: "content",
                  label: "Content",
                  type: "string",
                  ui: {
                    component: "textarea",
                  },
                },
                {
                  name: "learnMoreLink",
                  label: "Learn More Link",
                  type: "string",
                },
              ],
            },
            {
              name: "backlog",
              label: "Backlog",
              fields: [
                {
                  name: "interest",
                  label: "Interest",
                  type: "string",
                  options: [...INTEREST],
                },
                {
                  name: "content",
                  label: "Content",
                  type: "string",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
            {
              name: "review",
              label: "Review",
              fields: [
                {
                  name: "dateFinished",
                  label: "Finished On",
                  type: "datetime",
                  ui: {
                    dateFormat: "MMM D, YYYY",
                  },
                },
                {
                  name: "stars",
                  label: "My Stars",
                  type: "string",
                  options: [...STARS],
                },
                {
                  name: "playtime",
                  label: "My Playtime (in hours)",
                  type: "string",
                },
                {
                  name: "content",
                  label: "Content",
                  type: "string",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
          ],
        },

        {
          type: "image",
          name: "boxart",
          label: "Boxart",
        },
      ],
    },
  ],
});