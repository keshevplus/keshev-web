function ze(g){return g&&g.__esModule&&Object.prototype.hasOwnProperty.call(g,"default")?g.default:g}function Ge(g){if(Object.prototype.hasOwnProperty.call(g,"__esModule"))return g;var s=g.default;if(typeof s=="function"){var w=function O(){return this instanceof O?Reflect.construct(s,arguments,this.constructor):s.apply(this,arguments)};w.prototype=s.prototype}else w={};return Object.defineProperty(w,"__esModule",{value:!0}),Object.keys(g).forEach(function(O){var h=Object.getOwnPropertyDescriptor(g,O);Object.defineProperty(w,O,h.get?h:{enumerable:!0,get:function(){return g[O]}})}),w}var te={exports:{}},L={exports:{}};L.exports;var Re;function He(){return Re||(Re=1,function(g,s){/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){function w(e,t){Object.defineProperty(v.prototype,e,{get:function(){console.warn("%s(...) is deprecated in plain JavaScript React classes. %s",t[0],t[1])}})}function O(e){return e===null||typeof e!="object"?null:(e=fe&&e[fe]||e["@@iterator"],typeof e=="function"?e:null)}function h(e,t){e=(e=e.constructor)&&(e.displayName||e.name)||"ReactClass";var n=e+"."+t;le[n]||(console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",t,e),le[n]=!0)}function v(e,t,n){this.props=e,this.context=t,this.refs=J,this.updater=n||de}function M(){}function j(e,t,n){this.props=e,this.context=t,this.refs=J,this.updater=n||de}function m(e){return""+e}function k(e){try{m(e);var t=!1}catch{t=!0}if(t){t=console;var n=t.error,a=typeof Symbol=="function"&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object";return n.call(t,"The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",a),m(e)}}function R(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Le?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case X:return"Fragment";case ue:return"Profiler";case ae:return"StrictMode";case ce:return"Suspense";case Pe:return"SuspenseList";case Ne:return"Activity"}if(typeof e=="object")switch(typeof e.tag=="number"&&console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),e.$$typeof){case oe:return"Portal";case se:return(e.displayName||"Context")+".Provider";case x:return(e._context.displayName||"Context")+".Consumer";case ie:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Z:return t=e.displayName||null,t!==null?t:R(e.type)||"Memo";case Y:t=e._payload,e=e._init;try{return R(e(t))}catch{}}return null}function o(e){if(e===X)return"<>";if(typeof e=="object"&&e!==null&&e.$$typeof===Y)return"<...>";try{var t=R(e);return t?"<"+t+">":"<...>"}catch{return"<...>"}}function r(){var e=l.A;return e===null?null:e.getOwner()}function i(){return Error("react-stack-top-frame")}function b(e){if(q.call(e,"key")){var t=Object.getOwnPropertyDescriptor(e,"key").get;if(t&&t.isReactWarning)return!1}return e.key!==void 0}function S(e,t){function n(){he||(he=!0,console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",t))}n.isReactWarning=!0,Object.defineProperty(e,"key",{get:n,configurable:!0})}function P(){var e=R(this.type);return _e[e]||(_e[e]=!0,console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")),e=this.props.ref,e!==void 0?e:null}function B(e,t,n,a,u,d,c,p){return n=d.ref,e={$$typeof:Q,type:e,key:t,props:d,_owner:u},(n!==void 0?n:null)!==null?Object.defineProperty(e,"ref",{enumerable:!1,get:P}):Object.defineProperty(e,"ref",{enumerable:!1,value:null}),e._store={},Object.defineProperty(e._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:0}),Object.defineProperty(e,"_debugInfo",{configurable:!1,enumerable:!1,writable:!0,value:null}),Object.defineProperty(e,"_debugStack",{configurable:!1,enumerable:!1,writable:!0,value:c}),Object.defineProperty(e,"_debugTask",{configurable:!1,enumerable:!1,writable:!0,value:p}),Object.freeze&&(Object.freeze(e.props),Object.freeze(e)),e}function Ae(e,t){return t=B(e.type,t,void 0,void 0,e._owner,e.props,e._debugStack,e._debugTask),e._store&&(t._store.validated=e._store.validated),t}function A(e){return typeof e=="object"&&e!==null&&e.$$typeof===Q}function Ce(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}function F(e,t){return typeof e=="object"&&e!==null&&e.key!=null?(k(e.key),Ce(""+e.key)):t.toString(36)}function ne(){}function De(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(ne,ne):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function C(e,t,n,a,u){var d=typeof e;(d==="undefined"||d==="boolean")&&(e=null);var c=!1;if(e===null)c=!0;else switch(d){case"bigint":case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case Q:case oe:c=!0;break;case Y:return c=e._init,C(c(e._payload),t,n,a,u)}}if(c){c=e,u=u(c);var p=a===""?"."+F(c,0):a;return ge(u)?(n="",p!=null&&(n=p.replace(be,"$&/")+"/"),C(u,t,n,"",function(T){return T})):u!=null&&(A(u)&&(u.key!=null&&(c&&c.key===u.key||k(u.key)),n=Ae(u,n+(u.key==null||c&&c.key===u.key?"":(""+u.key).replace(be,"$&/")+"/")+p),a!==""&&c!=null&&A(c)&&c.key==null&&c._store&&!c._store.validated&&(n._store.validated=2),u=n),t.push(u)),1}if(c=0,p=a===""?".":a+":",ge(e))for(var f=0;f<e.length;f++)a=e[f],d=p+F(a,f),c+=C(a,t,n,d,u);else if(f=O(e),typeof f=="function")for(f===e.entries&&(ve||console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),ve=!0),e=f.call(e),f=0;!(a=e.next()).done;)a=a.value,d=p+F(a,f++),c+=C(a,t,n,d,u);else if(d==="object"){if(typeof e.then=="function")return C(De(e),t,n,a,u);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return c}function I(e,t,n){if(e==null)return e;var a=[],u=0;return C(e,a,"","",function(d){return t.call(n,d,u++)}),a}function Me(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return t=e._result,t===void 0&&console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,t),"default"in t||console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,t),t.default;throw e._result}function y(){var e=l.H;return e===null&&console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),e}function je(){}function $(e){if(W===null)try{var t=("require"+Math.random()).slice(0,7);W=(g&&g[t]).call(g,"timers").setImmediate}catch{W=function(a){Ee===!1&&(Ee=!0,typeof MessageChannel>"u"&&console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var u=new MessageChannel;u.port1.onmessage=a,u.port2.postMessage(void 0)}}return W(e)}function N(e){return 1<e.length&&typeof AggregateError=="function"?new AggregateError(e):e[0]}function U(e,t){t!==z-1&&console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),z=t}function K(e,t,n){var a=l.actQueue;if(a!==null)if(a.length!==0)try{V(a),$(function(){return K(e,t,n)});return}catch(u){l.thrownErrors.push(u)}else l.actQueue=null;0<l.thrownErrors.length?(a=N(l.thrownErrors),l.thrownErrors.length=0,n(a)):t(e)}function V(e){if(!ee){ee=!0;var t=0;try{for(;t<e.length;t++){var n=e[t];do{l.didUsePromise=!1;var a=n(!1);if(a!==null){if(l.didUsePromise){e[t]=n,e.splice(0,t);return}n=a}else break}while(!0)}e.length=0}catch(u){e.splice(0,t+1),l.thrownErrors.push(u)}finally{ee=!1}}}typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var Q=Symbol.for("react.transitional.element"),oe=Symbol.for("react.portal"),X=Symbol.for("react.fragment"),ae=Symbol.for("react.strict_mode"),ue=Symbol.for("react.profiler"),x=Symbol.for("react.consumer"),se=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),ce=Symbol.for("react.suspense"),Pe=Symbol.for("react.suspense_list"),Z=Symbol.for("react.memo"),Y=Symbol.for("react.lazy"),Ne=Symbol.for("react.activity"),fe=Symbol.iterator,le={},de={isMounted:function(){return!1},enqueueForceUpdate:function(e){h(e,"forceUpdate")},enqueueReplaceState:function(e){h(e,"replaceState")},enqueueSetState:function(e){h(e,"setState")}},pe=Object.assign,J={};Object.freeze(J),v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};var E={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},H;for(H in E)E.hasOwnProperty(H)&&w(H,E[H]);M.prototype=v.prototype,E=j.prototype=new M,E.constructor=j,pe(E,v.prototype),E.isPureReactComponent=!0;var ge=Array.isArray,Le=Symbol.for("react.client.reference"),l={H:null,A:null,T:null,S:null,V:null,actQueue:null,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1,didUsePromise:!1,thrownErrors:[],getCurrentStack:null,recentlyCreatedOwnerStacks:0},q=Object.prototype.hasOwnProperty,ye=console.createTask?console.createTask:function(){return null};E={"react-stack-bottom-frame":function(e){return e()}};var he,me,_e={},Ie=E["react-stack-bottom-frame"].bind(E,i)(),$e=ye(o(i)),ve=!1,be=/\/+/g,Oe=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Ee=!1,W=null,z=0,G=!1,ee=!1,we=typeof queueMicrotask=="function"?function(e){queueMicrotask(function(){return queueMicrotask(e)})}:$;E=Object.freeze({__proto__:null,c:function(e){return y().useMemoCache(e)}}),s.Children={map:I,forEach:function(e,t,n){I(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return I(e,function(){t++}),t},toArray:function(e){return I(e,function(t){return t})||[]},only:function(e){if(!A(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},s.Component=v,s.Fragment=X,s.Profiler=ue,s.PureComponent=j,s.StrictMode=ae,s.Suspense=ce,s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,s.__COMPILER_RUNTIME=E,s.act=function(e){var t=l.actQueue,n=z;z++;var a=l.actQueue=t!==null?t:[],u=!1;try{var d=e()}catch(f){l.thrownErrors.push(f)}if(0<l.thrownErrors.length)throw U(t,n),e=N(l.thrownErrors),l.thrownErrors.length=0,e;if(d!==null&&typeof d=="object"&&typeof d.then=="function"){var c=d;return we(function(){u||G||(G=!0,console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),{then:function(f,T){u=!0,c.then(function(D){if(U(t,n),n===0){try{V(a),$(function(){return K(D,f,T)})}catch(Ye){l.thrownErrors.push(Ye)}if(0<l.thrownErrors.length){var Ue=N(l.thrownErrors);l.thrownErrors.length=0,T(Ue)}}else f(D)},function(D){U(t,n),0<l.thrownErrors.length&&(D=N(l.thrownErrors),l.thrownErrors.length=0),T(D)})}}}var p=d;if(U(t,n),n===0&&(V(a),a.length!==0&&we(function(){u||G||(G=!0,console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"))}),l.actQueue=null),0<l.thrownErrors.length)throw e=N(l.thrownErrors),l.thrownErrors.length=0,e;return{then:function(f,T){u=!0,n===0?(l.actQueue=a,$(function(){return K(p,f,T)})):f(p)}}},s.cache=function(e){return function(){return e.apply(null,arguments)}},s.captureOwnerStack=function(){var e=l.getCurrentStack;return e===null?null:e()},s.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var a=pe({},e.props),u=e.key,d=e._owner;if(t!=null){var c;e:{if(q.call(t,"ref")&&(c=Object.getOwnPropertyDescriptor(t,"ref").get)&&c.isReactWarning){c=!1;break e}c=t.ref!==void 0}c&&(d=r()),b(t)&&(k(t.key),u=""+t.key);for(p in t)!q.call(t,p)||p==="key"||p==="__self"||p==="__source"||p==="ref"&&t.ref===void 0||(a[p]=t[p])}var p=arguments.length-2;if(p===1)a.children=n;else if(1<p){c=Array(p);for(var f=0;f<p;f++)c[f]=arguments[f+2];a.children=c}for(a=B(e.type,u,void 0,void 0,d,a,e._debugStack,e._debugTask),u=2;u<arguments.length;u++)d=arguments[u],A(d)&&d._store&&(d._store.validated=1);return a},s.createContext=function(e){return e={$$typeof:se,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:x,_context:e},e._currentRenderer=null,e._currentRenderer2=null,e},s.createElement=function(e,t,n){for(var a=2;a<arguments.length;a++){var u=arguments[a];A(u)&&u._store&&(u._store.validated=1)}if(a={},u=null,t!=null)for(f in me||!("__self"in t)||"key"in t||(me=!0,console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")),b(t)&&(k(t.key),u=""+t.key),t)q.call(t,f)&&f!=="key"&&f!=="__self"&&f!=="__source"&&(a[f]=t[f]);var d=arguments.length-2;if(d===1)a.children=n;else if(1<d){for(var c=Array(d),p=0;p<d;p++)c[p]=arguments[p+2];Object.freeze&&Object.freeze(c),a.children=c}if(e&&e.defaultProps)for(f in d=e.defaultProps,d)a[f]===void 0&&(a[f]=d[f]);u&&S(a,typeof e=="function"?e.displayName||e.name||"Unknown":e);var f=1e4>l.recentlyCreatedOwnerStacks++;return B(e,u,void 0,void 0,r(),a,f?Error("react-stack-top-frame"):Ie,f?ye(o(e)):$e)},s.createRef=function(){var e={current:null};return Object.seal(e),e},s.forwardRef=function(e){e!=null&&e.$$typeof===Z?console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof e!="function"?console.error("forwardRef requires a render function but was given %s.",e===null?"null":typeof e):e.length!==0&&e.length!==2&&console.error("forwardRef render functions accept exactly two parameters: props and ref. %s",e.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),e!=null&&e.defaultProps!=null&&console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");var t={$$typeof:ie,render:e},n;return Object.defineProperty(t,"displayName",{enumerable:!1,configurable:!0,get:function(){return n},set:function(a){n=a,e.name||e.displayName||(Object.defineProperty(e,"name",{value:a}),e.displayName=a)}}),t},s.isValidElement=A,s.lazy=function(e){return{$$typeof:Y,_payload:{_status:-1,_result:e},_init:Me}},s.memo=function(e,t){e==null&&console.error("memo: The first argument must be a component. Instead received: %s",e===null?"null":typeof e),t={$$typeof:Z,type:e,compare:t===void 0?null:t};var n;return Object.defineProperty(t,"displayName",{enumerable:!1,configurable:!0,get:function(){return n},set:function(a){n=a,e.name||e.displayName||(Object.defineProperty(e,"name",{value:a}),e.displayName=a)}}),t},s.startTransition=function(e){var t=l.T,n={};l.T=n,n._updatedFibers=new Set;try{var a=e(),u=l.S;u!==null&&u(n,a),typeof a=="object"&&a!==null&&typeof a.then=="function"&&a.then(je,Oe)}catch(d){Oe(d)}finally{t===null&&n._updatedFibers&&(e=n._updatedFibers.size,n._updatedFibers.clear(),10<e&&console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")),l.T=t}},s.unstable_useCacheRefresh=function(){return y().useCacheRefresh()},s.use=function(e){return y().use(e)},s.useActionState=function(e,t,n){return y().useActionState(e,t,n)},s.useCallback=function(e,t){return y().useCallback(e,t)},s.useContext=function(e){var t=y();return e.$$typeof===x&&console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"),t.useContext(e)},s.useDebugValue=function(e,t){return y().useDebugValue(e,t)},s.useDeferredValue=function(e,t){return y().useDeferredValue(e,t)},s.useEffect=function(e,t,n){e==null&&console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?");var a=y();if(typeof n=="function")throw Error("useEffect CRUD overload is not enabled in this build of React.");return a.useEffect(e,t)},s.useId=function(){return y().useId()},s.useImperativeHandle=function(e,t,n){return y().useImperativeHandle(e,t,n)},s.useInsertionEffect=function(e,t){return e==null&&console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"),y().useInsertionEffect(e,t)},s.useLayoutEffect=function(e,t){return e==null&&console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"),y().useLayoutEffect(e,t)},s.useMemo=function(e,t){return y().useMemo(e,t)},s.useOptimistic=function(e,t){return y().useOptimistic(e,t)},s.useReducer=function(e,t,n){return y().useReducer(e,t,n)},s.useRef=function(e){return y().useRef(e)},s.useState=function(e){return y().useState(e)},s.useSyncExternalStore=function(e,t,n){return y().useSyncExternalStore(e,t,n)},s.useTransition=function(){return y().useTransition()},s.version="19.1.0",typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())})()}(L,L.exports)),L.exports}var Te;function qe(){return Te||(Te=1,te.exports=He()),te.exports}var re={exports:{}},_={},Se;function We(){if(Se)return _;Se=1;/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */return function(){function g(){}function s(o){return""+o}function w(o,r,i){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;try{s(b);var S=!1}catch{S=!0}return S&&(console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",typeof Symbol=="function"&&Symbol.toStringTag&&b[Symbol.toStringTag]||b.constructor.name||"Object"),s(b)),{$$typeof:k,key:b==null?null:""+b,children:o,containerInfo:r,implementation:i}}function O(o,r){if(o==="font")return"";if(typeof r=="string")return r==="use-credentials"?r:""}function h(o){return o===null?"`null`":o===void 0?"`undefined`":o===""?"an empty string":'something with type "'+typeof o+'"'}function v(o){return o===null?"`null`":o===void 0?"`undefined`":o===""?"an empty string":typeof o=="string"?JSON.stringify(o):typeof o=="number"?"`"+o+"`":'something with type "'+typeof o+'"'}function M(){var o=R.H;return o===null&&console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),o}typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var j=qe(),m={d:{f:g,r:function(){throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.")},D:g,C:g,L:g,m:g,X:g,S:g,M:g},p:0,findDOMNode:null},k=Symbol.for("react.portal"),R=j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;typeof Map=="function"&&Map.prototype!=null&&typeof Map.prototype.forEach=="function"&&typeof Set=="function"&&Set.prototype!=null&&typeof Set.prototype.clear=="function"&&typeof Set.prototype.forEach=="function"||console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),_.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=m,_.createPortal=function(o,r){var i=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!r||r.nodeType!==1&&r.nodeType!==9&&r.nodeType!==11)throw Error("Target container is not a DOM element.");return w(o,r,null,i)},_.flushSync=function(o){var r=R.T,i=m.p;try{if(R.T=null,m.p=2,o)return o()}finally{R.T=r,m.p=i,m.d.f()&&console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.")}},_.preconnect=function(o,r){typeof o=="string"&&o?r!=null&&typeof r!="object"?console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",v(r)):r!=null&&typeof r.crossOrigin!="string"&&console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",h(r.crossOrigin)):console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",h(o)),typeof o=="string"&&(r?(r=r.crossOrigin,r=typeof r=="string"?r==="use-credentials"?r:"":void 0):r=null,m.d.C(o,r))},_.prefetchDNS=function(o){if(typeof o!="string"||!o)console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",h(o));else if(1<arguments.length){var r=arguments[1];typeof r=="object"&&r.hasOwnProperty("crossOrigin")?console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",v(r)):console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",v(r))}typeof o=="string"&&m.d.D(o)},_.preinit=function(o,r){if(typeof o=="string"&&o?r==null||typeof r!="object"?console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",v(r)):r.as!=="style"&&r.as!=="script"&&console.error('ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',v(r.as)):console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",h(o)),typeof o=="string"&&r&&typeof r.as=="string"){var i=r.as,b=O(i,r.crossOrigin),S=typeof r.integrity=="string"?r.integrity:void 0,P=typeof r.fetchPriority=="string"?r.fetchPriority:void 0;i==="style"?m.d.S(o,typeof r.precedence=="string"?r.precedence:void 0,{crossOrigin:b,integrity:S,fetchPriority:P}):i==="script"&&m.d.X(o,{crossOrigin:b,integrity:S,fetchPriority:P,nonce:typeof r.nonce=="string"?r.nonce:void 0})}},_.preinitModule=function(o,r){var i="";if(typeof o=="string"&&o||(i+=" The `href` argument encountered was "+h(o)+"."),r!==void 0&&typeof r!="object"?i+=" The `options` argument encountered was "+h(r)+".":r&&"as"in r&&r.as!=="script"&&(i+=" The `as` option encountered was "+v(r.as)+"."),i)console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",i);else switch(i=r&&typeof r.as=="string"?r.as:"script",i){case"script":break;default:i=v(i),console.error('ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',i,o)}typeof o=="string"&&(typeof r=="object"&&r!==null?(r.as==null||r.as==="script")&&(i=O(r.as,r.crossOrigin),m.d.M(o,{crossOrigin:i,integrity:typeof r.integrity=="string"?r.integrity:void 0,nonce:typeof r.nonce=="string"?r.nonce:void 0})):r==null&&m.d.M(o))},_.preload=function(o,r){var i="";if(typeof o=="string"&&o||(i+=" The `href` argument encountered was "+h(o)+"."),r==null||typeof r!="object"?i+=" The `options` argument encountered was "+h(r)+".":typeof r.as=="string"&&r.as||(i+=" The `as` option encountered was "+h(r.as)+"."),i&&console.error('ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',i),typeof o=="string"&&typeof r=="object"&&r!==null&&typeof r.as=="string"){i=r.as;var b=O(i,r.crossOrigin);m.d.L(o,i,{crossOrigin:b,integrity:typeof r.integrity=="string"?r.integrity:void 0,nonce:typeof r.nonce=="string"?r.nonce:void 0,type:typeof r.type=="string"?r.type:void 0,fetchPriority:typeof r.fetchPriority=="string"?r.fetchPriority:void 0,referrerPolicy:typeof r.referrerPolicy=="string"?r.referrerPolicy:void 0,imageSrcSet:typeof r.imageSrcSet=="string"?r.imageSrcSet:void 0,imageSizes:typeof r.imageSizes=="string"?r.imageSizes:void 0,media:typeof r.media=="string"?r.media:void 0})}},_.preloadModule=function(o,r){var i="";typeof o=="string"&&o||(i+=" The `href` argument encountered was "+h(o)+"."),r!==void 0&&typeof r!="object"?i+=" The `options` argument encountered was "+h(r)+".":r&&"as"in r&&typeof r.as!="string"&&(i+=" The `as` option encountered was "+h(r.as)+"."),i&&console.error('ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',i),typeof o=="string"&&(r?(i=O(r.as,r.crossOrigin),m.d.m(o,{as:typeof r.as=="string"&&r.as!=="script"?r.as:void 0,crossOrigin:i,integrity:typeof r.integrity=="string"?r.integrity:void 0})):m.d.m(o))},_.requestFormReset=function(o){m.d.r(o)},_.unstable_batchedUpdates=function(o,r){return o(r)},_.useFormState=function(o,r,i){return M().useFormState(o,r,i)},_.useFormStatus=function(){return M().useHostTransitionStatus()},_.version="19.1.0",typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}(),_}var ke;function Be(){return ke||(ke=1,re.exports=We()),re.exports}export{Be as a,Ge as b,ze as g,qe as r};
