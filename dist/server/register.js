"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    strapi.customFields.register({
        name: "slug-localization",
        plugin: "slug-localization",
        type: "string",
    });
};
