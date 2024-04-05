import type { APIRoute } from "astro";
import { XataClient } from "../../../xata";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

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
          const categories = await client.db.categories.getAll();
          var id = '';

          if (!body.outraCategoria.length){
            
            categories.forEach((value, key)=>{
              if (value.category == body.selectedText){
                id = value.id;
              }
            })

          } else {

            const createdCategory = await client.db.categories.create({category: body.outraCategoria});
            id = createdCategory.id;

          }

          const createdInform = await client.db.expense.create({category: id, price: parseFloat(body.price)});

          return new Response(JSON.stringify({message: "success", createdObj: createdInform}), {
              status: 200,
          });

      } catch (error) {
          console.log(error)
          return new Response(JSON.stringify({message: "ERROR"}), {
              status: 400,
          });
      }
    }
  }