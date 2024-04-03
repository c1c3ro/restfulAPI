import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    
    if (request.headers.get("Content-Type") === "application/json") {
        try {
  
            const body = await request.json();

            if (import.meta.env.MY_PASSWORD == body.pass) {
                var message = "success"
            } else { var message = "fail"  }
  
            return new Response(JSON.stringify({message: message}), {
                status: 200,
            });
  
        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({msg: "ERROR"}), {
                status: 400,
              });
        }
      }
    }