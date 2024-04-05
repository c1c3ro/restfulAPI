import { buildClient } from '@xata.io/client';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import 'firebase-admin/firestore';

const tables = [
  {
    name: "expense",
    columns: [
      { name: "price", type: "float", notNull: true, defaultValue: "1" },
      { name: "category", type: "link", link: { table: "categories" } }
    ]
  },
  {
    name: "categories",
    columns: [{ name: "category", type: "string", unique: true }],
    revLinks: [{ column: "category", table: "expense" }]
  }
];
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL: "https://C-cero-Jos-s-workspace-8fhvh2.us-east-1.xata.sh/db/c1c3ro"
};
class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

const client$1 = new XataClient({
  apiKey: "xau_a3ZzwHEC3pbZnmaURZwYzPfiWudC2TtD0",
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

const activeApps = getApps();
const serviceAccount = {
  type: "service_account",
  project_id: "restful-api-33466",
  private_key_id: "4670123065b5007c6a0e0093ee27f4eca8df6c3d",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBHEOto9ticg1f\n3UWfSvXYL1BjJ4qAvtFxJKy1fBZJ5CWKwRNzhL7wtSOndbWbzq4USzjPsqtKbxcj\nfQJgl+p/9dzKlGuxBNxCuK4ltprUlsvfBNfhXN6oMFSStCati0q8v2LrV0A0tBhz\n3S+/9YoVlkJw2V45w0NZQwfHAhhRu4MS4X6Uhon9pQw0ssef73HSVCcGA+b0Ajti\nX2n5JljpOVQ1FLW1iJUa882SA+YrBWLS2FAuHHjNJzofz+fJicHcIQi4mLqZ/GQh\nns6Ge3QyEOPzEMQldEql680tnCRvEZn3cl/+gIGZsg6zjdAFNtCHL+5JODVSInra\noMDoL8LLAgMBAAECggEAATbIRiMtkeTdqKifc2zpNr61Zqos+Lo6Xte4Ljvld/lz\nMvgbwzImcSTyYG8hASW/emkupj+dTA5+ur5icXEDDGLjTHK6apZ5PAIlNh97wbJg\n/bnuEYCf9ba4EWQIijbB9YXOfWRDBxHKxY+yaSaGA7S6HjN/oCVWGw2M0vd0Z68f\nSDOoOJHKT9DdFxBoSSdxTVi5fEMDWXHWTjF/U9N5QSuFKBkapNFANJxmc5CIS3W3\nLdoCTOb9UA3xroAHNGSey6rE3wG9+vQmatqwyCwFehgSuWe5ept0t59S+ong9+Fv\nco73SxPFlw6RaY8+JP7heItZvG9ttwtnF+kc2VaL4QKBgQD2/JW04mJUQpZQeess\nLPyJPVleTmkrpA3uJOxBmW22H8lXFD4T9l9OXzbj4e+N54dGlxJJk1y/pkwNKAvd\nrXgv/TM/Z7/jUrzbu/S1vytq27RAKr2xULpG/EqzkEIcRdAd+lZycPpwoF0YTHaM\nSUShy7oq/5lpumlw0hpSPj6JlwKBgQDIKFpwFE8oTjXv9/w0k22neGFpqGHO6VBr\nC90WJ00XM9RyLlioAlVg6pW6fIRG3tN1+mn4XkwETxW/VSZlzyD8kOh7KfEU+1yB\njzp6atoyRnxxJ7wnwEMiD4GonNGjpoUCNMZFwkx8k1SrwqUeTfMiqY0zQ+z+QAm6\n7Q6oyqDu7QKBgBDAbvL2y86FOaa5ri6v2m0AgTg5Pz7bgKpfTLriSiOpIkHKuK8n\n7azmHlX0dAf+5RjvlCjzWr4Q7GWUCsH9SwKOPNSXF9e2O+L3a5CMJ8i2oBIeFAGb\nxRadc/+b0DAUuBngac6XRRUwez/zp7K6IXKL29OgxGn8X7xsM6bSW/F/AoGBAIBh\nOZiXvinY+EmBYneKdBOtZ7WwNYPULCtswZJ7BLw0FzhhN6YTURXHgN/LC8C1HSaX\nxi5ytQkyfH1rLSSx1LOKckLFJQdTLgM/jb+FF4yVny2o0cshSy3mikBOzTvNC5Td\nqqqFtC9XBEDiqKumTaNW4uUV1UVCZ7tIX1WuGckFAoGBAI7st2w4c40NtAArRI/1\ntNBTokZx//IhoTluZpCNij2lP+w+so6qRcBYVlJYiOTr790N/nKgZ7QsM0n9Tnvu\nIlLExAdyyMsv37Lf+8vPWidrIJETJnk2ZRcOZBypc/xnvTXVripK7Jl4bgxDvYz8\nGpyo9Ui+EnykKS6MP4y626i9\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-4bdf1@restful-api-33466.iam.gserviceaccount.com",
  client_id: "104889580838021737195",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4bdf1%40restful-api-33466.iam.gserviceaccount.com"
};
activeApps.length === 0 ? initializeApp({
  credential: cert(serviceAccount)
}) : activeApps[0];

const client = new XataClient({
  apiKey: "xau_a3ZzwHEC3pbZnmaURZwYzPfiWudC2TtD0",
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
      const categories = await client.db.categories.getAll();
      var id = "";
      if (!body.outraCategoria.length) {
        categories.forEach((value, key) => {
          if (value.category == body.selectedText) {
            id = value.id;
          }
        });
      } else {
        const createdCategory = await client.db.categories.create({ category: body.outraCategoria });
        id = createdCategory.id;
      }
      const createdInform = await client.db.expense.create({ category: id, price: parseFloat(body.price) });
      return new Response(JSON.stringify({ message: "success", createdObj: createdInform }), {
        status: 200
      });
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ message: "ERROR" }), {
        status: 400
      });
    }
  }
};

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

export { XataClient as X, index as a, index$1 as i };
