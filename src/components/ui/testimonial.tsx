'use client';

import * as React from 'react';
import { motion, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Testimonial {
  id: number | string;
  name: string;
  avatar: string;
  description: string;
}

export interface TestimonialCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  showArrows?: boolean;
  showDots?: boolean;
}

const TestimonialCarousel = React.forwardRef<
  HTMLDivElement,
  TestimonialCarouselProps
>(
  (
    { className, testimonials, showArrows = true, showDots = true, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [exitX, setExitX] = React.useState<number>(0);

    const goNext = React.useCallback(() => {
      setExitX(100);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setExitX(0);
      }, 200);
    }, [testimonials.length]);

    const goPrev = React.useCallback(() => {
      setExitX(-100);
      setTimeout(() => {
        setCurrentIndex(
          (prev) => (prev - 1 + testimonials.length) % testimonials.length,
        );
        setExitX(0);
      }, 200);
    }, [testimonials.length]);

    const handleDragEnd = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x);
        setTimeout(() => {
          setCurrentIndex((prev) =>
            info.offset.x > 0
              ? (prev - 1 + testimonials.length) % testimonials.length
              : (prev + 1) % testimonials.length,
          );
          setExitX(0);
        }, 200);
      }
    };

    if (!testimonials.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'h-72 w-full flex items-center justify-center',
          className,
        )}
        {...props}
      >
        <div className="relative w-80 h-64">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex;
            const isPrevCard =
              index === (currentIndex - 1 + testimonials.length) % testimonials.length;
            const isNextCard =
              index === (currentIndex + 1) % testimonials.length;

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null;

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  'absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing',
                  'bg-white shadow-xl border border-gray-100',
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isNextCard ? 8 : 16,
                  rotate: isCurrentCard ? 0 : isNextCard ? 2 : 4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isNextCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isNextCard ? 8 : 16,
                  rotate: isCurrentCard ? exitX / 20 : isNextCard ? 2 : 4,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {showArrows && isCurrentCard && (
                  <div className="absolute inset-x-0 top-2 flex justify-between px-4 z-10">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="text-2xl select-none cursor-pointer text-gray-300 hover:text-gray-600 transition-colors"
                      aria-label="Previous testimonial"
                    >
                      &larr;
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="text-2xl select-none cursor-pointer text-gray-300 hover:text-gray-600 transition-colors"
                      aria-label="Next testimonial"
                    >
                      &rarr;
                    </button>
                  </div>
                )}

                <div className="p-6 flex flex-col items-center gap-4 pt-10">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-center text-sm text-gray-600 leading-relaxed">
                    {testimonial.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
          {showDots && (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all duration-200',
                    index === currentIndex
                      ? 'bg-[#c9a227] scale-110'
                      : 'bg-gray-300 hover:bg-gray-400',
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

TestimonialCarousel.displayName = 'TestimonialCarousel';

export { TestimonialCarousel };
