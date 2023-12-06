const server = Bun.serve({
    port: 3000,
    fetch(req) {

        const path = new URL(req.url).pathname;
        if (path === "/") return new Response(Bun.file("./index.html"), {
            status: 200,
            // headers: {
            //     "Content-Type": "text/html; charset=utf-8"
            // }
        });
        if (path === "/index.js") return new Response(Bun.file(`./out${path}`), {
            status: 200,
            // headers: {
            //     "Content-Type": "text/html; charset=utf-8"
            // }
        });
        return new Response(null, { status: 404 });

    },
});

console.log(`Listening on localhost: ${server.port}`);



