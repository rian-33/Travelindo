import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useForm } from '@/hooks/useForm';
import { registerSchema } from '@/schemas';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores';
import { useToast } from '@/components/ui/Toast';
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { handleSubmit, setFieldValue, getFieldValue, errors, isSubmitting } = useForm(registerSchema, {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setAuth(
        { id: '1', name: data.name, email: data.email, role: 'user' },
        'mock-jwt-token',
        'mock-refresh-token'
      );

      toast.success('Akun Berhasil Dibuat!', `Selamat datang ${data.name}, mari mulai petualangan Anda.`);
      navigate('/');
    } catch (error) {
      toast.error('Registrasi Gagal', 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-amber-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-lime-500';
    return 'bg-brand-accent';
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 1) return 'Sangat Lemah';
    if (passwordStrength <= 2) return 'Lemah';
    if (passwordStrength <= 3) return 'Sedang';
    if (passwordStrength <= 4) return 'Kuat';
    return 'Sangat Kuat';
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
            src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop"
            alt="Gunung Rinjani"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/50 via-brand-accent/30 to-transparent" />
        <motion.div
          className="absolute bottom-12 left-12 right-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-3">
            Mulai Petualangan Baru
          </h2>
          <p className="text-white/90 text-lg font-light max-w-md">
            Bergabunglah dengan ribuan traveler lainnya dan rancang perjalanan
            tak terlupakan.
          </p>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-bg">
        <motion.div
          className="w-full max-w-md bg-surface-elevated p-8 lg:p-10 rounded-[var(--radius-feature)] shadow-float border border-border"
          initial={{ opacity: 0, x: -50 }}
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
              Buat Akun Baru
            </h3>
            <p className="text-text-secondary text-sm mb-8 font-light">
              Lengkapi data diri Anda di bawah ini.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="label-base">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  type="text"
                  value={getFieldValue('name')}
                  onChange={(e) => setFieldValue('name', e.target.value)}
                  placeholder="John Doe"
                  className={cn('pl-12', errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500/30')}
                  autoComplete="name"
                  required
                />
              </div>
              {errors.name && (
                <motion.p className="error-text" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  {errors.name.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
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
              transition={{ delay: 0.2 }}
            >
              <label className="label-base">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={getFieldValue('password')}
                  onChange={(e) => { setFieldValue('password', e.target.value); checkPasswordStrength(e.target.value); }}
                  placeholder="Minimal 8 karakter"
                  className={cn('pl-12 pr-12', errors.password && 'border-red-500 focus:border-red-500 focus:ring-red-500/30')}
                  autoComplete="new-password"
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

              {/* Password Strength Meter */}
              {getFieldValue('password') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 space-y-2"
                >
                  <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
                    <motion.div
                      className={cn('h-full rounded-full transition-all duration-300', getStrengthColor())}
                      initial={{ width: 0 }}
                      animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-caption text-text-muted flex justify-between">
                    <span>Kekuatan kata sandi: <span className="font-medium" style={{ color: getStrengthColor().replace('bg-', '') }}>{getStrengthLabel()}</span></span>
                    <span>{passwordStrength}/5</span>
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="label-base">Konfirmasi Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={getFieldValue('confirmPassword')}
                  onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
                  placeholder="Ulangi kata sandi"
                  className={cn('pl-12', errors.confirmPassword && 'border-red-500 focus:border-red-500 focus:ring-red-500/30')}
                  autoComplete="new-password"
                  required
                />
              </div>
              {errors.confirmPassword && (
                <motion.p className="error-text" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="flex items-start gap-3 text-sm text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 rounded border-border text-brand-primary focus:ring-brand-primary/30"
                />
                <span>
                  Saya menyetujui <Link to="/terms" className="text-brand-primary hover:underline">Syarat & Ketentuan</Link> dan <Link to="/privacy" className="text-brand-primary hover:underline">Kebijakan Privasi</Link>
                </span>
              </label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={isLoading || isSubmitting}
                rightIcon={<Loader2 className="w-4 h-4 animate-spin" />}
              >
                Daftar Sekarang
              </Button>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center text-sm text-text-secondary"
          >
            Sudah punya akun?{' '}
            <Link to="/login" className="text-brand-primary font-bold hover:underline">
              Masuk di sini
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}