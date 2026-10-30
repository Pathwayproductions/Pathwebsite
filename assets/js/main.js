/*
 * Pathway Productions — three-page prototype
 * Plain JS, no dependencies. Two jobs only:
 *   1. Accessible mobile nav toggle.
 *   2. Intercept not-yet-built routes and real-video placeholders so the
 *      prototype never silently 404s, fakes a page, or fakes a video.
 *
 * NOT IMPLEMENTED here (see README "Tracking specification"):
 *   - No analytics / tag manager code of any kind.
 *   - No GA4, Google Ads or Meta pixel IDs, real or dummy.
 *   - No CRM or form submission network calls.
 */
(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      if (expanded) {
        nav.setAttribute("hidden", "");
      } else {
        nav.removeAttribute("hidden");
      }
    });
  }

  /* ---------- Prototype-scope banner ---------- */
  var banner = document.querySelector("[data-proto-banner]");
  var bannerText = banner ? banner.querySelector("[data-proto-banner-text]") : null;
  var bannerTimer = null;

  function showBanner(html) {
    if (!banner || !bannerText) {
      // Fallback if the banner markup is missing for any reason.
      window.alert(html.replace(/<[^>]+>/g, ""));
      return;
    }
    bannerText.innerHTML = html;
    banner.classList.add("is-visible");
    banner.removeAttribute("hidden");
    clearTimeout(bannerTimer);
    bannerTimer = setTimeout(hideBanner, 9000);
  }
  function hideBanner() {
    if (!banner) return;
    banner.classList.remove("is-visible");
  }
  document.addEventListener("click", function (e) {
    var closeBtn = e.target.closest("[data-proto-banner-close]");
    if (closeBtn) hideBanner();
  });

  /* ---------- Pending-route interception ---------- */
  // Any link marked data-pending points at its real, final intended route
  // (see README "Route map"), but that route is not part of this three-page
  // prototype. Clicking it shows a dismissible, accessible notice instead of
  // navigating to a 404 or a silently faked page.
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-pending]");
    if (!link) return;
    e.preventDefault();
    var dest = link.getAttribute("href");
    showBanner(
      "<strong>Not part of this three-page prototype.</strong>" +
      "Planned production route: <code>" + dest + "</code> — see README &amp; route map."
    );
  });

  /* ---------- Video-activation placeholder ---------- */
  // Section 1 of the brief forbids autoplay and forbids faking a video that
  // does not exist. Poster cards for We Box / Spice Hill / Fit & Flex have no
  // approved video URL yet, so the "play" control explains that rather than
  // loading a player or a stock clip.
  document.addEventListener("click", function (e) {
    var play = e.target.closest("[data-video-activate]");
    if (!play) return;
    e.preventDefault();
    var project = play.getAttribute("data-video-activate") || "this project";
    showBanner(
      "<strong>Video not available in this prototype.</strong>" +
      "Awaiting an owner-approved, rights-cleared video URL for " + project + "."
    );
  });
})();
