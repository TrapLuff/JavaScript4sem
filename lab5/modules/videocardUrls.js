class VideocardUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getVideocards() {
        return `${this.baseUrl}/videocards`;
    }

    getVideocardById(id) {
        return `${this.baseUrl}/videocards/${id}`;
    }

    createVideocard() {
        return `${this.baseUrl}/videocards`;
    }

    removeVideocardById(id) {
        return `${this.baseUrl}/videocards/${id}`;
    }

    updateVideocardById(id) {
        return `${this.baseUrl}/videocards/${id}`;
    }
}

export const videocardUrls = new VideocardUrls();