import { Link } from "@/i18n/navigation";
import type { TripCardData, ReviewView } from "@/lib/views";
import type { Placeholder } from "@/lib/types";
import { Photo } from "./Photo";

export type CardLabels = { from: string; pp: string; photo: string };

export function TripCard({ trip, labels }: { trip: TripCardData; labels: CardLabels }) {
  return (
    <Link className="card" href={{ pathname: "/trips/[slug]", params: { slug: trip.slug } }}>
      <div className="ph-wrap">
        <Photo src={trip.image} alt={trip.title} placeholder={trip.placeholder} caption={labels.photo} />
        {trip.offerLabel && <span className="badge badge-offer">{trip.offerLabel}</span>}
      </div>
      <div className="card-body">
        <span className="meta">{trip.meta}</span>
        <h3>{trip.title}</h3>
        <span className="meta">{trip.destNames.join(" · ")}</span>
        <div className="price">
          <span className="from">{labels.from}</span>
          {trip.oldPrice && <s>{trip.oldPrice}</s>}
          <span className="amt">{trip.price}</span>
          <span className="from">{labels.pp}</span>
        </div>
      </div>
    </Link>
  );
}

export function DestTile({
  slug, name, region, image, placeholder,
}: { slug: string; name: string; region: string; image: string | null; placeholder: Placeholder }) {
  return (
    <Link className="card dest-tile" href={{ pathname: "/destinations/[slug]", params: { slug } }}>
      <Photo src={image} alt={name} placeholder={placeholder} sizes="(max-width: 900px) 50vw, 25vw" />
      <span className="label">
        <b>{name}</b>
        <span className="small">{region}</span>
      </span>
    </Link>
  );
}

export function Stars({ n, label }: { n: number; label: string }) {
  return (
    <span className="stars" role="img" aria-label={label}>
      {"★".repeat(n)}
      <span className="off">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export function ReviewCard({ review, starsLabel, sampleLabel }: { review: ReviewView; starsLabel: string; sampleLabel: string }) {
  return (
    <figure className="review">
      <Stars n={review.rating} label={starsLabel} />
      <q>{review.text}</q>
      <figcaption className="who">
        <b>{review.author}</b>
        {review.origin && <span>{review.origin}</span>}
        {review.tripTitle && <span>· {review.tripTitle}</span>}
        {review.sample && <span className="badge badge-sample">{sampleLabel}</span>}
      </figcaption>
    </figure>
  );
}

export function MaaSpotlight({
  eyebrow, term, meaning, body, tagline, storyLink,
}: { eyebrow: string; term: string; meaning: string; body: string; tagline?: string; storyLink?: string }) {
  return (
    <section className="shuka maa">
      <div className="wrap">
        <div className="word spot">
          <span className="eyebrow">{eyebrow}</span>
          <span className="term" lang="mas">{term}</span>
          <span className="mean">{meaning}</span>
          <p>{body}</p>
          {tagline && <p className="tagline">{tagline}</p>}
          {storyLink && <Link className="story-link" href="/about">{storyLink} →</Link>}
        </div>
      </div>
    </section>
  );
}

export function Divider() {
  return (
    <div className="wrap">
      <hr className="divider" />
    </div>
  );
}
