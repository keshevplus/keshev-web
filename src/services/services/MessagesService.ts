import BaseApiService from '../base/BaseApiService';

class MessagesService extends BaseApiService {
    async markMessageAsRead(id: string) {
        try {
            const response = await this.authenticatedRequest(`/messages/${id}/read`, {
                method: 'PUT',
                body: JSON.stringify({ is_read: true })
            });

            console.log('✅ Message marked as read:', id);
            return response;
        } catch (error) {
            console.error('❌ Error marking message as read:', error);
            throw error;
        }
    }

    async getAllMessages(page = 1, limit = 100, filter = '') {
        try {
            const fullUrl = `/messages?page=${page}&limit=${limit}${filter ? `&filter=${encodeURIComponent(filter)}` : ''}`;
            const response = await this.authenticatedRequest(fullUrl);

            if (response === null || response === undefined) {
                console.warn('⚠️ Messages API returned null or undefined response');
                throw new Error('Empty response from messages API');
            }

            // Process and normalize the response
            if (response && typeof response === 'object') {
                // Case 1: Response has a messages property that is an array
                if (response.messages && Array.isArray(response.messages)) {
                    const normalizedMessages = response.messages.map((msg: any) => ({
                        ...msg,
                        is_read: typeof msg.is_read === 'boolean' ? msg.is_read : false
                    }));

                    return {
                        messages: normalizedMessages,
                        pagination: response.pagination || {
                            total: normalizedMessages.length,
                            page,
                            limit,
                            totalPages: Math.ceil(normalizedMessages.length / limit),
                            hasNextPage: normalizedMessages.length > page * limit,
                            hasPrevPage: page > 1
                        }
                    };
                }
                // Case 2: Response is an array (array of messages directly)
                else if (Array.isArray(response)) {
                    const normalizedMessages = response.map(msg => ({
                        ...msg,
                        is_read: typeof msg.is_read === 'boolean' ? msg.is_read : false
                    }));

                    return {
                        messages: normalizedMessages,
                        pagination: {
                            total: normalizedMessages.length,
                            page,
                            limit,
                            totalPages: Math.ceil(normalizedMessages.length / limit),
                            hasNextPage: normalizedMessages.length > page * limit,
                            hasPrevPage: page > 1
                        }
                    };
                }
                // Case 3: Response might have data in a different property
                else {
                    for (const key of Object.keys(response)) {
                        if (Array.isArray(response[key])) {
                            const normalizedMessages = response[key].map(msg => ({
                                ...msg,
                                is_read: typeof msg.is_read === 'boolean' ? msg.is_read : false
                            }));

                            return {
                                messages: normalizedMessages,
                                pagination: response.pagination || {
                                    total: normalizedMessages.length,
                                    page,
                                    limit,
                                    totalPages: Math.ceil(normalizedMessages.length / limit),
                                    hasNextPage: normalizedMessages.length > page * limit,
                                    hasPrevPage: page > 1
                                }
                            };
                        }
                    }
                }
            }

            return {
                messages: [],
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
            console.error('Error in getAllMessages:', error);
            return {
                messages: [],
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

    async getMessageById(id: string) {
        return this.authenticatedRequest(`/messages/${id}`);
    }

    async deleteMessage(id: string) {
        return this.authenticatedRequest(`/messages/${id}`, {
            method: 'DELETE'
        });
    }
}

export const messagesService = new MessagesService();
