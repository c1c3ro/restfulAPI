const POST = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const body = await request.json();
      if ("1234321" == body.pass) {
        var message = "success";
      } else {
        var message = "fail";
      }
      return new Response(JSON.stringify({ message }), {
        status: 200
      });
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ msg: "ERROR" }), {
        status: 400
      });
    }
  }
};

export { POST };
