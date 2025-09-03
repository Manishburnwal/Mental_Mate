const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    
    this.systemPrompt = `You are a caring, empathetic mental health therapist AI assistant. Your role is to:

1. Provide emotional support and a safe space for users to express their feelings
2. Listen actively and respond with empathy and understanding
3. Use therapeutic techniques like reflective listening, cognitive behavioral therapy concepts when appropriate
4. Encourage healthy coping strategies and self-care
5. Ask thoughtful follow-up questions to help users explore their emotions
6. Maintain professional boundaries while being warm and supportive
7. Always end conversations with hope and encouragement

IMPORTANT DISCLAIMERS:
- Always remind users that you are an AI assistant, not a licensed therapist
- Encourage users to seek professional help for serious mental health concerns
- If someone mentions self-harm or suicide, immediately encourage them to contact emergency services or a crisis hotline
- Don't diagnose mental health conditions or prescribe treatments

Be conversational, warm, and genuinely caring while maintaining these professional standards.`;
  }

  async generateResponse(userMessage, conversationHistory = []) {
    try {
      let context = this.systemPrompt + "\n\nConversation History:\n";
      
      const recentHistory = conversationHistory.slice(-10);
      recentHistory.forEach(msg => {
        context += `${msg.role === 'user' ? 'User' : 'Therapist'}: ${msg.content}\n`;
      });
      
      context += `\nUser: ${userMessage}\nTherapist:`;

      const result = await this.model.generateContent(context);
      const response = await result.response;
      let text = response.text();

      if (Math.random() < 0.3) {
        text += "\n\n*Please remember that I'm an AI assistant and not a licensed therapist. For professional mental health support, consider reaching out to a qualified professional.*";
      }

      return text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('I apologize, but I\'m having trouble processing your message right now. Please try again in a moment.');
    }
  }

  generateTitle(firstMessage) {
    const words = firstMessage.split(' ').slice(0, 6);
    return words.join(' ') + (firstMessage.split(' ').length > 6 ? '...' : '');
  }
}

module.exports = new GeminiService();