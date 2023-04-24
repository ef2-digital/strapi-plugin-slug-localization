import pluginId from "./pluginId";
import PluginIcon from "./components/PluginIcon";

export default {
  register(app: any) {
    app.customFields.register({
      name: "slug-localization",
      pluginId: "slug-localization",
      type: "string",
      intlLabel: {
        id: "slug-localization.text.label",
        defaultMessage: "Slug localization",
      },
      intlDescription: {
        id: "slug-localization.text.description",
        defaultMessage: "Unique slug localization based on locale",
      },
      icon: PluginIcon,
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ "./components/Input"
          ),
      },
      options: {},
    });
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: data,
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
