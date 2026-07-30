import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from './AuthLayout';
import { Mail, KeyRound, Lock, Eye, EyeOff, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const ForgotPasswordForm: React.FC = () => {
  const { forgotPasswordSendCode, resetPasswordWithCode, setAuthView, showToast } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('warning', 'Please enter your email');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = forgotPasswordSendCode(email);
      setIsLoading(false);
      if (res.success && res.code) {
        setGeneratedCode(res.code);
        setStep(2);
        showToast('info', res.message);
      } else {
        showToast('error', res.message);
      }
    }, 400);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 4) {
      showToast('warning', 'Please enter the verification code');
      return;
    }

    if (code.trim() !== generatedCode) {
      showToast('error', 'Invalid verification code');
      return;
    }

    setStep(3);
    showToast('success', 'Code verified. Enter your new password.');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      showToast('warning', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('error', 'Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      showToast('warning', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      resetPasswordWithCode(email, code, newPassword);
      setIsLoading(false);
    }, 400);
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle={
        step === 1
          ? 'Enter your registered email to receive reset code'
          : step === 2
          ? 'Enter the 6-digit verification code sent to your email'
          : 'Set your new secure password'
      }
    >
      {/* Stepper indicator */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800 text-xs font-semibold">
        <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-400'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">1</span>
          <span>Email</span>
        </div>
        <div className="w-6 h-[1px] bg-zinc-200 dark:bg-zinc-700" />
        <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-400'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">2</span>
          <span>Verification</span>
        </div>
        <div className="w-6 h-[1px] bg-zinc-200 dark:bg-zinc-700" />
        <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-400'}`}>
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">3</span>
          <span>New Password</span>
        </div>
      </div>

      {/* STEP 1: Email Form */}
      {step === 1 && (
        <form onSubmit={handleSendEmail} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
              Registered Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Send Verification Code</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* STEP 2: Code Verification */}
      {step === 2 && (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          {/* Simulated OTP Hint Box */}
          <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs">
            <div className="flex items-center justify-between mb-1 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Demo Code:
              </span>
              <span className="font-mono text-sm font-bold bg-white dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700">
                {generatedCode}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setCode(generatedCode)}
              className="mt-1.5 w-full py-1 text-center bg-zinc-900 hover:bg-zinc-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold rounded text-[11px] transition-colors cursor-pointer"
            >
              Auto-fill Demo Code
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
              6-Digit Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              maxLength={6}
              className="w-full text-center tracking-widest font-mono text-xl py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-bold"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all text-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Verify & Continue</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Set New Password */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Save New Password & Sign In</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Back to Login link */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => setAuthView('login')}
          className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Back to Login</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </AuthLayout>
  );
};

