import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from '@/hooks/useForm';
import { forgotPasswordSchema } from '@/schemas';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';

export default function ForgotPassword() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, setFieldValue, getFieldValue, errors, isSubmitting } = useForm(
    forgotPasswordSchema,
    { email: '' }
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success(
        'Link Terkirim',
        `Instruksi pemulihan kata sandi dikirim ke ${data.email}.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface-bg min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-surface-elevated border border-border rounded-2xl p-8 shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-brand-primary" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-text-primary">
              Lupa Kata Sandi
            </h1>
            <p className="text-text-secondary mt-2 text-sm">
              Masukkan email Anda dan kami akan mengirimkan link pemulihan kata sandi.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Input
                type="email"
                id="forgot-email"
                label="Alamat Email"
                placeholder="email@anda.com"
                value={getFieldValue('email')}
                onChange={(e) => setFieldValue('email', e.target.value)}
                error={errors.email?.message}
                leftIcon={<Mail className="w-5 h-5" />}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
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
                Kirim Link Pemulihan
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-brand-primary font-semibold hover:underline transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Halaman Masuk
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}