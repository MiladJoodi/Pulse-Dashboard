import React, { useState } from 'react';
import { Check, X as XIcon, Crown, Star, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'For small teams getting started',
    popular: false,
    features: [
      { included: true, text: 'Up to 10 users' },
      { included: true, text: 'Basic analytics' },
      { included: true, text: '5GB storage' },
      { included: true, text: 'Email support' },
      { included: false, text: 'Custom branding' },
      { included: false, text: 'API access' },
      { included: false, text: 'Priority support' },
    ],
  },
  {
    name: 'Professional',
    price: '$79',
    period: '/month',
    description: 'For growing businesses',
    popular: true,
    features: [
      { included: true, text: 'Up to 50 users' },
      { included: true, text: 'Advanced analytics' },
      { included: true, text: '50GB storage' },
      { included: true, text: 'Email & chat support' },
      { included: true, text: 'Custom branding' },
      { included: true, text: 'API access' },
      { included: false, text: 'Priority support' },
    ],
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: '/month',
    description: 'For large organizations',
    popular: false,
    features: [
      { included: true, text: 'Unlimited users' },
      { included: true, text: 'Full analytics suite' },
      { included: true, text: '500GB storage' },
      { included: true, text: '24/7 priority support' },
      { included: true, text: 'Custom branding' },
      { included: true, text: 'Full API access' },
      { included: true, text: 'Dedicated manager' },
    ],
  },
];

export const PricingView: React.FC = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">
          Choose Your Plan
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Scale your infrastructure with the perfect plan for your team
        </p>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={`text-xs font-semibold ${!annual ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>Monthly</span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${annual ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${annual ? 'translate-x-5' : ''}`}
          />
        </button>
        <span className={`text-xs font-semibold ${annual ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>
          Annual
          <span className="ml-1 text-[10px] text-emerald-500 font-bold">Save 20%</span>
        </span>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const price = annual ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8 * 12)}` : plan.price;
          const period = annual ? '/year' : plan.period;
          return (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 transition-shadow ${
                plan.popular
                  ? 'bg-white dark:bg-zinc-900 border-indigo-500 dark:border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-white dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800 hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">{plan.name}</h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">{price}</span>
                  <span className="text-xs text-zinc-400">{period}</span>
                </div>
              </div>

              <button
                className={`w-full py-2.5 rounded-xl text-xs font-bold mb-6 cursor-pointer ${
                  plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>

              <ul className="space-y-2.5">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    {feature.included ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <XIcon className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 shrink-0" />
                    )}
                    <span className={feature.included ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-300 dark:text-zinc-600'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Enterprise CTA */}
      <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-zinc-900 dark:to-zinc-900 border border-amber-200/60 dark:border-amber-800/30 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-extrabold text-zinc-900 dark:text-white">Enterprise License</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Superadmin Level Access — Full control over your entire infrastructure</p>
        <button className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-500/20 cursor-pointer">
          Upgrade to Enterprise
        </button>
      </div>
    </div>
  );
};
