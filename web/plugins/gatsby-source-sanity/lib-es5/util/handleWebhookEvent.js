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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWebhookPayload = exports.handleWebhookEvent = void 0;
var debug_1 = __importDefault(require("../debug"));
var normalize_1 = require("./normalize");
var documentIds_1 = require("./documentIds");
function handleV1Webhook(args, options) {
    return __awaiter(this, void 0, void 0, function () {
        var client, processingOptions, webhookBody, reporter, ids, created, deleted, updated, refetchIds, numRefreshed, touchedDocs, newDocuments, createdDocs, updatedDocs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = options.client, processingOptions = options.processingOptions;
                    webhookBody = args.webhookBody, reporter = args.reporter;
                    ids = webhookBody.ids;
                    created = ids.created, deleted = ids.deleted, updated = ids.updated;
                    refetchIds = __spreadArray(__spreadArray([], __read(created), false), __read(updated), false);
                    numRefreshed = 0;
                    if (deleted.length > 0) {
                        numRefreshed += handleDeletedDocuments(args, deleted);
                    }
                    touchedDocs = [];
                    if (!(refetchIds.length > 0)) return [3 /*break*/, 2];
                    reporter.info("[sanity] Refetching " + refetchIds.length + " documents");
                    return [4 /*yield*/, client.getDocuments(refetchIds, {
                            tag: 'sanity.gatsby.webhook-refetch',
                        })];
                case 1:
                    newDocuments = _a.sent();
                    touchedDocs = newDocuments.filter(isDocument);
                    _a.label = 2;
                case 2:
                    if (created.length > 0) {
                        createdDocs = created
                            .map(function (id) { return touchedDocs.find(function (doc) { return doc && doc._id === id; }); })
                            .filter(isDocument);
                        numRefreshed += handleChangedDocuments(args, createdDocs, processingOptions, 'created');
                    }
                    if (updated.length > 0) {
                        updatedDocs = updated
                            .map(function (id) { return touchedDocs.find(function (doc) { return doc && doc._id === id; }); })
                            .filter(isDocument);
                        numRefreshed += handleChangedDocuments(args, updatedDocs, processingOptions, 'created');
                    }
                    reporter.info("Refreshed " + numRefreshed + " documents");
                    return [2 /*return*/, true];
            }
        });
    });
}
function handleV2Webhook(args, options) {
    return __awaiter(this, void 0, void 0, function () {
        var webhookBody, reporter, _a, operation, rawId, dataset, projectId, document, publishedDocumentId, config, overlayDrafts;
        return __generator(this, function (_b) {
            webhookBody = args.webhookBody, reporter = args.reporter;
            _a = webhookBody.operation, operation = _a === void 0 ? 'update' : _a, rawId = webhookBody.documentId, dataset = webhookBody.dataset, projectId = webhookBody.projectId, document = webhookBody.after;
            publishedDocumentId = (0, documentIds_1.unprefixId)(rawId);
            config = options.client.config();
            overlayDrafts = options.processingOptions.overlayDrafts;
            if (projectId && dataset && (config.projectId !== projectId || config.dataset !== dataset)) {
                return [2 /*return*/, false];
            }
            if (operation === 'create' &&
                (document === null || document === void 0 ? void 0 : document._id) &&
                // Don't create node if a draft document w/ overlayDrafts === false
                (!document._id.startsWith('drafts.') || overlayDrafts)) {
                handleChangedDocuments(args, [document], options.processingOptions, 'created');
                reporter.info("Created 1 document");
                return [2 /*return*/, true];
            }
            if (operation === 'update' &&
                (document === null || document === void 0 ? void 0 : document._id) &&
                (!document._id.startsWith('drafts.') || overlayDrafts)) {
                handleChangedDocuments(args, [document], options.processingOptions, 'updated');
                reporter.info("Refreshed 1 document");
                return [2 /*return*/, true];
            }
            if (operation === 'delete') {
                handleDeletedDocuments(args, [publishedDocumentId]);
                reporter.info("Deleted 1 document");
                return [2 /*return*/, true];
            }
            return [2 /*return*/, false];
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
                        (0, debug_1.default)('Invalid/non-sanity webhook payload received');
                        return [2 /*return*/, false];
                    }
                    reporter.info('[sanity] Processing changed documents from webhook');
                    if (!(validated === 'v1')) return [3 /*break*/, 2];
                    return [4 /*yield*/, handleV1Webhook(args, options)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (!(validated === 'v2')) return [3 /*break*/, 4];
                    return [4 /*yield*/, handleV2Webhook(args, options)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/, false];
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
function handleChangedDocuments(args, changedDocs, processingOptions, action) {
    var reporter = args.reporter;
    var typeMap = processingOptions.typeMap;
    return changedDocs.reduce(function (count, doc) {
        var type = (0, normalize_1.getTypeName)(doc._type);
        if (!typeMap.objects[type]) {
            reporter.warn("[sanity] Document \"" + doc._id + "\" has type " + doc._type + " (" + type + "), which is not declared in the GraphQL schema. Make sure you run \"graphql deploy\". Skipping document.");
            return count;
        }
        (0, debug_1.default)('%s document with ID %s', action === 'created' ? 'Created' : 'Updated', doc._id);
        processingOptions.createNode((0, normalize_1.toGatsbyNode)(doc, processingOptions));
        return count + 1;
    }, 0);
}
function isDocument(doc) {
    return Boolean(doc && doc._id);
}
function validateWebhookPayload(payload) {
    if (!payload) {
        return false;
    }
    // Let's test V2 first as those documents could also include an `ids` object
    if ('__webhooksVersion' in payload && payload.__webhooksVersion === 'v2') {
        return 'v2';
    }
    if ('ids' in payload && typeof payload.ids === 'object') {
        var _a = payload.ids, created = _a.created, deleted = _a.deleted, updated = _a.updated;
        if (Array.isArray(created) && Array.isArray(deleted) && Array.isArray(updated)) {
            return 'v1';
        }
    }
    return false;
}
exports.validateWebhookPayload = validateWebhookPayload;
//# sourceMappingURL=handleWebhookEvent.js.map