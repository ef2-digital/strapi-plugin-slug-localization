//@ts-nocheck
import { Strapi } from "@strapi/strapi";
const { ValidationError } = require("@strapi/utils").errors;

export default ({ strapi }: { strapi: Strapi }) => {
  let models = [];
  Object.entries(strapi.contentTypes).forEach(([key, value]) => {
    if (
      "slug" in (value as any).attributes &&
      "locale" in (value as any).attributes
    ) {
      models.push(key);
    }
  });

  strapi.db.lifecycles.subscribe({
    // @ts-ignore
    models,
    async beforeCreate(event) {
      const { uid } = event.model;
      const { data } = event.params;
      const { locale, slug } = data;

      const existingRecord = await findExistingRecord(uid, {
        locale,
        slug,
      });

      if (!existingRecord) {
        return;
      }

      throw new ValidationError(`Slug already exists for locale ${locale}`);
    },
    async beforeUpdate(event) {
      const { uid } = event.model;
      const { data, where } = event.params;

      const id = where.id;
      const slug = data.slug;
      const locale = await getBeforeUpdateLocale(uid, id);
      const existingRecord = await findExistingRecord(uid, {
        id,
        locale,
        slug,
      });

      if (!existingRecord) {
        return;
      }

      throw new ValidationError(`Slug already exists for locale ${locale}`);
    },
  });
};

async function findExistingRecord(
  model: string,
  data: { slug: string; locale: string; id?: number }
) {
  return strapi.db.query(model).findOne({
    where: {
      $and: [
        {
          slug: data.slug,
        },
        {
          locale: data.locale,
        },
      ],
      $not: {
        id: data.id ?? 0,
      },
    },
  });
}
async function getBeforeUpdateLocale(model: string, id: number) {
  const record = await strapi.db.query(model).findOne({ where: { id } });

  if (!record) {
    return null;
  }

  return record.locale;
}
