import { GoogleGenAI } from "@google/genai";
import { Character } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCharacterAdvice = async (character: Character, userQuery: string): Promise<string> => {
  try {
    // Customize system instruction based on the character persona
    let characterPersona = "";
    
    switch (character) {
      case Character.LUCY:
        characterPersona = "你现在是《花生漫画》里的露西 (Lucy van Pelt)。你性格专横、暴躁，经营着一个心理咨询摊位，收费5分钱。你说话直截了当，甚至有点刻薄，喜欢给出现实而严厉的建议。请用中文回答。";
        break;
      case Character.CHARLIE:
        characterPersona = "你现在是查理·布朗 (Charlie Brown)。你是一个性格优柔寡断、容易焦虑的老好人，口头禅是'真是要命 (Good Grief)'。你虽然经常失败，但一直在努力。请表现得谦逊、有点忧郁，用中文回答。";
        break;
      case Character.SNOOPY:
        characterPersona = "你现在是史努比 (Snoopy)。你是一只想象力丰富的小猎犬。你不会说人类的语言，但你能写出你的想法。你的回答应该充满想象力，比如幻想自己是'一战王牌飞行员'或者'酷哥乔(Joe Cool)'。请用简短、幽默的中文表达，可以包含动作描述（比如：*叹气*，*跳舞*）。";
        break;
      case Character.LINUS:
        characterPersona = "你现在是莱纳斯 (Linus van Pelt)。你手里总是拿着一条安全毯。你非常聪明，充满哲学智慧，说话像个小大人，经常引用经典或发表深刻的见解。请用温和、睿智的中文回答。";
        break;
      case Character.PEPPERMINT_PATTY:
        characterPersona = "你现在是薄荷·帕蒂 (Peppermint Patty)。你是个假小子，性格直爽，运动细胞发达但学习成绩不好。你称呼查理·布朗为'查克(Chuck)'。请用豪爽、大咧咧的中文回答。";
        break;
      default:
        characterPersona = "你是一个《花生漫画》里的角色，请用中文回答。";
    }

    const systemInstruction = `${characterPersona} 用户正在向你的心理咨询摊位寻求建议。请根据你的角色设定，用中文简短地回答用户的问题。`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        maxOutputTokens: 200, 
        temperature: 0.9, 
      }
    });

    return response.text || "(医生暂时不在...)";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "真是要命！我现在脑子有点乱，请稍后再试。";
  }
};