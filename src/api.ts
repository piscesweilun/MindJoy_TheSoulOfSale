/**
 * MindJoy API Client
 * 與 MindJoyStreamServer 後端溝通的工具函數
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? '';

export interface User {
  id: string;
  email: string;
  name: string;
  mobile?: string;
  job_title?: string;
  company_name?: string;
  line_id?: string;
  credit_balance: number;
  is_admin: boolean;
  created_at?: string;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  desc: string;
  popular: boolean;
}

export interface Transaction {
  id: number;
  merchant_order_no: string;
  trade_no?: string;
  amount: number;
  credits_granted: number;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at?: string;
  paid_at?: string;
}

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({ success: false, error: 'Invalid server response' }));
  return { ok: res.ok, status: res.status, data };
}

// ── Auth ──────────────────────────────────────────────

export async function apiRegister(payload: {
  name: string;
  email: string;
  password: string;
  mobile?: string;
  job_title?: string;
  company_name?: string;
  line_id?: string;
}) {
  return apiFetch('/api/register', { method: 'POST', body: JSON.stringify(payload) });
}

export async function apiLogin(email: string, password: string, remember = false) {
  return apiFetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password, remember }) });
}

export async function apiLogout() {
  return apiFetch('/api/logout', { method: 'POST' });
}

export async function apiMe() {
  return apiFetch('/api/me');
}

// ── Payment ──────────────────────────────────────────

export async function apiGetPackages(): Promise<CreditPackage[]> {
  const { data } = await apiFetch('/payment/packages');
  return data.packages ?? [];
}

/**
 * 發起付款流程：後端回傳 HTML form，直接 inject 到頁面 body 並自動提交
 * （若 simulate=true，則回傳 JSON 包含訂單號，用於模擬測試）
 */
export async function apiCreatePayment(packageId: string, simulate = false) {
  const res = await fetch(`${API_BASE}/payment/create`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ package_id: packageId, simulate }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? '付款發起失敗');
  }

  if (simulate) {
    const data = await res.json();
    return data; // { success: true, order_no: '...' }
  }

  // Inject & auto-submit the NewebPay form
  const html = await res.text();
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
}

export async function apiSimulatePaymentSuccess(orderNo: string) {
  return apiFetch('/payment/simulate_success', {
    method: 'POST',
    body: JSON.stringify({ order_no: orderNo }),
  });
}

export async function apiGetPaymentHistory(): Promise<Transaction[]> {
  const { data } = await apiFetch('/payment/history');
  return data.transactions ?? [];
}
