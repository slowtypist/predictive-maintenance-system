/**
 * Front-end only API Client
 * Returns mock data for all requests to ensure the UI works without a backend.
 */
const apiServerClient = {
  fetch: async (endpoint, options = {}) => {
    console.log(`[Mock API] Request to ${endpoint}`, options);
    
    // Artificial delay to simulate network
    await new Promise(resolve => setTimeout(resolve, 800));

    if (endpoint === '/predict') {
      // Mock ML Prediction Logic
      const body = JSON.parse(options.body || '{}');
      
      // Heuristic: If temperature or vibration is high, status is Critical/Caution
      let status = 'Healthy';
      let rul = 75 + Math.random() * 20;
      let action = 'Continue normal operation with routine maintenance';

      if (body.temperature > 110 || body.vibration > 30) {
        status = 'Critical';
        rul = 15 + Math.random() * 15;
        action = 'Immediate inspection and maintenance required to prevent failure';
      } else if (body.temperature > 95 || body.vibration > 20) {
        status = 'Caution';
        rul = 45 + Math.random() * 15;
        action = 'Schedule preventive maintenance within next 2-4 weeks';
      }

      return {
        ok: true,
        json: async () => ({
          rul: Math.round(rul * 10) / 10,
          status,
          confidence: Math.round(85 + Math.random() * 10),
          recommendedAction: action
        })
      };
    }

    // Default response for other endpoints
    return {
      ok: true,
      json: async () => ({ message: 'Success' })
    };
  }
};

export default apiServerClient;
