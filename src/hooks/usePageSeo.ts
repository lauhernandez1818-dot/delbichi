import { useEffect } from 'react';

type PageSeoOptions = {
  title: string;
  description?: string;
  robots?: string;
  canonical?: string;
};

function upsertMeta(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertCanonical(href?: string) {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!href) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = href;
}

export function usePageSeo({
  title,
  description,
  robots = 'index, follow',
  canonical,
}: PageSeoOptions) {
  useEffect(() => {
    document.title = title;
    upsertMeta('robots', robots);
    if (description) upsertMeta('description', description);
    upsertCanonical(canonical);
  }, [title, description, robots, canonical]);
}
