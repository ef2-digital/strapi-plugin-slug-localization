import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: "slug-localization",
    plugin: "slug-localization",
    type: "string",
  });
};
