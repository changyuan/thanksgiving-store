import React, { useState } from 'react';
import { Character } from '../types';
import { getCharacterAdvice } from '../services/geminiService';

const AdviceBooth: React.FC = () => {
  const [selectedChar, setSelectedChar] = useState<Character>(Character.LUCY);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    const advice = await getCharacterAdvice(selectedChar, query);
    setResponse(advice);
    setLoading(false);
  };

  return (
    <div className="bg-red-700 p-6 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto my-12 text-white relative">
      {/* Booth Roof Effect */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 border-4 border-black px-8 py-2 rotate-[-2deg] shadow-md z-10 w-3/4 text-center">
        <h2 className="text-black text-2xl font-bold handwritten uppercase tracking-wider">心理咨询 5分钱</h2>
      </div>

      <div className="mt-8 text-center space-y-4">
        <p className="font-bold text-lg mb-2 handwritten tracking-widest">
          {loading ? '思考中...' : '医生在岗 (THE DOCTOR IS IN)'}
        </p>
        
        <div className="bg-white text-black p-4 rounded-lg border-2 border-black transform rotate-1">
          <label className="block text-left mb-2 font-bold handwritten text-lg">选择你的咨询师：</label>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.values(Character).map((char) => (
              <button
                key={char}
                onClick={() => setSelectedChar(char)}
                className={`px-3 py-1 rounded-full border-2 border-black text-sm transition-all handwritten font-bold
                  ${selectedChar === char 
                    ? 'bg-yellow-400 scale-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {char.split(' ')[0]} {/* Show short name */}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-black -rotate-1">
          <textarea
            className="w-full text-black p-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500 h-24 handwritten text-lg bg-[#fafafa]"
            placeholder="有什么心事吗，查克？"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500 text-sm italic font-serif">费用：5 分钱 (今天免费)</span>
            <button
              onClick={handleAsk}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all handwritten text-lg"
            >
              {loading ? '咨询中...' : '寻求建议'}
            </button>
          </div>
        </div>

        {response && (
          <div className="mt-6 bg-yellow-100 text-black p-6 rounded-lg border-4 border-black relative animate-fade-in text-left">
             <div className="absolute -top-3 -left-3 w-8 h-8 bg-black rounded-full z-0"></div>
            <div className="relative z-10">
                <h3 className="font-bold handwritten mb-2 text-xl border-b-2 border-black inline-block pb-1">
                  {selectedChar.split(' ')[0]} 说道:
                </h3>
                <p className="text-lg leading-loose font-medium font-serif mt-2">
                  "{response}"
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdviceBooth;