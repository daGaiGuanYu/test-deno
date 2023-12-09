export
async function get_all(_req, url, kv) {
  const name = url.searchParams.get('name')
  const entry = await kv.get(['user', name])
  console.log({ entry })
  return new Response(
    JSON.stringify(
      entry.value
    ),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  )
}
