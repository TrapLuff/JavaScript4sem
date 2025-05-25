class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise} - Промис с ответом
     */
    async get(url) {
        try {
            const response = await fetch(url);
            return await this._handleResponse(response);
        } catch (error) {
            return await this._handleError(error);
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @returns {Promise} - Промис с ответом
     */
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return await this._handleResponse(response);
        } catch (error) {
            return await this._handleError(error);
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @returns {Promise} - Промис с ответом
     */
    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return await this._handleResponse(response);
        } catch (error) {
            return await this._handleError(error);
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise} - Промис с ответом
     */
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            return await this._handleResponse(response);
        } catch (error) {
            return await this._handleError(error);
        }
    }

    /**
     * Обработчик ответа (приватный метод)
     * @param {Response} response - Объект ответа fetch
     * @returns {Promise} - Промис с данными
     */
    async _handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        try {
            const data = await response.json();
            return { data, status: response.status };
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
            return { data: null, status: response.status };
        }
    }

    /**
     * Обработчик ошибок (приватный метод)
     * @param {Error} error - Объект ошибки
     * @returns {Promise} - Отклоненный промис
     */
    _handleError(error) {
        console.error('Ошибка запроса:', error);
        return Promise.reject(error);
    }
}

export const ajax = new Ajax();