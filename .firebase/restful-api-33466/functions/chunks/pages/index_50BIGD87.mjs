import { buildClient } from '@xata.io/client';

const tables = [
  {
    name: "contato-inicial",
    columns: [
      {
        name: "nome",
        type: "string",
        notNull: true,
        defaultValue: "Nome completo"
      },
      {
        name: "email",
        type: "email",
        notNull: true,
        defaultValue: "Email@provedor.com"
      },
      { name: "telefone", type: "string" },
      { name: "assunto", type: "string" },
      {
        name: "mensagem",
        type: "text",
        notNull: true,
        defaultValue: "Mensagem do usuário"
      }
    ]
  },
  {
    name: "inscritos",
    columns: [
      { name: "Data", type: "datetime" },
      { name: "Nome", type: "string" },
      { name: "CPF", type: "string" },
      { name: "Email", type: "string" },
      { name: "Telefone", type: "string" },
      { name: "area", type: "text" },
      { name: "WorkshopSexta", type: "string" },
      { name: "WorkshopDomingo", type: "string" }
    ]
  }
];
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL: "https://nad-ue460p.us-east-1.xata.sh/db/contato"
};
class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

const client$1 = new XataClient({
  apiKey: "xau_foXqz1GKxLOWuPH5BqXnQAoC4zvD6Pvm2",
  branch: "main"
});
const PUT = async ({ params, request }) => {
  const id = params.id;
  const body = await request.json();
  try {
    if (!id)
      throw new Error("ID is Required");
    const updatedCourse = await client$1.db["contato-inicial"].update(id, body);
    return new Response(JSON.stringify(updatedCourse), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: "ERROR" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const DELETE = async ({ params, request }) => {
  const id = params.id;
  try {
    if (!id)
      throw new Error("ID is Required");
    const deletedCourse = await client$1.db["contato-inicial"].delete(id);
    return new Response(JSON.stringify(deletedCourse), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: "ERROR" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const client = new XataClient({
  apiKey: "xau_foXqz1GKxLOWuPH5BqXnQAoC4zvD6Pvm2",
  branch: "main"
});
async function GET() {
  try {
    const courses = await client.db["contato-inicial"].getAll();
    return new Response(JSON.stringify(courses), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.log(error);
  }
}
const POST = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const body = await request.json();
      const createdCourse = await client.db["contato-inicial"].create(body);
      return new Response(JSON.stringify(createdCourse), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://nad-edu-git-urgencia-novo-nads-projects-178161a5.vercel.app/"
        }
      });
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ msg: "ERROR" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
};

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
