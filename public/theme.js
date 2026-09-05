(function () {
  try {
    var theme = localStorage.getItem('theme');
    var effectiveTheme = 'dark';
    if (theme === 'light' || (!theme && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      effectiveTheme = 'light';
    }
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    document.documentElement.style.colorScheme = effectiveTheme;
    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
