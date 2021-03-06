"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConflictFreeFieldName = exports.getTypeName = exports.toGatsbyNode = exports.RESTRICTED_NODE_FIELDS = void 0;
var mutator_1 = require("@sanity/mutator");
var graphql_1 = require("gatsby/graphql");
var lodash_1 = require("lodash");
var documentIds_1 = require("./documentIds");
var scalarTypeNames = graphql_1.specifiedScalarTypes.map(function (def) { return def.name; }).concat(['JSON', 'Date']);
// Movie => SanityMovie
var typePrefix = 'Sanity';
// Node fields used internally by Gatsby.
exports.RESTRICTED_NODE_FIELDS = ['id', 'children', 'parent', 'fields', 'internal'];
// Transform a Sanity document into a Gatsby node
function toGatsbyNode(doc, options) {
    var createNodeId = options.createNodeId, createContentDigest = options.createContentDigest, overlayDrafts = options.overlayDrafts;
    var rawAliases = getRawAliases(doc, options);
    var safe = prefixConflictingKeys(doc);
    var withRefs = rewriteNodeReferences(safe, options);
    return __assign(__assign(__assign({}, withRefs), rawAliases), { id: (0, documentIds_1.safeId)(overlayDrafts ? (0, documentIds_1.unprefixId)(doc._id) : doc._id, createNodeId), children: [], internal: {
            type: getTypeName(doc._type),
            contentDigest: createContentDigest(JSON.stringify(withRefs)),
        } });
}
exports.toGatsbyNode = toGatsbyNode;
// movie => SanityMovie
// blog_post => SanityBlogPost
// sanity.imageAsset => SanityImageAsset
function getTypeName(type) {
    if (!type) {
        return type;
    }
    var typeName = (0, lodash_1.startCase)(type);
    if (scalarTypeNames.includes(typeName)) {
        return typeName;
    }
    return "" + typePrefix + typeName.replace(/\s+/g, '').replace(/^Sanity/, '');
}
exports.getTypeName = getTypeName;
// {foo: 'bar', children: []} => {foo: 'bar', sanityChildren: []}
function prefixConflictingKeys(obj) {
    // Will be overwritten, but initialize for type safety
    var initial = { _id: '', _type: '', _rev: '', _createdAt: '', _updatedAt: '' };
    return Object.keys(obj).reduce(function (target, key) {
        var targetKey = getConflictFreeFieldName(key);
        target[targetKey] = obj[key];
        return target;
    }, initial);
}
function getConflictFreeFieldName(fieldName) {
    return exports.RESTRICTED_NODE_FIELDS.includes(fieldName)
        ? "" + (0, lodash_1.camelCase)(typePrefix) + (0, lodash_1.upperFirst)(fieldName)
        : fieldName;
}
exports.getConflictFreeFieldName = getConflictFreeFieldName;
function getRawAliases(doc, options) {
    var typeMap = options.typeMap;
    var typeName = getTypeName(doc._type);
    var type = typeMap.objects[typeName];
    if (!type) {
        return {};
    }
    var initial = {};
    return Object.keys(type.fields).reduce(function (acc, fieldName) {
        var field = type.fields[fieldName];
        var namedType = field.namedType.name.value;
        if (field.aliasFor) {
            var aliasName_1 = '_' + (0, lodash_1.camelCase)("raw_data_" + field.aliasFor);
            acc[aliasName_1] = doc[field.aliasFor];
            return acc;
        }
        if (typeMap.scalars.includes(namedType)) {
            return acc;
        }
        var aliasName = '_' + (0, lodash_1.camelCase)("raw_data_" + fieldName);
        acc[aliasName] = doc[fieldName];
        return acc;
    }, initial);
}
// Tranform Sanity refs ({_ref: 'foo'}) to Gatsby refs ({_ref: 'someOtherId'})
function rewriteNodeReferences(doc, options) {
    var createNodeId = options.createNodeId;
    var refs = (0, mutator_1.extractWithPath)('..[_ref]', doc);
    if (refs.length === 0) {
        return doc;
    }
    var newDoc = (0, lodash_1.cloneDeep)(doc);
    refs.forEach(function (match) {
        (0, lodash_1.set)(newDoc, match.path, (0, documentIds_1.safeId)(match.value, createNodeId));
    });
    return newDoc;
}
//# sourceMappingURL=normalize.js.map