"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    beforeCreate(event) {
        const { data, where, select, populate } = event.params;
        console.log("LOL!");
    },
    afterCreate(event) {
        const { result, params } = event;
        console.log("LAL");
    },
    beforeUpdate(event) {
        const { data, where, select, populate } = event.params;
        console.log("LOL!");
    },
    afterUpdate(event) {
        const { result, params } = event;
        console.log("LAL");
    },
};
