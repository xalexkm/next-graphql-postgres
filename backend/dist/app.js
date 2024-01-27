"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
var _fastify = /*#__PURE__*/ _interop_require_default(require("fastify"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var app = (0, _fastify.default)({
    logger: true
});
// Declare a route
app.get("/", function(request, reply) {
    reply.send({
        hello: "world"
    });
});
// Run the server!
app.listen({
    port: 3000
}, function(err) {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
// Server is now listening on ${address}
});
var _default = app;
