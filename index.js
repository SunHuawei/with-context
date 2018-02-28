'use strict';

var React = require('react');

var PureComponent = React.PureComponent;
var h = React.createElement;

function _inherits(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });

    if (superClass) {
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
}

function wrap(Context, key, WrappedComp) {
    function Connected(props) {
        PureComponent.call(this, props);
    }

    _inherits(Connected, PureComponent);
    Connected.prototype.render = function () {
        var props = this.props;
        return h(Context.Consumer, null, function (context) {
            var tmpProps = {};
            tmpProps[key] = context;
            return h(WrappedComp, Object.assign(tmpProps, props));
        });
    };

    Connected.WrappedComp = WrappedComp;
    var wrappedCompName = WrappedComp.displayName || WrappedComp.name || "Component";
    var consumerName = Context.Consumer.displayName || Context.Consumer.name || "Context.Consumer";
    Connected.displayName = wrappedCompName + "(" + consumerName + "." + key + ")";

    return Connected;
};

function withContext(Context) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "context";

    return function (WrappedComp) {
        return wrap(Context, key, WrappedComp);
    };
}

function withMultiContext(map) {
    return function (WrappedComp) {
        return Object.keys(map).reduce(function (Comp, key) {
            return wrap(map[key], key, Comp);
        }, WrappedComp);
    };
}

exports.withContext = withContext;
exports.withMultiContext = withMultiContext;