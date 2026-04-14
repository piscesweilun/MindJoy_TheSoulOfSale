import React, { useEffect, useState } from 'react';
import { Loader2, Zap, Star, Crown, CheckCircle } from 'lucide-react';
import { apiGetPackages, apiCreatePayment, apiSimulatePaymentSuccess, CreditPackage } from '../src/api';

interface PricingProps {
  isLoggedIn: boolean;
  onRequestLogin: () => void;
}

const PACKAGE_ICONS = [Zap, Star, Crown];

export const Pricing: React.FC<PricingProps> = ({ isLoggedIn, onRequestLogin }) => {
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [loadingPkg, setLoadingPkg] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    apiGetPackages()
      .then(setPackages)
      .finally(() => setFetching(false));
  }, []);

  const handleBuy = async (pkg: CreditPackage) => {
    if (!isLoggedIn) {
      onRequestLogin();
      return;
    }
    setLoadingPkg(pkg.id);
    try {
      await apiCreatePayment(pkg.id);
      // Page will redirect to NewebPay
    } catch (err: any) {
      alert(err.message ?? '付款發起失敗，請稍後再試');
      setLoadingPkg(null);
    }
  };

  const handleSimulate = async (pkg: CreditPackage) => {
    if (!isLoggedIn) {
      onRequestLogin();
      return;
    }
    setLoadingPkg(`sim_${pkg.id}`);
    try {
      // 1. 建立模擬訂單
      const createRes = await apiCreatePayment(pkg.id, true);
      if (!createRes.success) throw new Error(createRes.error);
      
      // 2. 模擬付款成功
      const simRes = await apiSimulatePaymentSuccess(createRes.order_no);
      if (!simRes.ok) throw new Error(simRes.data?.error || '模擬付款失敗');
      
      // 3. 提示已購買成功，再重整頁面
      alert(`🎉 模擬付款成功！\n\n已成功將 ${pkg.credits} 點加入您的帳戶！`);
      window.location.href = window.location.pathname + '?payment=completed';
    } catch (err: any) {
      alert(err.message ?? '模擬金流失敗');
      setLoadingPkg(null);
    }
  };

  return (
    <section id="pricing" className="py-24 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[var(--text-stone)] mb-3">Credits</p>
            <h2 className="text-5xl md:text-6xl font-google font-medium text-[var(--text-charcoal)] leading-tight">
              選擇您的<br />
              <span className="italic text-[var(--accent-gold)]">計畫</span>
            </h2>
          </div>
          <p className="text-[var(--text-stone)] max-w-sm leading-relaxed">
            每個點數可製作一組個人化影片連結。<br />
            方案永不過期，依需求靈活使用。
          </p>
        </div>

        {fetching ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[var(--text-stone)]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => {
              const Icon = PACKAGE_ICONS[i] ?? Star;
              const isPopular = pkg.popular;
              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col p-8 border transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl ${
                    isPopular
                      ? 'border-[var(--accent-gold)] bg-[var(--text-charcoal)] text-white'
                      : 'border-[var(--border-light)] bg-[var(--surface-white)] text-[var(--text-charcoal)]'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-8 bg-[var(--accent-gold)] text-white text-xs tracking-[0.15em] uppercase px-3 py-1">
                      最受歡迎
                    </div>
                  )}

                  {/* Icon & Name */}
                  <div className={`w-10 h-10 flex items-center justify-center mb-6 ${
                    isPopular ? 'text-[var(--accent-gold)]' : 'text-[var(--text-stone)]'
                  }`}>
                    <Icon size={24} />
                  </div>

                  <p className={`text-xs tracking-[0.2em] uppercase mb-2 ${
                    isPopular ? 'text-[var(--accent-gold)]' : 'text-[var(--text-stone)]'
                  }`}>
                    {pkg.name}
                  </p>

                  {/* Credits */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-google font-medium">{pkg.credits}</span>
                    <span className={`text-sm ${isPopular ? 'text-white/60' : 'text-[var(--text-stone)]'}`}>點</span>
                  </div>

                  {/* Price */}
                  <p className={`text-xl font-medium mb-1 ${isPopular ? 'text-white/80' : 'text-[var(--text-charcoal)]'}`}>
                    NT$ {pkg.price.toLocaleString()}
                  </p>
                  <p className={`text-xs mb-6 ${isPopular ? 'text-white/50' : 'text-[var(--text-stone)]'}`}>
                    NT$ {Math.round(pkg.price / pkg.credits)} / 點
                  </p>

                  <p className={`text-sm mb-8 leading-relaxed ${isPopular ? 'text-white/70' : 'text-[var(--text-stone)]'}`}>
                    {pkg.desc}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8 flex-grow">
                    {[
                      '通用於所有影片專案',
                      '永不過期',
                      '即時到帳',
                    ].map(feat => (
                      <li key={feat} className={`flex items-center gap-2 text-xs ${isPopular ? 'text-white/70' : 'text-[var(--text-stone)]'}`}>
                        <CheckCircle size={13} className={isPopular ? 'text-[var(--accent-gold)]' : 'text-[var(--text-stone)]'} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex flex-col gap-2">
                    <button
                      id={`buy-${pkg.id}`}
                      onClick={() => handleBuy(pkg)}
                      disabled={loadingPkg !== null}
                      className={`w-full flex items-center justify-center gap-2 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 ${
                        isPopular
                          ? 'bg-[var(--accent-gold)] text-white hover:bg-[var(--text-gold)]'
                          : 'border border-[var(--text-charcoal)] text-[var(--text-charcoal)] hover:bg-[var(--text-charcoal)] hover:text-white'
                      }`}
                    >
                      {loadingPkg === pkg.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        isLoggedIn ? '立即購買' : '登入後購買'
                      )}
                    </button>

                    {/* Developer Mock Checkout Button - Only in DEV */}
                    {import.meta.env.DEV && (
                      <button
                        id={`simulate-${pkg.id}`}
                        onClick={() => handleSimulate(pkg)}
                        disabled={loadingPkg !== null}
                        className={`w-full flex items-center justify-center gap-2 py-2 text-[10px] tracking-wider uppercase font-medium transition-all duration-300 border border-dashed opacity-70 hover:opacity-100 ${
                          isPopular
                            ? 'border-[var(--accent-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-white'
                            : 'border-[var(--text-stone)] text-[var(--text-stone)] hover:bg-[var(--text-stone)] hover:text-white'
                        }`}
                        title="開發環境專用 - 直接模擬付款成功並增加點數"
                      >
                        {loadingPkg === `sim_${pkg.id}` ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          '模擬測試 (DEV)'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-[var(--text-stone)] mt-10 opacity-60">
          金流由藍新科技安全處理 · 信用卡一次付清 · 如有疑問請聯繫客服
        </p>
      </div>
    </section>
  );
};
