import React, { useState } from "react";
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { User } from "../../models";
import { authService } from "../../services/auth.service";
import { generateAvatarPlaceholder } from "../../utils/imageFallback";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const [tab, setTab] = useState<"login" | "register" | "recover">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Login Form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register Form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Recover Form
  const [recoverEmail, setRecoverEmail] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrorMsg("");
      await authService.login({ email: loginEmail, password: loginPassword });
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrorMsg("");
      await authService.register({
        name: regName,
        email: regEmail,
        password: regPassword,
        phone: regPhone,
      });
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      await authService.loginWithGoogle();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Error con Google Auth");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrorMsg("");
      await authService.recoverPassword(recoverEmail);
      setTab("login");
    } catch (err: any) {
      setErrorMsg(err.message || "Error al recuperar contraseña");
    } finally {
      setIsLoading(false);
    }
  };

  // Relleno rápido de prueba
  const handleQuickFill = (role: "admin" | "cliente") => {
    if (role === "admin") {
      setLoginEmail("admin@ferreteriajuly.com");
      setLoginPassword("Admin123*");
    } else {
      setLoginEmail("cliente.pro@gmail.com");
      setLoginPassword("Cliente123*");
    }
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in-0"
      onClick={onClose}
    >
      <div
        id="auth-modal-content"
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight">
              FERRETERÍA <span className="text-[#f97316]">JULY</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
              Acceso a Clientes & Mayoristas
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Si ya está autenticado, mostrar perfil */}
        {currentUser ? (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <img
                src={
                  currentUser.avatar ||
                  generateAvatarPlaceholder(currentUser.name)
                }
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    generateAvatarPlaceholder(currentUser.name);
                }}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#f97316]"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.email}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-[#f97316]/10 text-[#f97316]">
                  Rol: {currentUser.role}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>
                  Sesión activa con token JWT listo para sincronizar compras y
                  reseñas.
                </span>
              </p>
            </div>

            <button
              onClick={() => {
                authService.logout();
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-xs hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 pb-2 gap-4 text-xs font-bold">
              <button
                onClick={() => {
                  setTab("login");
                  setErrorMsg("");
                }}
                className={`pb-2 transition-colors relative ${
                  tab === "login"
                    ? "text-[#f97316]"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                Iniciar Sesión
                {tab === "login" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f97316] rounded-full" />
                )}
              </button>

              <button
                onClick={() => {
                  setTab("register");
                  setErrorMsg("");
                }}
                className={`pb-2 transition-colors relative ${
                  tab === "register"
                    ? "text-[#f97316]"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                Crear Cuenta
                {tab === "register" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f97316] rounded-full" />
                )}
              </button>

              {tab === "recover" && (
                <button className="pb-2 text-[#f97316] relative font-bold">
                  Recuperar Contraseña
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f97316] rounded-full" />
                </button>
              )}
            </div>

            {/* Error banner */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Botón de Google OAuth */}
            {tab !== "recover" && (
              <div>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Continuar con Google / Gmail
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-bold">
                      o con tu correo
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Formulario Iniciar Sesión */}
            {tab === "login" && (
              <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
                    />
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Contraseña
                    </label>
                    <button
                      type="button"
                      onClick={() => setTab("recover")}
                      className="text-[11px] text-[#f97316] hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
                    />
                    <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0f172a] text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <ShieldCheck className="w-4 h-4 text-[#f97316]" />
                  {isLoading ? "Verificando..." : "Iniciar Sesión"}
                </button>

                {/* Acceso Rápido para Prueba */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                  <p className="font-semibold mb-1 text-slate-400 uppercase text-[10px]">
                    Atajo de Prueba Rápida:
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickFill("cliente")}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Demo Cliente
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickFill("admin")}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Demo Admin
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Formulario Crear Cuenta */}
            {tab === "register" && (
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre Completo / Razón Social
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ej. Juan Pérez / Obras SAC"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
                    />
                    <UserIcon className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
                    />
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Teléfono / WhatsApp (Opcional)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="987 654 321"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
                    />
                    <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contraseña (mínimo 6 caracteres)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
                    />
                    <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#f97316] text-white text-xs font-bold hover:bg-[#ea580c] transition-colors flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
                >
                  {isLoading
                    ? "Registrando..."
                    : "Registrarme en Ferretería July"}
                </button>
              </form>
            )}

            {/* Formulario Recuperar Contraseña */}
            {tab === "recover" && (
              <form onSubmit={handleRecover} className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Ingresa el correo asociado a tu cuenta y te enviaremos las
                  instrucciones de restablecimiento.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={recoverEmail}
                      onChange={(e) => setRecoverEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
                    />
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#0f172a] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    {isLoading ? "Enviando..." : "Enviar Enlace"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("login")}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold"
                  >
                    Volver
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
