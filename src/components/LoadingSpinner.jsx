import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LoadingSpinner({ fullPage = false, text }) {
  const { t } = useLanguage();

  const content = (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <div className="absolute inset-0 rounded-full border-4 border-janseva-navy-900 border-t-transparent animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-janseva-saffron-500 border-b-transparent animate-spin-reverse" />
      </div>
      <p className="text-xs font-semibold text-slate-600 animate-pulse">
        {text || t('loading')}
      </p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

export function BenefitCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-5 w-24 bg-slate-200 rounded-full" />
        <div className="h-8 w-8 bg-slate-100 rounded-xl" />
      </div>
      <div className="space-y-2">
        <div className="h-5 w-4/5 bg-slate-200 rounded-md" />
        <div className="h-3 w-1/2 bg-slate-100 rounded-md" />
      </div>
      <div className="space-y-1.5 pt-2">
        <div className="h-3 w-full bg-slate-100 rounded-md" />
        <div className="h-3 w-3/4 bg-slate-100 rounded-md" />
      </div>
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="h-4 w-28 bg-slate-100 rounded-md" />
        <div className="h-4 w-20 bg-slate-200 rounded-md" />
      </div>
    </div>
  );
}
