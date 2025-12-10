import React, { useState } from 'react';
import { BookOpen, X, Feather, Search, Coffee, ArrowLeft, MessageCircle, Send, User } from 'lucide-react';
import { BlogPost, Character } from './types';
import AdviceBooth from './components/AdviceBooth';
import ZigZagDivider from './components/ZigZagDivider';

// Mock Data for Blog Posts
const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "幸福是一只温暖的小狗",
    excerpt: "在这个感恩节，让我们聊聊那些微小而确定的幸福。也许只是一个拥抱，或者一块刚刚烤好的吐司。",
    content: "幸福是什么？查理·布朗曾经问过这个问题。对于史努比来说，幸福是一只温暖的小狗，是一顿丰盛的晚餐，或者是在幻想中击败红男爵。在这个快节奏的世界里，我们往往忘记了停下来欣赏身边的小确幸。\n\n感恩节不仅仅是关于火鸡和南瓜派，更是关于感激我们拥有的一切。即使是一个总是被抽走的橄榄球，或者一棵光秃秃的小圣诞树，只要我们用心去爱，它们就是完美的。\n\n今天，试着给你的朋友一个拥抱，或者静静地享受一杯热可可吧。",
    date: "2023年 11月 23日",
    image: "https://picsum.photos/800/600?random=10",
    tags: ["生活感悟", "史努比", "治愈"]
  },
  {
    id: '2',
    title: "为什么我们总是在等待南瓜大仙？",
    excerpt: "莱纳斯的信仰不仅是关于南瓜，更是关于在这个愤世嫉俗的世界里保持一份纯真和期待。",
    content: "每年万圣节，莱纳斯都会坐在南瓜地里，等待南瓜大仙（The Great Pumpkin）的降临。尽管每年他都失望而归，但他从未放弃希望。\n\n这让我思考，我们在生活中是否也在等待着自己的'南瓜大仙'？也许是一个完美的时刻，一份理想的工作，或者一段童话般的爱情。别人可能会嘲笑这种执着，就像露西嘲笑莱纳斯一样。但是，正是这种看似愚蠢的坚持，构成了我们内心最柔软的部分。\n\n在这个节日季，不要因为害怕失望而停止期待。也许今年，南瓜大仙真的会来。",
    date: "2023年 10月 31日",
    image: "https://picsum.photos/800/600?random=11",
    tags: ["哲学", "莱纳斯", "信仰"]
  },
  {
    id: '3',
    title: "关于那颗永远踢不到的橄榄球",
    excerpt: "生活就像露西手中的橄榄球，你明明知道结局，但每一次你还是会全力以赴地跑过去。",
    content: "我们都认识这种感觉：查理·布朗助跑，露西举着球，就在最后一秒——球被抽走了。查理·布朗重重地摔在地上。\n\n这是一个残酷的笑话，也是一个关于韧性的伟大隐喻。为什么查理·布朗还要去踢？因为他相信这一次会不同。这种‘尽管知道可能会失败，但依然选择信任’的勇气，才是最宝贵的。\n\n生活可能会一次次把球抽走，让我们摔个四脚朝天。但重要的是，我们要像查理·布朗一样，爬起来，拍拍身上的尘土，准备下一次助跑。这才是‘好人查理’的精神。",
    date: "2023年 11月 15日",
    image: "https://picsum.photos/800/600?random=12",
    tags: ["挫折", "查理·布朗", "勇气"]
  },
  {
    id: '4',
    title: "5分钱的心理咨询：露西的智慧",
    excerpt: "有时候，最狠的建议往往最有效。来看看露西·范·佩尔特医生的经典语录。",
    content: "露西虽然脾气暴躁，但她的小摊位确实提供了一些一针见血的真理。她从不糖衣炮弹，她只说实话。\n\n当查理·布朗抱怨自己甚至无法放飞风筝时，露西可能会说：'你的问题在于你就是你自己。' 这听起来很伤人，但如果你仔细想想，这是叫我们要么接受自己，要么改变自己。我们不能指望世界来适应我们的不安全感。\n\n有时候，花5分钱听听真话，比花大价钱听奉承要划算得多。",
    date: "2023年 9月 20日",
    image: "https://picsum.photos/800/600?random=13",
    tags: ["心理学", "露西", "幽默"]
  },
  {
    id: '5',
    title: "如何在屋顶上思考人生",
    excerpt: "史努比教给我们的独处艺术。当生活让你感到沉重，不妨躺在屋顶上看看天空。",
    content: "史努比大部分时间都躺在他的红色狗屋顶上。他在那里写作，在那睡觉，在那思考，甚至在那和伍德斯托克开会。\n\n这种‘屋顶视角’是我们现代人急需的。抽离地面，抽离琐事，仅仅是仰望天空。不管是为了构思一部伟大的小说（开头永远是'在一个漆黑的风雨夜...'），还是为了单纯地发呆。\n\n下次当你感到压力过大时，找个‘屋顶’——也许是阳台，也许是公园的长椅，让自己从现实中稍微抽离一会儿。",
    date: "2023年 8月 10日",
    image: "https://picsum.photos/800/600?random=14",
    tags: ["生活方式", "史努比", "放松"]
  },
  {
    id: '6',
    title: "给这棵小树一点爱",
    excerpt: "在消费主义盛行的年代，让我们重温《查理·布朗的圣诞节》中那棵细小枯萎的树。",
    content: "在所有人都追求又大又亮眼、还是铝合金制成的圣诞树时，查理·布朗选择了一棵快要掉光叶子的小树苗。每个人都嘲笑他。\n\n但是莱纳斯明白这棵树的意义。只要一点点爱（和一点点装饰），这棵树就不再丑陋了。\n\n我们对待人和事不也是如此吗？很多东西并不完美，甚至看起来很糟糕。但只要有人愿意倾注爱意，它们就会焕发出奇迹般的光彩。这就是节日的真正精神。",
    date: "2023年 12月 01日",
    image: "https://picsum.photos/800/600?random=15",
    tags: ["圣诞节", "爱", "经典"]
  }
];

const COMMENTS = [
  { id: 1, user: "莱纳斯 (Linus)", content: "这真是太深刻了。我觉得我需要带着我的毯子好好思考一下。", date: "10分钟前" },
  { id: 2, user: "露西 (Lucy)", content: "哼，废话连篇！要我说，如果你们都听我的，世界早就和平了。", date: "2小时前" },
  { id: 3, user: "施罗德 (Schroeder)", content: "这种艺术感让我想起了贝多芬的奏鸣曲，虽然形式不同，但情感是共通的。", date: "5小时前" },
];

const App: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDF6E3] text-[#333] relative overflow-x-hidden selection:bg-yellow-200 font-serif flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-yellow-400 border-b-4 border-black shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={handleBackToHome}
          >
            <div className="bg-black text-white p-2 rounded-full border-2 border-white transform group-hover:-rotate-12 transition-transform">
                <Feather size={24} />
            </div>
            <h1 className="text-xl md:text-3xl font-bold handwritten tracking-wider text-black">
              花生小镇生活志
            </h1>
          </div>
          
          <nav className="hidden md:flex gap-6 font-bold handwritten text-lg">
            <button onClick={handleBackToHome} className="hover:underline decoration-2 underline-offset-4">首页</button>
            <button className="hover:underline decoration-2 underline-offset-4">关于我们</button>
            <button className="hover:underline decoration-2 underline-offset-4">联系查克</button>
          </nav>

          <button className="md:hidden p-2 border-2 border-black rounded bg-white">
            <Search size={20}/>
          </button>
        </div>
        {/* Decorative Zig Zag Bottom Border */}
        <div className="h-4 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBvbHlnb24gcG9pbnRzPSIwLDEwIDEwLDAgMjAsMTAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')] bg-repeat-x bg-bottom bg-[length:20px_10px]"></div>
      </header>

      <main className="flex-grow">
        {selectedPost ? (
          // --- DETAIL PAGE VIEW ---
          <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
            {/* Back Button */}
            <button 
              onClick={handleBackToHome}
              className="group mb-8 flex items-center gap-2 font-bold handwritten text-lg hover:text-blue-600 transition-colors"
            >
              <div className="p-2 border-2 border-black rounded-full bg-white group-hover:bg-yellow-400 transition-colors">
                <ArrowLeft size={20} />
              </div>
              回到列表
            </button>

            {/* Article Content */}
            <article className="bg-white border-4 border-black rounded-xl p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
               {/* Decorative "Tape" */}
               <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-200/50 rotate-[-2deg] backdrop-blur-sm border-l border-r border-white/50"></div>

               <header className="mb-10 text-center">
                  <div className="flex justify-center gap-2 mb-6">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold uppercase tracking-wider bg-blue-100 px-3 py-1 rounded-full border-2 border-black transform hover:scale-110 transition-transform cursor-default">{tag}</span>
                    ))}
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold handwritten mb-6 leading-tight text-black">
                    {selectedPost.title}
                  </h1>
                  <div className="flex items-center justify-center gap-4 text-sm font-serif italic text-gray-500">
                    <span className="flex items-center gap-1"><BookOpen size={14}/> {selectedPost.date}</span>
                    <span>•</span>
                    <span>阅读时间: 5 分钟</span>
                  </div>
               </header>

               <div className="mb-10 border-4 border-black p-2 bg-white transform rotate-1 shadow-lg">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="w-full h-auto max-h-[500px] object-cover filter contrast-[1.1] sepia-[.2]"
                  />
               </div>

               <div className="prose prose-lg prose-yellow max-w-none font-serif text-gray-800 leading-loose whitespace-pre-line first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:font-handwritten">
                 {selectedPost.content}
               </div>

               {/* Author Box */}
               <div className="mt-16 bg-[#f8f8f8] border-2 border-black p-6 rounded-lg flex flex-col md:flex-row items-center gap-6 relative">
                  <div className="absolute -top-3 left-6 bg-yellow-400 border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-widest">
                    关于作者
                  </div>
                  <div className="w-24 h-24 bg-black rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Snoopy&backgroundColor=b6e3f4" alt="Author" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-bold handwritten text-xl mb-2">史努比 (Snoopy)</h3>
                    <p className="text-sm text-gray-600 italic">
                      "世界闻名的小猎犬，一战王牌飞行员，也是一位多产的作家。目前正致力于他的下一部伟大作品《这是一个漆黑的风雨夜...》。"
                    </p>
                  </div>
               </div>
            </article>

            <ZigZagDivider />

            {/* Comments Section */}
            <section className="bg-white border-4 border-black rounded-xl p-8 shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
              <h3 className="text-2xl font-bold handwritten mb-8 flex items-center gap-2">
                <MessageCircle size={28} className="text-black" />
                读者评论 ({COMMENTS.length})
              </h3>
              
              <div className="space-y-6">
                {COMMENTS.map(comment => (
                  <div key={comment.id} className="flex gap-4 border-b-2 border-dashed border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full border-2 border-black flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {comment.user.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold handwritten text-lg">{comment.user}</span>
                        <span className="text-xs text-gray-400 font-sans">{comment.date}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed font-serif">"{comment.content}"</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Form Mockup */}
              <div className="mt-8 pt-6 border-t-2 border-black">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0">
                     <User size={20} />
                  </div>
                  <div className="flex-1">
                    <textarea 
                      placeholder="写下你的想法，查克..." 
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all font-serif bg-gray-50 h-24 resize-none"
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <button className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-yellow-400 hover:text-black border-2 border-transparent hover:border-black transition-all handwritten flex items-center gap-2">
                        <Send size={16} /> 发布评论
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          // --- HOME VIEW ---
          <>
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 text-center animate-fade-in-down">
              <h2 className="text-4xl md:text-6xl font-bold handwritten mb-6 leading-tight text-black">
                真是要命！<br/>又是美好的一天。
              </h2>
              <p className="text-xl max-w-2xl mx-auto mb-8 font-medium text-gray-700 leading-relaxed">
                这里没有足球比赛的失利，只有关于吐司、爆米花和人生哲学的思考。
                <br/>欢迎来到查理·布朗的世界。
              </p>
              <ZigZagDivider />
            </section>

            {/* AI Advice Booth */}
            <section className="container mx-auto px-4 relative z-10 mb-16">
              <AdviceBooth />
            </section>

            {/* Blog Grid */}
            <section className="container mx-auto px-4 py-8 mb-16">
              <div className="flex items-center gap-4 mb-10">
                  <BookOpen size={32} className="text-black"/>
                  <h3 className="text-3xl font-bold handwritten border-b-4 border-yellow-400 inline-block pr-6 pb-2 text-black">
                    最新日志
                  </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {BLOG_POSTS.map(post => (
                  <article 
                    key={post.id} 
                    className="group bg-white rounded-xl border-4 border-black overflow-hidden hover:-translate-y-2 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(250,204,21,1)] cursor-pointer flex flex-col h-full"
                    onClick={() => handlePostClick(post)}
                  >
                    <div className="h-56 overflow-hidden border-b-4 border-black relative bg-gray-100">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply filter sepia-[.3]"
                      />
                      <div className="absolute top-0 right-0 bg-yellow-400 px-4 py-2 border-b-2 border-l-2 border-black font-bold text-sm handwritten">
                          {post.date}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex gap-2 mb-3">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs font-bold uppercase tracking-wider bg-gray-200 px-2 py-1 rounded border border-black">{tag}</span>
                        ))}
                      </div>
                      <h4 className="text-2xl font-bold handwritten mb-3 text-black leading-snug group-hover:text-blue-800">{post.title}</h4>
                      <p className="text-gray-600 mb-6 line-clamp-3 text-base leading-relaxed font-serif flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-dashed border-gray-300">
                        <span className="flex items-center gap-2 text-sm font-bold handwritten">
                          <Coffee size={16}/> 阅读更多
                        </span>
                        <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-yellow-100 py-16 mt-auto border-t-8 border-yellow-400 relative">
        <div className="container mx-auto px-4 text-center">
            <p className="handwritten text-3xl mb-6">"难道就没有人知道感恩节到底是为了什么吗？"</p>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-sm opacity-60 font-serif max-w-md mx-auto leading-loose">
                © {new Date().getFullYear()} 花生小镇生活志 (Peanuts Town Life Log). <br/>
                本站内容纯属虚构，致敬 Charles M. Schulz 的经典创作。
                <br/>Built with React & Gemini.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;