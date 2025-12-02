import { Navigation } from "@/components/navigation";
import { getQuotes } from "@/lib/quotes";
import { ExternalLink } from "lucide-react";

export default async function QuotesPage() {
  const quotes = await getQuotes();

  return (
    <main>
      <Navigation />

      <div className="mb-8">
        <p className="text-muted-foreground text-sm">
          A collection of thoughts that resonate.
        </p>
      </div>

      <section>
        {quotes.length === 0 ? (
          <div className="py-8 text-sm text-muted-foreground">
            <p>No quotes yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {quotes.map((quote) => (
              <div key={quote.id} className="space-y-2">
                <blockquote className="text-lg leading-relaxed">
                  {quote.sourceUrl ? (
                    <a
                      href={quote.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors inline-flex items-start gap-1 group"
                    >
                      <span>{quote.text}</span>
                      <ExternalLink className="w-3 h-3 mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <span>{quote.text}</span>
                  )}
                </blockquote>
                
                {(quote.author || quote.source) && (
                  <div className="text-sm text-muted-foreground">
                    {quote.author && <span>— {quote.author}</span>}
                    {quote.author && quote.source && <span>, </span>}
                    {quote.source && <span>{quote.source}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}