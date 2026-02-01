# cache: "no-store"        → SSR (dynamic, no cache)
# next: { revalidate: 10 } → ISR (static + auto refresh)
# no fetch config          → SSG (fully static)
