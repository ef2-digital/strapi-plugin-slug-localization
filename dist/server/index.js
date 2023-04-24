"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = __importDefault(require("./register"));
const bootstrap_1 = __importDefault(require("./bootstrap"));
const destroy_1 = __importDefault(require("./destroy"));
exports.default = {
    register: register_1.default,
    bootstrap: bootstrap_1.default,
    destroy: destroy_1.default,
};
