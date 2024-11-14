export class FinancialAdvisor {
    constructor(language) {
        this.language = language;
        this.contextHistory = [];
    }

    async getSimplifiedExplanation(investment, userProfile) {
        // Generate personalized explanation based on user's background
        const context = {
            occupation: userProfile.occupation,
            monthlyIncome: userProfile.monthlyIncome,
            location: userProfile.location,
            financialGoals: userProfile.financialGoals
        };

        try {
            const response = await fetch('/api/ai/explain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    investment,
                    context,
                    language: this.language
                })
            });

            return await response.json();
        } catch (error) {
            console.error('Error getting AI explanation:', error);
            return null;
        }
    }

    async getContextualExample(investment, userProfile) {
        // Generate relatable examples based on user's local context
        try {
            const response = await fetch('/api/ai/examples', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    investment,
                    location: userProfile.location,
                    occupation: userProfile.occupation,
                    language: this.language
                })
            });

            return await response.json();
        } catch (error) {
            console.error('Error getting contextual example:', error);
            return null;
        }
    }

    async askQuestion(question, investment, userProfile) {
        this.contextHistory.push(question);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question,
                    investment,
                    userProfile,
                    context: this.contextHistory,
                    language: this.language
                })
            });

            const answer = await response.json();
            this.contextHistory.push(answer);
            return answer;
        } catch (error) {
            console.error('Error getting AI response:', error);
            return null;
        }
    }

    async getVoiceInput() {
        try {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = this.language;
            recognition.start();

            return new Promise((resolve, reject) => {
                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    resolve(transcript);
                };
                recognition.onerror = (error) => reject(error);
            });
        } catch (error) {
            console.error('Error with voice input:', error);
            return null;
        }
    }
} 