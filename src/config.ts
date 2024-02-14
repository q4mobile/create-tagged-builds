import * as core from "@actions/core";

export type Config = {
  TeamCityToken: string;
  TeamCityUri: string;
  TeamCityProject: string;
};

export const config: Config = {
  TeamCityUri:
    core.getInput("team_city_uri") ||
    "The TEAM_CITY_URI must be passed into the action",
  TeamCityToken:
    core.getInput("team_city_token") ||
    "The TEAM_CITY_TOKEN must be passed into the action",
  TeamCityProject:
    core.getInput("team_city_project") ||
    "The TEAM_CITY_PROJECT must be passed into the action",
};
// export const getConfig = (): Config => {
//   const TEAM_CITY_URI = core.getInput("team_city_uri");
//   if (TEAM_CITY_URI === "") {
//     console.error("The team_city_uri must be passed into the action.");
//   }
//   const TEAM_CITY_TOKEN = core.getInput("team_city_token");
//   if (TEAM_CITY_TOKEN === "") {
//     console.error("The TEAM_CITY_TOKEN must be passed into the action.");
//   }
//
//   const TEAM_CITY_PROJECT = core.getInput("team_city_project");
//   if (TEAM_CITY_PROJECT === "") {
//     console.error("The TEAM_CITY_PROJECT must be passed into the action.");
//   }
//
//   const config: Config = {
//     TeamCityUri: TEAM_CITY_URI,
//     TeamCityToken: TEAM_CITY_TOKEN,
//     TeamCityProject: TEAM_CITY_PROJECT,
//   };
//   return config;
// };
