import { usePageData } from '../hooks/usePageData';
import { useErrorHandler } from '../hooks/useErrorHandler';
import defaultContactPage from '../data/contactPage';
import PageLayout from '../layouts/PageLayout';
import PageRenderer from '../components/PageRenderer';
import type { BasePageContent } from '../types/content';

export default function Contact() {
  const { data, isLoading } = usePageData('contact');
  const { error } = useErrorHandler();

  // Use type assertion to ensure compatibility with PageRenderer
  const content = Array.isArray(data)
    ? defaultContactPage
    : (data || defaultContactPage);

  if (isLoading) return <div className="container mx-auto py-8 loading"><div className="animate-pulse">Loading...</div></div>;
  if (error) return <div className="container mx-auto py-8 error"><div className="text-red-600">Error: {error}</div></div>;

  return (
    <PageLayout page="contact" title={content.title}>
      <PageRenderer content={content as unknown as BasePageContent} />
    </PageLayout>
  );
}
