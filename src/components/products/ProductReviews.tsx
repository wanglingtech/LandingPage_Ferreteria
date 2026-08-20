import React, { useState, useEffect } from 'react';
import { ProductReview, User } from '../../models';
import { reviewService } from '../../services/review.service';
import { StarRating } from '../shared/StarRating';
import { MessageSquare, Edit2, Trash2, CheckCircle2, User as UserIcon, Send, X, AlertCircle } from 'lucide-react';
import { generateAvatarPlaceholder } from '../../utils/imageFallback';

interface ProductReviewsProps {
  productId: string;
  productName: string;
  currentUser: User | null;
  onOpenAuth: () => void;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productName,
  currentUser,
  onOpenAuth,
}) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State para nueva reseña
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Editing state
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const data = await reviewService.getReviewsByProductId(productId);
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
    const unsubscribe = reviewService.subscribe(() => {
      loadReviews();
    });
    return unsubscribe;
  }, [productId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (!comment.trim()) {
      setErrorMessage('Por favor escribe tu comentario sobre el producto.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');
      await reviewService.createReview(productId, { rating, title, comment }, currentUser);
      setTitle('');
      setComment('');
      setRating(5);
    } catch (error: any) {
      setErrorMessage(error.message || 'Error al enviar la reseña.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (review: ProductReview) => {
    setEditingReviewId(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleSaveEdit = async (reviewId: string) => {
    try {
      await reviewService.updateReview(reviewId, { rating: editRating, comment: editComment }, currentUser);
      setEditingReviewId(null);
    } catch (error: any) {
      alert(error.message || 'Error al actualizar');
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (confirm('¿Estás seguro de eliminar este comentario?')) {
      try {
        await reviewService.deleteReview(reviewId, currentUser);
      } catch (error: any) {
        alert(error.message || 'Error al eliminar');
      }
    }
  };

  const ratingSummary = reviewService.getRatingBreakdown(reviews);

  return (
    <div id="product-reviews-section" className="space-y-8">
      {/* Resumen de Calificaciones */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-4xl font-black text-slate-900 dark:text-white">
            {ratingSummary.average.toFixed(1)}
          </p>
          <div className="mt-1">
            <StarRating rating={ratingSummary.average} size="md" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Basado en {ratingSummary.total} {ratingSummary.total === 1 ? 'opinión' : 'opiniones'} de clientes
          </p>
        </div>

        {/* Barras de distribución */}
        <div className="flex-1 max-w-sm w-full space-y-1.5 text-xs">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingSummary.distribution[stars] || 0;
            const percentage = ratingSummary.total > 0 ? (count / ratingSummary.total) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-2">
                <span className="w-12 text-slate-500 font-medium">{stars} estrellas</span>
                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-6 text-right text-slate-400">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Formulario de nueva reseña */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#f97316]" />
          Deja tu Opinión sobre este Producto
        </h3>

        {currentUser ? (
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Calificación general
              </label>
              <StarRating rating={rating} size="lg" interactive onRatingChange={setRating} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Título de tu reseña (opcional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Excelente rendimiento para construcción"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Tu comentario y experiencia
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Cuéntale a otros clientes cómo te funcionó la herramienta, su durabilidad y desempeño..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-5 rounded-xl bg-[#0f172a] text-white hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5 text-[#f97316]" />
              {isSubmitting ? 'Publicando...' : 'Publicar Reseña'}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <UserIcon className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Inicia sesión para compartir tu experiencia con {productName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Solo clientes verificados pueden calificar y comentar productos.
            </p>
            <button
              onClick={onOpenAuth}
              className="py-2 px-4 rounded-xl bg-[#f97316] text-white text-xs font-bold hover:bg-[#ea580c] transition-colors shadow-sm"
            >
              Iniciar Sesión para Comentar
            </button>
          </div>
        )}
      </div>

      {/* Lista de Reseñas */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Comentarios de la Comunidad ({reviews.length})
        </h4>

        {isLoading ? (
          <div className="p-6 text-center text-xs text-slate-400 animate-pulse">
            Cargando comentarios...
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            Aún no hay reseñas para este producto. ¡Sé el primero en calificarlo!
          </p>
        ) : (
          reviews.map((rev) => {
            const isOwner = currentUser && currentUser.id === rev.userId;
            const canManage = isOwner || (currentUser && currentUser.role === 'ADMIN');
            const isEditing = editingReviewId === rev.id;

            return (
              <div
                key={rev.id}
                id={`review-item-${rev.id}`}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.userAvatar || generateAvatarPlaceholder(rev.userName)}
                      alt={rev.userName}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = generateAvatarPlaceholder(rev.userName);
                      }}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {rev.userName}
                        </span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Compra Verificada
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(rev.createdAt).toLocaleDateString('es-PE', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  {canManage && !isEditing && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStartEdit(rev)}
                        className="p-1.5 text-slate-400 hover:text-[#f97316] rounded-lg transition-colors"
                        title="Editar reseña"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                        title="Eliminar reseña"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="mt-4 space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <StarRating rating={editRating} size="md" interactive onRatingChange={setEditRating} />
                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveEdit(rev.id)}
                        className="py-1.5 px-3 rounded-lg bg-[#f97316] text-white text-xs font-bold hover:bg-[#ea580c]"
                      >
                        Guardar Cambios
                      </button>
                      <button
                        onClick={() => setEditingReviewId(null)}
                        className="py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    <StarRating rating={rev.rating} size="sm" />
                    {rev.title && (
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2">
                        {rev.title}
                      </h5>
                    )}
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
