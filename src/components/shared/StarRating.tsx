import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
  reviewCount?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  showValue = false,
  reviewCount,
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const currentDisplay = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex items-center gap-1.5" id="star-rating-container">
      <div className="flex items-center gap-0.5" role="img" aria-label={`Calificación: ${rating} de ${maxRating} estrellas`}>
        {Array.from({ length: maxRating }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = currentDisplay >= starValue;
          const isHalf = !isFilled && currentDisplay >= starValue - 0.5;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRatingChange && onRatingChange(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform p-0.5 focus:outline-none' : 'cursor-default'} relative`}
              aria-label={`${starValue} estrellas`}
            >
              <Star
                className={`${starSizes[size]} transition-colors ${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : isHalf
                    ? 'fill-amber-300 text-amber-400'
                    : 'fill-slate-200 dark:fill-slate-700 text-slate-300 dark:text-slate-600'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
