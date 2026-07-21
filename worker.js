export default {
  async fetch() {
    const url = "https://raw.githubusercontent.com/andrewzinkyaw/trenzych-sub/main/nodes.txt";

    const res = await fetch(url);
    const text = await res.text();

    return new Response(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  },
};
