import React, { useState } from 'react';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { apiLogin, apiRegister, User } from '../src/api';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
  initialMode?: 'login' | 'register';
}

type Mode = 'login' | 'register';

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    job_title: '',
    company_name: '',
    line_id: '',
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        const { ok, data } = await apiLogin(form.email, form.password, form.remember);
        if (!ok) { setError(data.error ?? '登入失敗'); return; }
        onSuccess(data.user);
      } else {
        const { ok, data } = await apiRegister({
          name: form.name,
          email: form.email,
          password: form.password,
          mobile: form.mobile || undefined,
          job_title: form.job_title || undefined,
          company_name: form.company_name || undefined,
          line_id: form.line_id || undefined,
        });
        if (!ok) { setError(data.error ?? '註冊失敗'); return; }
        onSuccess(data.user);
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[var(--text-charcoal)]/60 backdrop-blur-sm" />

      {/* Modal Panel */}
      <div
        className="relative bg-[var(--bg-cream)] w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-pop-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-[var(--border-light)]">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[var(--text-stone)] mb-1">MindJoy</p>
            <h2 className="text-2xl font-google font-medium text-[var(--text-charcoal)]">
              {mode === 'login' ? '歡迎回來' : '建立帳戶'}
            </h2>
          </div>
          <button
            id="auth-modal-close"
            onClick={onClose}
            className="p-2 text-[var(--text-stone)] hover:text-[var(--text-charcoal)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
          {/* Error banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
              {error}
            </div>
          )}

          {/* Register-only fields */}
          {mode === 'register' && (
            <>
              <Field label="姓名 *" name="name" value={form.name} onChange={handleChange} placeholder="王小明" required />
              <div className="grid grid-cols-2 gap-4">
                <Field label="職稱" name="job_title" value={form.job_title} onChange={handleChange} placeholder="財務顧問" />
                <Field label="公司名稱" name="company_name" value={form.company_name} onChange={handleChange} placeholder="XX 保險" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="手機" name="mobile" value={form.mobile} onChange={handleChange} placeholder="0912345678" type="tel" />
                <Field label="Line ID" name="line_id" value={form.line_id} onChange={handleChange} placeholder="@mindjoy" />
              </div>
            </>
          )}

          {/* Shared fields */}
          <Field label="Email *" name="email" value={form.email} onChange={handleChange} placeholder="name@company.com" type="email" required />

          {/* Password with toggle */}
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-stone)] mb-2">
              密碼 *
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder={mode === 'register' ? '至少 6 個字元' : ''}
                className="w-full pb-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-0 bottom-2 text-[var(--text-stone)] hover:text-[var(--text-charcoal)]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember me (login only) */}
          {mode === 'login' && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="remember"
                type="checkbox"
                checked={form.remember}
                onChange={handleChange}
                className="!border-b-0 !border !border-[var(--border-light)] w-4 h-4"
              />
              <span className="text-sm text-[var(--text-stone)]">記住我</span>
            </label>
          )}

          {/* Submit */}
          <button
            id={mode === 'login' ? 'auth-login-submit' : 'auth-register-submit'}
            type="submit"
            disabled={loading}
            className="w-full btn-elegant flex items-center justify-center gap-2 mt-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {mode === 'login' ? '登入' : '立即加入'}
          </button>

          {/* Toggle mode */}
          <p className="text-center text-sm text-[var(--text-stone)] pt-2">
            {mode === 'login' ? (
              <>還沒有帳號？{' '}
                <button type="button" onClick={() => { setMode('register'); setError(''); }}
                  className="text-[var(--accent-gold)] hover:underline font-medium">
                  免費註冊
                </button>
              </>
            ) : (
              <>已有帳號？{' '}
                <button type="button" onClick={() => { setMode('login'); setError(''); }}
                  className="text-[var(--accent-gold)] hover:underline font-medium">
                  立即登入
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

// ── Reusable form field ──────────────────────────────

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, name, value, onChange, placeholder, type = 'text', required }) => (
  <div>
    <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-stone)] mb-2">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full pb-2"
    />
  </div>
);
