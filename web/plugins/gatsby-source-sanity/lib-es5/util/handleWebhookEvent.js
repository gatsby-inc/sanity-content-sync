"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWebhookPayload = exports.handleWebhookEvent = void 0;
var debug_1 = __importDefault(require("../debug"));
var documentIds_1 = require("./documentIds");
/**
 * Gets a document id received from the webhook & delete it in the store.
 */
function handleDeleteWebhook(args, options) {
    return __awaiter(this, void 0, void 0, function () {
        var webhookBody, reporter, rawId, dataset, projectId, publishedDocumentId, config;
        return __generator(this, function (_a) {
            webhookBody = args.webhookBody, reporter = args.reporter;
            rawId = webhookBody.documentId, dataset = webhookBody.dataset, projectId = webhookBody.projectId;
            publishedDocumentId = (0, documentIds_1.unprefixId)(rawId);
            config = options.client.config();
            if (projectId && dataset && (config.projectId !== projectId || config.dataset !== dataset)) {
                return [2 /*return*/, false];
            }
            handleDeletedDocuments(args, [publishedDocumentId]);
            reporter.info("Deleted 1 document");
            return [2 /*return*/, true];
        });
    });
}
function handleWebhookEvent(args, options) {
    return __awaiter(this, void 0, void 0, function () {
        var webhookBody, reporter, validated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    webhookBody = args.webhookBody, reporter = args.reporter;
                    validated = validateWebhookPayload(webhookBody);
                    if (validated === false) {
                        (0, debug_1.default)('[sanity] Invalid/non-sanity webhook payload received');
                        return [2 /*return*/, false];
                    }
                    reporter.info('[sanity] Processing changed documents from webhook');
                    if (!(validated === 'delete-operation')) return [3 /*break*/, 2];
                    return [4 /*yield*/, handleDeleteWebhook(args, options)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/, false];
            }
        });
    });
}
exports.handleWebhookEvent = handleWebhookEvent;
function handleDeletedDocuments(context, ids) {
    var actions = context.actions, createNodeId = context.createNodeId, getNode = context.getNode;
    var deleteNode = actions.deleteNode;
    return ids
        .map(function (documentId) { return getNode((0, documentIds_1.safeId)((0, documentIds_1.unprefixId)(documentId), createNodeId)); })
        .filter(function (node) { return typeof node !== 'undefined'; })
        .reduce(function (count, node) {
        (0, debug_1.default)('Deleted document with ID %s', node._id);
        deleteNode(node);
        return count + 1;
    }, 0);
}
function validateWebhookPayload(payload) {
    if (!payload) {
        return false;
    }
    if ('operation' in payload && payload.operation === 'delete') {
        return 'delete-operation';
    }
    return false;
}
exports.validateWebhookPayload = validateWebhookPayload;
//# sourceMappingURL=handleWebhookEvent.js.map