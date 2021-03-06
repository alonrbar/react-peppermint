(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("react-peppermint", [], factory);
	else if(typeof exports === 'object')
		exports["react-peppermint"] = factory();
	else
		root["react-peppermint"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!***********************************!*\
  !*** ./src/index.ts + 19 modules ***!
  \***********************************/
/*! exports provided: ActionOptions, createMethodInvokeArgs, action, activate, broadcast, deactivate, viewModel, Provider, withViewModel */
/*! ModuleConcatenation bailout: Cannot concat with external "react" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/symbols.ts
function isSymbol(obj) {
    return typeof obj === 'symbol' || obj instanceof Symbol;
}
function setSymbol(obj, symbol, value) {
    return obj[symbol] = value;
}
function getSymbol(obj, symbol) {
    return obj[symbol];
}
function getOwnSymbol(obj, symbol) {
    return Object.getOwnPropertySymbols(obj).includes(symbol) && getSymbol(obj, symbol);
}
var VM_CONTEXT = Symbol('REACT-PEPPERMINT.VM_CONTEXT');
var VM_CLASS_INFO = Symbol('REACT-PEPPERMINT.VM_CLASS_INFO');

// CONCATENATED MODULE: ./src/utils.ts

var DescriptorType;
(function (DescriptorType) {
    DescriptorType["None"] = "None";
    DescriptorType["Field"] = "Field";
    DescriptorType["Property"] = "Property";
    DescriptorType["Method"] = "Method";
})(DescriptorType || (DescriptorType = {}));
function assignWithProperties(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    target = Object.assign.apply(Object, [target].concat(sources));
    for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
        var source = sources_1[_a];
        var proto = Object.getPrototypeOf(source);
        for (var _b = 0, _c = Object.getOwnPropertyNames(proto); _b < _c.length; _b++) {
            var key = _c[_b];
            var desc = Object.getOwnPropertyDescriptor(proto, key);
            var hasGetter = desc && typeof desc.get === 'function';
            if (hasGetter) {
                target[key] = desc.get.call(source);
            }
        }
    }
    return target;
}
function defineProperties(target, source, descriptorTypes) {
    var descriptors = getAllPropertyDescriptors(source, descriptorTypes);
    for (var _i = 0, _a = Object.keys(descriptors); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, descriptors[key]);
    }
    return target;
}
function getAllPropertyDescriptors(obj, descriptorTypes) {
    var result = {};
    while (obj.constructor !== Object) {
        var descriptors = Object.getOwnPropertyDescriptors(obj);
        if (descriptorTypes && descriptorTypes.length) {
            var filteredDescriptors = {};
            for (var _i = 0, _a = Object.keys(descriptors); _i < _a.length; _i++) {
                var key = _a[_i];
                for (var _b = 0, descriptorTypes_1 = descriptorTypes; _b < descriptorTypes_1.length; _b++) {
                    var flag = descriptorTypes_1[_b];
                    var shouldAdd = false;
                    switch (flag) {
                        case DescriptorType.None:
                            break;
                        case DescriptorType.Field:
                            shouldAdd = (typeof descriptors[key].value !== 'function' && typeof descriptors[key].get !== 'function');
                            break;
                        case DescriptorType.Property:
                            shouldAdd = (typeof descriptors[key].get === 'function');
                            break;
                        case DescriptorType.Method:
                            shouldAdd = (typeof descriptors[key].value === 'function' && typeof descriptors[key].get !== 'function');
                            break;
                        default:
                            throw new Error("Property flag not supported: " + flag);
                    }
                    if (shouldAdd)
                        filteredDescriptors[key] = descriptors[key];
                }
            }
            descriptors = filteredDescriptors;
        }
        result = Object.assign(descriptors, result);
        obj = getPrototype(obj);
    }
    if (result.constructor)
        delete result.constructor;
    return result;
}
function getConstructorProp(obj, key) {
    if (!obj || !obj.constructor)
        return undefined;
    var ctor = obj.constructor;
    return ctor[key];
}
function getConstructorOwnProp(obj, key) {
    if (!obj || !obj.constructor)
        return undefined;
    var ctor = obj.constructor;
    if (isSymbol(key) && Object.getOwnPropertySymbols(ctor).includes(key)) {
        return ctor[key];
    }
    else if (typeof key === 'string' && Object.getOwnPropertyNames(ctor).includes(key)) {
        return ctor[key];
    }
    return undefined;
}
function getMethods(obj, bind) {
    if (bind === void 0) { bind = false; }
    var methodDescriptors = getAllPropertyDescriptors(obj, [DescriptorType.Method]);
    var methods = {};
    for (var _i = 0, _a = Object.keys(methodDescriptors); _i < _a.length; _i++) {
        var key = _a[_i];
        methods[key] = methodDescriptors[key].value;
        if (bind) {
            methods[key] = methods[key].bind(obj);
        }
    }
    return methods;
}
function getPrototype(obj) {
    if (typeof obj === 'object') {
        return Object.getPrototypeOf(obj);
    }
    else if (typeof obj === 'function') {
        return obj.prototype;
    }
    else {
        throw new Error("Expected an object or a function. Got: " + obj);
    }
}
function isPromise(candidate) {
    return (candidate && typeof candidate.then === 'function');
}
function removeOneFromArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === item) {
            return array.splice(i, 1)[0];
        }
    }
    return undefined;
}
function tryInvoke(func) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (typeof func === 'function')
        return func.apply(void 0, args);
    return undefined;
}

// CONCATENATED MODULE: ./src/core/vmClassInfo.ts


var vmClassInfo_VmClassInfo = (function () {
    function VmClassInfo() {
        this.activate = {};
        this.deactivate = {};
        this.actions = {};
        this.broadcasts = {};
    }
    VmClassInfo.getInfo = function (obj) {
        if (!obj)
            return undefined;
        var ownInfo = VmClassInfo.getOwnInfo(obj);
        if (ownInfo)
            return ownInfo;
        var baseInfo = VmClassInfo.getBaseInfo(obj);
        if (baseInfo)
            return VmClassInfo.initInfo(obj);
        return undefined;
    };
    VmClassInfo.getOrInitInfo = function (obj) {
        var info = VmClassInfo.getInfo(obj);
        if (info)
            return info;
        return VmClassInfo.initInfo(obj);
    };
    VmClassInfo.getOwnInfo = function (obj) {
        if (typeof obj === 'object') {
            return getConstructorOwnProp(obj, VM_CLASS_INFO);
        }
        else {
            return getOwnSymbol(obj, VM_CLASS_INFO);
        }
    };
    VmClassInfo.getBaseInfo = function (obj) {
        if (typeof obj === 'object') {
            return getConstructorProp(obj, VM_CLASS_INFO);
        }
        else {
            return getSymbol(obj, VM_CLASS_INFO);
        }
    };
    VmClassInfo.initInfo = function (obj) {
        var isConstructor = (typeof obj === 'function' ? true : false);
        var target = (isConstructor ? obj : obj.constructor);
        var baseInfo = getSymbol(target, VM_CLASS_INFO);
        var selfInfo = Object.assign(new VmClassInfo(), baseInfo);
        return setSymbol(target, VM_CLASS_INFO, selfInfo);
    };
    return VmClassInfo;
}());


// CONCATENATED MODULE: ./src/options.ts
var ActionOptions = (function () {
    function ActionOptions(initial) {
        this.immediate = false;
        Object.assign(this, initial);
    }
    return ActionOptions;
}());


// CONCATENATED MODULE: ./src/decorators/createActionDecorator.ts


function createActionDecorator(key) {
    return function (targetOrOptions, propertyKeyOrNothing) {
        if (propertyKeyOrNothing) {
            actionDecorator.call(undefined, targetOrOptions, propertyKeyOrNothing);
        }
        else {
            return function (target, propertyKey) { return actionDecorator(target, propertyKey, targetOrOptions); };
        }
    };
    function actionDecorator(target, propertyKey, options) {
        var info = vmClassInfo_VmClassInfo.getOrInitInfo(target);
        info[key][propertyKey] = new ActionOptions(options);
    }
}

// CONCATENATED MODULE: ./src/decorators/action.ts

var action = createActionDecorator('actions');

// CONCATENATED MODULE: ./src/decorators/activate.ts

var activate = createActionDecorator('activate');

// CONCATENATED MODULE: ./src/decorators/broadcast.ts

var broadcast = createActionDecorator('broadcasts');

// CONCATENATED MODULE: ./src/decorators/deactivate.ts

var deactivate = createActionDecorator('deactivate');

// CONCATENATED MODULE: ./src/decorators/viewModel.ts

function viewModel(ctor) {
    vmClassInfo_VmClassInfo.getOrInitInfo(ctor);
}

// CONCATENATED MODULE: ./src/decorators/index.ts






// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("react");

// CONCATENATED MODULE: ./src/core/internalContext.ts

var internalContext_a = external_react_["createContext"](undefined), internalContext_Provider = internalContext_a.Provider, Consumer = internalContext_a.Consumer;


// CONCATENATED MODULE: ./src/types.ts
function createMethodInvokeArgs(vm, methodName, methodArgs, isBroadcast) {
    return {
        vm: vm,
        methodName: methodName,
        methodArgs: methodArgs,
        isBroadcast: isBroadcast
    };
}

// CONCATENATED MODULE: ./src/core/viewRefresher.ts

var viewRefresher_ViewRefresher = (function () {
    function ViewRefresher(rootComponent) {
        this.viewsByViewModel = new Map();
        this.allViews = [];
        this.allViews.push(rootComponent);
    }
    ViewRefresher.prototype.registerView = function (vm, view) {
        var components = this.viewsByViewModel.get(vm);
        if (!components) {
            components = new Set();
            this.viewsByViewModel.set(vm, components);
        }
        components.add(view);
        this.allViews.push(view);
    };
    ViewRefresher.prototype.unregisterView = function (vm, view) {
        var components = this.viewsByViewModel.get(vm);
        components.delete(view);
        if (!components.size)
            this.viewsByViewModel.delete(vm);
        removeOneFromArray(this.allViews, view);
    };
    ViewRefresher.prototype.refreshViews = function (refreshAll, vm) {
        var views;
        if (refreshAll) {
            views = this.allViews.slice();
        }
        else {
            views = this.viewsByViewModel.get(vm);
        }
        if (views) {
            views.forEach(function (component) {
                component.forceUpdate();
            });
        }
    };
    return ViewRefresher;
}());


// CONCATENATED MODULE: ./src/core/vmContext.ts

var vmContext_VmContext = (function () {
    function VmContext(vm, vmClassInfo, viewRefresher) {
        this.activate = {};
        this.deactivate = {};
        this.activate = vmClassInfo.activate;
        this.deactivate = vmClassInfo.deactivate;
        this.registerView = function (view) { return viewRefresher.registerView(vm, view); };
        this.unregisterView = function (view) { return viewRefresher.unregisterView(vm, view); };
    }
    VmContext.getContext = function (vm) {
        if (!vm)
            return undefined;
        return getSymbol(vm, VM_CONTEXT);
    };
    VmContext.initContext = function (vm, vmClassInfo, viewRefresher) {
        var info = new VmContext(vm, vmClassInfo, viewRefresher);
        return setSymbol(vm, VM_CONTEXT, info);
    };
    return VmContext;
}());


// CONCATENATED MODULE: ./src/core/vmResolver.ts





var vmResolver_VmResolver = (function () {
    function VmResolver(internalContainer, rootComponent) {
        this.internalResolver = internalContainer;
        this.viewRefresher = new viewRefresher_ViewRefresher(rootComponent);
    }
    VmResolver.prototype.get = function (key) {
        var instance = this.internalResolver.get(key);
        var vmClassInfo = vmClassInfo_VmClassInfo.getInfo(instance);
        if (vmClassInfo) {
            var vmInstanceInfo = vmContext_VmContext.getContext(instance);
            if (!vmInstanceInfo) {
                this.patchViewModel(instance, vmClassInfo);
            }
        }
        return instance;
    };
    VmResolver.prototype.patchViewModel = function (vm, vmClassInfo) {
        vmContext_VmContext.initContext(vm, vmClassInfo, this.viewRefresher);
        defineProperties(vm, vm, [DescriptorType.Property]);
        var vmMethods = getMethods(vm);
        for (var _i = 0, _a = Object.keys(vmMethods); _i < _a.length; _i++) {
            var methodName = _a[_i];
            this.patchMethod(vm, vmClassInfo, methodName);
        }
    };
    VmResolver.prototype.patchMethod = function (vm, vmClassInfo, methodName) {
        var self = this;
        var originalMethod = vm[methodName];
        var actionOptions = vmClassInfo.actions[methodName];
        var broadcastOptions = vmClassInfo.broadcasts[methodName];
        var activateOptions = vmClassInfo.activate[methodName];
        var deactivateOptions = vmClassInfo.deactivate[methodName];
        var anyOptions = (actionOptions || broadcastOptions || activateOptions || deactivateOptions);
        var shouldPatch = !!anyOptions;
        var finalMethod;
        if (shouldPatch) {
            finalMethod = function () {
                var args = arguments;
                var isBroadcast = !!broadcastOptions;
                var invokeEventArgs = createMethodInvokeArgs(vm, methodName, args, isBroadcast);
                tryInvoke(self.onMethodInvokeStart, invokeEventArgs);
                var result = originalMethod.apply(this, args);
                var afterOriginalInvoked = function (res) {
                    if (!deactivateOptions) {
                        self.viewRefresher.refreshViews(isBroadcast, vm);
                    }
                    tryInvoke(self.onMethodInvokeEnd, invokeEventArgs);
                    return res;
                };
                if (isPromise(result) && !anyOptions.immediate) {
                    return result.then(afterOriginalInvoked);
                }
                else {
                    return afterOriginalInvoked(result);
                }
            };
        }
        else {
            finalMethod = originalMethod;
        }
        vm[methodName] = finalMethod.bind(vm);
    };
    return VmResolver;
}());


// CONCATENATED MODULE: ./src/core/Provider.tsx
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Provider_Provider = (function (_super) {
    __extends(Provider, _super);
    function Provider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Provider.prototype.render = function () {
        this.setResolver();
        return (external_react_["createElement"](internalContext_Provider, { value: { resolver: this.vmResolver } }, this.props.children));
    };
    Provider.prototype.setResolver = function () {
        if (!this.props.resolver)
            return;
        if (this.vmResolver && this.vmResolver.internalResolver === this.props.resolver) {
            return;
        }
        this.vmResolver = new vmResolver_VmResolver(this.props.resolver, this);
        this.vmResolver.onMethodInvokeStart = this.props.onMethodInvokeStart;
        this.vmResolver.onMethodInvokeEnd = this.props.onMethodInvokeEnd;
    };
    return Provider;
}(external_react_["PureComponent"]));


// CONCATENATED MODULE: ./src/core/withViewModel.tsx
var withViewModel_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};




var withViewModel = function (VmClass) { return function (Component) {
    var ComponentWithViewModel = (function (_super) {
        withViewModel_extends(ComponentWithViewModel, _super);
        function ComponentWithViewModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ComponentWithViewModel.prototype.componentDidMount = function () {
            this.activate();
        };
        ComponentWithViewModel.prototype.render = function () {
            var _this = this;
            return (external_react_["createElement"](Consumer, null, function (context) {
                _this.init(context);
                var componentProps = assignWithProperties({}, _this.vm, _this.props);
                return external_react_["createElement"](Component, __assign({}, componentProps));
            }));
        };
        ComponentWithViewModel.prototype.componentWillUnmount = function () {
            this.deactivate();
        };
        ComponentWithViewModel.prototype.init = function (context) {
            if (this.vm)
                return;
            if (!context)
                throw new Error('Context not found. Make sure you use the Provider component.');
            if (!context.resolver)
                throw new Error('Resolver not found. Make sure you use the Provider component.');
            this.vm = context.resolver.get(VmClass);
            var vmInfo = vmContext_VmContext.getContext(this.vm);
            if (!vmInfo)
                throw new Error("Class " + this.vm.constructor.name + " is used as a view-model but no decorator was used.");
            vmInfo.registerView(this);
        };
        ComponentWithViewModel.prototype.activate = function () {
            var vmContext = vmContext_VmContext.getContext(this.vm);
            this.invokeMethods(Object.keys(vmContext.activate || {}));
        };
        ComponentWithViewModel.prototype.deactivate = function () {
            var vmContext = vmContext_VmContext.getContext(this.vm);
            vmContext.unregisterView(this);
            this.invokeMethods(Object.keys(vmContext.deactivate || {}));
        };
        ComponentWithViewModel.prototype.invokeMethods = function (methodNames) {
            for (var _i = 0, methodNames_1 = methodNames; _i < methodNames_1.length; _i++) {
                var name_1 = methodNames_1[_i];
                var method = this.vm[name_1];
                if (typeof method !== 'function')
                    return;
                method();
            }
        };
        return ComponentWithViewModel;
    }(external_react_["PureComponent"]));
    var originalDisplayName = Component.displayName || Component.name || 'Component';
    ComponentWithViewModel.displayName = "WithViewModel(" + originalDisplayName + ")";
    return ComponentWithViewModel;
}; };

// CONCATENATED MODULE: ./src/core/index.ts



// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "action", function() { return action; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "activate", function() { return activate; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "broadcast", function() { return broadcast; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "deactivate", function() { return deactivate; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "viewModel", function() { return viewModel; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Provider", function() { return Provider_Provider; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "withViewModel", function() { return withViewModel; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ActionOptions", function() { return ActionOptions; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "createMethodInvokeArgs", function() { return createMethodInvokeArgs; });






/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Alon\Documents\devel\react-peppermint\src\index.ts */"./src/index.ts");


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
});
//# sourceMappingURL=react-peppermint.js.map