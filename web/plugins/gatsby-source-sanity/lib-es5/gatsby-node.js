"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFieldsOnGraphQLNodeType = exports.sourceNodes = exports.createSchemaCustomization = exports.createResolvers = exports.onPreBootstrap = exports.onPreInit = void 0;
var operators_1 = require("rxjs/operators");
var package_json_1 = __importDefault(require("gatsby/package.json"));
var client_1 = __importDefault(require("@sanity/client"));
var normalize_1 = require("./util/normalize");
var cache_1 = require("./util/cache");
var handleWebhookEvent_1 = require("./util/handleWebhookEvent");
var remoteGraphQLSchema_1 = require("./util/remoteGraphQLSchema");
var errors_1 = require("./util/errors");
var extendImageNode_1 = require("./images/extendImageNode");
var rewriteGraphQLSchema_1 = require("./util/rewriteGraphQLSchema");
var getGraphQLResolverMap_1 = require("./util/getGraphQLResolverMap");
var documentIds_1 = require("./util/documentIds");
var getAllDocuments_1 = require("./util/getAllDocuments");
var oneline_1 = __importDefault(require("oneline"));
var lodash_1 = require("lodash");
var debug_1 = __importDefault(require("./debug"));
var handleDeltaChanges_1 = __importDefault(require("./util/handleDeltaChanges"));
var getPluginStatus_1 = require("./util/getPluginStatus");
var coreSupportsOnPluginInit;
try {
    var isGatsbyNodeLifecycleSupported = require("gatsby-plugin-utils").isGatsbyNodeLifecycleSupported;
    if (isGatsbyNodeLifecycleSupported("onPluginInit")) {
        coreSupportsOnPluginInit = 'stable';
    }
    else if (isGatsbyNodeLifecycleSupported("unstable_onPluginInit")) {
        coreSupportsOnPluginInit = 'unstable';
    }
}
catch (e) {
    console.error("Could not check if Gatsby supports onPluginInit lifecycle");
}
var defaultConfig = {
    version: '1',
    overlayDrafts: false,
    graphqlTag: 'default',
};
var stateCache = {};
var initializePlugin = function (_a, pluginOptions) {
    var reporter = _a.reporter;
    return __awaiter(void 0, void 0, void 0, function () {
        var config, unsupportedVersionMessage, client, api, graphqlSdl, graphqlSdlKey, typeMap, typeMapKey, err_1, prefix;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = __assign(__assign({}, defaultConfig), pluginOptions);
                    if (Number(package_json_1.default.version.split('.')[0]) < 3) {
                        unsupportedVersionMessage = (0, oneline_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    You are using a version of Gatsby not supported by gatsby-source-sanity.\n    Upgrade gatsby to >= 3.0.0 to continue."], ["\n    You are using a version of Gatsby not supported by gatsby-source-sanity.\n    Upgrade gatsby to >= 3.0.0 to continue."])));
                        reporter.panic({
                            id: (0, errors_1.prefixId)(errors_1.ERROR_CODES.UnsupportedGatsbyVersion),
                            context: { sourceMessage: unsupportedVersionMessage },
                        });
                        return [2 /*return*/];
                    }
                    // Actually throws in validation function, but helps typescript perform type narrowing
                    if (!validateConfig(config, reporter)) {
                        throw new Error('Invalid config');
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    reporter.info('[sanity] Fetching remote GraphQL schema');
                    client = getClient(config);
                    return [4 /*yield*/, (0, remoteGraphQLSchema_1.getRemoteGraphQLSchema)(client, config)];
                case 2:
                    api = _b.sent();
                    reporter.info('[sanity] Transforming to Gatsby-compatible GraphQL SDL');
                    return [4 /*yield*/, (0, rewriteGraphQLSchema_1.rewriteGraphQLSchema)(api, { config: config, reporter: reporter })];
                case 3:
                    graphqlSdl = _b.sent();
                    graphqlSdlKey = (0, cache_1.getCacheKey)(config, cache_1.CACHE_KEYS.GRAPHQL_SDL);
                    stateCache[graphqlSdlKey] = graphqlSdl;
                    reporter.info('[sanity] Stitching GraphQL schemas from SDL');
                    typeMap = (0, remoteGraphQLSchema_1.getTypeMapFromGraphQLSchema)(api);
                    typeMapKey = (0, cache_1.getCacheKey)(config, cache_1.CACHE_KEYS.TYPE_MAP);
                    stateCache[typeMapKey] = typeMap;
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _b.sent();
                    if (err_1.isWarning) {
                        err_1.message.split('\n').forEach(function (line) { return reporter.warn(line); });
                        return [2 /*return*/];
                    }
                    if (typeof err_1.code === 'string' && errors_1.SANITY_ERROR_CODE_MAP[err_1.code]) {
                        reporter.panic({
                            id: (0, documentIds_1.prefixId)(errors_1.SANITY_ERROR_CODE_MAP[err_1.code]),
                            context: { sourceMessage: "[sanity] " + errors_1.SANITY_ERROR_CODE_MESSAGES[err_1.code] },
                        });
                    }
                    prefix = typeof err_1.code === 'string' ? "[" + err_1.code + "] " : '';
                    reporter.panic({
                        id: (0, documentIds_1.prefixId)(errors_1.ERROR_CODES.SchemaFetchError),
                        context: { sourceMessage: "" + prefix + err_1.message },
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
var onPreInit = function (_a) {
    var reporter = _a.reporter;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            // onPluginInit replaces onPreInit in Gatsby V4
            // Old versions of Gatsby does not have the method setErrorMap
            if (!coreSupportsOnPluginInit && reporter.setErrorMap) {
                reporter.setErrorMap(errors_1.ERROR_MAP);
            }
            return [2 /*return*/];
        });
    });
};
exports.onPreInit = onPreInit;
var onPreBootstrap = function (args, pluginOptions) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!coreSupportsOnPluginInit) return [3 /*break*/, 2];
                return [4 /*yield*/, initializePlugin(args, pluginOptions)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.onPreBootstrap = onPreBootstrap;
var onPluginInit = function (args, pluginOptions) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                args.reporter.setErrorMap(errors_1.ERROR_MAP);
                return [4 /*yield*/, initializePlugin(args, pluginOptions)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
if (coreSupportsOnPluginInit === 'stable') {
    // to properly initialize plugin in worker (`onPreBootstrap` won't run in workers)
    // need to conditionally export otherwise it throw an error for older versions
    exports.onPluginInit = onPluginInit;
}
else if (coreSupportsOnPluginInit === 'unstable') {
    exports.unstable_onPluginInit = onPluginInit;
}
var createResolvers = function (args, pluginOptions) {
    var typeMapKey = (0, cache_1.getCacheKey)(pluginOptions, cache_1.CACHE_KEYS.TYPE_MAP);
    var typeMap = (stateCache[typeMapKey] || remoteGraphQLSchema_1.defaultTypeMap);
    args.createResolvers((0, getGraphQLResolverMap_1.getGraphQLResolverMap)(typeMap, pluginOptions, args));
};
exports.createResolvers = createResolvers;
var createSchemaCustomization = function (_a, pluginConfig) {
    var actions = _a.actions;
    var createTypes = actions.createTypes;
    var graphqlSdlKey = (0, cache_1.getCacheKey)(pluginConfig, cache_1.CACHE_KEYS.GRAPHQL_SDL);
    var graphqlSdl = stateCache[graphqlSdlKey];
    createTypes(graphqlSdl);
};
exports.createSchemaCustomization = createSchemaCustomization;
var sourceNodes = function (args, pluginConfig) { return __awaiter(void 0, void 0, void 0, function () {
    // sync a single document from the local cache of known documents with gatsby
    function syncWithGatsby(id) {
        var publishedId = (0, documentIds_1.unprefixId)(id);
        var draftId = (0, documentIds_1.prefixId)(id);
        var published = documents.get(publishedId);
        var draft = documents.get(draftId);
        var doc = draft || published;
        if (doc) {
            var type = (0, normalize_1.getTypeName)(doc._type);
            if (!typeMap.objects[type]) {
                reporter.warn("[sanity] Document \"" + doc._id + "\" has type " + doc._type + " (" + type + "), which is not declared in the GraphQL schema. Make sure you run \"graphql deploy\". Skipping document.");
                return;
            }
        }
        if (id === draftId && !overlayDrafts) {
            // do nothing, we're not overlaying drafts
            (0, debug_1.default)('overlayDrafts is not enabled, so skipping createNode for draft');
            return;
        }
        if (id === publishedId) {
            if (draft && overlayDrafts) {
                // we have a draft, and overlayDrafts is enabled, so skip to the draft document instead
                (0, debug_1.default)('skipping createNode of %s since there is a draft and overlayDrafts is enabled', publishedId);
                return;
            }
            if (gatsbyNodes.has(publishedId)) {
                // sync existing gatsby node with document from updated cache
                if (published) {
                    (0, debug_1.default)('updating gatsby node for %s', publishedId);
                    var node = (0, normalize_1.toGatsbyNode)(published, processingOptions);
                    gatsbyNodes.set(publishedId, node);
                    createNode(node);
                    sanityCreateNodeManifest(actions, args, node, publishedId);
                }
                else {
                    // the published document has been removed (note - we either have no draft or overlayDrafts is not enabled so merely removing is ok here)
                    (0, debug_1.default)('deleting gatsby node for %s since there is no draft and overlayDrafts is not enabled', publishedId);
                    deleteNode(gatsbyNodes.get(publishedId));
                    gatsbyNodes.delete(publishedId);
                }
            }
            else if (published) {
                // when we don't have a gatsby node for the published document
                (0, debug_1.default)('creating gatsby node for %s', publishedId);
                var node = (0, normalize_1.toGatsbyNode)(published, processingOptions);
                gatsbyNodes.set(publishedId, node);
                createNode(node);
                sanityCreateNodeManifest(actions, args, node, publishedId);
            }
        }
        if (id === draftId && overlayDrafts) {
            // we're syncing a draft version and overlayDrafts is enabled
            if (gatsbyNodes.has(publishedId) && !draft && !published) {
                // have stale gatsby node for a published document that has neither a draft or a published (e.g. it's been deleted)
                (0, debug_1.default)('deleting gatsby node for %s since there is neither a draft nor a published version of it any more', publishedId);
                deleteNode(gatsbyNodes.get(publishedId));
                gatsbyNodes.delete(publishedId);
                return;
            }
            (0, debug_1.default)('Replacing gatsby node for %s using the %s document', publishedId, draft ? 'draft' : 'published');
            // pick the draft if we can, otherwise pick the published
            var node = (0, normalize_1.toGatsbyNode)((draft || published), processingOptions);
            gatsbyNodes.set(publishedId, node);
            createNode(node);
            sanityCreateNodeManifest(actions, args, node, publishedId);
        }
    }
    function syncAllWithGatsby() {
        var e_2, _a;
        try {
            for (var _b = __values(documents.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                syncWithGatsby(id);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    function syncIdsWithGatsby(ids) {
        var e_3, _a;
        try {
            for (var ids_1 = __values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
                var id = ids_1_1.value;
                syncWithGatsby(id);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    var config, dataset, overlayDrafts, watchMode, actions, createNodeId, createContentDigest, reporter, webhookBody, createNode, deleteNode, createParentChildLink, typeMapKey, typeMap, client, url, processingOptions, webhookHandled, lastBuildTime, documentIds_2, typeMapStateKeys, sanityDocTypes, sanityDocTypes_1, sanityDocTypes_1_1, docType, deltaHandled, error_1, documents, gatsbyNodes;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                config = __assign(__assign({}, defaultConfig), pluginConfig);
                dataset = config.dataset, overlayDrafts = config.overlayDrafts, watchMode = config.watchMode;
                actions = args.actions, createNodeId = args.createNodeId, createContentDigest = args.createContentDigest, reporter = args.reporter, webhookBody = args.webhookBody;
                createNode = actions.createNode, deleteNode = actions.deleteNode, createParentChildLink = actions.createParentChildLink;
                typeMapKey = (0, cache_1.getCacheKey)(pluginConfig, cache_1.CACHE_KEYS.TYPE_MAP);
                typeMap = (stateCache[typeMapKey] || remoteGraphQLSchema_1.defaultTypeMap);
                client = getClient(config);
                url = client.getUrl("/data/export/" + dataset + "?tag=sanity.gatsby.source-nodes");
                processingOptions = {
                    typeMap: typeMap,
                    createNodeId: createNodeId,
                    createNode: createNode,
                    createContentDigest: createContentDigest,
                    createParentChildLink: createParentChildLink,
                    overlayDrafts: overlayDrafts,
                };
                if (!(webhookBody && Object.keys(webhookBody).length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, handleWebhookEvent_1.handleWebhookEvent)(args, { client: client, processingOptions: processingOptions })
                    // Even if the webhook body is invalid, let's avoid re-fetching all documents.
                    // Otherwise, we'd be overloading Gatsby's preview servers on large datasets.
                ];
            case 1:
                webhookHandled = _b.sent();
                // Even if the webhook body is invalid, let's avoid re-fetching all documents.
                // Otherwise, we'd be overloading Gatsby's preview servers on large datasets.
                if (!webhookHandled) {
                    reporter.warn('[sanity] Received webhook is invalid. Make sure your Sanity webhook is configured correctly.');
                    reporter.info("[sanity] Webhook data: " + JSON.stringify(webhookBody, null, 2));
                }
                return [2 /*return*/];
            case 2:
                lastBuildTime = (0, getPluginStatus_1.getLastBuildTime)(args);
                if (!lastBuildTime) return [3 /*break*/, 7];
                _b.label = 3;
            case 3:
                _b.trys.push([3, 6, , 7]);
                return [4 /*yield*/, client.fetch("*[!(_type match \"system.**\")]._id")];
            case 4:
                documentIds_2 = (_b.sent()).map(documentIds_1.unprefixId);
                typeMapStateKeys = Object.keys(stateCache).filter(function (key) { return key.endsWith('typeMap'); });
                sanityDocTypes = Array.from(
                // De-duplicate types with a Set
                new Set(typeMapStateKeys.reduce(function (types, curKey) {
                    var map = stateCache[curKey];
                    var documentTypes = Object.keys(map.objects).filter(function (key) { return map.objects[key].isDocument; });
                    return __spreadArray(__spreadArray([], __read(types), false), __read(documentTypes), false);
                }, [])));
                try {
                    // 3/4. From these types, get all nodes from store that are created from this plugin.
                    // (we didn't use args.getNodes() as that'd be too expensive - hence why we limit it to Sanity-only types)
                    for (sanityDocTypes_1 = __values(sanityDocTypes), sanityDocTypes_1_1 = sanityDocTypes_1.next(); !sanityDocTypes_1_1.done; sanityDocTypes_1_1 = sanityDocTypes_1.next()) {
                        docType = sanityDocTypes_1_1.value;
                        args
                            .getNodesByType(docType)
                            // If a document isn't included in documentIds, that means it was deleted since lastBuildTime. Don't touch it.
                            .filter(function (node) {
                            return node.internal.owner === 'gatsby-source-sanity' &&
                                typeof node._id === 'string' &&
                                documentIds_2.includes((0, documentIds_1.unprefixId)(node._id));
                        })
                            // 4/4. touch valid documents to prevent Gatsby from deleting them
                            .forEach(function (node) { return actions.touchNode(node); });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (sanityDocTypes_1_1 && !sanityDocTypes_1_1.done && (_a = sanityDocTypes_1.return)) _a.call(sanityDocTypes_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return [4 /*yield*/, (0, handleDeltaChanges_1.default)({
                        args: args,
                        lastBuildTime: lastBuildTime,
                        client: client,
                        processingOptions: processingOptions,
                    })];
            case 5:
                deltaHandled = _b.sent();
                if (deltaHandled) {
                    return [2 /*return*/];
                }
                else {
                    reporter.warn("[sanity] Couldn't retrieve latest changes. Will fetch all documents instead.");
                }
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                return [3 /*break*/, 7];
            case 7:
                reporter.info('[sanity] Fetching export stream for dataset');
                return [4 /*yield*/, downloadDocuments(url, config.token, { includeDrafts: overlayDrafts })];
            case 8:
                documents = _b.sent();
                gatsbyNodes = new Map();
                if (watchMode) {
                    // Note: since we don't setup the listener before *after* all documents has been fetched here we will miss any events that
                    // happened in the time window between the documents was fetched and the listener connected. If this happens, the
                    // preview will show an outdated version of the document.
                    reporter.info('[sanity] Watch mode enabled, starting a listener');
                    client
                        .listen('*[!(_id in path("_.**"))]')
                        .pipe((0, operators_1.filter)(function (event) { return overlayDrafts || !event.documentId.startsWith('drafts.'); }), (0, operators_1.tap)(function (event) {
                        if (event.result) {
                            documents.set(event.documentId, event.result);
                        }
                        else {
                            documents.delete(event.documentId);
                        }
                    }), (0, operators_1.map)(function (event) { return event.documentId; }), (0, operators_1.bufferTime)(100), (0, operators_1.map)(function (ids) { return (0, lodash_1.uniq)(ids); }), (0, operators_1.filter)(function (ids) { return ids.length > 0; }), (0, operators_1.tap)(function (updateIds) {
                        return (0, debug_1.default)('The following documents updated and will be synced with gatsby: ', updateIds);
                    }), (0, operators_1.tap)(function (updatedIds) { return syncIdsWithGatsby(updatedIds); }))
                        .subscribe();
                }
                // do the initial sync from sanity documents to gatsby nodes
                syncAllWithGatsby();
                // register the current build time for accessing it in handleDeltaChanges for future builds
                (0, getPluginStatus_1.registerBuildTime)(args);
                reporter.info("[sanity] Done! Exported " + documents.size + " documents.");
                return [2 /*return*/];
        }
    });
}); };
exports.sourceNodes = sourceNodes;
var setFieldsOnGraphQLNodeType = function (context, pluginConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var type, fields;
    return __generator(this, function (_a) {
        type = context.type;
        fields = {};
        if (type.name === 'SanityImageAsset') {
            fields = __assign(__assign({}, fields), (0, extendImageNode_1.extendImageNode)(pluginConfig));
        }
        return [2 /*return*/, fields];
    });
}); };
exports.setFieldsOnGraphQLNodeType = setFieldsOnGraphQLNodeType;
function validateConfig(config, reporter) {
    if (!config.projectId) {
        reporter.panic({
            id: (0, documentIds_1.prefixId)(errors_1.ERROR_CODES.MissingProjectId),
            context: { sourceMessage: '[sanity] `projectId` must be specified' },
        });
    }
    if (!config.dataset) {
        reporter.panic({
            id: (0, documentIds_1.prefixId)(errors_1.ERROR_CODES.MissingDataset),
            context: { sourceMessage: '[sanity] `dataset` must be specified' },
        });
    }
    if (config.overlayDrafts && !config.token) {
        reporter.warn('[sanity] `overlayDrafts` is set to `true`, but no token is given');
    }
    var inDevelopMode = process.env.gatsby_executing_command === 'develop';
    if (config.watchMode && !inDevelopMode) {
        reporter.warn('[sanity] Using `watchMode` when not in develop mode might prevent your build from completing');
    }
    return true;
}
function downloadDocuments(url, token, options) {
    if (options === void 0) { options = {}; }
    return (0, getAllDocuments_1.getAllDocuments)(url, token, options).then(function (stream) {
        return new Promise(function (resolve, reject) {
            var documents = new Map();
            stream.on('data', function (doc) {
                documents.set(doc._id, doc);
            });
            stream.on('end', function () {
                resolve(documents);
            });
            stream.on('error', function (error) {
                reject(error);
            });
        });
    });
}
var ONE_WEEK = 1000 * 60 * 60 * 24 * 7; // ms * sec * min * hr * day
var nodeManifestWarningWasLogged;
function sanityCreateNodeManifest(actions, args, node, publishedId) {
    try {
        var unstable_createNodeManifest = actions.unstable_createNodeManifest;
        var getNode = args.getNode;
        var createNodeManifestIsSupported = typeof unstable_createNodeManifest === "function";
        var nodeTypeNeedsManifest = (node.internal.type === 'SanityPost');
        var shouldCreateNodeManifest = createNodeManifestIsSupported && nodeTypeNeedsManifest;
        if (shouldCreateNodeManifest) {
            var updatedAt = node._updatedAt;
            var nodeWasRecentlyUpdated = Date.now() - new Date(updatedAt).getTime() <=
                // Default to only create manifests for items updated in last week
                (process.env.CONTENT_SYNC_SANITY_HOURS_SINCE_ENTRY_UPDATE ||
                    ONE_WEEK);
            if (!nodeWasRecentlyUpdated)
                return;
            var nodeForManifest = getNode(node.id);
            var manifestId = publishedId + "-" + updatedAt;
            console.info("Sanity: Creating node manifest with id " + manifestId);
            actions.unstable_createNodeManifest({ manifestId: manifestId, node: nodeForManifest });
        }
        else if (!createNodeManifestIsSupported && !nodeManifestWarningWasLogged) {
            console.warn("Sanity: Your version of Gatsby core doesn't support Content Sync (via the unstable_createNodeManifest action). Please upgrade to the latest version to use Content Sync in your site.");
            nodeManifestWarningWasLogged = true;
        }
    }
    catch (e) {
        var result = e.message;
        console.info("Cannot create node manifest", result);
    }
}
function getClient(config) {
    var projectId = config.projectId, dataset = config.dataset, token = config.token;
    return new client_1.default({
        projectId: projectId,
        dataset: dataset,
        token: token,
        apiVersion: '1',
        useCdn: false,
    });
}
var templateObject_1;
//# sourceMappingURL=gatsby-node.js.map