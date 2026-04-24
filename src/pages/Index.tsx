import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    image: "https://cdn.poehali.dev/projects/0fb12e59-0dff-405c-8ac5-f8192425a324/files/0012beb5-55a9-4c36-aa30-fd9ab905d1d5.jpg",
    title: "Хамелеон на куртке",
    service: "роспись",
    clothing: "куртки",
    tag: "Художественная роспись",
  },
  {
    id: 2,
    image: "https://cdn.poehali.dev/projects/0fb12e59-0dff-405c-8ac5-f8192425a324/files/c9469bfb-5ac3-4bf8-85e0-dd070954110e.jpg",
    title: "Кастомные джинсы",
    service: "нашивки",
    clothing: "джинсы",
    tag: "Нашивки и вышивка",
  },
  {
    id: 3,
    image: "https://cdn.poehali.dev/projects/0fb12e59-0dff-405c-8ac5-f8192425a324/files/8646eb2d-19e3-4b45-947a-bdb824ccbed0.jpg",
    title: "Роспись кед",
    service: "роспись",
    clothing: "обувь",
    tag: "Художественная роспись",
  },
  {
    id: 4,
    image: "https://cdn.poehali.dev/projects/0fb12e59-0dff-405c-8ac5-f8192425a324/files/cbe2a8d0-dded-4ca1-9209-edc7b0a082f2.jpg",
    title: "Перешив бомбера",
    service: "перешив",
    clothing: "куртки",
    tag: "Перешив и апгрейд",
  },
  {
    id: 5,
    image: "https://cdn.poehali.dev/projects/0fb12e59-0dff-405c-8ac5-f8192425a324/files/360b882e-146c-4bc6-9d5d-58a9b1c41ff6.jpg",
    title: "Принт-роспись футболки",
    service: "роспись",
    clothing: "футболки",
    tag: "Художественная роспись",
  },
  {
    id: 6,
    image: "https://cdn.poehali.dev/projects/0fb12e59-0dff-405c-8ac5-f8192425a324/files/cf7366f7-51a1-4a3b-a95b-7163b2b05123.jpg",
    title: "Ателье: ручная работа",
    service: "перешив",
    clothing: "другое",
    tag: "Переработка одежды",
  },
];

const SERVICE_FILTERS = [
  { key: "все", label: "Все работы" },
  { key: "роспись", label: "Роспись" },
  { key: "нашивки", label: "Нашивки" },
  { key: "перешив", label: "Перешив" },
];

const CLOTHING_FILTERS = [
  { key: "все", label: "Все" },
  { key: "куртки", label: "Куртки" },
  { key: "джинсы", label: "Джинсы" },
  { key: "футболки", label: "Футболки" },
  { key: "обувь", label: "Обувь" },
  { key: "другое", label: "Другое" },
];

const SERVICES = [
  {
    icon: "Paintbrush",
    title: "Художественная роспись",
    desc: "Уникальные принты и арт-объекты прямо на ткани. Акрил, термостойкие краски, вечные рисунки.",
  },
  {
    icon: "Scissors",
    title: "Перешив и апгрейд",
    desc: "Надоевшая вещь получает новую форму, крой, длину. Вторая жизнь для любимого предмета гардероба.",
  },
  {
    icon: "Layers",
    title: "Нашивки и вышивка",
    desc: "Патчи, аппликации, ручная вышивка — добавляем характер и индивидуальность.",
  },
  {
    icon: "RefreshCw",
    title: "Переработка старых вещей",
    desc: "Приносите то, что лежит без дела. Мы превратим это в нечто уникальное и ценное.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Index() {
  const [activeService, setActiveService] = useState("все");
  const [activeClothing, setActiveClothing] = useState("все");
  const [menuOpen, setMenuOpen] = useState(false);

  const heroSection = useInView(0.1);
  const servicesSection = useInView(0.1);
  const portfolioSection = useInView(0.05);
  const aboutSection = useInView(0.1);
  const contactSection = useInView(0.1);

  const filtered = PORTFOLIO_ITEMS.filter((item) => {
    const svcOk = activeService === "все" || item.service === activeService;
    const clOk = activeClothing === "все" || item.clothing === activeClothing;
    return svcOk && clOk;
  });

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-[#0a0a0a]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f8f7f5]/95 backdrop-blur-sm border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-underdog text-2xl tracking-wide"
          >
            ПК
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: "Услуги", id: "services" },
              { label: "Портфолио", id: "portfolio" },
              { label: "О нас", id: "about" },
              { label: "Контакты", id: "contact" },
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link">
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:block font-montserrat text-xs tracking-widest uppercase px-5 py-2.5 bg-[#0a0a0a] text-[#f8f7f5] hover:bg-[#333] transition-colors"
          >
            Заказать
          </button>

          {/* Mobile burger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#e0e0e0] bg-[#f8f7f5] px-6 py-6 flex flex-col gap-5">
            {[
              { label: "Услуги", id: "services" },
              { label: "Портфолио", id: "portfolio" },
              { label: "О нас", id: "about" },
              { label: "Контакты", id: "contact" },
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link text-left w-fit">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="min-h-screen flex flex-col justify-center pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div ref={heroSection.ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[85vh]">
            {/* Left: text */}
            <div>
              <p
                className={`font-montserrat text-xs tracking-[0.25em] uppercase text-[#999] mb-8 ${heroSection.inView ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: "0.1s" }}
              >
                Студия кастомизации одежды
              </p>
              <h1
                className={`font-underdog text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.95] mb-10 ${heroSection.inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}
              >
                Полный
                <br />
                Креатив
              </h1>
              <div
                className={`w-12 h-px bg-[#0a0a0a] mb-8 ${heroSection.inView ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
              />
              <p
                className={`font-montserrat text-sm font-light text-[#555] leading-relaxed max-w-sm mb-12 ${heroSection.inView ? "animate-fade-up animate-delay-400" : "opacity-0"}`}
              >
                Превращаем обычные вещи в уникальные объекты.
                Роспись, перешив, нашивки — ваш стиль, ваши правила.
              </p>
              <div
                className={`flex gap-4 flex-wrap ${heroSection.inView ? "animate-fade-up animate-delay-500" : "opacity-0"}`}
              >
                <button
                  onClick={() => scrollTo("portfolio")}
                  className="font-montserrat text-xs tracking-widest uppercase px-8 py-4 bg-[#0a0a0a] text-[#f8f7f5] hover:bg-[#333] transition-colors"
                >
                  Смотреть портфолио
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="font-montserrat text-xs tracking-widest uppercase px-8 py-4 border border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#f8f7f5] transition-colors"
                >
                  Заказать работу
                </button>
              </div>
            </div>

            {/* Right: hero image */}
            <div
              className={`relative ${heroSection.inView ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
            >
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src="https://cdn.poehali.dev/projects/0fb12e59-0dff-405c-8ac5-f8192425a324/files/0012beb5-55a9-4c36-aa30-fd9ab905d1d5.jpg"
                  alt="Кастомизированная куртка"
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-[#f8f7f5]/90 backdrop-blur-sm p-4">
                    <p className="font-montserrat text-xs tracking-widest uppercase text-[#999]">Последняя работа</p>
                    <p className="font-cormorant text-lg font-semibold mt-1">Хамелеон — художественная роспись</p>
                  </div>
                </div>
              </div>
              {/* Decorative label */}
              <div className="absolute -top-4 -right-4 bg-[#0a0a0a] text-[#f8f7f5] px-4 py-2">
                <span className="font-cormorant text-xs italic">ПК</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center pb-8 mt-4">
          <div className="flex flex-col items-center gap-2 text-[#bbb]">
            <Icon name="ChevronDown" size={18} />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#f0efed]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={servicesSection.ref}>
            <div className={`mb-16 ${servicesSection.inView ? "animate-fade-up" : "opacity-0"}`}>
              <p className="font-montserrat text-xs tracking-[0.25em] uppercase text-[#999] mb-4">
                Что мы делаем
              </p>
              <h2 className="font-underdog text-[clamp(2rem,4vw,3.5rem)]">
                Услуги студии
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#d8d8d8]">
              {SERVICES.map((s, i) => (
                <div
                  key={i}
                  className={`bg-[#f0efed] p-8 hover:bg-[#0a0a0a] hover:text-[#f8f7f5] transition-colors group ${servicesSection.inView ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${0.1 * i + 0.2}s` }}
                >
                  <div className="mb-6">
                    <Icon name={s.icon} size={24} className="text-[#888] group-hover:text-[#888]" />
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold mb-3 leading-tight">{s.title}</h3>
                  <p className="font-montserrat text-xs font-light leading-relaxed text-[#666] group-hover:text-[#aaa]">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-[#f8f7f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={portfolioSection.ref}>
            {/* Header */}
            <div className={`mb-12 ${portfolioSection.inView ? "animate-fade-up" : "opacity-0"}`}>
              <p className="font-montserrat text-xs tracking-[0.25em] uppercase text-[#999] mb-4">
                Наши работы
              </p>
              <h2 className="font-underdog text-[clamp(2rem,4vw,3.5rem)] mb-10">
                Портфолио
              </h2>

              {/* Service filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {SERVICE_FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveService(f.key)}
                    className={`filter-btn ${activeService === f.key ? "active" : ""}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Clothing filter */}
              <div className="flex flex-wrap gap-2">
                {CLOTHING_FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveClothing(f.key)}
                    className={`filter-btn ${activeClothing === f.key ? "active" : ""}`}
                    style={{ fontSize: "0.65rem" }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 text-[#bbb]">
                <p className="font-cormorant text-2xl italic">Нет работ по выбранным фильтрам</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e0e0e0]">
                {filtered.map((item, i) => (
                  <div
                    key={item.id}
                    className={`portfolio-card bg-[#f8f7f5] aspect-square ${portfolioSection.inView ? "animate-fade-up" : "opacity-0"}`}
                    style={{ animationDelay: `${0.08 * i + 0.2}s` }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="overlay">
                      <div className="overlay-text w-full">
                        <p className="font-montserrat text-xs tracking-widest uppercase text-white/70 mb-1">
                          {item.tag}
                        </p>
                        <p className="font-cormorant text-xl font-semibold text-white">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Count */}
            <div className="mt-8 flex justify-between items-center">
              <p className="font-montserrat text-xs text-[#aaa] tracking-wider">
                Показано: {filtered.length} из {PORTFOLIO_ITEMS.length}
              </p>
              <button
                onClick={() => scrollTo("contact")}
                className="font-montserrat text-xs tracking-widest uppercase px-6 py-3 border border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#f8f7f5] transition-colors"
              >
                Заказать работу →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[#0a0a0a] text-[#f8f7f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={aboutSection.ref} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className={`font-montserrat text-xs tracking-[0.25em] uppercase text-[#666] mb-6 ${aboutSection.inView ? "animate-fade-up" : "opacity-0"}`}
              >
                О студии
              </p>
              <h2
                className={`font-underdog text-[clamp(2rem,4vw,3.5rem)] mb-8 leading-tight ${aboutSection.inView ? "animate-fade-up animate-delay-100" : "opacity-0"}`}
              >
                Мы — студия,
                <br />
                где вещи оживают
              </h2>
              <p
                className={`font-montserrat text-sm font-light text-[#aaa] leading-relaxed mb-6 ${aboutSection.inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}
              >
                ПК — это не просто ателье. Это место, где скучные вещи становятся заявлением. 
                Мы верим, что одежда — это язык. И помогаем вам говорить на нём громче.
              </p>
              <p
                className={`font-montserrat text-sm font-light text-[#aaa] leading-relaxed mb-10 ${aboutSection.inView ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
              >
                Каждый заказ — это диалог между вашей идеей и нашим мастерством. 
                Приносите старые вещи, смелые идеи или просто доверьтесь нам.
              </p>
              <div
                className={`grid grid-cols-3 gap-6 pt-8 border-t border-[#222] ${aboutSection.inView ? "animate-fade-up animate-delay-400" : "opacity-0"}`}
              >
                {[
                  { num: "200+", label: "Работ выполнено" },
                  { num: "3+", label: "Года опыта" },
                  { num: "100%", label: "Ручная работа" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-underdog text-3xl mb-1">{stat.num}</p>
                    <p className="font-montserrat text-xs text-[#555] tracking-wider uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`relative ${aboutSection.inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/0fb12e59-0dff-405c-8ac5-f8192425a324/files/cf7366f7-51a1-4a3b-a95b-7163b2b05123.jpg"
                  alt="Процесс работы"
                  className="w-full h-full object-cover grayscale opacity-70"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#f8f7f5] text-[#0a0a0a] p-6 w-48">
                <p className="font-underdog text-4xl">ПК</p>
                <p className="font-montserrat text-xs tracking-widest uppercase text-[#888] mt-1">
                  Полный Креатив
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-[#f0efed]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="font-montserrat text-xs tracking-[0.25em] uppercase text-[#999] mb-4">
            Процесс
          </p>
          <h2 className="font-underdog text-[clamp(2rem,4vw,3.5rem)] mb-16">
            Как это работает
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { n: "01", title: "Заявка", desc: "Оставьте заявку или напишите нам. Расскажите о вашей идее." },
              { n: "02", title: "Обсуждение", desc: "Обговариваем детали, разрабатываем эскиз и стоимость." },
              { n: "03", title: "Создание", desc: "Мастера берутся за работу. Полная ручная работа." },
              { n: "04", title: "Готово!", desc: "Забираете уникальную вещь. Или доставляем." },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="font-underdog text-[5rem] leading-none text-[#e0e0e0] mb-2">
                  {step.n}
                </div>
                <h3 className="font-underdog text-xl mb-3">{step.title}</h3>
                <p className="font-montserrat text-xs font-light text-[#666] leading-relaxed">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 right-0 translate-x-1/2">
                    <Icon name="ArrowRight" size={16} className="text-[#ccc]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-[#f8f7f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={contactSection.ref} className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p
                className={`font-montserrat text-xs tracking-[0.25em] uppercase text-[#999] mb-6 ${contactSection.inView ? "animate-fade-up" : "opacity-0"}`}
              >
                Контакты
              </p>
              <h2
                className={`font-underdog text-[clamp(2rem,4vw,3.5rem)] mb-8 leading-tight ${contactSection.inView ? "animate-fade-up animate-delay-100" : "opacity-0"}`}
              >
                Готовы создать
                <br />
                что-то особенное?
              </h2>
              <p
                className={`font-montserrat text-sm font-light text-[#666] mb-10 leading-relaxed ${contactSection.inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}
              >
                Напишите нам о своей идее — мы ответим в течение дня
                и предложим варианты реализации.
              </p>

              <div
                className={`flex flex-col gap-6 ${contactSection.inView ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
              >
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                  { icon: "Mail", label: "Email", value: "hello@pkstudio.ru" },
                  { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Примерная, 1" },
                  { icon: "Clock", label: "Часы работы", value: "Пн–Сб: 10:00 – 20:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="mt-0.5">
                      <Icon name={c.icon} size={16} className="text-[#aaa]" />
                    </div>
                    <div>
                      <p className="font-montserrat text-xs tracking-widest uppercase text-[#aaa] mb-0.5">
                        {c.label}
                      </p>
                      <p className="font-montserrat text-sm">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div
              className={`${contactSection.inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}
            >
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-montserrat text-xs tracking-widest uppercase text-[#999] block mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full border border-[#e0e0e0] bg-transparent px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors placeholder:text-[#ccc]"
                  />
                </div>
                <div>
                  <label className="font-montserrat text-xs tracking-widest uppercase text-[#999] block mb-2">
                    Телефон или Email
                  </label>
                  <input
                    type="text"
                    placeholder="+7 или email@mail.ru"
                    className="w-full border border-[#e0e0e0] bg-transparent px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors placeholder:text-[#ccc]"
                  />
                </div>
                <div>
                  <label className="font-montserrat text-xs tracking-widest uppercase text-[#999] block mb-2">
                    Услуга
                  </label>
                  <select className="w-full border border-[#e0e0e0] bg-[#f8f7f5] px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors text-[#0a0a0a]">
                    <option value="">Выберите услугу</option>
                    <option>Художественная роспись</option>
                    <option>Перешив и апгрейд</option>
                    <option>Нашивки и вышивка</option>
                    <option>Переработка старых вещей</option>
                    <option>Не определился — хочу обсудить</option>
                  </select>
                </div>
                <div>
                  <label className="font-montserrat text-xs tracking-widest uppercase text-[#999] block mb-2">
                    Опишите идею
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Расскажите о вашей идее, вещи, пожеланиях..."
                    className="w-full border border-[#e0e0e0] bg-transparent px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors resize-none placeholder:text-[#ccc]"
                  />
                </div>
                <button
                  type="submit"
                  className="font-montserrat text-xs tracking-widest uppercase px-8 py-4 bg-[#0a0a0a] text-[#f8f7f5] hover:bg-[#333] transition-colors mt-2"
                >
                  Отправить заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#0a0a0a] text-[#f8f7f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-underdog text-3xl mb-1">ПК</p>
              <p className="font-montserrat text-xs text-[#555] tracking-widest uppercase">
                Полный Креатив — Студия кастомизации
              </p>
            </div>

            <div className="flex gap-8">
              {[
                { label: "Услуги", id: "services" },
                { label: "Портфолио", id: "portfolio" },
                { label: "О нас", id: "about" },
                { label: "Контакты", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="font-montserrat text-xs tracking-widest uppercase text-[#555] hover:text-[#f8f7f5] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <p className="font-montserrat text-xs text-[#444]">
              © 2026 ПК Студия
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}