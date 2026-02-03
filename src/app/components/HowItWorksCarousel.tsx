'use client';

const STEPS = [
  { num: 1, title: 'Tell us about your property', desc: 'Fill out a short form or call us. We\'ll ask a few questions about your house and situation.' },
  { num: 2, title: 'Get your cash offer', desc: 'We\'ll review your property and send you a fair cash offer—usually within 24 hours.' },
  { num: 3, title: 'Close on your timeline', desc: 'Accept the offer and close when it works for you. We handle the rest. Cash at closing.' },
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
