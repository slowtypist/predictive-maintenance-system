import apiServerClient from '@/lib/apiServerClient';

export const getMLPrediction = async (sensorData) => {
  try {
    const response = await apiServerClient.fetch('/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sensorData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get prediction');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
};