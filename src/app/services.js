/* import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports'; */

// Amplify.configure(awsconfig);


export const services = {

    // A mock function to mimic making an async request for data
    trialFetchData(query) {
        return new Promise((resolve) =>
        setTimeout(() => resolve({ data: query }), 500)
        );
    },

    submitDrawingService(data) {
        return new Promise((resolve) =>
        setTimeout(() => resolve({ data }), 500)
        );
    }
}
