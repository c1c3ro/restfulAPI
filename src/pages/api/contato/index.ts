import type { APIRoute } from "astro";
import { XataClient } from "../../../xata";

const client = new XataClient({
    apiKey: import.meta.env.XATA_API_KEY,
    branch: import.meta.env.XATA_BRANCH
  });

export async function GET() {

    try {
        const courses = await client.db["contato-inicial"].getAll()
        return new Response(JSON.stringify(courses), {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            }
          });
    } catch (error) {
        console.log(error)
    }
  
}

export const POST: APIRoute = async ({ request }) => {
    
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
          console.log(error)
          return new Response(JSON.stringify({msg: "ERROR"}), {
              status: 400,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
              }
            });
      }
    }
  }