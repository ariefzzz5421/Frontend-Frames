(() => {
  'use strict';
  const themeKey = 'frontend-frames.theme';
  const themeButtons = [...document.querySelectorAll('[data-theme-choice]')];
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  let themeOverride = false;
  try { themeOverride = ['light', 'dark'].includes(localStorage.getItem(themeKey)); } catch {}

  function applyTheme(theme, persist = false) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#1d1d21' : '#eeece7';
    themeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme)));
    if (persist) {
      themeOverride = true;
      try { localStorage.setItem(themeKey, theme); } catch {}
    }
  }

  applyTheme(document.documentElement.dataset.theme || (systemTheme.matches ? 'dark' : 'light'));
  themeButtons.forEach(button => button.addEventListener('click', () => applyTheme(button.dataset.themeChoice, true)));
  systemTheme.addEventListener?.('change', event => { if (!themeOverride) applyTheme(event.matches ? 'dark' : 'light'); });

  const stories = [...document.querySelectorAll('.story')];
  const filters = [...document.querySelectorAll('.filter')];
  const shown = document.querySelector('#shown-count');
  const promptDialog = document.querySelector('#prompt-dialog');
  const promptText = document.querySelector('#prompt-text');
  const promptTitle = document.querySelector('#prompt-title');
  const promptNumber = document.querySelector('#prompt-number');
  const promptStatus = document.querySelector('#prompt-status');
  const copyButton = document.querySelector('#copy-prompt');
  const closeButton = document.querySelector('#close-prompt');
  const requests = new Map();
  let currentPrompt = '', promptVersion = 0, returnFocus = null;

  filters.forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.filter;
    let count = 0;
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    stories.forEach(story => {
      const visible = value === 'all' || story.dataset.tags.split(' ').includes(value);
      story.hidden = !visible;
      if (visible) count++;
    });
    shown.textContent = String(count).padStart(2, '0');
  }));

  async function fetchPrompt(path) {
    if (!requests.has(path)) {
      requests.set(path, fetch(path).then(response => {
        if (!response.ok) throw new Error('Prompt unavailable');
        return response.text();
      }).catch(error => { requests.delete(path); throw error; }));
    }
    return requests.get(path);
  }

  document.querySelectorAll('.prompt-action').forEach(button => button.addEventListener('click', async () => {
    const version = ++promptVersion;
    returnFocus = document.activeElement;
    currentPrompt = '';
    promptTitle.textContent = button.dataset.title;
    promptNumber.textContent = 'RECREATION BRIEF / ' + button.dataset.number;
    promptText.textContent = 'Loading brief…';
    promptStatus.textContent = 'Loading brief…';
    copyButton.disabled = true;
    copyButton.textContent = 'Copy brief';
    promptDialog.showModal();
    closeButton.focus();
    try {
      const value = await fetchPrompt(button.dataset.prompt);
      if (version !== promptVersion) return;
      currentPrompt = value;
      promptText.textContent = value;
      promptStatus.textContent = 'The recreation brief is ready to copy.';
      copyButton.disabled = false;
    } catch {
      if (version !== promptVersion) return;
      promptText.textContent = 'This brief could not load. Close and try again.';
      promptStatus.textContent = 'Could not load brief.';
    }
  }));

  closeButton.addEventListener('click', () => promptDialog.close());
  promptDialog.addEventListener('click', event => { if (event.target === promptDialog) promptDialog.close(); });
  promptDialog.addEventListener('close', () => { promptVersion++; returnFocus?.focus(); });
  copyButton.addEventListener('click', async () => {
    if (!currentPrompt) return;
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(currentPrompt);
      else {
        const helper = document.createElement('textarea');
        helper.value = currentPrompt;
        helper.style.position = 'fixed';
        helper.style.left = '-9999px';
        document.body.append(helper);
        helper.select();
        if (!document.execCommand('copy')) throw new Error('Copy failed');
        helper.remove();
      }
      promptStatus.textContent = 'Recreation brief copied to clipboard.';
      copyButton.textContent = 'Copied';
    } catch {
      promptStatus.textContent = 'Copy was blocked. Select the text above and copy it manually.';
    }
  });
})();
