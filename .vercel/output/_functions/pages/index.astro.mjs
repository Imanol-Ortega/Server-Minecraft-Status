/* empty css                                 */
import { c as createComponent, r as renderTemplate, a as addAttribute, b as renderHead, e as renderComponent, f as createAstro } from '../chunks/astro/server_BtIk05W1.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import axios from 'axios';
import { useState, useEffect } from 'react';
export { renderers } from '../renderers.mjs';

async function getStatus() {
  const response = await axios.get(`https://api.mcstatus.io/v2/status/java/${"181.122.92.245"}`);
  return response.data;
}

function SpanLine({ title, description, classDesc }) {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("li", { className: "block lg:flex w-full p-4 border-b border-b-black/10 dark:border-b-white/10 contrast-more:border-b-black/50 contrast-more:dark:border-b-white/50", children: [
    /* @__PURE__ */ jsx("span", { className: "self-center block w-64 mb-1 font-semibold lg:inline-block lg:mb-0", children: title }),
    /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("span", { className: `font-mono ${classDesc}`, children: description }) })
  ] }) });
}

const Loading = () => /* @__PURE__ */ jsx(
  "svg",
  {
    viewBox: "0 0 100 100",
    preserveAspectRatio: "xMidYMid",
    width: "100",
    height: "100",
    children: /* @__PURE__ */ jsxs(
      "g",
      {
        children: [
          /* @__PURE__ */ jsx(
            "circle",
            {
              strokeDasharray: "160.22122533307947 55.40707511102649",
              r: "34",
              strokeWidth: "7",
              stroke: "#000000",
              fill: "none",
              cy: "50",
              cx: "50",
              children: /* @__PURE__ */ jsx(
                "animateTransform",
                {
                  keyTimes: "0;1",
                  values: "0 50 50;360 50 50",
                  dur: "1.1764705882352942s",
                  repeatCount: "indefinite",
                  type: "rotate",
                  attributeName: "transform"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("g", {})
        ]
      }
    )
  }
);

function MinecraftStatus() {
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const tp = await getStatus();
        setStatus(tp);
        setIsLoading(true);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "h-full flex", children: /* @__PURE__ */ jsxs("div", { className: "dark:bg-neutral-900 dark:text-white overflow-x-hidden scroll-smooth w-[900px] h-[700px] m-auto p-10", children: [
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-between gap-5 lg:flex-row lg:items-end", children: /* @__PURE__ */ jsxs("hgroup", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-sans font-semibold", children: "Minecraft Server Status" }),
      /* @__PURE__ */ jsx("p", { className: "text-base font-light p-1 mt-2", children: "Recupera rápidamente el estado de cualquier servidor de Minecraft" })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { children: isLoading ? /* @__PURE__ */ jsx("div", { className: "rounded block p-2 mt-3", children: /* @__PURE__ */ jsxs("ul", { className: "list-none", children: [
      /* @__PURE__ */ jsx(SpanLine, { title: "Estado", description: status?.online ? "Online" : "Offline", classDesc: "text-sm rounded px-2 py-1 bg-green-700 text-white text-opacity-100 bg-opacity-100" }),
      /* @__PURE__ */ jsx(SpanLine, { title: "Host", description: status?.host, classDesc: "" }),
      /* @__PURE__ */ jsx(SpanLine, { title: "Puerto", description: status?.port, classDesc: "" }),
      status?.online && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(SpanLine, { title: "MOTD", description: status?.motd.raw, classDesc: "block bg-black rounded text-white p-5 w-full overflow-x-auto " }),
        /* @__PURE__ */ jsx(SpanLine, { title: "Versión", description: status?.version.name_clean, classDesc: "" }),
        /* @__PURE__ */ jsx(SpanLine, { title: "Jugadores", description: `${status?.players.online}/${status?.players.max}`, classDesc: "" }),
        /* @__PURE__ */ jsx(SpanLine, { title: "Mods", description: "YES", classDesc: "" }),
        /* @__PURE__ */ jsx(SpanLine, { title: "Plugins", description: "N/A", classDesc: "" })
      ] })
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsx(Loading, {}) }) })
  ] }) });
}

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Minecraft Status</title>${renderHead()}</head> <body> <div class=""> <div class="rounded-lg overflow-y-auto h-screen"> ${renderComponent($$result, "MinecraftStatus", MinecraftStatus, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/MinecraftStatus.tsx", "client:component-export": "default" })} </div> </div> </body></html>`;
}, "C:/Users/imani/OneDrive/Escritorio/CosasVarias/Programacion/Astro/Server-Minecraft-Status/src/layouts/Layout.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {})}`;
}, "C:/Users/imani/OneDrive/Escritorio/CosasVarias/Programacion/Astro/Server-Minecraft-Status/src/pages/index.astro", void 0);

const $$file = "C:/Users/imani/OneDrive/Escritorio/CosasVarias/Programacion/Astro/Server-Minecraft-Status/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
