"use strict";
(self["webpackChunksuftnet"] = self["webpackChunksuftnet"] || []).push([[296],{

/***/ 3758:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(745);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(885);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
;// CONCATENATED MODULE: ./src/hooks/useMobile.js


var useMobile = function useMobile() {
  var _useState = (0,react.useState)(false),
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
    isMobile = _useState2[0],
    setMobile = _useState2[1];
  var _useState3 = (0,react.useState)(false),
    _useState4 = (0,slicedToArray/* default */.Z)(_useState3, 2),
    md = _useState4[0],
    setMd = _useState4[1];
  var _useState5 = (0,react.useState)(false),
    _useState6 = (0,slicedToArray/* default */.Z)(_useState5, 2),
    lg = _useState6[0],
    setLg = _useState6[1];
  var _useState7 = (0,react.useState)(false),
    _useState8 = (0,slicedToArray/* default */.Z)(_useState7, 2),
    xlg = _useState8[0],
    setXlg = _useState8[1];
  var _useState9 = (0,react.useState)(false),
    _useState10 = (0,slicedToArray/* default */.Z)(_useState9, 2),
    xxlg = _useState10[0],
    setXxlg = _useState10[1];
  (0,react.useEffect)(function () {
    window.addEventListener('resize', handleResize);
  }, []);
  var handleResize = function handleResize() {
    setMobile(false);
    setMd(false);
    setLg(false);
    setXlg(false);
    if (window.innerWidth <= 760) {
      setMobile(true);
    } else if (window.innerWidth >= 761 && window.innerWidth <= 800) {
      setMd(true);
    } else if (window.innerWidth >= 801 && window.innerWidth <= 1024) {
      setLg(true);
    } else if (window.innerWidth >= 1025 && window.innerWidth <= 1280) {
      setXlg(true);
    } else if (window.innerWidth >= 1280) {
      setXxlg(true);
    }
  };
  return {
    isMobile,
    md,
    lg,
    xlg,
    xxlg
  };
};
/* harmony default export */ var hooks_useMobile = (useMobile);
;// CONCATENATED MODULE: ./src/components/shared/appContext.jsx


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,defineProperty/* default */.Z)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



var appContext = /*#__PURE__*/(0,react.createContext)();
var useAppContext = function useAppContext() {
  return react.useContext(appContext);
};
var initialState = {};
var AppContextProvider = function AppContextProvider(_ref) {
  var children = _ref.children;
  var _useMobile = hooks_useMobile(),
    isMobile = _useMobile.isMobile;
  var _useState = (0,react.useState)(_objectSpread(_objectSpread({}, initialState), {}, {
      isMobile
    })),
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  var action = {};
  return /*#__PURE__*/react.createElement(appContext.Provider, {
    value: _objectSpread(_objectSpread({}, action), state)
  }, children);
};
AppContextProvider.propTypes = {
  children: (prop_types_default()).node
};
/* harmony default export */ var shared_appContext = (AppContextProvider);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 12 modules
var es = __webpack_require__(7858);
// EXTERNAL MODULE: ./node_modules/react-router-dom/dist/index.js
var dist = __webpack_require__(9655);
// EXTERNAL MODULE: ./node_modules/react-router/dist/index.js
var react_router_dist = __webpack_require__(9250);
// EXTERNAL MODULE: ./node_modules/suftnet-ui-kit/dist/index.js
var suftnet_ui_kit_dist = __webpack_require__(8932);
;// CONCATENATED MODULE: ./src/routers/public-route.js




var PublicRoute = function PublicRoute() {
  return /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Container */.W2, {
    className: 'bg-body'
  }, /*#__PURE__*/react.createElement(react_router_dist/* Outlet */.j3, null));
};

;// CONCATENATED MODULE: ./src/routers/protected-route.js






var ProtectedRoute = function ProtectedRoute() {
  var _useAppContext = useAppContext(),
    user = _useAppContext.user;
  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  return /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Container */.W2, {
    style: {
      background: '#ffffff'
    }
  }, /*#__PURE__*/react.createElement(react_router_dist/* Outlet */.j3, null));
};

// EXTERNAL MODULE: ./node_modules/react-icons/fa/index.esm.js + 4 modules
var index_esm = __webpack_require__(1871);
;// CONCATENATED MODULE: ./src/assets/imgs/logo.png
/* harmony default export */ var logo = ("/imgs/logo.dffabacf685e7787c14e4a1febadfeeb.png");
;// CONCATENATED MODULE: ./src/components/public/header/logo.jsx



var Logo = function Logo() {
  return /*#__PURE__*/react.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Link */.rU, {
    className: "p-0",
    secondary: true,
    href: "/",
    onClick: function onClick() {
      return console.log('');
    }
  }, /*#__PURE__*/react.createElement("img", {
    src: logo,
    alt: "arnaty logo",
    className: "img-fluid"
  })));
};
/* harmony default export */ var header_logo = (Logo);
;// CONCATENATED MODULE: ./src/components/public/header/menu.jsx


var Menu = function Menu(_ref) {
  var _ref$styles = _ref.styles,
    styles = _ref$styles === void 0 ? 'menu' : _ref$styles;
  return /*#__PURE__*/react.createElement("div", {
    className: styles
  }, /*#__PURE__*/react.createElement(dist/* Link */.rU, {
    to: "/"
  }, "My Books"), /*#__PURE__*/react.createElement(dist/* Link */.rU, {
    to: "/contact-us"
  }, "Contact"));
};
/* harmony default export */ var menu = (Menu);
;// CONCATENATED MODULE: ./src/hooks/useSticky.js


var useSticky = function useSticky() {
  var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  var _useState = (0,react.useState)(false),
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
    sticky = _useState2[0],
    setSticky = _useState2[1];

  // scroll listener
  var listener = (0,react.useCallback)(function () {
    if (window.scrollY > height) setSticky(true);else setSticky(false);
  }, [height]);
  (0,react.useEffect)(function () {
    if (!window) return;
    window.addEventListener('scroll', listener);
    // eslint-disable-next-line consistent-return
    return function () {
      return window.removeEventListener('scroll', listener);
    };
  }, [listener]);
  return sticky;
};
/* harmony default export */ var hooks_useSticky = (useSticky);
;// CONCATENATED MODULE: ./src/components/public/shared/app-container.jsx

function app_container_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function app_container_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? app_container_ownKeys(Object(source), !0).forEach(function (key) { (0,defineProperty/* default */.Z)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : app_container_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var AppContainer = function AppContainer(props) {
  var fluid = props.fluid,
    _props$className = props.className,
    className = _props$className === void 0 ? "" : _props$className,
    children = props.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "app-container ".concat(fluid ? "app-container--fluid" : "", " ").concat(className)
  }, children);
};
var ContainerWindow = function ContainerWindow(_ref) {
  var children = _ref.children,
    width = _ref.width,
    style = _ref.style;
  var containerStyle = width ? app_container_objectSpread({
    width: "".concat(width, "%")
  }, style) : style;
  return /*#__PURE__*/react.createElement("div", {
    className: "container_window",
    style: containerStyle
  }, /*#__PURE__*/react.createElement("div", {
    className: "center_window"
  }, children));
};
;// CONCATENATED MODULE: ./src/components/public/header/index.jsx








var SiteHeader = function SiteHeader() {
  var _useMobile = hooks_useMobile(),
    isMobile = _useMobile.isMobile;
  var sticky = hooks_useSticky(200);
  return /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Header */.h4, {
    justifyContent: "center",
    direction: "column",
    alignItems: "center",
    className: "bg-warning1 header p-0 ".concat(sticky ? 'sticky' : '')
  }, /*#__PURE__*/react.createElement(ContainerWindow, {
    width: 70
  }, /*#__PURE__*/react.createElement("nav", {
    className: "flex-row justify-content-between align-items-center w-100 ".concat(isMobile ? 'flex__mobile w-100 p-4' : '', " ")
  }, /*#__PURE__*/react.createElement(header_logo, {
    isMobile: isMobile
  }), !isMobile ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(menu, null)) : /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(index_esm/* FaBars */.Fm7, {
    size: 30,
    className: "hamburger",
    onClick: function onClick() {
      setIsPanelOpen(true);
    }
  })))));
};
/* harmony default export */ var header = (SiteHeader);
;// CONCATENATED MODULE: ./src/assets/imgs/logo_1.png
/* harmony default export */ var logo_1 = ("/imgs/logo_1.d85d157e5ffa8b52ef266ac07637458a.png");
;// CONCATENATED MODULE: ./src/assets/imgs/map.png
/* harmony default export */ var map = ("/imgs/map.2a0de09702556fb8529b7958cd735df5.png");
;// CONCATENATED MODULE: ./src/components/public/footer/large-footer.jsx






var BigFooter = function BigFooter(props) {
  var _props$bg;
  var _useMobile = hooks_useMobile(),
    isMobile = _useMobile.isMobile;
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Footer */.$_, null, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Flex */.kC, {
    justifyContent: "center",
    direction: "column",
    alignItems: "center",
    className: "".concat(isMobile ? 'p-5' : 'p-7', " w-100 ").concat((_props$bg = props === null || props === void 0 ? void 0 : props.bg) !== null && _props$bg !== void 0 ? _props$bg : props === null || props === void 0 ? void 0 : props.bg)
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    row: true,
    spacing: 5,
    className: "".concat(isMobile ? "w-100" : 'w-80')
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    col: true,
    lg: 4,
    xs: 12
  }, /*#__PURE__*/react.createElement("img", {
    src: logo_1,
    alt: "Logo"
  }), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h5",
    className: "text-lead text_small1"
  }, "We're a team of IT professionals dedicated to delivering cutting-edge solutions that help Organization of all sizes stay ahead of the curve."), /*#__PURE__*/react.createElement("div", {
    className: "social-list-wrap mt-3"
  }, /*#__PURE__*/react.createElement("ul", {
    className: "social-list list-inline list-unstyled"
  }, /*#__PURE__*/react.createElement("li", {
    className: "list-inline-item"
  }, /*#__PURE__*/react.createElement("a", {
    href: "/#",
    target: "_blank",
    title: "Facebook"
  }, /*#__PURE__*/react.createElement("span", {
    className: "ti-facebook text_small2"
  }))), /*#__PURE__*/react.createElement("li", {
    className: "list-inline-item"
  }, /*#__PURE__*/react.createElement("a", {
    href: "/#",
    target: "_blank",
    title: "Twitter"
  }, /*#__PURE__*/react.createElement("span", {
    className: "ti-twitter text_small2"
  }))), /*#__PURE__*/react.createElement("li", {
    className: "list-inline-item"
  }, /*#__PURE__*/react.createElement("a", {
    href: "/#",
    target: "_blank",
    title: "Instagram"
  }, /*#__PURE__*/react.createElement("span", {
    className: "ti-instagram text_small2"
  }))), /*#__PURE__*/react.createElement("li", {
    className: "list-inline-item"
  }, /*#__PURE__*/react.createElement("a", {
    href: "/#",
    target: "_blank",
    title: "printerst"
  }, /*#__PURE__*/react.createElement("span", {
    className: "ti-pinterest text_small2"
  })))))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    col: true,
    lg: 2,
    xs: 12
  }, /*#__PURE__*/react.createElement("ul", {
    className: "list-unstyled"
  }, /*#__PURE__*/react.createElement("li", {
    className: "mb-2"
  }, /*#__PURE__*/react.createElement(dist/* Link */.rU, {
    to: "#",
    className: "p-0"
  }, "How it works")), /*#__PURE__*/react.createElement("li", {
    className: "mb-2"
  }, /*#__PURE__*/react.createElement(dist/* Link */.rU, {
    to: "#",
    className: "p-0"
  }, "Pricing")), /*#__PURE__*/react.createElement("li", {
    className: "mb-2"
  }, /*#__PURE__*/react.createElement(dist/* Link */.rU, {
    to: "#",
    className: "p-0"
  }, "Features")), /*#__PURE__*/react.createElement("li", {
    className: "mb-2"
  }, /*#__PURE__*/react.createElement(dist/* Link */.rU, {
    to: "#",
    className: "p-0"
  }, "FAQS")), /*#__PURE__*/react.createElement("li", {
    className: "mb-2"
  }, /*#__PURE__*/react.createElement(dist/* Link */.rU, {
    to: "#",
    className: "p-0"
  }, "Contact Us")))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    col: true,
    lg: 2,
    xs: 12
  }, /*#__PURE__*/react.createElement("ul", {
    className: "list-unstyled"
  }, /*#__PURE__*/react.createElement("li", {
    className: "mb-2  flex-row justify-content-start align-items-center"
  }, /*#__PURE__*/react.createElement("span", {
    className: "ti-mobile"
  }), /*#__PURE__*/react.createElement(dist/* Link */.rU, {
    href: "tel:+020 8144 3161",
    className: "p-0 ms-2"
  }, ' ', "(+44)-020 8144 3161")), /*#__PURE__*/react.createElement("li", {
    className: "mb-2  flex-row justify-content-start align-items-center"
  }, /*#__PURE__*/react.createElement("span", {
    className: "ti-email"
  }), /*#__PURE__*/react.createElement(dist/* Link */.rU, {
    href: "mailto:info@suftnet.com",
    className: "p-0 ms-2"
  }, ' ', "info@suftnet.com")), /*#__PURE__*/react.createElement("li", {
    className: "mb-2 flex-row justify-content-start align-items-center"
  }, /*#__PURE__*/react.createElement("span", {
    className: "ti-world"
  }), /*#__PURE__*/react.createElement(dist/* Link */.rU, {
    href: "/#",
    className: "p-0 ms-2"
  }, ' ', "www.suftnet.com")), /*#__PURE__*/react.createElement("li", {
    className: "mb-2 flex-row justify-content-start align-items-center"
  }, /*#__PURE__*/react.createElement("span", {
    className: "ti-location-pin"
  }), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h6",
    className: "text-dark lh-base ms-2 text_small"
  }, "2 Riseholme Orten Goldhay, Peterborough. Pe2 5sp.")))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    col: true,
    lg: 4,
    xs: 12,
    className: "flex-row justify-content-end "
  }, /*#__PURE__*/react.createElement("img", {
    src: map,
    alt: "map",
    className: "img-fluid"
  }))))));
};
/* harmony default export */ var large_footer = (BigFooter);
;// CONCATENATED MODULE: ./src/components/public/footer/small-footer.jsx


var BottomFooter = function BottomFooter() {
  return /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* SmallFooter */.UM, {
    className: "flex-row justify-content-center p-2 bg-dark"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h6",
    className: "text-white-50 lh-base"
  }, "Copyrights \xA9 2023. All rights reserved by"), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Link */.rU, {
    className: "p-0 ms-2 text-white",
    href: "/#"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h6",
    className: "text-white-80 lh-base"
  }, "Suftnet Int.")));
};
/* harmony default export */ var small_footer = (BottomFooter);
;// CONCATENATED MODULE: ./src/components/public/footer/index.js



;// CONCATENATED MODULE: ./src/components/public/header/header-panel.jsx





var HeaderPanel = function HeaderPanel(props) {
  var _useMobile = hooks_useMobile(),
    isMobile = _useMobile.isMobile;
  return /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Flex */.kC, {
    justifyContent: "center",
    direction: "column",
    alignItems: "center",
    className: "w-100 p-7"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    row: true,
    spacing: 5,
    className: "".concat(isMobile ? 'w-100' : 'w-90', "  mt-1 ")
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    col: true,
    lg: 12,
    xs: 12
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex-column justify-content-center align-items-center"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h2",
    className: "text-dark fw-normal ".concat(isMobile ? 'text-center display-6' : 'display-5 ')
  }, props.title), props.description && /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h3",
    className: "mt-3 text-dark text-center w-70 lh-base ".concat(isMobile ? 'w-100' : '')
  }, props.description)))));
};
HeaderPanel.propTypes = {
  title: (prop_types_default()).string,
  description: (prop_types_default()).string,
  imgUrl: (prop_types_default()).string
};
/* harmony default export */ var header_panel = (HeaderPanel);
;// CONCATENATED MODULE: ./src/components/public/pages/contact/address.jsx


var Address = function Address() {
  return /*#__PURE__*/React.createElement(Grid, {
    row: true,
    spacing: 1,
    className: ""
  }, /*#__PURE__*/React.createElement(Grid, {
    col: true,
    lg: 6,
    md: 6,
    xs: 12
  }), /*#__PURE__*/React.createElement(Grid, {
    col: true,
    lg: 6,
    md: 6,
    xs: 12,
    className: "flex-column justify-content-center align-items-center  px-4 "
  }, /*#__PURE__*/React.createElement(Box, {
    as: "div",
    className: "contact__address__office mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ti-location-pin text_small2 text-primary"
  }), /*#__PURE__*/React.createElement(Box, {
    as: "div",
    className: "ms-2"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "h4",
    className: "fw-bold"
  }, "Address"), /*#__PURE__*/React.createElement("address", null, /*#__PURE__*/React.createElement(Text, {
    as: "h4",
    className: "text_small"
  }, "453 Cranbrook Road llford Essex IG2 6EW")))), /*#__PURE__*/React.createElement(Box, {
    as: "div",
    className: "contact__address__office mb-3"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ti-email text_small2 text-primary"
  }), /*#__PURE__*/React.createElement(Box, {
    as: "div",
    className: "ms-2"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "h4",
    className: "fw-bold"
  }, "E-mail"), /*#__PURE__*/React.createElement(Text, {
    as: "p"
  }, "support@suftnet.com"), /*#__PURE__*/React.createElement(Text, {
    as: "p"
  }, "info@suftnet.com"))), /*#__PURE__*/React.createElement(Box, {
    as: "div",
    className: "contact__address__office mb-3"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ti-mobile text_small2 text-primary"
  }), /*#__PURE__*/React.createElement(Box, {
    as: "div",
    className: "ms-2"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "h4",
    className: "fw-bold"
  }, "Phone"), /*#__PURE__*/React.createElement(Text, {
    as: "p"
  }, "(+44)-020 8144 3161")))));
};
/* harmony default export */ var address = ((/* unused pure expression or super */ null && (Address)));
;// CONCATENATED MODULE: ./src/components/public/pages/contact/rules.js
var CONTACT_VALIDATION_RULES = {
  Contact: {
    name: [{
      pattern: /.+/,
      message: 'Your name is required'
    }, {
      pattern: /^.{0,50}$/,
      message: 'Your name must be no more than 50 characters'
    }],
    email: [{
      pattern: /.+/,
      message: 'Email address is required'
    }, {
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Please enter a valid email address'
    }, {
      pattern: /^.{0,50}$/,
      message: 'Email address must be no more than 50 characters'
    }],
    subject: [{
      pattern: /.+/,
      message: 'Subject is required'
    }, {
      pattern: /^.{0,50}$/,
      message: 'Subject must be no more than 50 characters'
    }],
    message: [{
      pattern: /.+/,
      message: 'Message is required'
    }, {
      pattern: /^.{0,200}$/,
      message: 'Message must be no more than 200 characters'
    }]
  },
  fields: {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
};
;// CONCATENATED MODULE: ./src/components/public/pages/contact/contact-form.jsx


function contact_form_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function contact_form_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? contact_form_ownKeys(Object(source), !0).forEach(function (key) { (0,defineProperty/* default */.Z)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : contact_form_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }





var ContactForm = function ContactForm() {
  var _errorMessages$name, _errorMessages$email, _errorMessages$subjec, _errorMessages$messag;
  var _useMobile = hooks_useMobile(),
    isMobile = _useMobile.isMobile;
  var _useState = (0,react.useState)({}),
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
    errorMessages = _useState2[0],
    setErrorMessages = _useState2[1];
  var _useState3 = (0,react.useState)(CONTACT_VALIDATION_RULES.fields),
    _useState4 = (0,slicedToArray/* default */.Z)(_useState3, 2),
    fields = _useState4[0],
    setFields = _useState4[1];
  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    setErrorMessages({});
    var _validate = (0,suftnet_ui_kit_dist/* validate */.Gu)(fields, CONTACT_VALIDATION_RULES.Contact),
      hasError = _validate.hasError,
      errors = _validate.errors;
    if (hasError) setErrorMessages(errors);
  };
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Flex */.kC, {
    justifyContent: "center",
    direction: "column",
    alignItems: "center",
    className: "px-7 pb-7"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Form */.l0, {
    className: "".concat(isMobile ? 'w-100' : 'w-70')
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Form */.l0, {
    horizontal: true
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* FormGroup */.cw, null, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Input */.II, {
    id: "name",
    name: "name",
    placeholder: "Your Name",
    maxLength: 50,
    value: fields.name,
    errorMessage: (errorMessages === null || errorMessages === void 0 ? void 0 : errorMessages.name) && (errorMessages === null || errorMessages === void 0 ? void 0 : (_errorMessages$name = errorMessages.name) === null || _errorMessages$name === void 0 ? void 0 : _errorMessages$name.message),
    onChange: function onChange(e) {
      return setFields(contact_form_objectSpread(contact_form_objectSpread({}, fields), {}, {
        name: e.target.value
      }));
    }
  })), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* FormGroup */.cw, null, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Input */.II, {
    id: "email",
    name: "email",
    placeholder: "Email",
    value: fields.email,
    errorMessage: (errorMessages === null || errorMessages === void 0 ? void 0 : errorMessages.email) && (errorMessages === null || errorMessages === void 0 ? void 0 : (_errorMessages$email = errorMessages.email) === null || _errorMessages$email === void 0 ? void 0 : _errorMessages$email.message),
    maxLength: 50,
    onChange: function onChange(e) {
      return setFields(contact_form_objectSpread(contact_form_objectSpread({}, fields), {}, {
        email: e.target.value
      }));
    }
  }))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Form */.l0, {
    horizontal: true
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* FormGroup */.cw, null, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Input */.II, {
    id: "subject",
    name: "subject",
    placeholder: "Subject",
    value: fields.subject,
    errorMessage: (errorMessages === null || errorMessages === void 0 ? void 0 : errorMessages.subject) && (errorMessages === null || errorMessages === void 0 ? void 0 : (_errorMessages$subjec = errorMessages.subject) === null || _errorMessages$subjec === void 0 ? void 0 : _errorMessages$subjec.message),
    maxLength: 100,
    onChange: function onChange(e) {
      return setFields(contact_form_objectSpread(contact_form_objectSpread({}, fields), {}, {
        subject: e.target.value
      }));
    }
  }))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Form */.l0, {
    horizontal: true
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* FormGroup */.cw, null, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* TextArea */.Kx, {
    id: "message",
    name: "message",
    placeholder: "Message",
    value: fields.message,
    errorMessage: (errorMessages === null || errorMessages === void 0 ? void 0 : errorMessages.message) && (errorMessages === null || errorMessages === void 0 ? void 0 : (_errorMessages$messag = errorMessages.message) === null || _errorMessages$messag === void 0 ? void 0 : _errorMessages$messag.message),
    maxLength: 200,
    rows: 5,
    onChange: function onChange(e) {
      return setFields(contact_form_objectSpread(contact_form_objectSpread({}, fields), {}, {
        message: e.target.value
      }));
    }
  }))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Button */.zx, {
    className: "rounded-circle-30 primary-solid-btn-0",
    onClick: function onClick(e) {
      return handleSubmit(e);
    }
  }, "Submit"))));
};
/* harmony default export */ var contact_form = (ContactForm);
;// CONCATENATED MODULE: ./src/components/public/shared/scroll-up.jsx


var Scroll = function Scroll() {
  var showScroll = (0,react.useRef)(null);
  (0,react.useEffect)(function () {
    if (showScroll.current) {
      var offset = 50;
      window.addEventListener('scroll', function () {
        var _showScroll$current, _showScroll$current$c, _showScroll$current2, _showScroll$current2$;
        // eslint-disable-next-line no-unused-expressions
        window.scrollY >= offset ? (_showScroll$current = showScroll.current) === null || _showScroll$current === void 0 ? void 0 : (_showScroll$current$c = _showScroll$current.classList) === null || _showScroll$current$c === void 0 ? void 0 : _showScroll$current$c.add('show') : (_showScroll$current2 = showScroll.current) === null || _showScroll$current2 === void 0 ? void 0 : (_showScroll$current2$ = _showScroll$current2.classList) === null || _showScroll$current2$ === void 0 ? void 0 : _showScroll$current2$.remove('show');
      });
    }
  }, []);
  var scroll = function scroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Box */.xu, {
    className: "scroll-up",
    ref: showScroll,
    onClick: function onClick() {
      return scroll();
    }
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Box */.xu, {
    as: "i",
    className: "ti-arrow-up",
    role: "button",
    tabIndex: "0"
  }));
};
/* harmony default export */ var scroll_up = (Scroll);
;// CONCATENATED MODULE: ./src/components/public/pages/contact/index.jsx







var Contact = function Contact() {
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Layout */.Ar, null, /*#__PURE__*/react.createElement(header, null), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Content */.VY, {
    justifyContent: "start",
    direction: "column",
    alignItems: "start",
    className: "mt-0"
  }, /*#__PURE__*/react.createElement(header_panel, {
    title: "Contact us",
    description: "It is very easy to get in touch with us. Just use the contact form or pay us a visit for a coffee at the office. "
  }), /*#__PURE__*/react.createElement(scroll_up, null), /*#__PURE__*/react.createElement(contact_form, null)), /*#__PURE__*/react.createElement(large_footer, {
    bg: 'bg-light'
  }), /*#__PURE__*/react.createElement(small_footer, null)));
};
/* harmony default export */ var contact = (Contact);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(5861);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4687);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
// EXTERNAL MODULE: ./node_modules/@fortawesome/react-fontawesome/index.es.js + 1 modules
var index_es = __webpack_require__(982);
// EXTERNAL MODULE: ./node_modules/@fortawesome/free-solid-svg-icons/index.mjs
var free_solid_svg_icons = __webpack_require__(9417);
;// CONCATENATED MODULE: ./src/components/public/shared/startRating.jsx




var StarRating = function StarRating(_ref) {
  var _ref$start_rating = _ref.start_rating,
    start_rating = _ref$start_rating === void 0 ? 0 : _ref$start_rating,
    _ref$starSize = _ref.starSize,
    starSize = _ref$starSize === void 0 ? '2x' : _ref$starSize,
    handleRate = _ref.handleRate;
  var _useState = (0,react.useState)(parseInt(start_rating) || 0),
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
    rating = _useState2[0],
    setRating = _useState2[1];
  (0,react.useEffect)(function () {
    setRating(parseInt(start_rating) || 0);
  }, [start_rating]);
  var handleClick = function handleClick(index) {
    if (index === 0) {
      setRating(index);
      return;
    }
    setRating(index + 1);
    handleRate(index + 1);
  };
  var stars = Array.from({
    length: 5
  }, function (_, index) {
    return /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.G, {
      key: index,
      icon: free_solid_svg_icons/* faStar */.Tab,
      onClick: function onClick() {
        return handleClick(index);
      },
      color: index < rating ? '#FFD700' : '#ccc',
      size: starSize,
      style: {
        cursor: 'pointer'
      }
    });
  });
  return /*#__PURE__*/react.createElement("div", null, stars);
};
/* harmony default export */ var startRating = (StarRating);
;// CONCATENATED MODULE: ./src/assets/imgs/2024-10-30 13_49_09-Window.png
/* harmony default export */ var _2024_10_30_13_49_09_Window = ("/imgs/2024-10-30 13_49_09-Window.6847185cf662fecc8c19e564a855bc27.png");
;// CONCATENATED MODULE: ./src/assets/imgs/robert.jpg
/* harmony default export */ var robert = ("/imgs/robert.23ca05fb5a7b436f617a758a6e6468f9.jpg");
;// CONCATENATED MODULE: ./src/components/public/pages/home/rules.js
var REVIEW_VALIDATION_RULES = {
  Review: {
    first_name: [{
      pattern: /.+/,
      message: 'First name is required'
    }, {
      pattern: /^.{0,50}$/,
      message: 'Your name must be no more than 50 characters'
    }],
    last_name: [{
      pattern: /.+/,
      message: 'Last name is required'
    }, {
      pattern: /^.{0,50}$/,
      message: 'Your name must be no more than 50 characters'
    }],
    desc: [{
      pattern: /.+/,
      message: 'Review is required'
    }, {
      pattern: /^.{0,1000}$/,
      message: 'Message must be no more than 1000 characters'
    }],
    star: [{
      pattern: /^[1-5]$/,
      message: 'Rating must be a number between 1 and 5'
    }]
  },
  fields: {
    first_name: '',
    last_name: '',
    star: 0,
    desc: ''
  }
};
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(2982);
;// CONCATENATED MODULE: ./src/hooks/useReviews.js





function useReviews_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function useReviews_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? useReviews_ownKeys(Object(source), !0).forEach(function (key) { (0,defineProperty/* default */.Z)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : useReviews_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var useReview = function useReview() {
  var _useState = (0,react.useState)({
      data: [],
      loading: false,
      error: null
    }),
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  (0,react.useEffect)(function () {
    handleFetchReviews();
  }, []);
  var handleFetchReviews = /*#__PURE__*/function () {
    var _ref = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
      var reviews;
      return regenerator_default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            setState(useReviews_objectSpread(useReviews_objectSpread({}, state), {}, {
              loading: true
            }));
            _context.next = 4;
            return fetch("".concat(({"NODE_ENV":"production","BASE_API_URL":undefined}).REACT_APP_HOST, "/reviews"), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
          case 4:
            reviews = _context.sent;
            _context.t0 = setState;
            _context.t1 = useReviews_objectSpread;
            _context.t2 = useReviews_objectSpread({}, state);
            _context.t3 = {};
            _context.next = 11;
            return reviews.json();
          case 11:
            _context.t4 = _context.sent;
            _context.t5 = {
              data: _context.t4,
              loading: false
            };
            _context.t6 = (0, _context.t1)(_context.t2, _context.t3, _context.t5);
            (0, _context.t0)(_context.t6);
            _context.next = 20;
            break;
          case 17:
            _context.prev = 17;
            _context.t7 = _context["catch"](0);
            setState(useReviews_objectSpread(useReviews_objectSpread({}, state), {}, {
              error: _context.t7,
              loading: false
            }));
          case 20:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 17]]);
    }));
    return function handleFetchReviews() {
      return _ref.apply(this, arguments);
    };
  }();
  var handleFetchReviewStats = /*#__PURE__*/function () {
    var _ref2 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee2() {
      var reviews, result;
      return regenerator_default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            setState(useReviews_objectSpread(useReviews_objectSpread({}, state), {}, {
              loading: true
            }));
            _context2.next = 4;
            return fetch("".concat(({"NODE_ENV":"production","BASE_API_URL":undefined}).REACT_APP_HOST, "/review-stats"), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
          case 4:
            reviews = _context2.sent;
            setState(useReviews_objectSpread(useReviews_objectSpread({}, state), {}, {
              loading: false
            }));
            _context2.next = 8;
            return reviews.json();
          case 8:
            result = _context2.sent;
            return _context2.abrupt("return", useReviews_objectSpread({}, result));
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            setState(useReviews_objectSpread(useReviews_objectSpread({}, state), {}, {
              error: _context2.t0,
              loading: false
            }));
          case 15:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 12]]);
    }));
    return function handleFetchReviewStats() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleAddReviews = /*#__PURE__*/function () {
    var _ref3 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee3(review) {
      var reviews, newReview;
      return regenerator_default().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            setState(useReviews_objectSpread(useReviews_objectSpread({}, state), {}, {
              loading: true
            }));
            _context3.next = 4;
            return fetch("".concat(({"NODE_ENV":"production","BASE_API_URL":undefined}).REACT_APP_HOST, "/add-review"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(review)
            });
          case 4:
            reviews = _context3.sent;
            _context3.t0 = [];
            _context3.t1 = (0,toConsumableArray/* default */.Z)(state.data);
            _context3.next = 9;
            return reviews.json();
          case 9:
            _context3.t2 = _context3.sent;
            _context3.t3 = [_context3.t2];
            newReview = _context3.t0.concat.call(_context3.t0, _context3.t1, _context3.t3).sort(function (a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setState(useReviews_objectSpread(useReviews_objectSpread({}, state), {}, {
              data: newReview,
              loading: false
            }));
            return _context3.abrupt("return", true);
          case 16:
            _context3.prev = 16;
            _context3.t4 = _context3["catch"](0);
            setState(useReviews_objectSpread(useReviews_objectSpread({}, state), {}, {
              error: _context3.t4,
              loading: false
            }));
          case 19:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 16]]);
    }));
    return function handleAddReviews(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleReset = function handleReset() {
    setState({
      data: [],
      loading: false,
      error: null
    });
  };
  return useReviews_objectSpread(useReviews_objectSpread({}, state), {}, {
    handleFetchReviews,
    handleAddReviews,
    handleReset,
    handleFetchReviewStats
  });
};

// EXTERNAL MODULE: ./node_modules/file-saver/dist/FileSaver.min.js
var FileSaver_min = __webpack_require__(3162);
;// CONCATENATED MODULE: ./src/utils/helper.js





var querystring = __webpack_require__(7735);
var getQueryParam = function getQueryParam() {
  return new URLSearchParams(useLocation().search);
};
var getVAT = function getVAT(rate, amount) {
  return amount * rate / (100 + 20);
};
var uploadImage = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(file) {
    var formData, response, data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          formData = new FormData();
          formData.append('file', file);
          formData.append('cloud_name', ({"NODE_ENV":"production","BASE_API_URL":undefined}).REACT_APP_CLOUDINARY_CLOUD_NAME);
          formData.append('upload_preset', ({"NODE_ENV":"production","BASE_API_URL":undefined}).REACT_APP_CLOUDINARY_UPLOAD_PRESET);
          _context.prev = 4;
          _context.next = 7;
          return fetch(({"NODE_ENV":"production","BASE_API_URL":undefined}).REACT_APP_CLOUDINARY_UPLOAD_URL, {
            method: 'POST',
            body: formData
          });
        case 7:
          response = _context.sent;
          if (response.ok) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", {
            error: true,
            message: "HTTP error! status: ".concat(response.status)
          });
        case 10:
          _context.next = 12;
          return response.json();
        case 12:
          data = _context.sent;
          return _context.abrupt("return", {
            secure_url: data.url,
            public_id: data.public_id,
            original_filename: data.original_filename,
            error: false
          });
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](4);
          return _context.abrupt("return", {
            error: true,
            message: _context.t0.message
          });
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 16]]);
  }));
  return function uploadImage(_x) {
    return _ref.apply(this, arguments);
  };
}()));
var getPlanStatus = function getPlanStatus(status) {
  if (status === 'active' || status === 'Active' || status === 'trialing') {
    return 'bg-success-light';
  }
  if (status === 'suspended' || status === 'Suspended') {
    return 'bg-warning-light';
  }
  if (status === 'incomplete' || status === 'Incomplete') {
    return 'bg-primary-light';
  }
  if (status === 'cancelled' || status === 'Cancelled') {
    return 'bg-danger-light';
  }
  return 'btn-color-13';
};
function convertToDateOnly(timestamp) {
  if (!timestamp) return;
  var timestampSeconds = parseInt(timestamp) / 1000;
  var dateObj = new Date(timestampSeconds * 1000);
  var year = dateObj.getFullYear();
  var month = String(dateObj.getMonth() + 1).padStart(2, '0');
  var day = String(dateObj.getDate()).padStart(2, '0');
  var dateStr = "".concat(year, "-").concat(month, "-").concat(day);
  return dateStr;
}
function convertTimestamp(timestamp) {
  if (!timestamp) return;
  var timestampSeconds = parseInt(timestamp) / 1000;
  var dateObj = new Date(timestampSeconds * 1000);
  return dateObj;
}
function completeAddress(address) {
  if (!address) return;
  var completeAddress = '';
  if (address.addressLine1) {
    completeAddress += address.addressLine1 + ', ';
  }
  if (address.town) {
    completeAddress += address.town + ', ';
  }
  if (address.county) {
    completeAddress += address.county + ', ';
  }
  if (address.country) {
    completeAddress += address.country + ', ';
  }
  if (address.postcode) {
    completeAddress += address.postcode;
  }
  return completeAddress;
}
var stripeCustomerPortal = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(stripeCustomerId, token) {
    var response, data;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return fetch("".concat(({"NODE_ENV":"production","BASE_API_URL":undefined}).REACT_APP_HOST, "/create-customer-portal-session"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              stripeCustomerId: stripeCustomerId
            }),
            credentials: 'include'
          });
        case 3:
          response = _context2.sent;
          if (response.ok) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", {
            error: true,
            message: "HTTP error! status: ".concat(response.status)
          });
        case 6:
          _context2.next = 8;
          return response.json();
        case 8:
          data = _context2.sent;
          return _context2.abrupt("return", {
            url: data.url,
            error: false
          });
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            error: true,
            message: _context2.t0.message
          });
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function stripeCustomerPortal(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}()));
var dateConverter = function dateConverter(stringDate) {
  var parts = stringDate.split('/');
  return "".concat(parts[0], "-").concat(parts[1], "-").concat(parts[2]);
};
var timeStampConverter = function timeStampConverter(timestamp, localFormat) {
  var formattedDate = new Date(parseInt(timestamp));
  return dateConverter(formattedDate.toLocaleDateString(localFormat));
};
var converterTimeStampToDate = function converterTimeStampToDate(timestamp) {
  var formattedDate = new Date(parseInt(timestamp));
  return formattedDate;
};
function formatCurrency(currencySymbol, amount) {
  var numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || !Number.isFinite(numericAmount)) {
    return 'Invalid amount';
  }
  var formattedAmount;
  if (numericAmount >= 1000000) {
    formattedAmount = (numericAmount / 1000000).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + 'M';
  } else if (numericAmount >= 1000) {
    formattedAmount = (numericAmount / 1000).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + 'K';
  } else {
    formattedAmount = numericAmount.toFixed(2);
  }
  return currencySymbol + formattedAmount;
}
function onStripeOnBoarding(_x4) {
  return _onStripeOnBoarding.apply(this, arguments);
}
function _onStripeOnBoarding() {
  _onStripeOnBoarding = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(body) {
    var response, _yield$response$json, url;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return fetch(({"NODE_ENV":"production","BASE_API_URL":undefined}).REACT_APP_CREATE_STRIPE_CONNECT_ACCOUNT, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return response.json();
        case 6:
          _yield$response$json = _context3.sent;
          url = _yield$response$json.url;
          window.location.href = url;
          return _context3.abrupt("return", {
            success: true
          });
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.error('Error in onStripeOnBoarding:', _context3.t0.message);
          return _context3.abrupt("return", {
            success: false,
            error: _context3.t0.message
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return _onStripeOnBoarding.apply(this, arguments);
}
function onStripeDashboard(_x5) {
  return _onStripeDashboard.apply(this, arguments);
}
function _onStripeDashboard() {
  _onStripeDashboard = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(body) {
    var response, _yield$response$json2, url;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return fetch(({"NODE_ENV":"production","BASE_API_URL":undefined}).REACT_APP_STRIPE_CONNECT_DASHBOARD, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
        case 3:
          response = _context4.sent;
          _context4.next = 6;
          return response.json();
        case 6:
          _yield$response$json2 = _context4.sent;
          url = _yield$response$json2.url;
          window.location.href = url;
          return _context4.abrupt("return", {
            success: true
          });
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.error('Error in Stripe Dashboard:', _context4.t0.message);
          return _context4.abrupt("return", {
            success: false,
            error: _context4.t0.message
          });
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return _onStripeDashboard.apply(this, arguments);
}
function searchAddress(_x6) {
  return _searchAddress.apply(this, arguments);
}
function _searchAddress() {
  _searchAddress = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(query) {
    var params, queryString, requestOptions, response, data;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = {
            q: query,
            format: 'json',
            addressdetails: 1,
            polygon_geojson: 0
          };
          queryString = new URLSearchParams(params).toString();
          requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          _context5.prev = 3;
          _context5.next = 6;
          return fetch("https://nominatim.openstreetmap.org/search?".concat(queryString), requestOptions);
        case 6:
          response = _context5.sent;
          _context5.next = 9;
          return response.json();
        case 9:
          data = _context5.sent;
          return _context5.abrupt("return", data);
        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](3);
          console.error('Error while fetching address:', _context5.t0);
          return _context5.abrupt("return", null);
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 13]]);
  }));
  return _searchAddress.apply(this, arguments);
}
function formatAddressParts(address) {
  var suburb = address.suburb,
    city = address.city,
    state = address.state,
    postcode = address.postcode,
    country = address.country,
    country_code = address.country_code,
    place = address.place;
  var addressPartsToInclude = [];
  if (country_code === 'us' || country_code === 'gb') {
    var postcodeOrZipCode = postcode || '';
    addressPartsToInclude.push(suburb, city, state, postcodeOrZipCode, country);
  } else {
    addressPartsToInclude.push(place, city, state, country);
  }
  return addressPartsToInclude.join(', ');
}
function renderStatus(status) {
  switch (status) {
    case 'completed':
      return 'bg-success-light';
    case 'accepted':
      return 'bg-warning-light';
    case 'rejected':
      return 'bg-danger-light';
    default:
      return 'bg-primary-light';
  }
}
function renderStatusYesNo(status) {
  switch (status) {
    case true:
      return 'bg-success-light';
    case false:
      return 'bg-danger-light';
    default:
      return 'bg-primary-light';
  }
}
function connectStripeCustomerPortal(_x7, _x8) {
  return _connectStripeCustomerPortal.apply(this, arguments);
}
function _connectStripeCustomerPortal() {
  _connectStripeCustomerPortal = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(token, currentUser) {
    var result;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return stripeCustomerPortal(currentUser === null || currentUser === void 0 ? void 0 : currentUser.stripeCustomerId, currentUser.suid);
        case 2:
          result = _context6.sent;
          if (result !== null && result !== void 0 && result.url) {
            window.location.href = result.url;
          }
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _connectStripeCustomerPortal.apply(this, arguments);
}
function handleStripeConnect(_x9) {
  return _handleStripeConnect.apply(this, arguments);
}
function _handleStripeConnect() {
  _handleStripeConnect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(currentUser) {
    var stripeConnectParams, reqQuery, url;
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          stripeConnectParams = {
            client_id: ({"NODE_ENV":"production","BASE_API_URL":undefined}).REACT_APP_STRIPE_CONNECT_KEY,
            scope: 'read_write',
            state: currentUser.suid,
            return_url: ({"NODE_ENV":"production","BASE_API_URL":undefined}).REACT_APP_STRIPE_CONNECT_REDIRECT,
            response_type: 'code',
            'stripe_user[email]': currentUser === null || currentUser === void 0 ? void 0 : currentUser.email,
            'stripe_user[first_name]': currentUser === null || currentUser === void 0 ? void 0 : currentUser.first_name,
            'stripe_user[last_name]': currentUser === null || currentUser === void 0 ? void 0 : currentUser.last_name
          };
          reqQuery = querystring.stringify(stripeConnectParams);
          url = "https://connect.stripe.com/oauth/authorize?".concat(reqQuery);
          window.location.href = url;
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _handleStripeConnect.apply(this, arguments);
}
;
function Download(data, name) {
  var ws = utils.json_to_sheet(data); // Where data is your JSON array
  var wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");

  // Write workbook (use type 'binary')
  var wbout = write(wb, {
    bookType: 'xlsx',
    type: 'binary'
  });

  // Convert binary string to character array
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  // Trigger download
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), "".concat(name, ".xlsx"));
}
var animation = function animation(_ref3) {
  var name = _ref3.name,
    delay = _ref3.delay;
  return {
    animationName: name,
    animationDelay: delay,
    animationFillMode: 'both',
    animationDuration: '700ms',
    animationDirection: 'normal',
    animationTimingFunction: 'ease'
  };
};
var slideInDownAnimate = function slideInDownAnimate(delay) {
  return animation({
    name: 'slideInDown',
    delay
  });
};
var zoomInAnimate = function zoomInAnimate(delay) {
  return animation({
    name: 'zoomIn',
    delay
  });
};
var fadeInAnimate = function fadeInAnimate(delay) {
  return animation({
    name: 'fadeIn',
    delay
  });
};
function convertToShortDate(dateString) {
  var date = new Date(dateString);
  var options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  return date.toLocaleDateString(undefined, options);
}
function convertToUnix(dateString) {
  var date = new Date(dateString);
  var unixTimestamp = date.getTime();
  return unixTimestamp;
}
function convertFromUnix(unixTimestamp) {
  var formattedDate = new Date(unixTimestamp * 1000);
  return formattedDate;
}

;// CONCATENATED MODULE: ./src/components/public/pages/home/review-form.jsx




function review_form_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function review_form_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? review_form_ownKeys(Object(source), !0).forEach(function (key) { (0,defineProperty/* default */.Z)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : review_form_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }







var ReviewForm = function ReviewForm() {
  var _errorMessages$star, _errorMessages$desc;
  var _useReview = useReview(),
    data = _useReview.data,
    handleAddReviews = _useReview.handleAddReviews;
  var _useMobile = hooks_useMobile(),
    isMobile = _useMobile.isMobile;
  var _useState = (0,react.useState)({}),
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
    errorMessages = _useState2[0],
    setErrorMessages = _useState2[1];
  var _useState3 = (0,react.useState)(REVIEW_VALIDATION_RULES.fields),
    _useState4 = (0,slicedToArray/* default */.Z)(_useState3, 2),
    fields = _useState4[0],
    setFields = _useState4[1];
  var handleSubmit = /*#__PURE__*/function () {
    var _ref = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee(event) {
      var _validate, hasError, errors;
      return regenerator_default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();
            setErrorMessages({});
            _validate = (0,suftnet_ui_kit_dist/* validate */.Gu)(fields, REVIEW_VALIDATION_RULES.Review), hasError = _validate.hasError, errors = _validate.errors;
            if (hasError) setErrorMessages(errors);
            handleAddReviews(review_form_objectSpread({}, fields)).then(function (result) {
              result && setFields({
                first_name: '',
                last_name: '',
                start: 1,
                desc: ''
              });
            });
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var RenderCard = function RenderCard(_ref2) {
    var review = _ref2.review;
    return /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
      row: true,
      spacing: 2,
      className: "mt-2 flex-row"
    }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
      col: true,
      lg: 12,
      xs: 12
    }, /*#__PURE__*/react.createElement("div", {
      className: "flex-column justify-content-start align-items-start"
    }, /*#__PURE__*/react.createElement("div", {
      className: "flex-row justify-content-start align-items-center  mb-2"
    }, /*#__PURE__*/react.createElement(startRating, {
      start_rating: review === null || review === void 0 ? void 0 : review.star,
      starSize: "1x"
    }), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
      as: "p",
      className: "text-dark fw-normal ms-2"
    }, "Reviewed on ", convertToShortDate(review === null || review === void 0 ? void 0 : review.createdAt))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
      as: "p",
      className: "text-dark fw-normal"
    }, review === null || review === void 0 ? void 0 : review.desc))));
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Form */.l0, {
    className: "".concat(isMobile ? 'w-100' : 'w-100', " ")
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex-column justify-content-center align-items-center py-3"
  }, /*#__PURE__*/react.createElement(startRating, {
    rating: 0,
    handleRate: function handleRate(rate) {
      return setFields(review_form_objectSpread(review_form_objectSpread({}, fields), {}, {
        star: parseInt(rate)
      }));
    }
  }), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "p",
    className: "fw-normal mt-1 text-invalid "
  }, (errorMessages === null || errorMessages === void 0 ? void 0 : errorMessages.star) && (errorMessages === null || errorMessages === void 0 ? void 0 : (_errorMessages$star = errorMessages.star) === null || _errorMessages$star === void 0 ? void 0 : _errorMessages$star.message))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Form */.l0, {
    horizontal: true
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* FormGroup */.cw, null, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Input */.II, {
    id: "first_name",
    name: "first_name",
    placeholder: "Firstname",
    maxLength: 50,
    value: fields.first_name,
    onChange: function onChange(e) {
      return setFields(review_form_objectSpread(review_form_objectSpread({}, fields), {}, {
        first_name: e.target.value
      }));
    }
  })), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* FormGroup */.cw, null, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Input */.II, {
    id: "last_name",
    name: "last_name",
    placeholder: "Lastname",
    value: fields.last_name,
    maxLength: 50,
    onChange: function onChange(e) {
      return setFields(review_form_objectSpread(review_form_objectSpread({}, fields), {}, {
        last_name: e.target.value
      }));
    }
  }))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Form */.l0, {
    horizontal: true
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* FormGroup */.cw, null, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* TextArea */.Kx, {
    id: "message",
    name: "message",
    placeholder: "Type in your reviews",
    value: fields.desc,
    errorMessage: (errorMessages === null || errorMessages === void 0 ? void 0 : errorMessages.desc) && (errorMessages === null || errorMessages === void 0 ? void 0 : (_errorMessages$desc = errorMessages.desc) === null || _errorMessages$desc === void 0 ? void 0 : _errorMessages$desc.message),
    maxLength: 1000,
    rows: 5,
    onChange: function onChange(e) {
      return setFields(review_form_objectSpread(review_form_objectSpread({}, fields), {}, {
        desc: e.target.value
      }));
    }
  }))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Button */.zx, {
    className: "rounded-circle-30 primary-solid-btn-0",
    onClick: function onClick(e) {
      return handleSubmit(e);
    }
  }, "Submit")), data === null || data === void 0 ? void 0 : data.map(function (review, index) {
    return /*#__PURE__*/react.createElement(RenderCard, {
      key: index,
      review: review
    });
  }));
};
/* harmony default export */ var review_form = (ReviewForm);
;// CONCATENATED MODULE: ./src/components/public/pages/home/contentBody.jsx













var ContentBody = function ContentBody() {
  var _useReview = useReview(),
    handleFetchReviewStats = _useReview.handleFetchReviewStats;
  var _useState = (0,react.useState)({}),
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  (0,react.useEffect)(function () {
    function loadReviewStar() {
      return _loadReviewStar.apply(this, arguments);
    }
    function _loadReviewStar() {
      _loadReviewStar = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var result;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return handleFetchReviewStats();
            case 2:
              result = _context.sent;
              setState(result);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return _loadReviewStar.apply(this, arguments);
    }
    loadReviewStar();
  }, []);
  var getAverageRating = function getAverageRating() {
    return Math.ceil(parseInt(state === null || state === void 0 ? void 0 : state.averageRating)) || 1;
  };
  var ReadMoreLess = function ReadMoreLess() {
    var _useState3 = (0,react.useState)(false),
      _useState4 = (0,slicedToArray/* default */.Z)(_useState3, 2),
      isExpanded = _useState4[0],
      setIsExpanded = _useState4[1];
    var text = "In \"The Kinds of Fathers and Mothers,\" you will:\n                      Learn from the Bible's examples of fathers and mothers, both good and bad.\n                      Discover how to embrace the role of a godly parent, raising children with love, discipline, and wisdom.\n                      Understand the importance of being a spiritual guide and source of light to your family.\n                      Be inspired by the author's personal stories of faith and family, offering encouragement to parents and aspiring parents alike.\n                      Whether you are a parent, someone aspiring to be one, or simply interested in understanding the role of parenting from a biblical perspective, this book is for you. It offers practical insights on how to nurture children according to God's plan and be the parent He calls you to be. Through its combination of scriptural wisdom and personal reflections, \"The Kinds of Fathers and Mothers\" equips readers with the knowledge and inspiration to raise a family that shines as a beacon of faith and love. As you read, may the Lord grant you the wisdom and grace to become a godly and distinguished parent, making a lasting impact on your children\u2019s lives and leaving a legacy that honors God.";
    var toggleReadMore = function toggleReadMore() {
      setIsExpanded(!isExpanded);
    };
    return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("p", null, isExpanded ? text : "".concat(text.substring(0, 200), "...")), /*#__PURE__*/react.createElement("button", {
      onClick: toggleReadMore,
      style: {
        background: 'none',
        border: 'none',
        color: '#0073e6',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/react.createElement(index_es/* FontAwesomeIcon */.G, {
      icon: isExpanded ? free_solid_svg_icons/* faChevronUp */.mTx : free_solid_svg_icons/* faChevronDown */.ptq,
      style: {
        marginRight: '5px'
      }
    }), isExpanded ? 'Read less' : 'Read more'));
  };
  return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    row: true,
    spacing: 4,
    className: "mt-2 w-70 flex-row"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    col: true,
    lg: 4,
    xs: 12
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex-column justify-content-start align-items-start"
  }, /*#__PURE__*/react.createElement("img", {
    alt: "book",
    src: _2024_10_30_13_49_09_Window,
    className: "img-fluid"
  }), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Button */.zx, {
    className: "solid-btn-0 w-100 mt-3",
    Component: dist/* Link */.rU,
    to: "/v1/dashboard"
  }, "Want to read"), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Button */.zx, {
    className: "google-play-store-btn mt-3 w-100",
    Component: dist/* Link */.rU,
    to: "/v1/dashboard"
  }, "Buy this Book"))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    col: true,
    lg: 8,
    xs: 8
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex-column justify-content-start align-items-start"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h1",
    className: "text-dark fw-normal"
  }, "The Kinds of Fathers and Mothers"), /*#__PURE__*/react.createElement("div", {
    className: "flex-row justify-content-start align-items-center"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h6",
    className: "text-dark fw-normal ps-1 pe-2 "
  }, "Robert Musah"), /*#__PURE__*/react.createElement("span", {
    className: "uil-user text_small"
  })), /*#__PURE__*/react.createElement("div", {
    className: "flex-row justify-content-start align-items-center mt-2"
  }, /*#__PURE__*/react.createElement(startRating, {
    start_rating: getAverageRating()
  }), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h2",
    className: "text-dark fw-normal fs-35 ps-3 pe-2 "
  }, state === null || state === void 0 ? void 0 : state.averageRating), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h6",
    className: "text-dark fw-normal pe-2 "
  }, state === null || state === void 0 ? void 0 : state.totalRating, " rating"), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h6",
    className: "text-dark fw-normal pe-2 "
  }, state === null || state === void 0 ? void 0 : state.totalReviews, " reviews")), /*#__PURE__*/react.createElement("div", {
    className: "flex-column justify-content-start align-items-center mt-2 mb-1"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "p",
    className: "text-dark fw-bold pe-2 mb-3"
  }, "The Kinds of Fathers and Mothers\" explores the diverse examples of parenting found throughout the Bible, drawing lessons from both godly and ungodly parents. This insightful book takes readers on a journey through biblical stories, highlighting the characteristics that define godly fathers and mothers while contrasting them with examples of flawed parenting. It provides a clear understanding of the spiritual responsibilities that come with raising children in accordance with God\u2019s will."), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "p",
    className: "text fw-normal pe-2 "
  }, /*#__PURE__*/react.createElement("p", {
    className: "mb-2"
  }, 'At the heart of the book is the powerful truth that Jesus Christ, the ultimate example of a loving and compassionate father, calls us to emulate His character. Whether it’s the story of Jesus raising the widow’s son in Nain (Luke 7:11-17) or other biblical figures who modeled parental love and sacrifice, "The Kinds of Fathers and Mothers" encourages readers to follow Christ’s example of godly parenting.'), /*#__PURE__*/react.createElement("p", {
    className: "mb-2"
  }, "This book is not just a biblical study but also deeply personal. The author reflects on his own upbringing, influenced by a father who instilled a love for writing and a mother whose prayers shaped his spiritual journey. These personal anecdotes illustrate the profound impact parents can have on their children's lives, demonstrating how godly parenting can help children grow into people who reflect the love and light of Christ."), /*#__PURE__*/react.createElement(ReadMoreLess, null))), /*#__PURE__*/react.createElement("div", {
    className: "flex-column justify-content-start align-items-start mt-1"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "p",
    className: "text-dark fw-normal pe-2"
  }, "221 pages, Hardcover"), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "p",
    className: "text-dark fs-6 pe-2"
  }, "First published 2024"))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    row: true,
    spacing: 2,
    className: "mt-2 flex-row"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    col: true,
    lg: 4,
    xs: 12
  }, /*#__PURE__*/react.createElement("img", {
    alt: "book",
    src: robert,
    height: 300,
    width: 260,
    className: "img-fluids"
  })), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    col: true,
    lg: 8,
    xs: 12
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex-row justify-content-start align-items-center"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "p",
    className: "text-dark fw-normal ps-1 pe-2 "
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h6",
    className: "text-dark fw-bold pe-2 "
  }, "About the Author"), /*#__PURE__*/react.createElement("p", {
    className: "mb-2"
  }, "Musah Robert is an ordained pastor with over 15 years of experience ministering the gospel of Jesus Christ. He is an anointed teacher of the word of God and also the founder of the POWER AND WISDOM MINISTRY."), /*#__PURE__*/react.createElement("p", {
    className: "mb-2"
  }, "He is a prolific author and widely engaged in preaching and teaching across the globe."), /*#__PURE__*/react.createElement("p", {
    className: "mb-2"
  }, "He is passionate about the family and has come out with this book to portray the Godly kind of parenting that the Lord expects from His people."), /*#__PURE__*/react.createElement("p", {
    className: "mb-2"
  }, "Musah Robert resides in the United Kingdom, is married with three children, and is a life practitioner with\xA0KISIMUL\xA0GROUP"))))), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    row: true,
    spacing: 2,
    className: "mt-2 flex-row"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Grid */.rj, {
    col: true,
    lg: 12,
    xs: 12
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex-row justify-content-start align-items-center"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h1",
    className: "text-dark fw-normal ps-1 pe-2 "
  }, "Ratings & Reviews", ' ')), /*#__PURE__*/react.createElement("div", {
    className: "flex-row justify-content-center align-items-center"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h3",
    className: "text-dark fs-35 ps-1 pe-2 "
  }, "What do you think?")), /*#__PURE__*/react.createElement("div", {
    className: "flex-column justify-content-center align-items-center py-3"
  }, /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Text */.xv, {
    as: "h6",
    className: "text-dark fw-normal mt-1 text-black-50 "
  }, "Rate this Book")), /*#__PURE__*/react.createElement(review_form, null))))));
};
/* harmony default export */ var contentBody = (ContentBody);
;// CONCATENATED MODULE: ./src/components/public/pages/home/index.jsx






var Home = function Home() {
  return /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Layout */.Ar, null, /*#__PURE__*/react.createElement(header, null), /*#__PURE__*/react.createElement(suftnet_ui_kit_dist/* Content */.VY, {
    justifyContent: "start",
    direction: "column",
    alignItems: "start",
    className: "mt-0"
  }, /*#__PURE__*/react.createElement(scroll_up, null), /*#__PURE__*/react.createElement(contentBody, null)), /*#__PURE__*/react.createElement(small_footer, null));
};
/* harmony default export */ var home = (Home);
;// CONCATENATED MODULE: ./src/routers/index.js







var Routers = function Routers() {
  var router = (0,dist/* createBrowserRouter */.aj)((0,react_router_dist/* createRoutesFromElements */.i7)( /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(react_router_dist/* Route */.AW, {
    path: "/",
    element: /*#__PURE__*/react.createElement(PublicRoute, null)
  }, /*#__PURE__*/react.createElement(react_router_dist/* Route */.AW, {
    path: "/",
    element: /*#__PURE__*/react.createElement(home, null)
  }), /*#__PURE__*/react.createElement(react_router_dist/* Route */.AW, {
    path: "/contact-us",
    element: /*#__PURE__*/react.createElement(contact, null)
  })), /*#__PURE__*/react.createElement(react_router_dist/* Route */.AW, {
    path: "/v1",
    element: /*#__PURE__*/react.createElement(ProtectedRoute, null)
  }), /*#__PURE__*/react.createElement(react_router_dist/* Route */.AW, {
    path: "*",
    element: /*#__PURE__*/react.createElement(react_router_dist/* Navigate */.Fg, {
      to: "/"
    })
  }))));
  return /*#__PURE__*/react.createElement(react_router_dist/* RouterProvider */.pG, {
    router: router
  });
};
/* harmony default export */ var routers = (Routers);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js
var taggedTemplateLiteral = __webpack_require__(168);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(2788);
;// CONCATENATED MODULE: ./src/assets/fonts/themify.eot
/* harmony default export */ var themify = ("/fonts/themify.9bad94440d49256265a5b2305ec42d63.eot");
;// CONCATENATED MODULE: ./src/assets/fonts/themify.woff
/* harmony default export */ var fonts_themify = ("/fonts/themify.29b39089170885ae29671a8c66d85a9f.woff");
;// CONCATENATED MODULE: ./src/assets/fonts/themify.ttf
/* harmony default export */ var assets_fonts_themify = ("/fonts/themify.eda8b94308c6f538f04a8056ed761a57.ttf");
;// CONCATENATED MODULE: ./src/assets/fonts/themify.svg
/* harmony default export */ var src_assets_fonts_themify = ("/imgs/themify.79bf39a6ceb4c20576065704b2f1608e.svg");
;// CONCATENATED MODULE: ./src/assets/fonts/Unicons.woff
/* harmony default export */ var Unicons = ("/fonts/Unicons.124582b1b0cfb7e2d11d99995d83bb8a.woff");
;// CONCATENATED MODULE: ./src/assets/fonts/Unicons.woff2
/* harmony default export */ var Unicons_woff2 = ("/fonts/Unicons.9e1df5b1d5d36fe0aa5c45a3fbc7d810.woff2");
;// CONCATENATED MODULE: ./src/assets/fonts/index.js

var _templateObject;
/* eslint-disable camelcase */







var FontsStyle = (0,styled_components_browser_esm/* createGlobalStyle */.vJ)(_templateObject || (_templateObject = (0,taggedTemplateLiteral/* default */.Z)(["\n  @font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: normal;\n    src:\n      url('", "') format('embedded-opentype'),\n      url('", "') format('woff'),\n      url('", "') format('truetype'),\n      url('", "') format('svg');\n  }\n\n  @font-face {\n  font-family: 'Unicons'; \n  src: url('", "') format('woff2'), url('", "') format('woff');\n  font-weight: normal;\n  font-style: normal;\n  font-display: block;\n}\n\n  html, body {\n    font-family:'Roboto','sans-serif' ,'Open Sans', 'Unicons';\n    line-height:1.7;\n  }\n"])), themify, fonts_themify, assets_fonts_themify, src_assets_fonts_themify, Unicons_woff2, Unicons);
// EXTERNAL MODULE: ./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js + 2 modules
var redux_toolkit_esm = __webpack_require__(7168);
// EXTERNAL MODULE: ./node_modules/redux/es/redux.js + 1 modules
var redux = __webpack_require__(7779);
;// CONCATENATED MODULE: ./src/redux/reducers/index.js

var reducers = (0,redux/* combineReducers */.UY)({});
/* harmony default export */ var redux_reducers = (reducers);
;// CONCATENATED MODULE: ./src/redux/store/store.js


var store = (0,redux_toolkit_esm/* configureStore */.xC)({
  reducer: redux_reducers
});
if (false) {}
/* harmony default export */ var store_store = (store);
;// CONCATENATED MODULE: ./src/App.jsx








function App() {
  return /*#__PURE__*/react.createElement(es/* Provider */.zt, {
    store: store_store
  }, /*#__PURE__*/react.createElement(shared_appContext, null, /*#__PURE__*/react.createElement(FontsStyle, null), /*#__PURE__*/react.createElement(routers, null)));
}
/* harmony default export */ var src_App = (App);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(5671);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(3144);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(9340);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js + 1 modules
var possibleConstructorReturn = __webpack_require__(3930);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(1120);
;// CONCATENATED MODULE: ./src/components/ErrorBoundary.jsx





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,getPrototypeOf/* default */.Z)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,getPrototypeOf/* default */.Z)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,possibleConstructorReturn/* default */.Z)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  (0,inherits/* default */.Z)(ErrorBoundary, _React$Component);
  var _super = _createSuper(ErrorBoundary);
  function ErrorBoundary(props) {
    var _this;
    (0,classCallCheck/* default */.Z)(this, ErrorBoundary);
    _this = _super.call(this, props);
    _this.state = {
      hasError: false
    };
    return _this;
  }
  (0,createClass/* default */.Z)(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {}
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return /*#__PURE__*/react.createElement("h1", null, "Something not right.");
      }
      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true
      };
    }
  }]);
  return ErrorBoundary;
}(react.Component);
/* harmony default export */ var components_ErrorBoundary = (ErrorBoundary);
;// CONCATENATED MODULE: ./src/index.js




var root = client.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/react.createElement(components_ErrorBoundary, null, /*#__PURE__*/react.createElement(src_App, null)));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [216], function() { return __webpack_exec__(3758); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=bundle.ccbebc16361fc3071fc0.js.map