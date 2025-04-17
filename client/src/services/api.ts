import { supabase } from '../lib/supabase';

// Pages service
export const pagesService = {
  async getAllPages() {
    const { data, error } = await supabase
      .from('pages')
      .select('*');
    if (error) throw error;
    return data;
  },

  async createPage(pageData: any) {
    const { data, error } = await supabase
      .from('pages')
      .insert([pageData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updatePage(id: string, pageData: any) {
    const { data, error } = await supabase
      .from('pages')
      .update(pageData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  }
};

// Services service
export const servicesService = {
  async getAllServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*');
    if (error) throw error;
    return data;
  },

  async createService(serviceData: any) {
    const { data, error } = await supabase
      .from('services')
      .insert([serviceData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateService(id: string, serviceData: any) {
    const { data, error } = await supabase
      .from('services')
      .update(serviceData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteService(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// Forms service
export const formsService = {
  async getAllForms() {
    const { data, error } = await supabase
      .from('forms')
      .select('*');
    if (error) throw error;
    return data;
  },

  async createForm(formData: any) {
    const { data, error } = await supabase
      .from('forms')
      .insert([formData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateForm(id: string, formData: any) {
    const { data, error } = await supabase
      .from('forms')
      .update(formData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteForm(id: string) {
    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// Content service
export const contentService = {
  async getAllContent(page = 1, limit = 10, filter = '') {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .ilike('title', `%${filter}%`)
      .range((page - 1) * limit, page * limit - 1)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getContentById(id: string) {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createContent(contentData: any) {
    const { data, error } = await supabase
      .from('content')
      .insert([contentData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateContent(id: string, contentData: any) {
    const { data, error } = await supabase
      .from('content')
      .update(contentData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteContent(id: string) {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// Leads service
export const leadsService = {
  async getAllLeads(page = 1, limit = 10) {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .range((page - 1) * limit, page * limit - 1)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getLeadById(id: string) {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async deleteLead(id: string) {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};