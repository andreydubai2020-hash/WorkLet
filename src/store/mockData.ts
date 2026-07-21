import type {
  Benefit,
  CandidateCase,
  CaseItem,
  CompanyTask,
  Invite,
  SphereFilterKey,
  SphereKey,
  SphereMeta,
  Stat,
  Step,
  Submission,
  SubmitConfig,
  Task,
} from "../types";

export const casesData: CaseItem[] = [
  {
    title: "Парсер прайс-листов для Aitu Digital",
    score: 87,
    description:
      "Задача: собрать актуальные цены с трёх сайтов-поставщиков и выгрузить их в единую Google Таблицу с автообновлением раз в сутки. Решение: скрипт на Python с requests и BeautifulSoup, запись через Google Sheets API, обработка ошибок сети. Результат: компания сократила ручной сбор цен с 3 часов в неделю до нуля, оценка 87/100.",
  },
  {
    title: "Дашборд метрик для Kolesa Group",
    score: 91,
    description:
      "Задача: собрать дашборд на основе готового API с графиками SLA доставки. Решение: React + Recharts, кэширование запросов, фильтры по регионам. Результат: команда логистики получила наглядную сводку по срокам доставки, оценка 91/100.",
  },
  {
    title: "Автотесты для Kaspi Extra",
    score: 78,
    description:
      "Задача: покрыть сценарии входа и регистрации автотестами. Решение: набор тестов на Playwright с моками API. Результат: найдено 2 бага в edge-кейсах авторизации, оценка 78/100.",
  },
];

export const levelOptions = ["Легко", "Средне", "Сложно"];
export const hoursOptions = ["До 6 ч", "До 8 ч", "До 12 ч"];

interface SphereDef {
  key: SphereFilterKey;
  label: string;
  hue: number | null;
}

export const sphereDefs: SphereDef[] = [
  { key: "all", label: "Все", hue: null },
  { key: "it", label: "IT", hue: 250 },
  { key: "smm", label: "SMM", hue: 340 },
  { key: "design", label: "Дизайн", hue: 300 },
  { key: "marketing", label: "Маркетинг", hue: 45 },
  { key: "analytics", label: "Аналитика", hue: 165 },
  { key: "copywriting", label: "Копирайтинг", hue: 95 },
  { key: "video", label: "Видео", hue: 15 },
];

export const sphereMeta: Record<SphereFilterKey, SphereMeta> = sphereDefs.reduce(
  (acc, sd) => {
    acc[sd.key] =
      sd.hue === null
        ? { label: sd.label, bg: "#F5F5F7", color: "#1D1D1F", dot: "#86868B" }
        : {
            label: sd.label,
            bg: `oklch(95% 0.025 ${sd.hue})`,
            color: `oklch(42% 0.15 ${sd.hue})`,
            dot: `oklch(58% 0.16 ${sd.hue})`,
          };
    return acc;
  },
  {} as Record<SphereFilterKey, SphereMeta>,
);

export const allTasks: Task[] = [
  {
    id: 1,
    sphere: "it",
    company: "CloudPro",
    title: "Сверстать 3 экрана по Figma",
    stack: "Figma",
    level: "Средне",
    hoursBucket: "До 8 ч",
    hours: "6–8 ч",
    intern: true,
    postedDaysAgo: 4,
    skills: ["Figma", "HTML/CSS"],
    desc: "Собрать 3 адаптивных экрана из готового макета в Figma в вёрстку с точным соблюдением сетки.",
    taken: 2,
    total: 5,
    fullDesc:
      "Нужно сверстать 3 экрана мобильного приложения по готовому макету в Figma: адаптивная сетка, точные отступы и типографика, состояния наведения для кнопок.",
    criteria: [
      "Вёрстка совпадает с макетом на всех брейкпоинтах",
      "Нет горизонтального скролла на мобильных экранах",
      "Использованы семантические HTML-теги",
    ],
  },
  {
    id: 2,
    sphere: "smm",
    company: "Sunny Coffee",
    title: "Снять и смонтировать 3 Reels для кофейни",
    stack: "Reels",
    level: "Легко",
    hoursBucket: "До 6 ч",
    hours: "4–6 ч",
    intern: false,
    postedDaysAgo: 1,
    skills: ["Reels", "Монтаж"],
    desc: "Отснять и смонтировать 3 коротких Reels для инстаграма локальной кофейни в живом стиле.",
    taken: 1,
    total: 3,
    fullDesc:
      "Нужно снять и смонтировать 3 вертикальных ролика (15–30 сек) о жизни кофейни: приготовление напитка, атмосфера зала, отзыв гостя. Стиль — живой, без сложной графики.",
    criteria: [
      "Ролики в формате 9:16, без чёрных полос",
      "Есть подписи/субтитры на казахском или русском",
      "Использована актуальная музыка без нарушения авторских прав",
    ],
  },
  {
    id: 3,
    sphere: "design",
    company: "Chocofamily",
    title: "Сделать карусель из 8 слайдов для Instagram",
    stack: "Figma",
    level: "Легко",
    hoursBucket: "До 6 ч",
    hours: "3–5 ч",
    intern: true,
    postedDaysAgo: 2,
    skills: ["Figma", "Canva"],
    desc: "Разработать карусель из 8 слайдов для продвижения акции бренда в Instagram.",
    taken: 3,
    total: 4,
    fullDesc:
      "Собрать карусель из 8 слайдов по брендбуку компании: обложка, 6 информационных слайдов, финальный слайд с призывом к действию.",
    criteria: [
      "Соблюдены цвета и шрифты брендбука",
      "Все слайды в едином формате 1080×1350",
      "Текст читается на превью в ленте",
    ],
  },
  {
    id: 4,
    sphere: "marketing",
    company: "Kaspi Extra",
    title: "Настроить таргет на 50 000 ₸ бюджета",
    stack: "Google Ads",
    level: "Средне",
    hoursBucket: "До 8 ч",
    hours: "5–7 ч",
    intern: false,
    postedDaysAgo: 5,
    skills: ["Google Ads", "Таргет"],
    desc: "Настроить и запустить таргетированную рекламную кампанию с бюджетом 50 000 ₸.",
    taken: 0,
    total: 3,
    fullDesc:
      "Настроить рекламный кабинет, определить аудитории, запустить кампанию с бюджетом 50 000 ₸ и отслеживать первые результаты в течение недели.",
    criteria: [
      "Кампания настроена и запущена без ошибок модерации",
      "Указаны минимум 2 аудитории для тестирования",
      "Есть отчёт с CTR и стоимостью клика",
    ],
  },
  {
    id: 5,
    sphere: "analytics",
    company: "Kolesa Group",
    title: "Собрать дашборд продаж в Google Sheets",
    stack: "Google Sheets",
    level: "Средне",
    hoursBucket: "До 8 ч",
    hours: "6–8 ч",
    intern: true,
    postedDaysAgo: 0,
    skills: ["Google Sheets", "Аналитика"],
    desc: "Собрать наглядный дашборд по продажам на основе выгрузки из CRM в Google Sheets.",
    taken: 4,
    total: 5,
    fullDesc:
      "На основе предоставленной выгрузки из CRM собрать дашборд с ключевыми метриками продаж: динамика по месяцам, топ-5 менеджеров, конверсия по воронке.",
    criteria: [
      "Дашборд обновляется по формулам без ручного пересчёта",
      "Есть минимум 3 наглядных графика",
      "Понятная навигация между листами",
    ],
  },
];

export const stackOptions = [...new Set(allTasks.flatMap((t) => t.skills))];

export const mySkills = ["Python", "Figma"];

export const templatesBySphere: Record<SphereKey, string[]> = {
  it: ["Перенос лендинга на новый стек", "Написать автотесты для API", "Собрать дашборд метрик"],
  smm: [
    "Снять 3 Reels для соцсетей",
    "Расписание постов на месяц",
    "Модерация комментариев за неделю",
  ],
  design: [
    "Карусель из 8 слайдов",
    "Баннеры для рекламной кампании",
    "Иконки для мобильного приложения",
  ],
  marketing: ["Настройка таргета на бюджет", "Анализ конкурентов", "A/B тест лендинга"],
  analytics: [
    "Дашборд продаж в Sheets",
    "Когортный анализ пользователей",
    "Отчёт по воронке продаж",
  ],
  copywriting: ["Тексты для 5 карточек товара", "Email-рассылка на неделю", "SEO-статья 1500 знаков"],
  video: [
    "Смонтировать промо-ролик",
    "Субтитры для видео на YouTube",
    "Тизер для запуска продукта",
  ],
};

export const ageOptions = ["до 18", "18–21", "22–25", "25+"];
export const cityOptions = ["Алматы", "Астана", "Шымкент", "Караганда", "Другой город"];
export const interestOptions = [
  "IT",
  "SMM",
  "Дизайн",
  "Маркетинг",
  "Аналитика",
  "Копирайтинг",
  "Видео",
];

export const submitBySphere: Record<SphereKey, SubmitConfig> = {
  it: { label: "Ссылка на репозиторий", placeholder: "github.com/username/repo", upload: false },
  smm: {
    label: "Ссылка на файлы (Drive/Instagram)",
    placeholder: "drive.google.com/…",
    upload: true,
  },
  design: { label: "Ссылка (Behance/Drive)", placeholder: "behance.net/gallery/…", upload: true },
  video: {
    label: "Ссылка на видео (Drive/Instagram)",
    placeholder: "drive.google.com/…",
    upload: true,
  },
  marketing: {
    label: "Ссылка на отчёт/скриншоты кабинета",
    placeholder: "drive.google.com/…",
    upload: true,
  },
  analytics: {
    label: "Ссылка на таблицу",
    placeholder: "docs.google.com/spreadsheets/…",
    upload: false,
  },
  copywriting: {
    label: "Ссылка на документ",
    placeholder: "docs.google.com/document/…",
    upload: true,
  },
};

export const codeSnippet = `def fetch_prices(urls):
    results = []
    for url in urls:
        try:
            resp = requests.get(url, timeout=10)
            resp.raise_for_status()
            soup = BeautifulSoup(resp.text, "html.parser")
            items = parse_items(soup)
            results.extend(items)
        except requests.RequestException as e:
            print(f"skip {url}: {e}")
    return results

def parse_items(soup):
    rows = []
    for card in soup.select(".product-card"):
        rows.append({
            "name": card.select_one(".title").text.strip(),
            "price": parse_price(card.select_one(".price").text),
        })
    return rows`;

export const steps: Step[] = [
  {
    num: "01",
    title: "Возьми задачу",
    desc: "Выбери реальную бэклог-задачу от компании, подходящую под твой стек и уровень.",
  },
  {
    num: "02",
    title: "Сдай решение",
    desc: "Загрузи код и деплой, получи мгновенное AI-ревью с оценкой и рекомендациями.",
  },
  {
    num: "03",
    title: "Получи кейс",
    desc: "После проверки компанией задача становится верифицированной записью в профиле.",
  },
];

export const companyBenefits: Benefit[] = [
  {
    title: "Бесплатное решение задачи",
    desc: "Реальный бэклог закрывается силами студентов без затрат на подрядчиков.",
  },
  {
    title: "Кандидат виден в деле",
    desc: "Вы видите код, подход к решению и качество работы до любого собеседования.",
  },
  {
    title: "Найм без скрининга",
    desc: "AI уже оценил решение — остаётся выбрать лучших и пригласить на стажировку.",
  },
];

export const stats: Stat[] = [
  { value: "1 240", numeric: 1240, label: "задач выполнено" },
  { value: "890", numeric: 890, label: "кейсов создано" },
  { value: "310", numeric: 310, label: "приглашений" },
];

export const profileStats: Stat[] = [
  { value: "7", numeric: 7, label: "задач сдано" },
  { value: "85", numeric: 85, label: "ср. оценка" },
  { value: "5", numeric: 5, label: "компаний" },
  { value: "2", numeric: 2, label: "приглашений" },
];

export const stackPills = ["Python", "Django", "PostgreSQL"];

export const strengths = [
  "Чистая структура функций и понятные названия переменных",
  "Есть обработка исключений при запросе к сайтам",
  "Код покрыт базовыми тестами",
];

export const improvements = [
  "Не хватает логирования ошибок парсинга",
  "Магические числа стоит вынести в константы",
];

export const recommendations = [
  "Добавь retry с backoff для нестабильных сайтов",
  "Раздели парсинг и запись в таблицу на отдельные модули",
];

export const companyEvaluation = {
  initial: "A",
  name: "Aitu Digital",
  score: 92,
  quote:
    "«Решение сдано с опережением дедлайна, код чистый и легко читается. Готовы пригласить на стажировку.»",
};

export const draftTaskText = "нужен парсер прайсов с трёх сайтов в гугл-таблицу";
export const draftTitle = "Парсер прайс-листов трёх поставщиков";
export const draftGoal =
  "Собрать актуальные цены с трёх сайтов-поставщиков и выгрузить их в единую Google Таблицу с автообновлением раз в сутки.";
export const draftCriteria = [
  "Скрипт запускается по расписанию без ручного вмешательства",
  "Цены и названия товаров совпадают с сайтами-источниками",
  "Ошибки сети не останавливают весь процесс",
];
export const draftBadges = ["Python", "6–8 ч", "Junior-friendly"];
export const createDeadline = "15 августа";

export const initialCompanyTasks: CompanyTask[] = [
  {
    id: 1,
    title: "Парсер прайс-листов трёх поставщиков",
    status: "has_submissions",
    taken: 3,
    total: 5,
    deadlineText: "до 25 июля",
  },
  {
    id: 2,
    title: "Дашборд метрик доставки",
    status: "published",
    taken: 1,
    total: 4,
    deadlineText: "до 2 августа",
  },
  {
    id: 3,
    title: "Автотесты для API авторизации",
    status: "completed",
    taken: 6,
    total: 6,
    deadlineText: "завершена",
  },
];

export const initialSubmissionsByTask: Record<number, Submission[]> = {
  1: [
    {
      name: "Азамат Ниязов",
      score: 87,
      summary: "Чистая структура, есть обработка ошибок, не хватает логирования.",
      recommended: true,
      status: "pending",
      criteria: [true, true, false],
    },
    {
      name: "Динара Смагулова",
      score: 81,
      summary: "Хорошее покрытие тестами, но медленный парсинг больших страниц.",
      recommended: true,
      status: "pending",
      criteria: [true, false, true],
    },
    {
      name: "Ержан Беков",
      score: 64,
      summary: "Рабочее решение, но много дублирования кода и нет тестов.",
      recommended: false,
      status: "pending",
      criteria: [true, false, false],
    },
  ],
  2: [],
  3: [
    {
      name: "Инкар Жумабекова",
      score: 92,
      summary: "Отличное покрытие тестами, найдены реальные баги в авторизации.",
      recommended: true,
      status: "accepted",
      criteria: [true, true, true],
    },
  ],
};

export const initialFavCandidates = ["Инкар Жумабекова"];

export const initialInvitesList: Invite[] = [
  { name: "Инкар Жумабекова", taskTitle: "Автотесты для API авторизации", status: "accepted" },
  { name: "Ержан Беков", taskTitle: "Парсер прайс-листов трёх поставщиков", status: "sent" },
];

export const candidateStats = { total: 7, avg: 85, trend: "+6" };

export const candidateCases: CandidateCase[] = [
  { title: "Парсер прайс-листов для Aitu Digital", company: "Aitu Digital", score: 87 },
  { title: "Дашборд метрик для Kolesa Group", company: "Kolesa Group", score: 91 },
  { title: "Автотесты для Kaspi Extra", company: "Kaspi Extra", score: 78 },
];
