(this["webpackJsonpefnl-dashboard"]=this["webpackJsonpefnl-dashboard"]||[]).push([[23],{136:function(e,t,n){"use strict";var a=n(9),r=n(10),s=n(1),c=n.n(s),i=n(2),o=n.n(i),l=n(12),u=n.n(l),d=n(17),b={tag:d.q,className:o.a.string,cssModule:o.a.object},j=function(e){var t=e.className,n=e.cssModule,s=e.tag,i=Object(r.a)(e,["className","cssModule","tag"]),o=Object(d.m)(u()(t,"input-group-text"),n);return c.a.createElement(s,Object(a.a)({},i,{className:o}))};j.propTypes=b,j.defaultProps={tag:"span"},t.a=j},154:function(e,t,n){"use strict";var a=n(9),r=n(10),s=n(25),c=n(39),i=n(1),o=n.n(i),l=n(2),u=n.n(l),d=n(12),b=n.n(d),j=n(17),p={children:u.a.node,type:u.a.string,size:u.a.oneOfType([u.a.number,u.a.string]),bsSize:u.a.string,valid:u.a.bool,invalid:u.a.bool,tag:j.q,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),plaintext:u.a.bool,addon:u.a.bool,className:u.a.string,cssModule:u.a.object},f=function(e){function t(t){var n;return(n=e.call(this,t)||this).getRef=n.getRef.bind(Object(s.a)(n)),n.focus=n.focus.bind(Object(s.a)(n)),n}Object(c.a)(t,e);var n=t.prototype;return n.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},n.focus=function(){this.ref&&this.ref.focus()},n.render=function(){var e=this.props,t=e.className,n=e.cssModule,s=e.type,c=e.bsSize,i=e.valid,l=e.invalid,u=e.tag,d=e.addon,p=e.plaintext,f=e.innerRef,h=Object(r.a)(e,["className","cssModule","type","bsSize","valid","invalid","tag","addon","plaintext","innerRef"]),m=["radio","checkbox"].indexOf(s)>-1,O=new RegExp("\\D","g"),g=u||("select"===s||"textarea"===s?s:"input"),v="form-control";p?(v+="-plaintext",g=u||"input"):"file"===s?v+="-file":"range"===s?v+="-range":m&&(v=d?null:"form-check-input"),h.size&&O.test(h.size)&&(Object(j.s)('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),c=h.size,delete h.size);var y=Object(j.m)(b()(t,l&&"is-invalid",i&&"is-valid",!!c&&"form-control-"+c,v),n);return("input"===g||u&&"function"===typeof u)&&(h.type=s),h.children&&!p&&"select"!==s&&"string"===typeof g&&"select"!==g&&(Object(j.s)('Input with a type of "'+s+'" cannot have children. Please use "value"/"defaultValue" instead.'),delete h.children),o.a.createElement(g,Object(a.a)({},h,{ref:f,className:y,"aria-invalid":l}))},t}(o.a.Component);f.propTypes=p,f.defaultProps={type:"text"},t.a=f},180:function(e,t,n){"use strict";var a=n(9),r=n(10),s=n(1),c=n.n(s),i=n(2),o=n.n(i),l=n(12),u=n.n(l),d=n(17),b={tag:d.q,size:o.a.string,className:o.a.string,cssModule:o.a.object},j=function(e){var t=e.className,n=e.cssModule,s=e.tag,i=e.size,o=Object(r.a)(e,["className","cssModule","tag","size"]),l=Object(d.m)(u()(t,"input-group",i?"input-group-"+i:null),n);return c.a.createElement(s,Object(a.a)({},o,{className:l}))};j.propTypes=b,j.defaultProps={tag:"div"},t.a=j},184:function(e,t,n){"use strict";var a=n(9),r=n(10),s=n(1),c=n.n(s),i=n(2),o=n.n(i),l=n(12),u=n.n(l),d=n(17),b={tag:d.q,className:o.a.string,cssModule:o.a.object},j=function(e){var t=e.className,n=e.cssModule,s=e.tag,i=Object(r.a)(e,["className","cssModule","tag"]),o=Object(d.m)(u()(t,"card-text"),n);return c.a.createElement(s,Object(a.a)({},i,{className:o}))};j.propTypes=b,j.defaultProps={tag:"p"},t.a=j},193:function(e,t,n){"use strict";var a=n(9),r=n(10),s=n(1),c=n.n(s),i=n(2),o=n.n(i),l=n(12),u=n.n(l),d=n(17),b=n(136),j={tag:d.q,addonType:o.a.oneOf(["prepend","append"]).isRequired,children:o.a.node,className:o.a.string,cssModule:o.a.object},p=function(e){var t=e.className,n=e.cssModule,s=e.tag,i=e.addonType,o=e.children,l=Object(r.a)(e,["className","cssModule","tag","addonType","children"]),j=Object(d.m)(u()(t,"input-group-"+i),n);return"string"===typeof o?c.a.createElement(s,Object(a.a)({},l,{className:j}),c.a.createElement(b.a,{children:o})):c.a.createElement(s,Object(a.a)({},l,{className:j,children:o}))};p.propTypes=j,p.defaultProps={tag:"div"},t.a=p},201:function(e,t,n){"use strict";var a=n(9),r=n(10),s=n(25),c=n(39),i=n(1),o=n.n(i),l=n(2),u=n.n(l),d=n(12),b=n.n(d),j=n(17),p={children:u.a.node,inline:u.a.bool,tag:j.q,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),className:u.a.string,cssModule:u.a.object},f=function(e){function t(t){var n;return(n=e.call(this,t)||this).getRef=n.getRef.bind(Object(s.a)(n)),n.submit=n.submit.bind(Object(s.a)(n)),n}Object(c.a)(t,e);var n=t.prototype;return n.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},n.submit=function(){this.ref&&this.ref.submit()},n.render=function(){var e=this.props,t=e.className,n=e.cssModule,s=e.inline,c=e.tag,i=e.innerRef,l=Object(r.a)(e,["className","cssModule","inline","tag","innerRef"]),u=Object(j.m)(b()(t,!!s&&"form-inline"),n);return o.a.createElement(c,Object(a.a)({},l,{ref:i,className:u}))},t}(i.Component);f.propTypes=p,f.defaultProps={tag:"form"},t.a=f},202:function(e,t,n){"use strict";n.d(t,"f",(function(){return v})),n.d(t,"d",(function(){return y})),n.d(t,"a",(function(){return x})),n.d(t,"b",(function(){return N})),n.d(t,"k",(function(){return S})),n.d(t,"e",(function(){return E})),n.d(t,"j",(function(){return w})),n.d(t,"c",(function(){return M})),n.d(t,"g",(function(){return R})),n.d(t,"h",(function(){return T})),n.d(t,"i",(function(){return _}));var a,r,s,c,i,o,l,u,d=n(98),b=n(99),j=n(104),p=n(106),f=n(8),h=n(105),m=n(38),O=n(5),g=Object(p.a)(a||(a=Object(j.a)(["\n    fragment MessageData on Message {\n        _id\n        roomId\n        message\n        createdAt\n        user{\n            _id\n            userName\n            firstName\n            lastName\n            profileImage\n            isImageOns3\n            profileBg\n        }\n    }\n"]))),v=function(){return function(){var e=Object(b.a)(Object(d.a)().mark((function e(t){var n,a,s,c;return Object(d.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:O.SET_LOADER,payload:!0}),e.prev=1,n=Object(p.a)(r||(r=Object(j.a)(["\n            query {\n                getGlobalMessages{\n                    statusCode\n                    success\n                    nextToken\n                    data{\n                        ...MessageData\n                    }\n                }\n            }\n            ","\n        "])),g),e.next=5,h.a.query({query:n});case 5:a=e.sent,s=a.data,Object(m.handleAuthResponse)(s.getGlobalMessages),s.getGlobalMessages.success&&(c=Object(m.getFieldValue)(s,"getGlobalMessages.data"),f.default.isEmpty(c)||t({type:O.SET_GLOBAL_MESSAGES,payload:c})),t({type:O.SET_LOADER,payload:!1}),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(1),console.error("error: ",e.t0),t({type:O.SET_LOADER,payload:!1});case 17:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t){return e.apply(this,arguments)}}()},y=function(){return function(e){e({type:O.SET_GLOBAL_MESSAGES,payload:[]})}},x=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return function(){var a=Object(b.a)(Object(d.a)().mark((function a(r){var i,o,l;return Object(d.a)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,r({type:O.SET_LOADER,payload:!0}),i=n?Object(p.a)(s||(s=Object(j.a)(["\n            mutation addRoomMessage($input: MessageInput){\n                addRoomMessage(input: $input){\n                    statusCode\n                    success\n                    message\n                    nextToken\n                    data{\n                        ...MessageData\n                    }\n                }\n            }\n        ","\n        "])),g):Object(p.a)(c||(c=Object(j.a)(["\n            mutation addMessage($input: MessageInput){\n                addMessage(input: $input){\n                    statusCode\n                    success\n                    message\n                    nextToken\n                    data{\n                        ...MessageData\n                    }\n                }\n            }\n        ","\n        "])),g),a.next=5,h.a.mutate({mutation:i,variables:{input:{roomId:e,message:t}}});case 5:o=a.sent,l=o.data,Object(m.handleAuthResponse)(n?l.addRoomMessage:l.addMessage),"private"===n&&r({type:O.SET_LAST_MESSAGE,payload:l.addRoomMessage.data}),r({type:O.SET_LOADER,payload:!1}),a.next=16;break;case 12:a.prev=12,a.t0=a.catch(0),console.error("error: ",a.t0),r({type:O.SET_LOADER,payload:!1});case 16:case"end":return a.stop()}}),a,null,[[0,12]])})));return function(e){return a.apply(this,arguments)}}()},N=function(e){return function(){var t=Object(b.a)(Object(d.a)().mark((function t(n){var a,r;return Object(d.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=Object(p.a)(i||(i=Object(j.a)(["\n           subscription{\n            globalMessages{\n                    ...MessageData\n                }\n            }\n            ","\n        "])),g),r=h.a.subscribe({query:a}),t.abrupt("return",r.subscribe((function(t){var n=t.data;return e(n.globalMessages)})));case 6:t.prev=6,t.t0=t.catch(0),console.error("error: ",t.t0),n({type:O.SET_LOADER,payload:!1});case 10:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}()},S=function(e){return function(t){try{t({type:O.SET_GLOBAL_MESSAGES,payload:e})}catch(n){console.error("error: ",n)}}},E=function(e){return function(){var t=Object(b.a)(Object(d.a)().mark((function t(n){var a,r,s,c;return Object(d.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:O.SET_LOADER,payload:!0}),t.prev=1,a=Object(p.a)(o||(o=Object(j.a)(["\n            query getCurrentChatByRoomId($roomId: String){\n                getCurrentChatMessages(roomId: $roomId){\n                    statusCode\n                    success\n                    nextToken\n                    data{\n                        ...MessageData\n                    }\n                }\n            }\n            ","\n        "])),g),t.next=5,h.a.query({query:a,variables:{roomId:e}});case 5:r=t.sent,s=r.data,Object(m.handleAuthResponse)(s.getCurrentChatMessages),s.getCurrentChatMessages.success&&(c=Object(m.getFieldValue)(s,"getCurrentChatMessages.data"))&&c.length&&n({type:O.SET_CURRENT_CHAT_MESSAGES,payload:c}),n({type:O.SET_LOADER,payload:!1}),t.next=17;break;case 13:t.prev=13,t.t0=t.catch(1),console.error("error: ",t.t0),n({type:O.SET_LOADER,payload:!1});case 17:case"end":return t.stop()}}),t,null,[[1,13]])})));return function(e){return t.apply(this,arguments)}}()},w=function(e){return function(t){try{t({type:O.SET_CURRENT_CHAT_MESSAGES,payload:e})}catch(n){console.error("error: ",n)}}},M=function(){return function(e){e({type:O.SET_CURRENT_CHAT_MESSAGES,payload:[]})}},R=function(e){return function(t){try{t({type:O.SET_MESSAGE_NOTIFICATION,payload:e})}catch(n){console.error("error: ",n)}}},T=function(e){return function(t){try{var n=Object(p.a)(l||(l=Object(j.a)(["\n           subscription{\n            currentChat{\n                    ...MessageData\n                }\n            }\n            ","\n        "])),g);return h.a.subscribe({query:n}).subscribe((function(t){var n=t.data;return e(n.currentChat)}))}catch(a){console.error("error: ",a),t({type:O.SET_LOADER,payload:!1})}}},_=function(e){return function(t){try{var n=Object(p.a)(u||(u=Object(j.a)(["\n        subscription{\n            messageNotificationSubs {\n              _id\n              userId\n              roomId\n              messageIds\n              tag\n              createdAt\n              updatedAt\n              status\n            }\n          }\n        "])));return h.a.subscribe({query:n}).subscribe((function(t){var n=t.data;return e(n.messageNotificationSubs)}))}catch(a){console.error("error: ",a),t({type:O.SET_LOADER,payload:!1})}}}},235:function(e,t,n){},534:function(e,t,n){},622:function(e,t,n){"use strict";n.r(t);var a=n(14),r=n(1),s=n.n(r),c=n(98),i=n(99),o=n(18),l=n.n(o),u=n(43),d=n(22),b=n(12),j=n.n(b),p=n(142),f=n.n(p),h=n(2),m=n.n(h);function O(){return O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},O.apply(this,arguments)}function g(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var v=Object(r.forwardRef)((function(e,t){var n=e.color,a=void 0===n?"currentColor":n,r=e.size,c=void 0===r?24:r,i=g(e,["color","size"]);return s.a.createElement("svg",O({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},i),s.a.createElement("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}))}));v.propTypes={color:m.a.string,size:m.a.oneOfType([m.a.string,m.a.number])},v.displayName="MessageSquare";var y=v,x=n(563);function N(){return N=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},N.apply(this,arguments)}function S(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var E=Object(r.forwardRef)((function(e,t){var n=e.color,a=void 0===n?"currentColor":n,r=e.size,c=void 0===r?24:r,i=S(e,["color","size"]);return s.a.createElement("svg",N({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},i),s.a.createElement("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),s.a.createElement("polygon",{points:"22 2 15 22 11 13 2 9 22 2"}))}));E.propTypes={color:m.a.string,size:m.a.oneOfType([m.a.string,m.a.number])},E.displayName="Send";var w=E,M=n(201),R=n(180),T=n(154),_=n(97),k=n(38),C=n(202),A=n(151),z=n(40),I=n(4),L=function(e){var t=e.handleUserSidebarRight,n=e.handleSidebar,s=e.userSidebarLeft,o=Object(d.d)((function(e){return e.chats})).currentChatMessages;o=o||[];var b=Object(d.d)((function(e){return e.rooms})).currentRoom;b=b||{};var p=Object(d.d)((function(e){return e.auth})).user,h=Object(r.useRef)(null),m=Object(d.c)(),O=Object(r.useState)(""),g=Object(a.a)(O,2),v=g[0],N=g[1];Object(r.useEffect)((function(){o.length&&function(){if(null===h||void 0===h?void 0:h.current){var e=l.a.findDOMNode(h.current);e&&(e.scrollTop=Number.MAX_SAFE_INTEGER)}}()}),[o]);var S=function(e){t()},E=function(){var e=Object(i.a)(Object(c.a)().mark((function e(t){return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),v&&b.type&&"pending"!==b.status&&"rejected"!==b.status?(m(Object(C.a)(b._id,v.trim(),"private")),m(Object(A.d)(b._id)),N("")):""!==v.trim()&&m(Object(z.showToastMessage)("Wait for user to approve your chat request","error"));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=o.length?f.a:"div",P=b,D=P.type,q=P.users,G=b,U=G.name,B=G.profilePicture;if("direct"===D){var W=q.find((function(e){return e._id!==p._id})),H=W.firstName,F=W.lastName,$=W.profilePicture;U="".concat(H," ").concat(F),B=$}return Object(I.jsxs)("div",{className:"chat-app-window",children:[Object(I.jsxs)("div",{className:j()("start-chat-area",{"d-none":Object.keys(b).length}),children:[Object(I.jsx)("div",{className:"start-chat-icon mb-1",children:Object(I.jsx)(y,{})}),Object(I.jsx)("h4",{className:"sidebar-toggle start-chat-text",onClick:function(){!Object.keys(b).length&&!s&&window.innerWidth<=1200&&n()},children:"Start Conversation"})]}),Object.keys(b).length?Object(I.jsxs)("div",{className:j()("active-chat",{"d-none":0===Object.keys(b).length}),children:[Object(I.jsx)("div",{className:"chat-navbar",children:Object(I.jsx)("header",{className:"chat-header",children:Object(I.jsxs)("div",{className:"d-flex align-items-center",children:[Object(I.jsx)("div",{className:"sidebar-toggle d-block d-lg-none mr-1",onClick:n,children:Object(I.jsx)(x.a,{size:21})}),"direct"===D?Object(I.jsx)(u.a,{className:"avatar-border user-profile-toggle m-0 mr-1",img:B,onClick:function(){return S()}}):Object(I.jsx)(u.a,{height:"32",color:b.profileBg,className:"avatar-border user-profile-toggle m-0 mr-1",content:b.name,initials:!0,onClick:function(){return S()}}),Object(I.jsx)("h6",{className:"mb-0",children:U})]})})}),Object(I.jsx)(L,{ref:h,className:"user-chats",options:{wheelPropagation:!1},children:o.length?Object(I.jsx)("div",{className:"chats",children:o.length?o.map((function(e,t){return Object(I.jsxs)("div",{className:j()("chat",{"chat-left":e.user._id!==p._id}),children:[Object(I.jsx)("div",{className:"chat-avatar",children:Object(I.jsx)(u.a,{className:"box-shadow-1 cursor-pointer",img:e.user.profileImage})}),Object(I.jsx)("div",{className:"chat-body",children:Object(I.jsxs)("div",{className:"chat-content",children:[Object(I.jsx)("p",{children:e.message}),Object(I.jsx)("p",{className:"chat-time",children:Object(k.getChatTime)(new Date(parseInt(e.createdAt)))})]},e._id)})]},t)})):""}):null}),Object(I.jsxs)(M.a,{className:"chat-app-form",onSubmit:function(e){return E(e)},children:[Object(I.jsx)(R.a,{className:"input-group-merge mr-1 form-send-message",children:Object(I.jsx)(T.a,{value:v,onChange:function(e){return N(e.target.value)},placeholder:"Type your message here...."})}),Object(I.jsxs)(_.a,{className:"send",color:"primary",children:[Object(I.jsx)(w,{size:14,className:"d-lg-none"}),Object(I.jsx)("span",{className:"d-none d-lg-block",children:"Send"})]})]})]}):null]})},P=n(103),D=n(114),q=n(121),G=n(93);function U(){return U=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},U.apply(this,arguments)}function B(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var W=Object(r.forwardRef)((function(e,t){var n=e.color,a=void 0===n?"currentColor":n,r=e.size,c=void 0===r?24:r,i=B(e,["color","size"]);return s.a.createElement("svg",U({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},i),s.a.createElement("circle",{cx:"11",cy:"11",r:"8"}),s.a.createElement("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"}))}));W.propTypes={color:m.a.string,size:m.a.oneOfType([m.a.string,m.a.number])},W.displayName="Search";var H,F,$,V=W,J=n(184),X=n(88),K=n(193),Q=n(136),Y=n(8),Z=function(e){var t=e.store,n=e.sidebar,s=e.handleSidebar,c=e.userSidebarLeft,i=e.handleUserSidebarLeft,o=Object(d.d)((function(e){return e.rooms})),l=o.rooms,b=o.currentRoom,p=Object(d.d)((function(e){return e.auth})),h=p.user,m=p.allUsers,O=p.onlineUsers,g=Object(d.c)(),v=Object(r.useState)({}),x=Object(a.a)(v,2),N=x[0],S=x[1],E=Object(r.useState)({}),w=Object(a.a)(E,2),M=w[0],_=w[1],k=Object(r.useState)(""),z=Object(a.a)(k,2),L=z[0],U=z[1],B=Object(r.useState)(null),W=Object(a.a)(B,2),Z=W[0],ee=W[1];g(Object(P.d)(!1)),window.setInterval((function(){var e;(null===N||void 0===N?void 0:N.id)===Z&&null!==b&&void 0!==b&&null!==(e=b.notifications)&&void 0!==e&&e.length&&g(Object(A.d)(Z))}),2e3),Object(r.useEffect)((function(){return g(Object(D.e)()),F&&F.subscription&&F.subscription.unsubscribe(),F=g(Object(A.h)((function(e){g(Object(A.i)(e))}))),$&&$.subscription&&$.subscription.unsubscribe(),$=g(Object(C.i)((function(e){g(Object(C.g)(e))}))),function(){g(Object(A.e)()),g(Object(D.m)()),F&&F.subscription&&F.subscription.unsubscribe(),$&&$.subscription&&$.subscription.unsubscribe()}}),[]),Object(r.useEffect)((function(){return g(Object(A.c)(!1,L)),function(){g(Object(A.e)()),H&&H.subscription&&H.subscription.unsubscribe()}}),[L]),Object(r.useEffect)((function(){var e;return"contact"===M&&b&&i(),null!==b&&void 0!==b&&null!==(e=b.notifications)&&void 0!==e&&e.length&&g(Object(A.d)(Z)),function(){g(Object(C.c)()),H&&H.subscription&&H.subscription.unsubscribe()}}),[b]),Object(r.useEffect)((function(){return Z&&(g(Object(C.e)(Z)),g(Object(A.g)(Z))),H&&H.subscription&&H.subscription.unsubscribe(),H=g(Object(C.h)((function(e){g(Object(C.j)(e))}))),function(){g(Object(C.c)()),H&&H.subscription&&H.subscription.unsubscribe()}}),[Z]);var te=function(e,t,a){if(_(e),"room"===e)ee(t),S({type:e,id:t});else if("contact"===e){var r=l.find((function(e){return"direct"===e.type&&Y.default.contains(e.userIds,t)}));r?(ee(r._id),S({type:"room",id:r._id})):g(Object(A.j)({name:a,userIds:[t,h._id],type:"direct"}))}!0===n&&s()};return t?Object(I.jsx)("div",{className:"sidebar-left",children:Object(I.jsxs)("div",{className:"sidebar",children:[Object(I.jsxs)("div",{className:j()("chat-profile-sidebar",{show:c}),children:[Object(I.jsxs)("header",{className:"chat-profile-header",style:{height:"52px"},children:[Object(I.jsxs)("h5",{className:"mt-2",children:["  ",Object(I.jsx)(y,{className:"mr-75",size:"18"}),"Start New Chat"]}),Object(I.jsx)("div",{className:"close-icon",onClick:i,children:Object(I.jsx)(G.a,{size:14})})]}),Object(I.jsx)("div",{className:"sidebar-content",children:Object(I.jsx)(f.a,{className:"chat-user-list-wrapper list-group",options:{wheelPropagation:!1},children:Object(I.jsx)("ul",{className:"chat-users-list chat-list media-list",children:function(){var e=Y.default.pluck(O,"_id"),t=m.filter((function(e){return e._id!==h._id}));return null!==t&&void 0!==t&&t.length?t.map((function(t){var n=t._id,a=t.firstName,r=t.lastName,s=t.profileImage;return Object(I.jsxs)("li",{className:j()({active:"contact"===N.type&&N.id===n}),onClick:function(){return te("contact",n,"".concat(a," ").concat(r))},style:{borderBottom:"1px solid #ebe9f1"},children:[Object(I.jsx)(u.a,{className:"custom-size-avatar",img:s,status:Y.default.contains(e,n)?"online":"offline"}),Object(I.jsx)("div",{className:"chat-info flex-grow-1",children:Object(I.jsxs)("h5",{className:"mb-0",children:[a," ",r]})})]},n)})):Object(I.jsx)("li",{className:"no-results show",children:Object(I.jsx)("h6",{className:"mb-0",children:"No Users Found"})})}()})})})]}),Object(I.jsxs)("div",{className:j()("sidebar-content",{show:!0===n}),children:[Object(I.jsx)("div",{className:"sidebar-close-icon",onClick:s,children:Object(I.jsx)(G.a,{size:14})}),Object(I.jsx)("div",{className:"chat-fixed-search",children:Object(I.jsxs)("div",{className:"d-flex align-items-center w-100",children:[Object(I.jsx)("div",{className:"sidebar-profile-toggle",children:Object.keys(h).length?Object(I.jsx)(u.a,{className:"avatar-border",img:h.profileImage,status:"online",imgHeight:"42",imgWidth:"42"}):null}),Object(I.jsxs)(R.a,{className:"input-group-merge ml-1 w-100",children:[Object(I.jsx)(K.a,{addonType:"prepend",children:Object(I.jsx)(Q.a,{className:"round",children:Object(I.jsx)(V,{className:"text-muted",size:14})})}),Object(I.jsx)(T.a,{value:L,className:"round",placeholder:"Search or start a new chat",onChange:function(e){e.preventDefault(),U(e.target.value)}})]}),Object(I.jsx)("div",{className:"cursor-pointer",children:Object(I.jsx)(y,{className:"ml-75",size:"18",onClick:i})})]})}),Object(I.jsx)(f.a,{className:"chat-user-list-wrapper list-group",options:{wheelPropagation:!1},children:Object(I.jsx)("ul",{className:"chat-users-list chat-list media-list",children:l&&l.length?l.map((function(e){var t=e._id,n=e.lastMessage,a=e.createdAt,r=e.profileBg,s=e.notifications,c=e.type,i=e.users,o=e.name,l=e.profilePicture;if("direct"===c){var d=i.find((function(e){return e._id!==h._id})),b=d.firstName,p=d.lastName,f=d.profilePicture;o="".concat(b," ").concat(p),l=f}var m=n||{},O=m.message,g=m.createdAt,v=null===s||void 0===s?void 0:s.find((function(e){return e.userId===h._id})),y=g||a?Object(q.a)(new Date(parseInt(g||a))):"";return Object(I.jsxs)("li",{className:j()({active:"room"===N.type&&N.id===t}),onClick:function(){return te("room",t)},children:["direct"===c?Object(I.jsx)(u.a,{className:"custom-size-avatar",img:l}):Object(I.jsx)(u.a,{className:"custom-size-avatar",color:r,content:o,initials:!0}),Object(I.jsxs)("div",{className:"chat-info flex-grow-1",children:[Object(I.jsx)("h5",{className:"mb-0",children:o}),O&&Object(I.jsx)(J.a,{className:"text-truncate",children:O})]}),Object(I.jsx)("div",{className:"chat-meta text-nowrap",children:null===v||void 0===v||!v.messageIds.length||"room"===N.type&&N.id===t?y&&Object(I.jsx)("small",{className:"float-right mb-25 chat-time ml-25",children:y}):Object(I.jsx)(X.a,{className:"float-right",color:"danger",pill:!0,children:v.messageIds.length})})]},t)})):Object(I.jsx)("li",{className:"no-results show",children:Object(I.jsx)("h6",{className:"mb-0",children:"No Rooms Found"})})})})]})]})}):null},ee=function(e){var t,n=e.handleUserSidebarRight,a=e.userSidebarRight,r=Object(d.d)((function(e){return e.rooms})).currentRoom;r=r||{};var s=Object(d.d)((function(e){return e.auth})).user,c=r,i=c.type,o=c.users,l=r,b=l.name,p=l.profilePicture;if("direct"===i){var h=o.find((function(e){return e._id!==s._id})),m=h.firstName,O=h.lastName,g=h.profilePicture;b="".concat(m," ").concat(O),p=g}return Object(I.jsx)("div",{className:j()("user-profile-sidebar",{show:!0===a}),children:Object.keys(r).length?Object(I.jsxs)("div",{children:[Object(I.jsxs)("header",{className:"user-profile-header",children:[Object(I.jsx)("span",{className:"close-icon",onClick:n,children:Object(I.jsx)(G.a,{size:14})}),Object(I.jsxs)("div",{className:"header-profile-sidebar",children:["direct"===r.type?Object(I.jsx)(u.a,{className:"box-shadow-1 avatar-border",size:"xl",img:p,imgHeight:"70",imgWidth:"70"}):Object(I.jsx)(u.a,{className:"box-shadow-1 avatar-border",size:"xl",content:r.name,color:r.profileBg,imgHeight:"70",imgWidth:"70",initials:!0}),Object(I.jsx)("h4",{className:"chat-user-name",children:b})]})]}),"private"===r.type?Object(I.jsx)(f.a,{className:"user-profile-sidebar-area",options:{wheelPropagation:!1},children:Object(I.jsxs)("div",{className:"personal-info",children:[Object(I.jsx)("h6",{className:"section-label mb-1 mt-3",children:"Users"}),Object(I.jsx)("ul",{className:"list-unstyled",children:r&&(null===(t=r.users)||void 0===t?void 0:t.length)&&r.users.map((function(e){return Object(I.jsxs)("li",{className:"mb-1",children:[Object(I.jsx)(u.a,{className:"box-shadow-1 avatar-border mr-50",size:"sm",img:e.profilePicture,imgHeight:"70",imgWidth:"70"}),Object(I.jsxs)("span",{className:"align-middle",children:[e.firstName," ",e.lastName]})]},e._id)}))})]})}):null]}):null})};n(534),n(235),t.default=function(){Object(d.c)();var e=Object(d.d)((function(e){return e.chats})),t=Object(r.useState)({}),n=Object(a.a)(t,2),s=n[0],c=n[1],i=Object(r.useState)(!1),o=Object(a.a)(i,2),l=o[0],u=o[1],b=Object(r.useState)(!1),p=Object(a.a)(b,2),f=p[0],h=p[1],m=Object(r.useState)(!1),O=Object(a.a)(m,2),g=O[0],v=O[1],y=function(){return u(!l)},x=function(){return h(!f)};return Object(I.jsxs)(r.Fragment,{children:[Object(I.jsx)(Z,{store:e,sidebar:l,handleSidebar:y,userSidebarLeft:g,handleUserSidebarLeft:function(){return v(!g)}}),Object(I.jsx)("div",{className:"content-right",children:Object(I.jsx)("div",{className:"content-wrapper",children:Object(I.jsxs)("div",{className:"content-body",children:[Object(I.jsx)("div",{className:j()("body-content-overlay",{show:!0===f||!0===l||!0===g}),onClick:function(){u(!1),h(!1),v(!1)}}),Object(I.jsx)(L,{store:e,handleUser:function(e){return c(e)},handleSidebar:y,userSidebarLeft:g,handleUserSidebarRight:x}),Object(I.jsx)(ee,{user:s,userSidebarRight:f,handleUserSidebarRight:x})]})})})]})}}}]);
//# sourceMappingURL=23.e8bb418c.chunk.js.map