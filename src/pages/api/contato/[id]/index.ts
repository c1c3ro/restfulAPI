import type { APIRoute } from "astro";
import { XataClient } from "../../../../xata";

const client = new XataClient({
    apiKey: import.meta.env.XATA_API_KEY,
    branch: import.meta.env.XATA_BRANCH
  });


export const PUT: APIRoute = async ({ params, request }) => {

const id = params.id
const body = await request.json()

try {

    if (!id) throw new Error("ID is Required");
    
    const updatedCourse = await client.db["contato-inicial"].update(id, body)

    return new Response(JSON.stringify(updatedCourse), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
        });

} catch (error) {
    console.log(error)
    return new Response(JSON.stringify({msg: "ERROR"}), {
        status: 400,
        headers: {
            "Content-Type": "application/json"
        }
        });
}

}


export const DELETE: APIRoute = async ({ params, request }) => {

    const id = params.id
    
    try {

        if (!id) throw new Error("ID is Required");
        
        const deletedCourse = await client.db["contato-inicial"].delete(id)

        return new Response(JSON.stringify(deletedCourse), {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            }
          });

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({msg: "ERROR"}), {
            status: 400,
            headers: {
              "Content-Type": "application/json"
            }
          });
    }

  }