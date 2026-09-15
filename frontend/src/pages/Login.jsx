import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useForm } from '@/hooks/useForm';
import { loginSchema } from '@/schemas';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores';
import { useToast } from '@/components/ui/Toast';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, setFieldValue, getFieldValue, errors, isSubmitting } = useForm(loginSchema, {
    email: '',
    password: '',
    rememberMe: false,
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful login
      setAuth(
        { id: '1', name: 'John Doe', email: data.email, role: 'user' },
        'mock-jwt-token',
        'mock-refresh-token'
      );

      toast.success('Selamat Datang!', `Halo ${data.email.split('@')[0]}, Anda berhasil masuk.`);
      navigate('/');
    } catch (error) {
      toast.error('Login Gagal', 'Email atau kata sandi tidak valid.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop"
            alt="Pemandangan Bali"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/40 via-brand-primary/20 to-transparent" />
        <motion.div
          className="absolute bottom-12 left-12 right-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-3">
            Selamat Datang Kembali
          </h2>
          <p className="text-white/90 text-lg font-light max-w-md">
            Lanjutkan rencana perjalanan impian Anda dan temukan penawaran
            eksklusif bersama TraveLindo.
          </p>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-bg">
        <motion.div
          className="w-full max-w-md bg-surface-elevated p-8 lg:p-10 rounded-[var(--radius-feature)] shadow-float border border-border"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Link to="/" className="text-2xl font-extrabold font-serif text-text-primary block mb-10 text-center">
            Trave<span className="text-brand-primary">Lindo</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-serif text-2xl font-bold text-text-primary mb-2">
              Masuk ke Akun
            </h3>
            <p className="text-text-secondary text-sm mb-8 font-light">
              Silakan masukkan email dan kata sandi Anda.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="label-base">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  type="email"
                  value={getFieldValue('email')}
                  onChange={(e) => setFieldValue('email', e.target.value)}
                  placeholder="nama@email.com"
                  className={cn('pl-12', errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500/30')}
                  autoComplete="email"
                  required
                />
              </div>
              {errors.email && (
                <motion.p className="error-text" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="label-base">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={getFieldValue('password')}
                  onChange={(e) => setFieldValue('password', e.target.value)}
                  placeholder="••••••••"
                  className={cn('pl-12 pr-12', errors.password && 'border-red-500 focus:border-red-500 focus:ring-red-500/30')}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p className="error-text" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between items-center text-sm"
            >
              <label className="flex items-center text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={getFieldValue('rememberMe')}
                  onChange={(e) => setFieldValue('rememberMe', e.target.checked)}
                  className="mr-2 w-4 h-4 rounded border-border text-brand-primary focus:ring-brand-primary/30"
                />
                Ingat saya
              </label>
              <Link to="/forgot-password" className="text-brand-primary font-semibold hover:underline transition-colors">
                Lupa sandi?
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={isLoading || isSubmitting}
                rightIcon={<Loader2 className="w-4 h-4 animate-spin" />}
              >
                Masuk
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex items-center justify-between"
          >
            <span className="border-b border-border w-1/4" />
            <span className="text-xs text-text-muted uppercase font-semibold tracking-wider">
              Atau masuk dengan
            </span>
            <span className="border-b border-border w-1/4" />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 w-full flex items-center justify-center gap-3 border border-border bg-surface-elevated text-text-primary font-semibold py-3 rounded-xl hover:bg-surface-muted transition-colors"
            type="button"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </motion.button>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center text-sm text-text-secondary"
          >
            Belum punya akun?{' '}
            <Link to="/register" className="text-brand-primary font-bold hover:underline">
              Daftar sekarang
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}