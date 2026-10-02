const API_IMG_URL = 'https://www.artic.edu/iiif/2';
const DEFAULT_WIDTH = '843';
const ALLOWED_WIDTHS = [DEFAULT_WIDTH, '1686'];

export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!/^[0-9a-f-]+$/i.test(params.id)) return new Response(null, { status: 400 });

  const requested = new URL(req.url).searchParams.get('w') || DEFAULT_WIDTH;
  const width = ALLOWED_WIDTHS.includes(requested) ? requested : DEFAULT_WIDTH;

  let res: Response;
  try {
    res = await fetch(`${API_IMG_URL}/${params.id}/full/${width},/0/default.jpg`, {
      headers: { 'AIC-User-Agent': 'nextjs-arts-search (study project)' },
    });
  } catch {
    return new Response(null, { status: 502 });
  }
  if (!res.ok) return new Response(null, { status: res.status });

  return new Response(res.body, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
