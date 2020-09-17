"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

require("@testing-library/jest-dom");

var _react2 = require("@testing-library/react");

var _ = require("../");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

describe('Tehc', function () {
  afterEach(function () {
    (0, _react2.cleanup)();
  });
  test('changing state with one argument', function () {
    function FakeComp() {
      var _useTehc = (0, _.useTehc)(),
          _useTehc2 = _slicedToArray(_useTehc, 2),
          state = _useTehc2[0],
          dispatch = _useTehc2[1];

      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
        "data-testid": "state"
      }, state), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return dispatch('updated state');
        }
      }, "Change state"));
    }

    (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.TehcProvider, {
      store: {
        state: 'init state'
      }
    }, /*#__PURE__*/_react["default"].createElement(FakeComp, null)));
    expect(_react2.screen.getByTestId('state')).toHaveTextContent('init state');

    _react2.fireEvent.click(_react2.screen.getByText('Change state'));

    expect(_react2.screen.getByTestId('state')).toHaveTextContent('updated state');
  });
  test('changing state function as a argument', function () {
    function FakeComp() {
      var _useTehc3 = (0, _.useTehc)(),
          _useTehc4 = _slicedToArray(_useTehc3, 2),
          state = _useTehc4[0],
          dispatch = _useTehc4[1];

      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
        "data-testid": "state"
      }, state), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return dispatch(function (prev) {
            return "".concat(prev, " updated state");
          });
        }
      }, "Change state"));
    }

    (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.TehcProvider, {
      store: {
        state: 'init state'
      }
    }, /*#__PURE__*/_react["default"].createElement(FakeComp, null)));
    expect(_react2.screen.getByTestId('state')).toHaveTextContent('init state');

    _react2.fireEvent.click(_react2.screen.getByText('Change state'));

    expect(_react2.screen.getByTestId('state')).toHaveTextContent('init state updated state');
  });
  test('with custom reducer', function () {
    function reducer(state, action) {
      switch (action.type) {
        case 'increment':
          return {
            count: state.count + 1
          };

        case 'decrement':
          return {
            count: state.count - 1
          };

        default:
          throw new Error();
      }
    }

    function Counter() {
      var _useTehc5 = (0, _.useTehc)(),
          _useTehc6 = _slicedToArray(_useTehc5, 2),
          state = _useTehc6[0],
          dispatch = _useTehc6[1];

      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
        "data-testid": "state"
      }, state.count), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return dispatch({
            type: 'increment'
          });
        }
      }, "increment"), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return dispatch({
            type: 'decrement'
          });
        }
      }, "decrement"));
    }

    (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.TehcProvider, {
      store: {
        state: {
          count: 0
        },
        reducer: reducer
      }
    }, /*#__PURE__*/_react["default"].createElement(Counter, null)));
    expect(_react2.screen.getByTestId('state')).toHaveTextContent(0);

    _react2.fireEvent.click(_react2.screen.getByText('increment'));

    expect(_react2.screen.getByTestId('state')).toHaveTextContent(1);

    _react2.fireEvent.click(_react2.screen.getByText('decrement'));

    expect(_react2.screen.getByTestId('state')).toHaveTextContent(0);
  });
  test('with hoc', function () {
    var Hoc = (0, _.TehcHoc)(function (_ref) {
      var state = _ref.state,
          dispatch = _ref.dispatch;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
        "data-testid": "state"
      }, state), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return dispatch('updated state');
        }
      }, "Change state"));
    });
    (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.TehcProvider, {
      store: {
        state: 'some-state'
      }
    }, /*#__PURE__*/_react["default"].createElement(Hoc, null)));
    expect(_react2.screen.getByTestId('state')).toHaveTextContent('some-state');

    _react2.fireEvent.click(_react2.screen.getByRole('button'));

    expect(_react2.screen.getByTestId('state')).toHaveTextContent('updated state');
  });
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TehcHoc = TehcHoc;
exports.TehcProvider = TehcProvider;
exports.useTehc = useTehc;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TehcContext = /*#__PURE__*/(0, _react.createContext)(null);

function TehcHoc(Comp) {
  return function () {
    return /*#__PURE__*/_react["default"].createElement(TehcContext.Consumer, null, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          state = _ref2[0],
          dispatch = _ref2[1];

      return /*#__PURE__*/_react["default"].createElement(Comp, {
        state: state,
        dispatch: handleDispatch(state, dispatch)
      });
    });
  };
}

function reducer(_, action) {
  switch (action.type) {
    case "setState":
      return action.payload;

    default:
      throw new Error();
  }
}

function TehcProvider(_ref3) {
  var store = _ref3.store,
      children = _ref3.children;

  if (!store) {
    throw new Error("\n    You need to add a store: \n      <Tehc store={{ state: \"here\", reducer: \"optional }}>...</Tehc>\n    ");
  }

  if (store.state !== 0 && !store.state) {
    throw new Error("\n    You need to add state: \n      <Tehc store={{ state: \"goes-here\" }}>...</Tehc>\n    ");
  }

  var initReducer = store.reducer || reducer;

  var _useReducer = (0, _react.useReducer)(initReducer, store.state),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  return /*#__PURE__*/_react["default"].createElement(TehcContext.Provider, {
    value: [state, dispatch]
  }, children);
}

function handleDispatch(context, dispatch) {
  return function (args) {
    if (typeof args === "string") {
      return dispatch({
        type: "setState",
        payload: args
      });
    }

    if (typeof args === "function") {
      return dispatch({
        type: "setState",
        payload: args(context)
      });
    }

    if (args.payload) {
      return dispatch({
        type: args.type,
        payload: args.payload
      });
    }

    return dispatch({
      type: args.type,
      payload: args.payload
    });
  };
}

function useTehc() {
  var _useContext = (0, _react.useContext)(TehcContext),
      _useContext2 = _slicedToArray(_useContext, 2),
      context = _useContext2[0],
      dispatch = _useContext2[1];

  if (!context) {
    throw new Error("Wrap your component inside <TechProvider>\u2026</TechProvider>");
  }

  return [context, handleDispatch(context, dispatch)];
}
