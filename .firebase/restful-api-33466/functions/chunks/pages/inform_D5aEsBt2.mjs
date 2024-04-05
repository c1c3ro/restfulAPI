import { c as createAstro, d as createComponent, r as renderTemplate, f as addAttribute, e as renderHead } from '../astro_CefjZLdr.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { X as XataClient } from './index_CDFn9M44.mjs';
/* empty css                           */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Inform = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Inform;
  const password = Astro2.url.searchParams.get("pass");
  const authenticated = password == "1234321";
  if (!authenticated)
    return Astro2.redirect("/404");
  const client = new XataClient({
    apiKey: "xau_a3ZzwHEC3pbZnmaURZwYzPfiWudC2TtD0",
    branch: "main"
  });
  const categories = await client.db.categories.getAll();
  return renderTemplate(_a || (_a = __template(['<html lang="pt-BR" data-astro-cid-mykkm4oa> <head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- <meta name="description" property="og:description" content={description}> --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- <meta property="og:image" content={SITE_URL + ogImage}>\n        <link rel="icon" href={icon} sizes="192x192"> --><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"><link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"><title>Expense Tracker</title>', '</head> <body data-astro-cid-mykkm4oa> <div class="d-flex justify-content-center align-items-center py-5" data-astro-cid-mykkm4oa> <div class="container-fluid" data-astro-cid-mykkm4oa> <div class="row justify-content-center align-items-center mt-2" data-astro-cid-mykkm4oa> <div class="col-12 col-sm-6 col-lg-4 mx-auto text-start mt-2 mt-md-0" data-astro-cid-mykkm4oa> <div class="head-title text-center text-sm-start" data-astro-cid-mykkm4oa> <p class="fw-bold mb-5" style="font-size: 30px;" data-astro-cid-mykkm4oa> Expense Tracker </p> </div> <div class="isthatyou text-center text-sm-start" data-astro-cid-mykkm4oa> <p class="fw-semibold mb-4" style="font-size: 18px;" data-astro-cid-mykkm4oa> Informe seus gastos: </p> </div> <form id="expense" data-astro-cid-mykkm4oa> <div class="col-12 col-md-10 mb-3" data-astro-cid-mykkm4oa> <label for="selectCategory" class="form-label fw-bold" data-astro-cid-mykkm4oa>Qual categoria? <span class="text-danger" data-astro-cid-mykkm4oa>*</span></label> <select id="select" name="selectCategory" class="form-select" onchange="typeAnotherCategory(this)" aria-label="Default select example" required data-astro-cid-mykkm4oa> <option selected data-astro-cid-mykkm4oa>Selecione</option> ', ' <option value="outro" data-astro-cid-mykkm4oa>Adicionar categoria</option> </select> <label for="outro" id="outraCatergoriaLabel" class="form-label fw-bold mt-3" style="display: none" data-astro-cid-mykkm4oa>Adicione a nova categoria: <span class="text-danger" data-astro-cid-mykkm4oa>*</span></label> <input name="outro" type="text" class="form-control" style="display: none" id="outraCatergoria" data-astro-cid-mykkm4oa> </div> <div class="col-12 col-md-10 mb-3" data-astro-cid-mykkm4oa> <label for="exampleFormControlInput3" class="form-label fw-bold" data-astro-cid-mykkm4oa>Informe o preço: <span class="text-danger" data-astro-cid-mykkm4oa>*</span></label> <input name="price" type="number" step="0.01" class="form-control" id="exampleFormControlInput3" required data-astro-cid-mykkm4oa> <div id="sucesso" class="mt-3 form-text text-light text-center fw-semibold visually-hidden" style="font-size: 18px;" data-astro-cid-mykkm4oa>Sucesso!</div> <div id="falha" class="mt-3 form-text text-danger text-center fw-semibold visually-hidden" style="font-size: 18px;" data-astro-cid-mykkm4oa>Falha!</div> </div> <span class="load-spinner loader me-2 visually-hidden" aria-hidden="true" data-astro-cid-mykkm4oa></span> <button type="submit" class="btn btn-dark btn-form py-2 px-3" data-astro-cid-mykkm4oa> <span class="button-text fw-semibold" role="status" data-astro-cid-mykkm4oa>Enviar</span> <span class="visually-hidden load-text fw-semibold" role="status" data-astro-cid-mykkm4oa>Consultando...</span> </button> </form> </div> </div> </div> </div> <script>\n            function typeAnotherCategory(that) {\n                if (that.value == "outro") {\n                    document.getElementById("outraCatergoriaLabel").style.display = "block";\n                    document.getElementById("outraCatergoria").style.display = "block";\n                } else {\n                    document.getElementById("outraCatergoriaLabel").style.display = "none";\n                    document.getElementById("outraCatergoria").style.display = "none";\n                }\n            }\n        </script>   </body> </html>  '])), renderHead(), categories.map((c, index) => renderTemplate`<option${addAttribute(index, "value")} data-astro-cid-mykkm4oa>${c.category}</option>`));
}, "C:/Users/NAD_FRONT_END/Desktop/learning/restfulAPI/src/pages/inform.astro", void 0);
const $$file = "C:/Users/NAD_FRONT_END/Desktop/learning/restfulAPI/src/pages/inform.astro";
const $$url = "/inform";

export { $$Inform as default, $$file as file, $$url as url };
