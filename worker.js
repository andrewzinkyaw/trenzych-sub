export default {
  async fetch(request) {
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

    if (!file) {
      return new Response("404 Not Found", {
        status: 404,
      });
    }

    const githubRaw =
      `https://raw.githubusercontent.com/andrewzinkyaw/trenzych-sub/main/${file}`;

    const res = await fetch(githubRaw);

    if (!res.ok) {
      return new Response("Subscription file not found", {
        status: 404,
      });
    }

    const text = await res.text();

    const encoded = btoa(unescape(encodeURIComponent(text)));

    return new Response(encoded, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Profile-Title": "TRENZYCH VPN",
        "Subscription-Userinfo":
          "upload=0; download=0; total=0; expire=0",
      },
    });
  },
};
