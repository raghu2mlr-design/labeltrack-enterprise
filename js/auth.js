// ==========================================
// LabelTrack Authentication & Cryptography
// ==========================================

let currentLoginTab = 'vendor';

// Cryptographic SHA-256 Hashing with Salt via Web Crypto API
async function hashPassword(salt, plainPassword) {
  const enc = new TextEncoder();
  const data = enc.encode(salt + ":" + plainPassword);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function togglePasswordVisibility() {
  const input = document.getElementById('loginPassword');
  const btn = document.getElementById('togglePassBtn');
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = 'Hide';
  } else {
    input.type = 'password';
    btn.textContent = 'Show';
  }
}

function generateRandomPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
  let pass = '';
  for (let i = 0; i < 12; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('newVendorPassword').value = pass;
}

function exportEncryptedVault() {
  const vaultToExport = (typeof state !== 'undefined' && state.authVault) ? state.authVault : (window.__AUTH_VAULT__ || {});
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vaultToExport, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "credentials.enc.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('User registry backup exported successfully.');
}

function setLoginTab(tab) {
  currentLoginTab = tab;
  const vTab = document.getElementById('tabVendorLogin');
  const aTab = document.getElementById('tabAdminLogin');
  const emailInput = document.getElementById('loginEmail');

  if (tab === 'vendor') {
    vTab.className = "flex-1 py-2.5 rounded-xl bg-white text-blue-700 shadow-sm font-bold text-xs transition border border-blue-100 flex items-center justify-center gap-1.5";
    aTab.className = "flex-1 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 font-medium text-xs transition flex items-center justify-center gap-1.5";
    emailInput.placeholder = "Enter registered supplier email";
  } else {
    aTab.className = "flex-1 py-2.5 rounded-xl bg-white text-purple-700 shadow-sm font-bold text-xs transition border border-purple-100 flex items-center justify-center gap-1.5";
    vTab.className = "flex-1 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 font-medium text-xs transition flex items-center justify-center gap-1.5";
    emailInput.placeholder = "Enter operations admin email";
  }
}

function setLoginFeedback(msg, isError = false) {
  const box = document.getElementById('loginFeedback');
  if (!box) return;
  if (!msg) {
    box.classList.add('hidden');
    box.innerHTML = '';
    return;
  }
  box.classList.remove('hidden');
  if (isError) {
    box.className = "text-xs p-3 rounded-xl border font-semibold flex items-center gap-2 bg-rose-50 text-rose-800 border-rose-200";
    box.innerHTML = `<svg class="w-4 h-4 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg><span>${msg}</span>`;
  } else {
    box.className = "text-xs p-3 rounded-xl border font-semibold flex items-center gap-2 bg-emerald-50 text-emerald-800 border-emerald-200";
    box.innerHTML = `<svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span>${msg}</span>`;
  }
}

async function handleLoginSubmit(e) {
  if (e) e.preventDefault();
  setLoginFeedback('');

  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const submitBtn = document.getElementById('btnSubmitLogin');

  const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';

  if (!email || !password) {
    setLoginFeedback('Please enter both your email address and password.', true);
    showToast('Please enter both email and password.', true);
    return;
  }

  // Visual loading feedback
  const origBtnContent = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Authenticating...</span>
    `;
  }

  try {
    // Robust vault resolution: state.authVault -> window.__AUTH_VAULT__ -> localStorage
    const vault = (typeof state !== 'undefined' && state.authVault && state.authVault.users) 
      ? state.authVault 
      : ((typeof window !== 'undefined' && window.__AUTH_VAULT__ && window.__AUTH_VAULT__.users) 
          ? window.__AUTH_VAULT__ 
          : JSON.parse(localStorage.getItem('labeltrack_auth_vault') || '{"users":[]}'));

    const vaultUsers = (vault && vault.users) ? vault.users : [];
    const matchedUser = vaultUsers.find(u => u.email.toLowerCase() === email);

    if (!matchedUser) {
      setLoginFeedback(`Account not found. Please verify your registered email address.`, true);
      showToast(`Account not found. Please verify your email address.`, true);
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = origBtnContent; }
      return;
    }

    // Verify salted SHA-256 hash
    const computedHash = await hashPassword(matchedUser.salt, password);
    if (computedHash !== matchedUser.password_hash) {
      setLoginFeedback('Invalid password. Please check your credentials and try again.', true);
      showToast('Invalid password. Please check your credentials and try again.', true);
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = origBtnContent; }
      return;
    }

    // Seamless auto-switch of role tab to prevent locking valid users out
    if (currentLoginTab !== matchedUser.role) {
      setLoginTab(matchedUser.role);
    }

    // Ensure state object is accessible
    if (typeof state === 'undefined') {
      window.state = { isLoggedIn: false, currentUser: null, currentFilter: 'all', vendors: [], pos: [], shipments: [] };
    }

    state.isLoggedIn = true;
    state.currentUser = {
      email: matchedUser.email,
      role: matchedUser.role,
      name: matchedUser.name || (matchedUser.role === 'admin' ? 'Internal Operations Admin' : matchedUser.vendorName),
      vendorName: matchedUser.vendorName,
      vendorCode: matchedUser.vendorCode
    };

    setLoginFeedback('Signing in...', false);

    // Switch to application view
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.remove('hidden');

    if (typeof render === 'function') {
      render();
    }

    showToast(`Welcome back, ${state.currentUser.name || state.currentUser.vendorName}!`);
  } catch (err) {
    console.error('Login error:', err);
    setLoginFeedback('An error occurred during sign in: ' + err.message, true);
    showToast('Sign in error: ' + err.message, true);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnContent;
    }
  }
}

function logout() {
  state.isLoggedIn = false;
  state.currentUser = null;
  document.getElementById('loginPassword').value = '';
  document.getElementById('appScreen').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
  showToast('Signed out successfully.');
}
