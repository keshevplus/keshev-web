import BaseApiService from '../base/BaseApiService';

class LeadsService extends BaseApiService {
    async markLeadAsRead(id: string) {
        try {
            console.log('Marking lead as read:', id);
            const response = await this.authenticatedRequest(`/leads/${id}/read`, {
                method: 'PUT',
                body: JSON.stringify({ is_read: true })
            });
            console.log('Mark as read response:', response);
            return response;
        } catch (error) {
            console.error('Error marking lead as read:', error);
            throw error;
        }
    }

    async getAllLeads(page = 1, limit = 100, filter = '') {
        try {
            console.log(`🔍 Fetching leads from API: page ${page}, limit ${limit}, filter: ${filter}`);

            const fullUrl = `/leads?page=${page}&limit=${limit}${filter ? `&filter=${encodeURIComponent(filter)}` : ''}`;
            const response = await this.authenticatedRequest(fullUrl);

            if (response === null || response === undefined) {
                console.warn('⚠️ Leads API returned null or undefined response');
                throw new Error('Empty response from leads API');
            }

            // Process response based on structure
            if (response.leads && Array.isArray(response.leads)) {
                const normalizedLeads = response.leads.map((lead: Record<string, any>) => ({
                    ...lead,
                    is_read: typeof lead.is_read === 'boolean' ? lead.is_read : false
                }));

                return {
                    leads: normalizedLeads,
                    pagination: response.pagination || {
                        total: normalizedLeads.length,
                        page,
                        limit,
                        totalPages: Math.ceil(normalizedLeads.length / limit),
                        hasNextPage: normalizedLeads.length > page * limit,
                        hasPrevPage: page > 1
                    }
                };
            }

            if (Array.isArray(response)) {
                const normalizedLeads = response.map((lead: Record<string, any>) => ({
                    ...lead,
                    is_read: typeof lead.is_read === 'boolean' ? lead.is_read : false
                }));

                return {
                    leads: normalizedLeads,
                    pagination: {
                        total: normalizedLeads.length,
                        page,
                        limit,
                        totalPages: Math.ceil(normalizedLeads.length / limit),
                        hasNextPage: normalizedLeads.length > page * limit,
                        hasPrevPage: page > 1
                    }
                };
            }

            for (const key of Object.keys(response)) {
                if (Array.isArray(response[key])) {
                    const normalizedLeads = response[key].map((lead: Record<string, any>) => ({
                        ...lead,
                        is_read: typeof lead.is_read === 'boolean' ? lead.is_read : false
                    }));

                    return {
                        leads: normalizedLeads,
                        pagination: response.pagination || {
                            total: normalizedLeads.length,
                            page,
                            limit,
                            totalPages: Math.ceil(normalizedLeads.length / limit),
                            hasNextPage: normalizedLeads.length > page * limit,
                            hasPrevPage: page > 1
                        }
                    };
                }
            }

            return {
                leads: [],
                pagination: {
                    total: 0,
                    page,
                    limit,
                    totalPages: 0,
                    hasNextPage: false,
                    hasPrevPage: false
                }
            };
        } catch (error) {
            console.error('Error fetching leads:', error);
            return {
                leads: [],
                pagination: {
                    total: 0,
                    page,
                    limit,
                    totalPages: 0,
                    hasNextPage: false,
                    hasPrevPage: false
                }
            };
        }
    }

    async getLeadById(id: string) {
        return this.authenticatedRequest(`/leads/${id}`);
    }

    async deleteLead(id: string) {
        return this.authenticatedRequest(`/leads/${id}`, {
            method: 'DELETE'
        });
    }
}

export const leadsService = new LeadsService();
