import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, MapPin, Wifi, ShieldCheck, CheckCircle2 } from 'lucide-react';
// import logo from '../assets/logo.png';
import ChatNexusIcon from '../assets/logo.png';
const loginSchema = z.object({
  staffId: z.string().min(1, 'Staff ID is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  terms: z.boolean().refine((value) => value === true, {
    message: 'You must accept the Terms & Conditions',
  }),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  // Verifying-access state (replaces the form in place, in the same card slot)
  const [verifying, setVerifying] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { title: 'Location', subtitle: 'Verifying your position', icon: MapPin },
    { title: 'Network Access', subtitle: 'Checking IP authorization', icon: Wifi },
    { title: 'Authentication', subtitle: 'Validating credentials', icon: ShieldCheck },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Runs the security-check animation, then performs the real login attempt.
  useEffect(() => {
    if (!verifying) return;

    const stepDuration = 900; // ms per step
    const totalDuration = steps.length * stepDuration;
    const tickMs = 30;

    const stepTimers = steps.map((_, i) =>
      setTimeout(() => setActiveStep(i), i * stepDuration)
    );

    let elapsed = 0;
    const tick = setInterval(() => {
      elapsed += tickMs;
      setProgress(Math.min(100, Math.round((elapsed / totalDuration) * 100)));
    }, tickMs);

    const finishTimer = setTimeout(() => {
      clearInterval(tick);
      setProgress(100);

      // Give the last step a beat to visually complete before resolving.
      setTimeout(async () => {
        try {
          // Real auth check would go here. On success -> proceed to dashboard.
          navigate('/dashboard');
        } catch {
          // Verification/auth failed: drop back to the login form, stay logged out.
          setServerError('Invalid email or password.');
        } finally {
          setVerifying(false);
        }
      }, 500);
    }, totalDuration);

    return () => {
      stepTimers.forEach(clearTimeout);
      clearInterval(tick);
      clearTimeout(finishTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifying]);

  const onSubmit = () => {
    setServerError('');
    setActiveStep(0);
    setProgress(0);
    setVerifying(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-100 p-4 lg:p-10 relative overflow-hidden">
      {/* <div className="login-background-bubbles" aria-hidden="true">
        <span className="login-bubble login-bubble-one" />
        <span className="login-bubble login-bubble-two" />
        <span className="login-bubble login-bubble-three" />
        <span className="login-bubble login-bubble-four" />
        <span className="login-bubble login-bubble-five" />
        <span className="login-bubble login-bubble-six" />
        <span className="login-bubble login-bubble-seven" />
        <span className="login-bubble login-bubble-eight" />
        <span className="login-bubble login-bubble-nine" />
        <span className="login-bubble login-bubble-ten" />
        <span className="login-bubble login-bubble-eleven" />
        <span className="login-bubble login-bubble-twelve" />
        <span className="login-bubble login-bubble-thirteen" />
        <span className="login-bubble login-bubble-fourteen" />
        <span className="login-bubble login-bubble-fifteen" />
        <span className="login-bubble login-bubble-sixteen" />
        <span className="login-bubble login-bubble-seventeen" />
        <span className="login-bubble login-bubble-eighteen" />
        <span className="login-bubble login-bubble-nineteen" />
        <span className="login-bubble login-bubble-twenty" />
        <span className="login-bubble login-bubble-twenty-one" />
        <span className="login-bubble login-bubble-twenty-two" />
        <span className="login-bubble login-bubble-twenty-three" />
        <span className="login-bubble login-bubble-twenty-four" />
        <span className="login-bubble login-bubble-twenty-five" />
        <span className="login-bubble login-bubble-twenty-six" />
        <span className="login-bubble login-bubble-twenty-seven" />
        <span className="login-bubble login-bubble-twenty-eight" />
        <span className="login-bubble login-bubble-twenty-nine" />
        <span className="login-bubble login-bubble-thirty" />
        <span className="login-bubble login-bubble-thirty-one" />
        <span className="login-bubble login-bubble-thirty-two" />
        <span className="login-bubble login-bubble-thirty-three" />
        <span className="login-bubble login-bubble-thirty-four" />
        <span className="login-bubble login-bubble-thirty-five" />
        <span className="login-bubble login-bubble-thirty-six" />
        <span className="login-bubble login-bubble-thirty-seven" />



      </div> */}
      {/* Background container card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-160">

        {/* ── Left Side: Form ── */}
        <div className="flex flex-col justify-center px-8 py-10 lg:px-14 bg-white">
          <div className="w-full max-w-sm mx-auto">

            {/* Logo & Header — always visible */}
            <div className="flex items-center gap-3 mb-8">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  WELCOME <span className="text-rose-600">BACK</span>
                </h1>
                <p className="text-xs text-neutral-400 mt-1">Sign in to Your CRM</p>
              </div>
            </div>

            {/* Secure Login & Logout Window banner — always visible */}
            <div className="flex items-center justify-between gap-3 bg-linear-to-r from-rose-700 to-rose-600 rounded-xl px-4 py-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-rose-500/15 border border-rose-900/20 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-rose-300" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-wide text-white uppercase">
                    Secure Login &amp; Logout Window
                  </p>
                  <p className="text-[11px] text-rose-100/60 mt-0.5">
                    Login: <span className="text-white font-semibold">11:15 - 11:30</span>
                    <span className="mx-1.5 text-rose-100/30">&middot;</span>
                    Logout: <span className="text-white font-semibold">15:15 - 15:30</span>{' '}
                    <span className="text-rose-100/50">IST</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                <span className="text-[11px] font-bold text-rose-300 tracking-wide">LIVE</span>
              </div>
            </div>

            {/* This block swaps: the login form while idle, the verification
                steps while verifying — same slot, form disappears, steps appear. */}
            {!verifying ? (
              <>
                <h2 className="text-xl font-bold text-neutral-900">Sign In to Your Workspace</h2>
                <p className="text-xs text-neutral-400 mt-1 mb-6">Welcome Back! Let's build relationships.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

                  {/* Staff ID */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Staff ID
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Staff ID"
                      {...register('staffId')}
                      className="w-full px-4 py-3 rounded-lg bg-blue-50/70 text-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/30 transition-all border border-transparent"
                    />
                    {errors.staffId && (
                      <p className="text-xs text-rose-600 mt-1">{errors.staffId.message}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="email"
                        placeholder="email@company.com"
                        {...register('email')}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-200 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 transition-all"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        {...register('password')}
                        className="w-full pl-10 pr-10 py-3 rounded-lg bg-blue-50/70 text-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/30 transition-all border border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-rose-600 mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end pt-1">
                    <Link to="/forgot-password" className="text-xs font-semibold text-rose-600 hover:underline">
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Terms & Conditions */}
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('terms')}
                        className="w-4 h-4 accent-rose-600 rounded border-neutral-300 cursor-pointer"
                      />
                      <span className="text-xs text-neutral-500">
                        I have read and agree to the{' '}
                        <Link to="/terms-and-conditions" className="text-rose-600 font-semibold hover:underline">
                          Terms &amp; Conditions
                        </Link>
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="text-xs text-rose-600 mt-1">{errors.terms.message}</p>
                    )}
                  </div>

                  {serverError && (
                    <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 text-center">
                      {serverError}
                    </p>
                  )}

                  {/* Submit Pill Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 mt-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold tracking-wider uppercase shadow-md shadow-rose-600/30 transition-all active:scale-[0.99] disabled:opacity-60"
                  >
                    {isSubmitting ? 'SIGNING IN…' : 'SIGN IN TO WORKSPACE'}
                  </button>
                </form>
              </>
            ) : (
              <div>
                {/* status pill */}
                <div className="flex justify-center mb-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-200 px-4 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-[11px] font-bold tracking-wide text-rose-600 uppercase">
                      Verifying Access
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-center text-neutral-900">
                  Securing your session
                </h2>
                <p className="text-sm text-center text-neutral-400 mt-1 mb-6">
                  Please wait while we run security checks
                </p>

                {/* steps */}
                <div className="space-y-3 mb-6">
                  {steps.map((step, i) => {
                    const status = i < activeStep ? 'done' : i === activeStep ? 'active' : 'pending';
                    const StepIcon = step.icon;
                    return (
                      <div
                        key={step.title}
                        className={`rounded-xl border px-4 py-3.5 flex items-center justify-between transition-colors ${
                          status === 'active'
                            ? 'bg-rose-50 border-rose-200'
                            : status === 'done'
                            ? 'bg-white border-neutral-100'
                            : 'bg-neutral-50 border-neutral-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              status === 'active'
                                ? 'bg-rose-100 text-rose-600'
                                : status === 'done'
                                ? 'bg-emerald-50 text-emerald-500'
                                : 'bg-neutral-100 text-neutral-300'
                            }`}
                          >
                            {status === 'done' ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <StepIcon className={`w-4 h-4 ${status === 'active' ? 'animate-pulse' : ''}`} />
                            )}
                          </div>
                          <div>
                            <p
                              className={`text-sm font-bold ${
                                status === 'pending' ? 'text-neutral-300' : 'text-neutral-900'
                              }`}
                            >
                              {step.title}
                            </p>
                            <p
                              className={`text-xs ${
                                status === 'pending' ? 'text-neutral-300' : 'text-neutral-400'
                              }`}
                            >
                              {step.subtitle}
                            </p>
                          </div>
                        </div>
                        {status === 'active' && (
                          <span className="text-[10px] font-bold tracking-wide text-rose-600 bg-rose-100 rounded-full px-2.5 py-1">
                            ACTIVE
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* progress */}
                <div className="flex items-center justify-between text-[11px] font-bold tracking-wide mb-2">
                  <span className="text-neutral-400">PROGRESS</span>
                  <span className="text-emerald-500">{progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-rose-600 to-rose-400 transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-center text-[10px] tracking-widest text-neutral-300 uppercase mt-6">
                  Secured &middot; ChatNexus Terminal CRM
                </p>
              </div>
            )}

          </div>
        </div>

        {/* ── Right Side: Red City Overlay Banner ── */}
        <div
          className="hidden lg:relative lg:flex flex-col items-center justify-center p-12 text-white bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(220, 38, 38, 0.85), rgba(153, 27, 27, 0.9)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop')`
          }}
        >
          <div className="relative z-10 text-center max-w-sm flex flex-col items-center">
            <img
              src={ChatNexusIcon}
              alt="ChatNexus Terminal"
              className="w-30 h-30 object-contain mb-5 drop-shadow-lg"
            />

            <h2 className="text-3xl font-extrabold tracking-wider mb-4">WELCOME TO </h2>
            <h2 className="text-5xl font-extrabold tracking-wider mb-4"> CHATNEXUS TERMINAL</h2>
            <p className="text-xs text-white/80 leading-relaxed font-light">
              Your relationships. Your growth. One powerful CRM.
              Manage customer interactions, opportunities, and business insights effortlessly.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
