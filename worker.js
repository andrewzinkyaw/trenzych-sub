export default {
  async fetch() {
    const url = "https://raw.githubusercontent.com/andrewzinkyaw/trenzych-sub/main/nodes.txt";

    const res = await fetch(url);
    const text = await res.text();

    const encoded = btoa(unescape(encodeURIComponent(text)));

    return new Response(encoded, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Profile-Title": "TRENZYCH VPN",
        "Subscription-Userinfo": "upload=0; download=0; total=0; expire=0"
      }
    });
  }
}
