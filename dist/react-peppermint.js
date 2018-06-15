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
  !*** ./src/index.ts + 16 modules ***!
  \***********************************/
/*! exports provided: action, activate, broadcast, deactivate, viewModel, Provider, withViewModel */
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
var VIEW_MODEL_INSTANCE_INFO = Symbol('REACT-VIEW-MODEL.INSTANCE_INFO');
var VIEW_MODEL_CLASS_INFO = Symbol('REACT-VIEW-MODEL.CLASS_INFO');

// CONCATENATED MODULE: ./src/utils.ts

var DescriptorType;
(function (DescriptorType) {
    DescriptorType["None"] = "None";
    DescriptorType["Field"] = "Field";
    DescriptorType["Property"] = "Property";
    DescriptorType["Method"] = "Method";
})(DescriptorType || (DescriptorType = {}));
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

// CONCATENATED MODULE: ./src/info/viewModelClassInfo.ts


var viewModelClassInfo_ViewModelClassInfo = (function () {
    function ViewModelClassInfo() {
        this.refresh = {};
        this.refreshAll = {};
    }
    ViewModelClassInfo.getInfo = function (obj) {
        if (!obj)
            return undefined;
        var ownInfo = ViewModelClassInfo.getOwnInfo(obj);
        if (ownInfo)
            return ownInfo;
        var baseInfo = ViewModelClassInfo.getBaseInfo(obj);
        if (baseInfo)
            return ViewModelClassInfo.initInfo(obj);
        return undefined;
    };
    ViewModelClassInfo.getOrInitInfo = function (obj) {
        var info = ViewModelClassInfo.getInfo(obj);
        if (info)
            return info;
        return ViewModelClassInfo.initInfo(obj);
    };
    ViewModelClassInfo.getOwnInfo = function (obj) {
        if (typeof obj === 'object') {
            return getConstructorOwnProp(obj, VIEW_MODEL_CLASS_INFO);
        }
        else {
            return getOwnSymbol(obj, VIEW_MODEL_CLASS_INFO);
        }
    };
    ViewModelClassInfo.getBaseInfo = function (obj) {
        if (typeof obj === 'object') {
            return getConstructorProp(obj, VIEW_MODEL_CLASS_INFO);
        }
        else {
            return getSymbol(obj, VIEW_MODEL_CLASS_INFO);
        }
    };
    ViewModelClassInfo.initInfo = function (obj) {
        var isConstructor = (typeof obj === 'function' ? true : false);
        var target = (isConstructor ? obj : obj.constructor);
        var baseInfo = getSymbol(target, VIEW_MODEL_CLASS_INFO);
        var selfInfo = Object.assign(new ViewModelClassInfo(), baseInfo);
        return setSymbol(target, VIEW_MODEL_CLASS_INFO, selfInfo);
    };
    return ViewModelClassInfo;
}());


// CONCATENATED MODULE: ./src/info/viewModelInstanceInfo.ts

var viewModelInstanceInfo_ViewModelInstanceInfo = (function () {
    function ViewModelInstanceInfo() {
        this.refreshView = new Map();
    }
    ViewModelInstanceInfo.getInfo = function (vm) {
        if (!vm)
            return undefined;
        return getSymbol(vm, VIEW_MODEL_INSTANCE_INFO);
    };
    ViewModelInstanceInfo.initInfo = function (vm) {
        var info = new ViewModelInstanceInfo();
        return setSymbol(vm, VIEW_MODEL_INSTANCE_INFO, info);
    };
    return ViewModelInstanceInfo;
}());


// CONCATENATED MODULE: ./src/info/index.ts



// CONCATENATED MODULE: ./src/decorators/action.ts

function action(target, propertyKey) {
    var info = viewModelClassInfo_ViewModelClassInfo.getOrInitInfo(target);
    info.refresh[propertyKey] = true;
}

// CONCATENATED MODULE: ./src/decorators/activate.ts

function activate(target, propertyKey) {
    var info = viewModelClassInfo_ViewModelClassInfo.getOrInitInfo(target);
    info.activate = propertyKey;
}

// CONCATENATED MODULE: ./src/decorators/broadcast.ts

function broadcast(target, propertyKey) {
    var info = viewModelClassInfo_ViewModelClassInfo.getOrInitInfo(target);
    info.refreshAll[propertyKey] = true;
}

// CONCATENATED MODULE: ./src/decorators/deactivate.ts

function deactivate(target, propertyKey) {
    var info = viewModelClassInfo_ViewModelClassInfo.getOrInitInfo(target);
    info.deactivate = propertyKey;
}

// CONCATENATED MODULE: ./src/decorators/viewModel.ts

function viewModel(ctor) {
    viewModelClassInfo_ViewModelClassInfo.getOrInitInfo(ctor);
}

// CONCATENATED MODULE: ./src/decorators/index.ts






// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("react");

// CONCATENATED MODULE: ./src/core/reactContext.ts

var reactContext_a = external_react_["createContext"](undefined), reactContext_Provider = reactContext_a.Provider, Consumer = reactContext_a.Consumer;


// CONCATENATED MODULE: ./src/core/vmResolver.ts


var vmResolver_VmResolver = (function () {
    function VmResolver(internalContainer, refreshAll) {
        this.internalResolver = internalContainer;
        this.refreshAll = refreshAll;
    }
    VmResolver.prototype.get = function (key) {
        var instance = this.internalResolver.get(key);
        var vmInfo = viewModelClassInfo_ViewModelClassInfo.getInfo(instance);
        if (vmInfo) {
            this.patchViewModel(instance, vmInfo);
        }
        return instance;
    };
    VmResolver.prototype.patchViewModel = function (vm, vmClassInfo) {
        var self = this;
        var vmInstanceInfo = viewModelInstanceInfo_ViewModelInstanceInfo.initInfo(vm);
        var vmMethods = getMethods(vm);
        var _loop_1 = function (methodName) {
            var originalMethod = vm[methodName];
            var isAction = vmClassInfo.refresh[methodName];
            var isBroadcast = vmClassInfo.refreshAll[methodName];
            if (isAction || isBroadcast) {
                var freshWrapper = function () {
                    var start;
                    if (true) {
                        start = Date.now();
                    }
                    var result = originalMethod.apply(this, arguments);
                    if (isAction) {
                        vmInstanceInfo.refreshView.forEach(function (refresh) { return refresh(); });
                    }
                    else if (isBroadcast) {
                        self.refreshAll();
                    }
                    if (true) {
                        var totalTime = Date.now() - start;
                        console.log("[" + vm.constructor.name + "] " + methodName + " - " + totalTime + "ms");
                    }
                    return result;
                };
                vm[methodName] = freshWrapper.bind(vm);
            }
            else {
                vm[methodName] = originalMethod.bind(vm);
            }
        };
        for (var _i = 0, _a = Object.keys(vmMethods); _i < _a.length; _i++) {
            var methodName = _a[_i];
            _loop_1(methodName);
        }
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
        this.setContainer();
        return (external_react_["createElement"](reactContext_Provider, { value: { resolver: this.vmResolver } }, this.props.children));
    };
    Provider.prototype.setContainer = function () {
        if (!this.props.resolver)
            return;
        if (this.vmResolver && this.vmResolver.internalResolver === this.props.resolver) {
            return;
        }
        this.vmResolver = new vmResolver_VmResolver(this.props.resolver, this.forceUpdate.bind(this));
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
    return (function (_super) {
        withViewModel_extends(ComponentWithViewModel, _super);
        function ComponentWithViewModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ComponentWithViewModel.prototype.componentDidMount = function () {
            if (!this.vm)
                return;
            var vmInfo = viewModelInstanceInfo_ViewModelInstanceInfo.getInfo(this.vm);
            var activateKey = vmInfo.activate;
            if (activateKey) {
                var activateMethod = this.vm[activateKey];
                if (typeof activateMethod === 'function') {
                    if (true) {
                        console.log("[" + this.vm.constructor.name + "] activate");
                    }
                    activateMethod();
                }
            }
        };
        ComponentWithViewModel.prototype.render = function () {
            var _this = this;
            return (external_react_["createElement"](Consumer, null, function (context) {
                _this.setVm(context.resolver);
                return external_react_["createElement"](Component, __assign({}, _this.vm, _this.props));
            }));
        };
        ComponentWithViewModel.prototype.componentWillUnmount = function () {
            var vmInfo = viewModelInstanceInfo_ViewModelInstanceInfo.getInfo(this.vm);
            vmInfo.refreshView.delete(this);
            var deactivateKey = vmInfo.deactivate;
            if (deactivateKey) {
                var deactivateMethod = this.vm[deactivateKey];
                if (typeof deactivateMethod === 'function') {
                    if (true) {
                        console.log("[" + this.vm.constructor.name + "] deactivate");
                    }
                    deactivateMethod();
                }
            }
        };
        ComponentWithViewModel.prototype.setVm = function (resolver) {
            if (this.vm)
                return;
            this.vm = resolver.get(VmClass);
            var vmInfo = viewModelInstanceInfo_ViewModelInstanceInfo.getInfo(this.vm);
            if (!vmInfo) {
                throw new Error("Class " + this.vm.constructor.name + " is used as a view-model but no decorator was used.");
            }
            vmInfo.refreshView.set(this, this.forceUpdate.bind(this));
        };
        return ComponentWithViewModel;
    }(external_react_["PureComponent"]));
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