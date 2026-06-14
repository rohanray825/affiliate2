"use client";

import {useMemo, useState} from "react";
import {Download, Gift, Menu, Share2, X} from "lucide-react";
import {AppItem, Category, SiteSettings} from "@/lib/types";

function TelegramIcon() {
  return (
    <svg className="telegram-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.8 3.2 18.7 20c-.2 1.2-.9 1.5-1.9.9l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-8c.4-.3-.1-.5-.6-.2L6.5 14l-4.7-1.5c-1-.3-1-1 .2-1.5L20.3 4c.9-.3 1.7.2 1.5-.8Z" />
    </svg>
  );
}

export function InteractiveHome({settings, categories, apps}: {settings: SiteSettings; categories: Category[]; apps: AppItem[]}) {
  const [active, setActive] = useState(categories[0]?.slug || "");
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleApps = useMemo(() => apps.filter(app => app.category === active), [active, apps]);
  const share = async () => {
    if (navigator.share) await navigator.share({title: settings.siteName, url: location.href});
    else await navigator.clipboard.writeText(location.href);
  };
  const links = [["Home", "/"], ["About", "/about"], ["Contact", settings.telegramUrl], ["Disclaimer", "/disclaimer"], ["Telegram", settings.telegramUrl]];

  return (
    <>
      <div className="animated-background" aria-hidden="true">
        <span /><span /><span /><span /><span /><span /><span /><span />
      </div>
      <header className="topbar">
        <a href="/" className="brand"><img src={settings.logoUrl} alt="Logo" /><strong>{settings.siteName}</strong></a>
        <div className="top-actions"><a href={settings.telegramUrl} aria-label="Telegram"><TelegramIcon /></a><button onClick={() => setMenuOpen(true)}><Menu /> Menu</button></div>
      </header>
      <nav className="pills">{links.map(([name, href]) => <a className={`nav-${name.toLowerCase()}`} href={href} key={name}>{name === "Telegram" && <TelegramIcon />}{name}</a>)}</nav>
      <aside className={`drawer ${menuOpen ? "open" : ""}`}>
        <button className="close" onClick={() => setMenuOpen(false)}><X /></button>
        <h2>Menu</h2>
        {links.map(([name, href]) => <a href={href} key={name}>{name === "Telegram" && <TelegramIcon />}{name}</a>)}
      </aside>
      {menuOpen && <button className="scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}

      <main>
        <section className="intro">
          <h1>{settings.heroTitle}</h1>
          <p>{settings.heroText}</p>
        </section>
        <h2 className="collection-title">{settings.collectionTitle}</h2>
        <div className="tabs">
          {categories.map(cat => <button className={active === cat.slug ? "active" : ""} onClick={() => setActive(cat.slug)} key={cat.slug}>{cat.title}</button>)}
        </div>
        <section className="app-list">
          {visibleApps.map((app, index) => (
            <article className="app-row" key={app.slug}>
              <span className="number">{index + 1}.</span>
              <img src={app.iconUrl} alt={`${app.name} icon`} />
              <div className="app-info"><h3>{app.name}</h3><p><Gift /> {app.offer}</p></div>
              <a className="download" href={`/api/go/${app.slug}`} target="_blank" rel="nofollow sponsored"><Download /> Download</a>
            </article>
          ))}
        </section>
        <section className="seo-content">
          <h2>Discover Trending Apps & Mobile Rewards</h2>
          <p>Welcome to {settings.siteName}, your destination for discovering newly launched apps, trending games, referral offers, and mobile reward platforms. We regularly update our collection so visitors can quickly find the latest promotions.</p>
          <h3>Popular Referral Apps</h3>
          <p>Explore a growing selection of apps with easy navigation, clear offer information, and direct access to promotional links. Always review each app&apos;s terms before participating.</p>
          <h3>Why Users Prefer Our Platform</h3>
          <ul><li>Fast-loading pages</li><li>Mobile-friendly experience</li><li>Regular app updates</li><li>Simple and clean navigation</li></ul>
          <div className="warning"><h3>⚠️ Important Notice</h3><p>We do not own or operate the listed third-party apps. Offers may change at any time. Users should independently verify terms, eligibility, and risks before installing or using an app.</p></div>
        </section>
      </main>
      <footer>
        <div className="telegram-box"><strong>Join Our Telegram Channel</strong><a href={settings.telegramUrl}>Join Now</a></div>
        <div className="share-promo">
          <strong>Invite Friends To {settings.siteName}</strong>
          <button className="share-big" onClick={share}><Share2 /> Share Website</button>
          <span>Share on WhatsApp, Telegram & Facebook</span>
        </div>
        <div className="footer-links"><a href="/about">About Us</a><a href="/disclaimer">Disclaimer</a><a href="/privacy">Privacy Policy</a></div>
        <p>© {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
      </footer>
      <a className="floating-telegram" href={settings.telegramUrl} aria-label="Telegram"><TelegramIcon /></a>
      <div className="mobile-bottom"><a href={settings.telegramUrl}><TelegramIcon /> Telegram</a><button onClick={share}><Share2 /> Share Site</button></div>
    </>
  );
}
