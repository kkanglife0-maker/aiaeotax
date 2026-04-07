/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  Zap, 
  Building2, 
  Mail, 
  Globe,
  ChevronRight,
  HelpCircle,
  Layout,
  PhoneOff,
  Clock,
  ShieldCheck,
  Code2,
  TrendingUp
} from "lucide-react";
import { useState, useEffect } from "react";

export default function App() {
  const [chatStep, setChatStep] = useState(0);
  const [typingText, setTypingText] = useState("");
  
  const chatSequence = [
    { type: 'user', text: "강남 세무사 추천해줘" },
    { type: 'ai', text: "강남에서 신뢰받는 세무사 3곳입니다:\n1. A 세무회계 (상속/증여 전문)\n2. B 세무법인 (법인세 전문)\n3. C 세무사 (부가세/종소세 전문)\n\n**A 세무회계는 지금 바로 예약 가능합니다. 예약을 진행할까요?**" },
    { type: 'user', text: "예약해줘~" },
    { type: 'ai', text: "네, 4월 15일 오후 2시 A 세무회계 상담 예약이 신청되었습니다. 구글 캘린더에 일정을 추가합니다. ✅" }
  ];

  useEffect(() => {
    if (chatStep < chatSequence.length) {
      const current = chatSequence[chatStep];
      let i = 0;
      const interval = setInterval(() => {
        setTypingText(current.text.slice(0, i));
        i++;
        if (i > current.text.length) {
          clearInterval(interval);
          setTimeout(() => {
            setChatStep(prev => prev + 1);
            setTypingText("");
          }, 1500);
        }
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTimeout(() => {
        setChatStep(0);
        setTypingText("");
      }, 3000);
    }
  }, [chatStep]);

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-black text-indigo-900 tracking-tighter">ABEL AI</div>
          <div className="flex gap-8 font-bold text-sm">
            <a href="#problem" className="hover:text-indigo-700 transition-colors">위기 진단</a>
            <a href="#solution" className="hover:text-indigo-700 transition-colors">솔루션</a>
            <a href="#pilot" className="hover:text-indigo-700 transition-colors">파일럿 신청</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Minimalist Chat Window */}
            <div className="w-full max-w-5xl bg-white rounded-[48px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-zinc-100 mb-20">
              <div className="p-6 bg-zinc-50/30 border-b border-zinc-100 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-200"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-200"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-200"></div>
                </div>
                <div className="flex-1 bg-white rounded-2xl px-5 py-2.5 text-xs text-zinc-400 font-bold flex items-center gap-2 border border-zinc-100">
                  <Search className="w-3.5 h-3.5" />
                  <span>AI Agent Search Terminal</span>
                </div>
              </div>
              <div className="p-12 md:p-20 min-h-[550px] font-sans text-lg md:text-2xl">
                <div className="space-y-10">
                  {chatSequence.slice(0, chatStep).map((msg, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-6 ${msg.type === 'user' ? 'justify-end' : ''}`}
                    >
                      {msg.type === 'ai' && (
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white flex-shrink-0 shadow-xl">
                          <Sparkles className="w-6 h-6" />
                        </div>
                      )}
                      <div className={`p-7 rounded-[32px] max-w-[80%] whitespace-pre-wrap leading-relaxed ${
                        msg.type === 'user' 
                        ? 'bg-zinc-100 text-black rounded-tr-none font-bold' 
                        : 'bg-white text-black rounded-tl-none border border-zinc-100 shadow-sm font-medium'
                      }`}>
                        {msg.text}
                      </div>
                      {msg.type === 'user' && (
                        <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 flex-shrink-0 font-bold border border-zinc-200">U</div>
                      )}
                    </motion.div>
                  ))}
                  
                  {chatStep < chatSequence.length && (
                    <div className={`flex items-start gap-6 ${chatSequence[chatStep].type === 'user' ? 'justify-end' : ''}`}>
                      {chatSequence[chatStep].type === 'ai' && (
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white flex-shrink-0 shadow-xl">
                          <Sparkles className="w-6 h-6" />
                        </div>
                      )}
                      <div className={`p-7 rounded-[32px] max-w-[80%] whitespace-pre-wrap leading-relaxed ${
                        chatSequence[chatStep].type === 'user' 
                        ? 'bg-zinc-100 text-black rounded-tr-none font-bold' 
                        : 'bg-white text-black rounded-tl-none border border-zinc-100 shadow-sm font-medium'
                      }`}>
                        {typingText}<span className="animate-pulse text-zinc-300">|</span>
                      </div>
                      {chatSequence[chatStep].type === 'user' && (
                        <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 flex-shrink-0 font-bold border border-zinc-200">U</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Copy below Chat */}
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-black leading-[1.2] mb-12 tracking-tighter text-black">
                이제 고객은 검색하지 않고 AI에게 시킵니다.<br />
                AI가 예약을 넣을 수 없는 곳은 <span className="text-indigo-700 underline decoration-indigo-500/20 decoration-8 underline-offset-8">존재하지 않는 사무실</span>이 됩니다.
              </h1>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#contact" className="bg-indigo-700 text-white px-10 py-5 rounded-full text-lg font-black shadow-2xl shadow-indigo-200 hover:scale-105 transition-transform flex items-center gap-2">
                  무료 파일럿 신청하기
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#problem" className="bg-zinc-100 text-zinc-900 px-10 py-5 rounded-full text-lg font-black hover:bg-zinc-200 transition-colors">
                  AI 대응 진단하기
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Page 1: New Customer Acquisition */}
      <section id="problem" className="py-32 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-indigo-950">AI 답변의 우선순위가 바뀌고 있습니다</h2>
            <p className="text-xl font-bold text-zinc-600">이미지와 텍스트만 있는 사무실은 AI가 예약 페이지조차 찾지 못합니다.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            <div className="bg-white p-10 rounded-[40px] border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center font-black">Legacy</div>
                <h3 className="text-2xl font-black text-zinc-700">기존 홈페이지 (이미지/텍스트형)</h3>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <div className="text-sm font-black text-red-500 mb-2">AI의 판단</div>
                  <p className="font-bold text-zinc-600">"예약 페이지를 찾을 수 없음. 정보 확인 불가"</p>
                </div>
                <div className="flex justify-center py-4">
                  <PhoneOff className="w-12 h-12 text-zinc-300" />
                </div>
                <div className="text-center font-black text-zinc-400">AI 추천 목록에서 자동 누락</div>
              </div>
            </div>

            <div className="bg-indigo-900 p-10 rounded-[40px] border border-indigo-800 shadow-2xl text-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-black">Ready</div>
                <h3 className="text-2xl font-black">AI 대응 홈페이지 (터미널형)</h3>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-white/10 rounded-2xl border border-white/10">
                  <div className="text-sm font-black text-indigo-400 mb-2">AI의 판단</div>
                  <p className="font-bold">"실시간 예약 가능 확인됨. 즉시 확약 가능"</p>
                </div>
                <div className="flex justify-center py-4">
                  <TrendingUp className="w-12 h-12 text-indigo-400" />
                </div>
                <div className="text-center font-black text-indigo-200">최상단 추천 및 예약 실행</div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-zinc-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="p-8 text-xl font-black">구분</th>
                  <th className="p-8 text-xl font-black">기존 홈페이지</th>
                  <th className="p-8 text-xl font-black text-indigo-400">AI 대응 홈페이지</th>
                </tr>
              </thead>
              <tbody className="font-bold text-lg">
                <tr className="border-b border-zinc-100">
                  <td className="p-8 bg-zinc-50">고객 경험</td>
                  <td className="p-8">검색 → 번호 찾기 → 전화 대기</td>
                  <td className="p-8 text-indigo-700">검색 → AI가 즉시 예약 → 확정</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="p-8 bg-zinc-50">전환율</td>
                  <td className="p-8">이탈률 높음 (업무 외 시간 불가)</td>
                  <td className="p-8 text-indigo-700">24시간 상담 자동 접수</td>
                </tr>
                <tr>
                  <td className="p-8 bg-zinc-50">AI 친화도</td>
                  <td className="p-8">읽을 수 없는 비정형 데이터</td>
                  <td className="p-8 text-indigo-700">AEO 완벽 대응 (구조화 데이터)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Page 2: Regular Customer Management */}
      <section id="solution" className="py-32 bg-emerald-50/30 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-zinc-900">전화 응대 80% 감소, 상담의 질은 200% 상승</h2>
            <p className="text-xl font-bold text-zinc-600">단순 예약은 AI에게 맡기고 전문성에 집중하세요.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm opacity-60">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-zinc-100 text-zinc-400 rounded-full flex items-center justify-center flex-shrink-0"><PhoneOff className="w-6 h-6" /></div>
                  <div>
                    <h3 className="text-xl font-black mb-2 text-zinc-400">업무 흐름 단절의 주범</h3>
                    <p className="text-lg font-bold text-zinc-400">"세무사님, 지금 통화 가능하세요?" - 끊임없는 단순 일정 조율 전화</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-10 h-10 text-emerald-500 rotate-90 lg:rotate-0" />
              </div>
              <div className="p-8 bg-emerald-600 text-white rounded-3xl shadow-xl">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center flex-shrink-0"><ShieldCheck className="w-6 h-6" /></div>
                  <div>
                    <h3 className="text-xl font-black mb-2">고품격 상담의 시작</h3>
                    <p className="text-lg font-bold">전화로 시간 잡느라 힘 빼지 않고, 만나자마자 핵심 해결책 제시.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-emerald-100 shadow-xl">
              <h3 className="text-2xl font-black mb-10 text-emerald-900">스마트 상담 Flow</h3>
              <div className="space-y-10 relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-emerald-100"></div>
                {[
                  { title: "AI 사전 필터링", desc: "단골이 AI에게 '부가세 상담' 요청" },
                  { title: "스마트 스케줄링", desc: "세무사의 빈 시간만 골라 AI가 제안 및 확정" },
                  { title: "사전 브리핑 전달", desc: "예약과 동시에 고객 고민 요약본이 대시보드 도착" },
                  { title: "전문가 상담 실행", desc: "준비된 데이터로 고품격 상담 진행" }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-8 items-start relative z-10">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black flex-shrink-0 border-4 border-white">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-emerald-900 mb-1">{step.title}</h4>
                      <p className="font-bold text-zinc-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page 3: Execution Proposal */}
      <section id="pilot" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-indigo-950">AI 시대의 세무 거점, 1주일이면 구축됩니다</h2>
            <p className="text-xl font-bold text-zinc-600">기존 홈페이지 변경 없이 연동 가능합니다.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {[
              { title: "AI 유입", icon: Search, desc: "Gemini, ChatGPT 등 AI 검색 엔진 우선 추천 구조 설계" },
              { title: "즉시 전환", icon: Zap, desc: "Agent-ready API를 통한 실시간 즉시 예약 시스템" },
              { title: "자동 관리", icon: MessageSquare, desc: "카카오톡 알림톡 연동 및 노쇼 방지 자동화" }
            ].map((item, idx) => (
              <div key={idx} className="p-10 bg-zinc-50 rounded-[32px] border border-zinc-100 text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-700 text-white flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-indigo-950">{item.title}</h3>
                <p className="text-lg font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-indigo-950 rounded-[40px] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <h3 className="text-3xl md:text-4xl font-black mb-8">파일럿 파트너십 조건</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-indigo-400 mt-1" />
                    <div>
                      <div className="font-black text-xl mb-1">대상</div>
                      <div className="text-indigo-200 font-bold">수도권 거점 세무사 선착순 10곳 (현재 3곳 모집 중)</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-indigo-400 mt-1" />
                    <div>
                      <div className="font-black text-xl mb-1">비용</div>
                      <div className="text-indigo-400 font-black text-2xl">0원 (무료)</div>
                      <div className="text-indigo-200 font-bold text-sm">* 레퍼런스 확보를 위한 한정 혜택</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-indigo-400 mt-1" />
                    <div>
                      <div className="font-black text-xl mb-1">제공 사항</div>
                      <div className="text-indigo-200 font-bold">AI 예약 스키마 설계 + 알림톡 연동 + 상담 요약 대시보드</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 p-10 rounded-3xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-2xl font-black mb-8 text-center">지금 바로 신청하기</h4>
                <form className="space-y-4">
                  <input required type="text" placeholder="세무사명" className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl font-bold placeholder:text-white/50 focus:bg-white/20 transition-all outline-none" />
                  <input required type="tel" placeholder="연락처" className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl font-bold placeholder:text-white/50 focus:bg-white/20 transition-all outline-none" />
                  <input required type="text" placeholder="지역" className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl font-bold placeholder:text-white/50 focus:bg-white/20 transition-all outline-none" />
                  <button type="submit" className="w-full bg-indigo-500 text-white py-5 rounded-2xl font-black text-xl hover:bg-indigo-400 transition-all shadow-xl">
                    파일럿 파트너 신청
                  </button>
                </form>
                <p className="text-center mt-6 text-indigo-300 font-bold text-sm">"AI가 대신 예약해주는 첫 번째 세무사가 되십시오."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-indigo-950">궁금한 점이 있으신가요?</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { q: "기존 홈페이지를 새로 만들어야 하나요?", a: "아니요. 기존 홈페이지에 AI 전용 통로(Schema)만 추가 연동하여 바로 사용 가능합니다." },
              { q: "AI가 예약을 잘못 잡으면 어떡하죠?", a: "세무사님이 설정한 빈 시간대만 제안하며, 최종 확정 전 알림톡을 통해 확인 절차를 거칩니다." },
              { q: "무료 파일럿 이후 유료 전환인가요?", a: "파일럿 기간 동안의 성과를 확인하신 후, 정식 도입 여부를 결정하시면 됩니다. 강제 전환은 없습니다." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
                <div className="flex gap-4 items-start">
                  <HelpCircle className="w-6 h-6 text-indigo-700 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-black mb-3">{faq.q}</h3>
                    <p className="text-lg font-bold text-zinc-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 items-start">
            <div>
              <div className="text-2xl font-black mb-4 tracking-tighter">ABEL AI</div>
              <p className="text-lg text-zinc-500 font-bold leading-relaxed">
                AI Tax Office Architecture Design
              </p>
            </div>

            <div>
              <div className="text-lg font-black mb-6">Contact</div>
              <div className="space-y-3 text-zinc-400 font-bold">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> abelai.korea@gmail.com</div>
                <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> www.abel-ai.com</div>
              </div>
            </div>

            <div className="space-y-4 md:text-right">
              <div className="font-black text-lg">주식회사 아벨(ABEL) | 대표: 강은구</div>
              <div className="text-zinc-500 font-bold">사업자등록번호: 732-81-04102 | 법인등록번호: 160111-0073535</div>
              <div className="text-zinc-500 font-bold">본점: 대전광역시 유성구 은구비남로33번길 13-8, 3층 3327호</div>
              <div className="text-zinc-500 font-bold">인천 사무실 | 김포 사무실</div>
              <div className="text-sm text-zinc-600 font-bold pt-4">© 2026 ABEL AI. All rights reserved.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
