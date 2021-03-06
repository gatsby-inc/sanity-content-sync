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
exports.removeGatsbyInternalProps = void 0;
// Gatsby mutates (...tm) the `internal` object, adding `owner`.
// This function helps "clean" the internal representation if we are readding/reusing the node
var removeGatsbyInternalProps = function (node) {
    if (!node || typeof node.internal === 'undefined') {
        return node;
    }
    var _a = node.internal, mediaType = _a.mediaType, type = _a.type, contentDigest = _a.contentDigest;
    return __assign(__assign({}, node), { internal: {
            mediaType: mediaType,
            type: type,
            contentDigest: contentDigest,
        } });
};
exports.removeGatsbyInternalProps = removeGatsbyInternalProps;
//# sourceMappingURL=removeGatsbyInternalProps.js.map