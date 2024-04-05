import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_CefjZLdr.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contato/[id]","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/contato\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contato","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/contato/[id]/index.ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contato","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/contato\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contato","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contato/index.ts","pathname":"/api/contato","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/login","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/login\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/login.ts","pathname":"/api/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"var d=document.getElementById(\"contact\");if(!d)throw new Error(\"Formulário não existe!\");d.addEventListener(\"submit\",h);function h(t){t.preventDefault();var s=new FormData(d),n={};s.forEach((e,i)=>n[i]=e);var a=JSON.stringify(n);return console.log(s.get(\"nome\")),fetch(window.location.protocol+\"//\"+window.location.host+\"/api/contato\",{method:\"POST\",body:a,headers:{\"Content-Type\":\"application/json\"}}).then(e=>e.json()).then(e=>{console.log(e),e.result==\"success\"&&console.log(\"funcionou cara de tatu\")}).catch(e=>{console.error(e)}),!1}window.onload=()=>{const t=document.getElementById(\"expense\");t.addEventListener(\"submit\",n);function s(e){e.querySelector(\".load-spinner\").classList.toggle(\"visually-hidden\"),e.querySelector(\".load-text\").classList.toggle(\"visually-hidden\"),e.querySelector(\".button-text\").classList.toggle(\"visually-hidden\")}function n(e){e.preventDefault(),s(t);var i=new FormData(t),u=\"\",c=\"\",l={};i.forEach(function(o,g){l[g]=o});var r=document.getElementById(\"select\");r.value==\"outro\"?u=l.outro:c=r.options[r.selectedIndex].text,console.log(l),console.log(c),fetch(window.location.protocol+\"//\"+window.location.host+\"/api/contato\",{method:\"POST\",body:JSON.stringify({price:l.price,selectedText:c,outraCategoria:u}),headers:{\"Content-Type\":\"application/json\"}}).then(o=>o.json()).then(o=>{o.message==\"success\"?(t.reset(),a(!0)):a(!1)}).catch(o=>{a(!1)})}function a(e){s(t),e?(t.querySelector(\"#sucesso\").classList.toggle(\"visually-hidden\"),setTimeout(()=>{t.querySelector(\"#sucesso\").classList.toggle(\"visually-hidden\")},7e3)):(t.querySelector(\"#falha\").classList.toggle(\"visually-hidden\"),setTimeout(()=>{t.querySelector(\"#falha\").classList.toggle(\"visually-hidden\")},7e3))}};\n"}],"styles":[{"type":"inline","content":"main[data-astro-cid-mykkm4oa]{margin:auto;padding:1rem;width:800px;max-width:calc(100% - 2rem);color:#fff;font-size:20px;line-height:1.6}.astro-a[data-astro-cid-mykkm4oa]{position:absolute;top:-32px;left:50%;transform:translate(-50%);width:220px;height:auto;z-index:-1}h1[data-astro-cid-mykkm4oa]{font-size:4rem;font-weight:700;line-height:1;text-align:center;margin-bottom:1em}body{font-family:Montserrat,sans-serif;background-color:#1d040d;color:#e0ffc7}#navbar-logo[data-astro-cid-mykkm4oa]{width:200px;height:auto}.loader[data-astro-cid-mykkm4oa]{display:inline-block;border:3px solid #333;border-top:3px solid transparent;border-radius:50%;width:17px;height:17px;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"}],"routeData":{"route":"/inform","isIndex":false,"type":"page","pattern":"^\\/inform\\/?$","segments":[[{"content":"inform","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/inform.astro","pathname":"/inform","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"main[data-astro-cid-j7pv25f6]{margin:auto;padding:1rem;width:800px;max-width:calc(100% - 2rem);color:#fff;font-size:20px;line-height:1.6}.astro-a[data-astro-cid-j7pv25f6]{position:absolute;top:-32px;left:50%;transform:translate(-50%);width:220px;height:auto;z-index:-1}h1[data-astro-cid-j7pv25f6]{font-size:4rem;font-weight:700;line-height:1;text-align:center;margin-bottom:1em}body{font-family:Montserrat,sans-serif;background-color:#1d040d;color:#e0ffc7}#navbar-logo[data-astro-cid-j7pv25f6]{width:200px;height:auto}.loader[data-astro-cid-j7pv25f6]{display:inline-block;border:3px solid #333;border-top:3px solid transparent;border-radius:50%;width:17px;height:17px;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/NAD_FRONT_END/Desktop/learning/restfulAPI/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/NAD_FRONT_END/Desktop/learning/restfulAPI/src/pages/inform.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/index.astro":"chunks/pages/index_tZI3cQDs.mjs","/src/pages/inform.astro":"chunks/pages/inform_D5aEsBt2.mjs","/src/pages/api/login.ts":"chunks/pages/login_BIr84YEB.mjs","/node_modules/astro/dist/assets/endpoint/node.js":"chunks/pages/node_D4PXnf8n.mjs","\u0000@astrojs-manifest":"manifest_dNLq3lzx.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"chunks/node_B3sYKV78.mjs","\u0000@astro-page:src/pages/api/contato/[id]/index@_@ts":"chunks/index_BYwH8Gaa.mjs","\u0000@astro-page:src/pages/api/contato/index@_@ts":"chunks/index_IinJFFLP.mjs","\u0000@astro-page:src/pages/api/login@_@ts":"chunks/login_CIsUej2n.mjs","\u0000@astro-page:src/pages/inform@_@astro":"chunks/inform_DxWnt-HL.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_CqknVKAI.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.B7Gc6XXZ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/favicon.svg"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
