(this["webpackJsonpefnl-dashboard"]=this["webpackJsonpefnl-dashboard"]||[]).push([[36],{101:function(e,t,a){"use strict";a(1);var n=a(111),r=a.n(n),i=a(4);t.a=function(e){var t=e.loading;return t&&Object(i.jsx)("div",{className:"sweet-loading",children:Object(i.jsx)(r.a,{color:"#1061ae",loading:t,style:{display:"block",margin:"0 auto"},size:100})})}},102:function(e,t,a){"use strict";var n=a(100),r=a(144),i=a(145),s=a(4);t.a=function(e){var t=e.breadCrumbTitle,a=e.breadCrumbParent,c=e.breadCrumbParent2,o=e.breadCrumbParent3,u=e.breadCrumbActive;return Object(s.jsx)("div",{className:"content-header row",children:Object(s.jsx)("div",{className:"content-header-left col-12 mb-2",children:Object(s.jsx)("div",{className:"row breadcrumbs-top",children:Object(s.jsxs)("div",{className:"col-12",children:[t?Object(s.jsx)("h2",{className:"content-header-title float-left mb-0",children:t}):"",Object(s.jsx)("div",{className:"breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12",children:Object(s.jsxs)(r.a,{children:[Object(s.jsx)(i.a,{tag:"li",children:Object(s.jsx)(n.b,{to:"/dashboard",children:"Dashboard"})}),a&&Object(s.jsx)(i.a,{tag:"li",className:"text-primary",children:a}),c?Object(s.jsx)(i.a,{tag:"li",className:"text-primary",children:c}):"",o?Object(s.jsx)(i.a,{tag:"li",className:"text-primary",children:o}):"",u&&Object(s.jsx)(i.a,{tag:"li",active:!0,children:u})]})})]})})})})}},175:function(e,t,a){"use strict";a.d(t,"b",(function(){return f})),a.d(t,"e",(function(){return m})),a.d(t,"a",(function(){return v})),a.d(t,"d",(function(){return x})),a.d(t,"f",(function(){return S})),a.d(t,"c",(function(){return L})),a.d(t,"g",(function(){return k}));var n,r,i,s,c=a(98),o=a(104),u=a(99),l=a(106),d=a(8),p=a(105),b=a(38),j=a(5),y=j.SET_LAYOUT_SETTINGS,g=j.SET_LOADER,O=j.SET_TOTAL,h=j.SET_LAYOUT_SETTING,f=function(e,t,a){return function(){var r=Object(u.a)(Object(c.a)().mark((function r(i){var s,u,j,h;return Object(c.a)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,i({type:g,payload:!0}),s=Object(l.a)(n||(n=Object(o.a)(["\n             query getLayoutSettings($limit: Int, $skip: Int, $searchString:String){\n                getLayoutSettings(limit: $limit, skip: $skip, searchString:$searchString ){\n                statusCode\n                success\n                message\n                data{\n                    totalPages\n                    skip\n                    limit\n                    data{\n                    _id\n                    page\n                    position\n                    html\n                    isQaVisible\n                    isProdVisible\n                    isLiveVisible\n                    }\n                }\n                nextToken\n            }\n          }"]))),r.next=5,p.a.query({query:s,variables:{limit:e,skip:t*e,searchString:a}});case 5:u=r.sent,j=u.data,Object(b.handleAuthResponse)(j.getLayoutSettings),j.getLayoutSettings.success&&(h=Object(b.getFieldValue)(j,"getLayoutSettings.data.data"),d.default.isEmpty(h)?(i({type:y,payload:[]}),i({type:O,payload:0})):(i({type:y,payload:h}),i({type:O,payload:Object(b.getFieldValue)(j,"getLayoutSettings.data.totalPages")}))),i({type:g,payload:!1}),r.next=19;break;case 13:r.prev=13,r.t0=r.catch(0),console.error("error: ",r.t0),i({type:y,payload:[]}),i({type:O,payload:0}),i({type:g,payload:!1});case 19:case"end":return r.stop()}}),r,null,[[0,13]])})));return function(e){return r.apply(this,arguments)}}()},m=function(){return function(){var e=Object(u.a)(Object(c.a)().mark((function e(t){return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:y,payload:[]}),t({type:O,payload:0});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},v=function(e){return function(){var t=Object(u.a)(Object(c.a)().mark((function t(a){var n,i,s,u;return Object(c.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a({type:g,payload:!0}),n=Object(l.a)(r||(r=Object(o.a)(["\n             query getLayoutSettingById($id: ID){\n                getLayoutSettingById(id: $id){\n                statusCode\n                success\n                message\n                data{\n                    _id\n                    page\n                    position\n                    html\n                }\n                nextToken\n            }\n          }"]))),t.next=5,p.a.query({query:n,variables:{id:e}});case 5:i=t.sent,s=i.data,Object(b.handleAuthResponse)(s.getLayoutSettingById),s.getLayoutSettingById.success&&(u=Object(b.getFieldValue)(s,"getLayoutSettingById.data"),d.default.isEmpty(u)?(a({type:h,payload:{}}),a({type:O,payload:0})):a({type:h,payload:u})),a({type:g,payload:!1}),t.next=18;break;case 13:t.prev=13,t.t0=t.catch(0),console.error("error: ",t.t0),a({type:g,payload:!1}),a({type:h,payload:{}});case 18:case"end":return t.stop()}}),t,null,[[0,13]])})));return function(e){return t.apply(this,arguments)}}()},x=function(){return function(e){e({type:h,payload:{}})}},S=function(e){var t=e.page,a=e.position,n=e.html,r=e.id,s=e.isProdVisible,d=e.isQaVisible,j=e.isLiveVisible;return function(){var e=Object(u.a)(Object(c.a)().mark((function e(u){var y,O,h;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,u({type:g,payload:!0}),y=Object(l.a)(i||(i=Object(o.a)(["\n            mutation layoutSettingsMutation($input: LayoutSettingsInput){\n                layoutSettingsMutation(input: $input){\n                    statusCode\n                    success\n                    message\n                    nextToken\n                    data{\n                        page\n                        position\n                        html\n                        isQaVisible\n                        isProdVisible\n                        isLiveVisible\n                        createdBy\n                        createdAt\n                        updatedBy\n                        updatedAt\n                    }\n                }\n            }"]))),e.next=5,p.a.mutate({mutation:y,variables:{input:{page:t,position:a,html:n,isProdVisible:s,isQaVisible:d,isLiveVisible:j,_id:r}}});case 5:return O=e.sent,h=O.data,Object(b.handleAuthResponse)(h.layoutSettingsMutation),u({type:g,payload:!1}),e.abrupt("return",h.layoutSettingsMutation);case 12:e.prev=12,e.t0=e.catch(0),console.error("error: ",e.t0),u({type:g,payload:!1});case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}()},L=function(e,t){return function(){var a=Object(u.a)(Object(c.a)().mark((function a(n){var r,i,u,j;return Object(c.a)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,n({type:g,payload:!0}),r=Object(l.a)(s||(s=Object(o.a)(["\n             query getLayoutSettingsBypagePostion($page: String, $position: String){\n                getLayoutSettingsBypagePostion(page: $page, position: $position){\n                statusCode\n                success\n                message\n                data{\n                    _id\n                    page\n                    position\n                    html\n                }\n                nextToken\n            }\n          }"]))),a.next=5,p.a.query({query:r,variables:{page:e,position:t}});case 5:i=a.sent,u=i.data,u.getLayoutSettingsBypagePostion.success&&(j=Object(b.getFieldValue)(u,"getLayoutSettingsBypagePostion.data"),d.default.isEmpty(j)?n({type:h,payload:{}}):n({type:h,payload:j})),n({type:g,payload:!1}),a.next=17;break;case 12:a.prev=12,a.t0=a.catch(0),console.error("error: ",a.t0),n({type:g,payload:!1}),n({type:h,payload:{}});case 17:case"end":return a.stop()}}),a,null,[[0,12]])})));return function(e){return a.apply(this,arguments)}}()},k=function(e){return function(){var t=Object(u.a)(Object(c.a)().mark((function t(a){return Object(c.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a({type:y,payload:e});case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},541:function(e,t,a){},637:function(e,t,a){"use strict";a.r(t);var n=a(98),r=a(0),i=a(99),s=a(14),c=a(1),o=a(568),u=a(586),l=a(590),d=a(201),p=a(169),b=a(170),j=a(571),y=a(224),g=a(154),O=a(97),h=a(22),f=a(101),m=a(102),v=a(175),x=a(108),S=a(100),L=a(8),k=(a(541),a(11)),w=a(542),T=a.n(w),P=a(4),B=function(e){var t,a=e.value,n=e.changeHandler,r=(e.className,Object(c.useRef)(null)),i=(t={useSearch:!0,uploader:{insertImageAsBase64URI:!0},toolbarButtonSize:"small",defaultMode:"1"},Object(k.a)(t,"defaultMode",!0),Object(k.a)(t,"toolbarInlineForSelection",!0),Object(k.a)(t,"showPlaceholder",!1),Object(k.a)(t,"buttons","source,bold,italic,underline,strikethrough,eraser,ul,ol,indent,outdent,left,font,fontsize,paragraph,brush,image,video"),t);return Object(P.jsx)(T.a,{ref:r,value:a,config:i,tabIndex:1,onBlur:function(e){return n(e)}})},I=a(128),V=a(125),N=a(107),C=a(12),E=a.n(C),$=a(233),q=a.n($),A=a(40);t.default=Object(h.b)((function(e){return{loading:e.layoutSettings.loading,layoutSetting:e.layoutSettings.layoutSetting}}),{getLayoutSettingById:v.a,removeLayourSetting:v.d,updateLayourSetting:v.f,showToastMessage:A.showToastMessage})((function(e){var t=e.loading,a=e.layoutSetting,h=e.getLayoutSettingById,v=e.removeLayourSetting,k=e.updateLayourSetting,w=e.showToastMessage,T=Object(x.i)().id,C=Object(c.useState)(""),$=Object(s.a)(C,2),A=$[0],M=$[1],R=Object(c.useState)(""),_=Object(s.a)(R,2),F=_[0],U=_[1],Q=Object(c.useState)(""),z=Object(s.a)(Q,2),D=z[0],H=z[1],G=Object(x.g)(),J=I.b().shape({page:I.d().required(),position:I.d().required()}),Y=Object(N.c)({mode:"onBlur",resolver:Object(V.yupResolver)(J)}),K=Y.register,W=Y.errors,X=Y.handleSubmit,Z=function(){var e=Object(i.a)(Object(n.a)().mark((function e(t){var a;return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=Object(r.a)(Object(r.a)({},t),{},{html:D,id:T,isProdVisible:!0}),!L.default.isEmpty(W)){e.next=13;break}return e.prev=2,e.next=5,k(t);case 5:(a=e.sent).success?(w(a.message,"success"),G.push("/layout-settings")):w(a.message,"error"),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(2),console.error("error: ",e.t0),w(e.t0.message,"error");case 13:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){return h(T),function(){v()}}),[]),Object(c.useEffect)((function(){L.default.isEmpty(a)||(M(a.page),U(a.position),H(a.html))}),[a]),Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(m.a,{breadCrumbParent:Object(P.jsx)(S.b,{to:"/layout-settings",children:Object(P.jsx)(o.a,{id:"Layout Settings"})}),breadCrumbTitle:Object(P.jsx)(o.a,{id:"Layout Settings Update"}),breadCrumbActive:Object(P.jsx)(o.a,{id:"Layout Settings Update"})}),Object(P.jsxs)(u.a,{children:[Object(P.jsx)(f.a,{loading:t}),Object(P.jsx)(l.a,{children:a?Object(P.jsx)(d.a,{className:"auth-login-form mt-2",onSubmit:X(Z),children:Object(P.jsxs)(p.a,{children:[Object(P.jsx)(b.a,{md:"6",sm:"12",children:Object(P.jsxs)(j.a,{children:[Object(P.jsx)(y.a,{for:"Page",children:"Page"}),Object(P.jsx)(g.a,{type:"text",name:"page",id:"Page",value:A,placeholder:"Page",className:E()({"is-invalid":W.page}),onChange:function(e){return M(e.currentTarget.value)},innerRef:K({required:!0,validate:function(e){return""!==e}}),invalid:W.page&&!0,readOnly:!0}),W&&W.page&&Object(P.jsx)(q.a,{children:W.page.message})]})}),Object(P.jsx)(b.a,{md:"6",sm:"12",children:Object(P.jsxs)(j.a,{children:[Object(P.jsx)(y.a,{for:"position",children:"Position"}),Object(P.jsx)(g.a,{type:"text",name:"position",id:"position",placeholder:"Position",value:F,className:E()({"is-invalid":W.position}),onChange:function(e){return U(e.currentTarget.value)},innerRef:K({required:!0,validate:function(e){return""!==e}}),invalid:W.position&&!0,readOnly:!0}),W&&W.position&&Object(P.jsx)(q.a,{children:W.position.message})]})}),Object(P.jsx)(b.a,{md:"12",children:Object(P.jsxs)(j.a,{children:[Object(P.jsx)(y.a,{for:"html",children:"HTML"}),Object(P.jsx)(B,{value:D,changeHandler:function(e){H(e)}})]})}),Object(P.jsx)(b.a,{sm:"6",children:Object(P.jsx)(O.a.Ripple,{type:"submit",color:"primary",children:"Update Layout Settings"})})]})}):null})]})]})}))}}]);
//# sourceMappingURL=36.58f769a6.chunk.js.map