(()=>{var e={};e.id=789,e.ids=[789],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},5228:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>g,routeModule:()=>p,serverHooks:()=>x,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>m});var s={};t.r(s),t.d(s,{GET:()=>d,POST:()=>c});var o=t(2706),n=t(8203),a=t(5994),i=t(9187);let u=[];async function c(e){try{let r=await e.json();if(!r.items||0===r.items.length)return i.NextResponse.json({error:"No items in order"},{status:400});if(!r.customer||!r.customer.email)return i.NextResponse.json({error:"Customer email required"},{status:400});u.push(r),console.log("New order received:",{items:r.items.length,total:r.total,customer:r.customer.email,date:r.date});let t=`
NUEVO PEDIDO - NeoProxy Store

Cliente: ${r.customer.name}
Email: ${r.customer.email}
Tel\xe9fono: ${r.customer.phone}

Productos:
${r.items.map(e=>`- ${e.name}: $${e.price}`).join("\n")}

Total: $${r.total}

Env\xedo:
Direcci\xf3n: ${r.customer.address}
Ciudad: ${r.customer.city}
M\xe9todo: ${r.customer.shipping}

Fecha: ${r.date}
    `.trim();return console.log("Email to send:",t),i.NextResponse.json({success:!0,message:"Order received successfully",orderId:`NP-${Date.now()}`,emailBody:t})}catch(e){return console.error("Order processing error:",e),i.NextResponse.json({error:"Failed to process order"},{status:500})}}async function d(){return i.NextResponse.json({orders:u,count:u.length})}let p=new o.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/orders/route",pathname:"/api/orders",filename:"route",bundlePath:"app/api/orders/route"},resolvedPagePath:"/home/darkproxy/neoproxy/artifacts/neoproxy/src/app/api/orders/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:l,workUnitAsyncStorage:m,serverHooks:x}=p;function g(){return(0,a.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:m})}},6487:()=>{},8335:()=>{}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,452],()=>t(5228));module.exports=s})();