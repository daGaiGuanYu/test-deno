import { get_all } from './handles/all.js'
// key - value
const kv = await Deno.openKv()

Deno.serve(
  {
    port: 80,
  },
  async function(req) {
    const url = new URL(req.url)
    const path = url.pathname
    console.log(
      'serving',
      req.method,
      path,
    )

    switch (path) {
      case '/all':
        return get_all(req, url, kv)
      case '/add':
        await kv.set(
          ['user', 'kaikai'],
          {
            name: 'kaikai',
            birthday: '2021-4-28',
          },
        )
        return new Response(
          JSON.stringify({
            code: 0,
            data: null,
            msg: 'success',
          }),
          {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          }
        )

      default:
        return new Response(
          'Not Found',
          {
            status: 404,
          },
        )
    }
  },
)
