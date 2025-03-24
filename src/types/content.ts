export interface ContentItem {
  title: string;
  description: string;
  image: string;
}

export interface PageContent {
  heading: string;
  subheading: string;
  body: ContentItem[];
}

export interface ServiceData extends ContentItem {
  id: string;
}

export interface TeamMember extends ContentItem {
  id: string;
  role: string;
}

export interface ContactInfo extends ContentItem {
  id: string;
  type: 'address' | 'phone' | 'email';
}
