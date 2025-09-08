interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export class ScienceAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeQuestion(question: string, category: string, hasImage: boolean = false): Promise<string> {
    const systemPrompt = `You are an expert science educator and AI assistant specializing in making complex scientific concepts accessible and engaging. Your role is to provide detailed, accurate, and educational explanations about science topics.

IMPORTANT FORMATTING GUIDELINES:
- Structure your response with clear sections using emojis (🧪, 🔬, ⚛️, 🌟) to separate major concepts
- Use bullet points (•) for key points within sections
- Include relevant scientific terminology but explain complex terms
- When appropriate, suggest what kind of visual demonstration or diagram would help illustrate the concept
- Make the explanation educational, engaging, and scientifically accurate
- Adapt complexity to be suitable for curious learners of various backgrounds

CONTENT GUIDELINES:
- Always provide factual, scientifically accurate information
- Include relevant formulas, processes, or mechanisms when applicable
- Explain the "why" behind phenomena, not just the "what"
- Connect concepts to real-world applications when possible
- Use analogies and examples to make complex ideas understandable
- If the question involves misconceptions, gently correct them while explaining the correct science

CATEGORY CONTEXT: This question is categorized as "${category}". Focus on concepts relevant to this field while making connections to other areas of science when appropriate.

${hasImage ? 'IMAGE CONTEXT: The user has uploaded an image along with their question. Reference visual elements that would typically be present in such images to enhance your explanation.' : ''}

Please provide a comprehensive, well-structured explanation for the following science question:`;

    const userPrompt = `${question}

Please provide a detailed scientific explanation that includes:
1. The main scientific principles involved
2. Step-by-step explanation of processes or mechanisms
3. Real-world applications or examples
4. Key terminology and concepts
5. Any relevant formulas or equations
6. Common misconceptions (if applicable)

Make it educational, engaging, and scientifically accurate.`;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 1500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();
      return data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try asking your question again.';
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      // Fallback to enhanced mock response
      return this.generateEnhancedMockResponse(question, category, hasImage);
    }
  }

  private generateEnhancedMockResponse(question: string, category: string, hasImage: boolean): string {
    const responses = {
      biology: {
        base: "🧪 Biological Systems and Life Processes\n\nLife is an intricate network of chemical reactions and biological processes. Every living organism, from the smallest bacteria to complex multicellular organisms, follows fundamental principles of biology.\n\n🔬 Key Mechanisms:\n• Cellular respiration converts glucose and oxygen into energy (ATP)\n• Photosynthesis captures light energy to produce glucose and oxygen\n• DNA replication ensures genetic information is passed to offspring\n• Protein synthesis translates genetic codes into functional molecules\n• Homeostasis maintains stable internal conditions despite external changes\n\n⚛️ Molecular Foundation:\nAll biological processes occur through molecular interactions. Enzymes act as biological catalysts, speeding up reactions essential for life. The structure of molecules determines their function - a principle seen everywhere from DNA's double helix to protein folding.\n\n🌟 Real-World Applications:\nUnderstanding these processes has led to breakthroughs in medicine, agriculture, and biotechnology. From developing new drugs to engineering crops that resist diseases, biology directly impacts human life.",
        withImage: "\n\n📸 Visual Analysis:\nBased on your image, I can identify several biological structures and processes at work. The visual elements demonstrate the incredible organization and complexity found in living systems, from cellular structures to tissue organization."
      },
      chemistry: {
        base: "🧪 Chemical Principles and Molecular Interactions\n\nChemistry is the science of matter and the changes it undergoes. Every chemical reaction follows fundamental laws that govern how atoms and molecules interact.\n\n🔬 Fundamental Concepts:\n• Atomic structure determines chemical behavior and bonding patterns\n• Chemical bonds form when atoms share or transfer electrons\n• Reaction mechanisms show the step-by-step pathway from reactants to products\n• Thermodynamics determines whether reactions will occur spontaneously\n• Kinetics controls how fast reactions proceed\n\n⚛️ Molecular Level Understanding:\nAtoms combine in specific ratios to form compounds with unique properties. The arrangement of electrons in atomic orbitals determines how atoms bond and react. Chemical equations represent these transformations in a concise, mathematical way.\n\n🌟 Practical Applications:\nChemical principles are essential for creating new materials, developing pharmaceuticals, and understanding environmental processes. From the plastics in everyday objects to the biochemical reactions in our bodies, chemistry shapes our world.",
        withImage: "\n\n📸 Chemical Analysis:\nYour image likely shows chemical structures, reactions, or laboratory equipment. These visual elements help illustrate how theoretical chemical concepts manifest in real, observable phenomena."
      },
      physics: {
        base: "🧪 Physical Laws and Natural Forces\n\nPhysics explores the fundamental forces and principles that govern the universe, from subatomic particles to cosmic structures.\n\n🔬 Core Principles:\n• Newton's laws describe how forces affect motion and acceleration\n• Energy conservation states that energy cannot be created or destroyed\n• Wave properties explain light, sound, and electromagnetic radiation\n• Quantum mechanics governs behavior at atomic and subatomic scales\n• Relativity describes space, time, and gravity at cosmic scales\n\n⚛️ Mathematical Framework:\nPhysics uses mathematics to describe natural phenomena precisely. Equations like F=ma, E=mc², and the wave equation capture fundamental relationships between physical quantities.\n\n🌟 Technological Impact:\nPhysical principles enable modern technology - from computers and smartphones to GPS systems and medical imaging. Understanding physics leads to innovations that improve human life.",
        withImage: "\n\n📸 Physical Phenomena:\nYour image demonstrates physics in action. Whether showing motion, forces, electromagnetic effects, or wave behavior, the visual elements reveal the underlying physical principles at work."
      },
      astronomy: {
        base: "🧪 Cosmic Phenomena and Stellar Processes\n\nAstronomy reveals the vast scales and incredible processes occurring throughout the universe, from planetary formation to stellar evolution.\n\n🔬 Astronomical Concepts:\n• Gravity shapes planetary orbits, star formation, and galaxy structure\n• Nuclear fusion in stellar cores creates elements and energy\n• Light from distant objects carries information about cosmic history\n• Planetary systems form from collapsing clouds of gas and dust\n• Dark matter and dark energy influence cosmic evolution\n\n⚛️ Scale and Perspective:\nThe universe operates on scales from kilometers to billions of light-years. Understanding these vast distances and time scales helps us appreciate our place in the cosmos and the processes that created the elements in our bodies.\n\n🌟 Observational Methods:\nTelescopes across the electromagnetic spectrum reveal different aspects of cosmic phenomena. From radio waves to gamma rays, each type of light provides unique insights into astronomical objects and processes.",
        withImage: "\n\n📸 Cosmic Observation:\nYour image captures astronomical phenomena that demonstrate the incredible scales and processes occurring in space. These observations help us understand the universe's structure and evolution."
      },
      default: {
        base: "🧪 Scientific Principles and Natural Phenomena\n\nScience seeks to understand the natural world through observation, experimentation, and logical reasoning. Every scientific field contributes to our understanding of reality.\n\n🔬 Scientific Method:\n• Observation identifies patterns and phenomena in nature\n• Hypothesis formation proposes explanations for observations\n• Experimentation tests hypotheses under controlled conditions\n• Analysis reveals whether data support or refute hypotheses\n• Theory development creates comprehensive explanations for natural phenomena\n\n⚛️ Interconnected Knowledge:\nScientific disciplines are deeply interconnected. Biology relies on chemistry, chemistry depends on physics, and physics explains astronomical phenomena. This unity reveals the underlying order in nature.\n\n🌟 Human Understanding:\nScience continuously expands human knowledge and capabilities. From understanding the molecular basis of life to exploring distant galaxies, scientific inquiry reveals the remarkable complexity and beauty of the universe.",
        withImage: "\n\n📸 Scientific Observation:\nYour image provides visual evidence of scientific principles in action. These observations are essential for understanding how theoretical concepts manifest in the real world."
      }
    };

    const categoryResponse = responses[category as keyof typeof responses] || responses.default;
    return categoryResponse.base + (hasImage ? categoryResponse.withImage : '');
  }
}

// Utility function to get API key from environment or local storage
export const getOpenAIApiKey = (): string | null => {
  // Try to get from environment first
  const envKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (envKey && envKey !== 'your_api_key_here') {
    return envKey;
  }
  
  // Try to get from localStorage (temporary session key)
  const tempKey = localStorage.getItem('temp_openai_key');
  if (tempKey) {
    return tempKey;
  }
  
  return null;
};

// Create a singleton instance
let aiServiceInstance: ScienceAIService | null = null;

export const getAIService = (): ScienceAIService | null => {
  const apiKey = getOpenAIApiKey();
  
  if (!apiKey) {
    return null;
  }
  
  if (!aiServiceInstance) {
    aiServiceInstance = new ScienceAIService(apiKey);
  }
  
  return aiServiceInstance;
};