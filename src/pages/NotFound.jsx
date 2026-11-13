import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 text-janseva-navy-900 mx-auto flex items-center justify-center font-black text-3xl">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900">Page Not Found</h1>
          <p className="text-xs text-slate-500">
            The page or scheme you are looking for does not exist or may have been relocated.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-janseva-navy-900 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-janseva-navy-800 transition"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Benefits</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
