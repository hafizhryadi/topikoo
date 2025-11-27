// Login.tsx
import React from 'react';
import { Coffee } from 'lucide-react';
import { useForm } from '@inertiajs/react';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login'); // ⬅ INI MENGIRIM KE LARAVEL
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          'linear-gradient(135deg, #D4A574 0%, #C68642 50%, #A0682A 100%)',
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo & brand */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
            style={{ backgroundColor: '#8B4513' }}
          >
            <Coffee className="w-10 h-10 text-white" strokeWidth={2} />
          </div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: '#2C1810' }}
          >
            topii.coo
          </h1>
          <p className="text-white text-sm font-medium opacity-90">
            Sistem Manajemen UMKM Terpadu
          </p>
        </div>

        {/* Card login */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <h2
            className="text-2xl font-bold text-center mb-6"
            style={{ color: '#2C1810' }}
          >
            Selamat Datang
          </h2>

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#2C1810' }}>
                Email
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="masukkan email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-amber-700 transition text-black"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#2C1810' }}>
                Password
              </label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="masukkan password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-amber-700 transition text-black"
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Remember */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.remember}
                onChange={(e) => setData('remember', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-amber-700"
                style={{ accentColor: '#8B4513' }}
              />
              <span className="text-sm" style={{ color: '#5C4033' }}>
                Ingat Saya
              </span>
            </label>

            {/* Tombol Masuk */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 rounded-lg text-white font-semibold text-base shadow-lg 
                         hover:shadow-xl transition-all duration-200 hover:opacity-90 
                         disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#8B4513' }}
            >
              {processing ? 'Memproses...' : 'Masuk'}
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-sm text-white opacity-90">
          © 2025 topii.coo. All rights reserved.
        </p>
      </div>
    </div>
  );
}
