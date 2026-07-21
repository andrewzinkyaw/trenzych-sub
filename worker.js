export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const routes = {
      "/": "free.txt",
      "/free": "free.txt",
      "/premium": "premium.txt",
      "/sg": "sg.txt",
      "/jp": "jp.txt",
      "/us": "us.txt",
    };

    const file = routes[url.pathname];
    
    const TOKENS = {
  "/": env.FREE_TOKEN,
  "/free": env.FREE_TOKEN,
  "/premium": env.PREMIUM_TOKEN,
  "/sg": env.SG_TOKEN,
  "/jp": env.JP_TOKEN,
  "/us": env.US_TOKEN,
};

const expectedToken = TOKENS[url.pathname];
const token = url.searchParams.get("token");

if (expectedToken && token !== expectedToken) {
  return new Response("403 Forbidden", {
    status: 403,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

    if (!file) {
      return new Response("404 Not Found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    const githubRaw =
      `https://raw.githubusercontent.com/andrewzinkyaw/trenzych-sub/main/${file}`;

    try {
      const res = await fetch(githubRaw, {
        cf: {
          cacheEverything: true,
          cacheTtl: 300,
        },
      });

      if (!res.ok) {
        return new Response("Subscription file not found.", {
          status: 404,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        });
      }

      const text = (await res.text()).trim();

      if (!text) {
        return new Response("Subscription is empty.", {
          status: 404,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        });
      }

      const encoded = btoa(unescape(encodeURIComponent(text)));

      return new Response(encoded, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Profile-Title": "TRENZYCH VPN",
          "Profile-Update-Interval": "6",
          "Subscription-Userinfo": "upload=0; download=0; total=0; expire=0",
          "Cache-Control": "public, max-age=300",
          "Access-Control-Allow-Origin": "*",
          "X-Content-Type-Options": "nosniff",
        },
      });

    } catch (err) {
      return new Response("Worker Error\n\n" + err.message, {
        status: 500,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }
  },
};
