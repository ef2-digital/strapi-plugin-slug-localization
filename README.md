# Strapi plugin slug-localization

Add a slugify option for locales with backend validation for checking existings slug for current locale.

## ✨ Features

- **Automatic slug creation bases on title field.** For now, the slug input field checks the current title field and automatic creates slug.
- **Backend validation:** Checks the slug on save if its unique in the given model/locale combination.

## ✨ Todo
- Choose attached field, defaults to "title" for now
- Frontend validation - on the fly validate if slug is available.
- Translations

## ⏳ Installation

```sh
# Using Yarn
yarn add @ef2/strapi-plugin-slug-localization

# Or using NPM
npm install @ef2/strapi-plugin-slug-localization
```

Then, you'll need to build your admin panel:

```sh
# Using Yarn
yarn build

# Or using NPM
npm run build
```
