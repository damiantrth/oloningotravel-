import "./globals.css";

// Shown only for addresses outside the language folders. Everything else uses app/[locale]/not-found.tsx.
export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="light">
      <body>
        <main className="section">
          <div className="wrap stack nf">
            <h1>Page not found · Seite nicht gefunden</h1>
            <p className="lead">
              <a className="link" href="/en">English</a> · <a className="link" href="/de">Deutsch</a>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
