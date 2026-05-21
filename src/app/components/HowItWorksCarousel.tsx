'use client';

const STEPS = [
  { num: 1, title: 'Tell Us About Your Home', desc: 'No lengthy forms or confusing paperwork. Just share a few basic details about your property — we\'ll take it from there. It takes less than 3 minutes.' },
  { num: 2, title: 'Receive Your Cash Offer', desc: 'Within 24 hours, we\'ll present you with a transparent, no-obligation cash offer based on real market data. No guesswork. No lowball tactics.' },
  { num: 3, title: 'Close When You\'re Ready', desc: 'You pick the closing date — whether that\'s 7 days or 60. We handle all the paperwork and you walk away with cash in hand.' },
];

export default function HowItWorksCarousel() {
  return (
    <div className="cb-how-carousel">
      <div className="cb-how-carousel__viewport">
        <div className="cb-how-carousel__track">
          {STEPS.map((step) => (
            <div key={step.num} className="cb-how-carousel__card cb-step">
              <div className="cb-step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
