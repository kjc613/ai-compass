(() => {
  const languageKey = "ai-compass-language";

  function applySeoLanguage(language = localStorage.getItem(languageKey) || "zh") {
    const normalizedLanguage = language === "en" ? "en" : "zh";
    document.documentElement.lang = normalizedLanguage === "en" ? "en" : "zh-CN";

    for (const element of document.querySelectorAll("[data-seo-zh][data-seo-en]")) {
      element.textContent = element.dataset[normalizedLanguage === "en" ? "seoEn" : "seoZh"];
    }

    for (const element of document.querySelectorAll("[data-seo-title-zh][data-seo-title-en]")) {
      element.setAttribute("title", element.dataset[normalizedLanguage === "en" ? "seoTitleEn" : "seoTitleZh"]);
    }

    const pageTitle = document.body?.dataset[normalizedLanguage === "en" ? "titleEn" : "titleZh"];
    if (pageTitle) {
      document.title = pageTitle;
    }

    const pageDescription = document.body?.dataset[normalizedLanguage === "en" ? "descriptionEn" : "descriptionZh"];
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta && pageDescription) {
      descriptionMeta.setAttribute("content", pageDescription);
    }

    const toggle = document.querySelector("#languageToggle");
    if (toggle) {
      toggle.textContent = normalizedLanguage === "en" ? "ZH" : "EN";
      toggle.setAttribute("aria-label", normalizedLanguage === "en" ? "Switch to Chinese" : "Switch to English");
    }
  }

  window.applySeoLanguage = applySeoLanguage;

  const hasAppRuntime = Boolean(window.SITE_DATA);
  if (!hasAppRuntime) {
    document.addEventListener("DOMContentLoaded", () => {
      applySeoLanguage();
      const toggle = document.querySelector("#languageToggle");
      if (toggle) {
        toggle.addEventListener("click", () => {
          const nextLanguage = (localStorage.getItem(languageKey) || "zh") === "zh" ? "en" : "zh";
          localStorage.setItem(languageKey, nextLanguage);
          applySeoLanguage(nextLanguage);
        });
      }
    });
  } else {
    applySeoLanguage();
  }
})();
