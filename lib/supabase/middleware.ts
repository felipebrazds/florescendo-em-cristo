import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_PREFIX = "/admin";
const LOGIN_PATH = "/admin/login";
// Rotas dentro de /admin que precisam carregar SEM sessão prévia:
// - /admin/login: onde ela entra.
// - /admin/forgot-password: pede o link por e-mail.
// - /admin/update-password: o link de recuperação chega com o token no
//   fragmento da URL (#access_token=...), que só o navegador enxerga — a
//   própria página estabelece a sessão no cliente antes de mostrar o form.
const PUBLIC_ADMIN_PATHS = new Set([
  LOGIN_PATH,
  "/admin/forgot-password",
  "/admin/update-password",
]);

/**
 * Refreshes the Supabase auth session on every request (required by
 * @supabase/ssr) and gates the /admin area: signed-out visitors are sent to
 * /admin/login, signed-in admins are sent away from /admin/login.
 *
 * This is the enforcement layer readers never touch — /admin/login is the
 * only public *page* under /admin, everything else needs a session.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: do not run code between createServerClient and getUser().
  // A simple mistake here can make it very hard to debug session issues.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith(ADMIN_PREFIX);
  const isPublicAdminRoute = PUBLIC_ADMIN_PATHS.has(pathname);

  if (isAdminRoute && !isPublicAdminRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === LOGIN_PATH && user) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_PREFIX;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
