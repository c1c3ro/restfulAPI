import { c as createAstro, d as createComponent, r as renderTemplate, e as addAttribute, f as renderHead, g as renderSlot, h as renderComponent, m as maybeRenderHead } from '../astro_CYr-hiwt.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                          */

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/cicer/Desktop/Projetos/restfulAPI/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro.", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-j7pv25f6> <form id="contact" data-astro-cid-j7pv25f6> <div class="col-12 col-md-6 mb-3" data-astro-cid-j7pv25f6> <label for="exampleFormControlInput1" class="form-label" data-astro-cid-j7pv25f6>Nome: <span class="obrigatorio" data-astro-cid-j7pv25f6>*</span></label> <input name="nome" type="text" class="form-control" id="exampleFormControlInput1" required data-astro-cid-j7pv25f6> </div> <div class="col-12 col-md-6 mb-3" data-astro-cid-j7pv25f6> <label for="exampleFormControlInput2" class="form-label" data-astro-cid-j7pv25f6>E-mail: <span class="obrigatorio" data-astro-cid-j7pv25f6>*</span></label> <input name="email" type="email" class="form-control" id="exampleFormControlInput2" required data-astro-cid-j7pv25f6> </div> <div class="col-12 col-md-6 mb-3" data-astro-cid-j7pv25f6> <label for="exampleFormControlInput3" class="form-label" data-astro-cid-j7pv25f6>Telefone: <span class="obrigatorio" data-astro-cid-j7pv25f6>*</span></label> <input name="telefone" type="tel" class="form-control" id="exampleFormControlInput3" required data-astro-cid-j7pv25f6> </div> <div class="col-12 col-md-6 mb-3" data-astro-cid-j7pv25f6> <label for="exampleFormControlInput4" class="form-label" data-astro-cid-j7pv25f6>Assunto: </label> <input name="assunto" type="text" class="form-control" id="exampleFormControlInput4" data-astro-cid-j7pv25f6> </div> <div class="col-12 col-md-8 mb-3" data-astro-cid-j7pv25f6> <label for="exampleFormControlTextarea1" class="form-label" data-astro-cid-j7pv25f6>Mensagem: <span class="obrigatorio" data-astro-cid-j7pv25f6>*</span></label> <textarea name="mensagem" class="form-control" id="exampleFormControlTextarea1" rows="3" required data-astro-cid-j7pv25f6></textarea> </div> <span id="load-spinner" class="loader me-2 visually-hidden" aria-hidden="true" data-astro-cid-j7pv25f6></span> <button type="submit" class="btn btn-form py-2 px-3" data-astro-cid-j7pv25f6> <span id="button-text" role="status" data-astro-cid-j7pv25f6>Enviar</span> </button> </form> </main> ` })}  `;
}, "C:/Users/cicer/Desktop/Projetos/restfulAPI/src/pages/index.astro", void 0);

const $$file = "C:/Users/cicer/Desktop/Projetos/restfulAPI/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
