


# Worklet

## Overview

_TODO: describe what Worklet does._

## Getting Started

_TODO: add setup instructions._



Worklet — платформа, где казахстанские ИТ-компании публикуют маленькие реальные задачи из своего бэклога, студенты их выполняют, и каждая принятая задача становится верифицированной строчкой опыта в профиле студента. Для компании задача = собеседование.

Не джоб-борд. Не курсы. Не фриланс-биржа. Опыт как продукт.

Единица ценности: worklet — маленькая единица реальной работы, подтверждённая работодателем.

Стек


Frontend: React + Vite + Tailwind CSS + framer-motion
Backend: Supabase (Auth, Postgres, Storage, Edge Functions)
AI: Claude API (claude-sonnet-4-6) через Supabase Edge Functions (ключ никогда не на клиенте)
Язык интерфейса: русский
Дизайн: тёмные нейтральные тона, один яркий акцент, Manrope/Inter, современный tech-стиль. Мобильный-first.
Схема БД (Supabase)

sql-- profiles (расширение auth.users)
profiles (
  id uuid pk references auth.users,
  role text check (role in ('student','company')),
  full_name text,
  avatar_url text,
  -- студент:
  level text,              -- junior / middle-track, определяется AI-онбордингом
  stack text[],            -- ['Python','React',...]
  bio text,
  public_slug text unique, -- для публичной ссылки на паспорт опыта
  -- компания:
  company_name text,
  company_site text,
  created_at timestamptz default now()
)

tasks (
  id uuid pk,
  company_id uuid references profiles,
  title text,
  description text,        -- ТЗ, оформленное AI
  raw_input text,          -- что компания написала изначально
  acceptance_criteria jsonb, -- список критериев приёмки
  stack text[],
  difficulty text check (difficulty in ('easy','medium','hard')),
  est_hours int,
  hiring boolean default false, -- «компания рассматривает стажёров»
  status text default 'open' check (status in ('open','in_review','closed')),
  max_submissions int default 5,
  created_at timestamptz
)

submissions (
  id uuid pk,
  task_id uuid references tasks,
  student_id uuid references profiles,
  repo_url text,
  demo_url text,
  comment text,
  ai_score int,            -- 0–100
  ai_review jsonb,         -- структурированное ревью
  ai_rank int,             -- позиция среди сдач этой задачи
  company_score int,       -- оценка компании 0–100
  company_feedback text,
  status text default 'submitted'
    check (status in ('submitted','ai_reviewed','accepted','rejected','invited')),
  created_at timestamptz
)

cases (                    -- верифицированные кейсы в профиле
  id uuid pk,
  submission_id uuid references submissions,
  student_id uuid references profiles,
  title text,              -- AI-сгенерированное описание кейса
  summary text,
  company_name text,
  score int,
  verified boolean default true,
  created_at timestamptz
)

invitations (
  id uuid pk,
  company_id uuid,
  student_id uuid,
  task_id uuid,
  message text,
  status text default 'sent',
  created_at timestamptz
)

RLS: студент видит все open-задачи, свои сдачи и свои кейсы. Компания видит свои задачи и все сдачи по ним. Публичные профили (public_slug) читаются без auth.

AI-функции (3 Edge Functions на Claude API)

1. format-task — оформление ТЗ

Вход: сырой текст компании («перенести лендинг на новый домен»).
Выход (JSON): title, structured description, acceptance_criteria[], stack[], difficulty, est_hours.
Промпт: «Ты техлид. Преврати черновик задачи в чёткое ТЗ для джуна с 3–6 проверяемыми критериями приёмки. Отвечай только JSON».

2. review-submission — AI код-ревью (вау-момент демо)

Вход: repo_url / вставленный код + ТЗ + критерии приёмки.
Выход (JSON): score (0–100), verdict, strengths[], issues[] (с указанием файлов/мест), criteria_check[] (каждый критерий: passed/failed + комментарий), advice.
После всех сдач по задаче — простое ранжирование по score.

3. generate-case — генерация кейса в профиль

Триггер: компания приняла сдачу (status ? accepted).
Вход: ТЗ + ревью + оценка компании.
Выход: title («Написал парсер прайс-листов для X»), summary в 2–3 предложения, теги стека.
Кейс появляется в профиле как: «{title} — {company}, оценка {score}/100, ? подтверждено работодателем».

Экраны (MVP)


Лендинг — оффер «Опыт как продукт», два CTA: «Я студент» / «Я компания»
AI-онбординг студента — не тест, а мини-задача (один короткий сниппет исправить/дописать), Claude оценивает и присваивает level + stack
Лента задач — карточки с бейджами: сложность, стек, ~часы, ?? «рассматривают стажёров», сколько мест осталось (X/5)
Страница задачи — ТЗ, критерии приёмки, кнопка «Взять задачу», форма сдачи (repo_url, demo_url, комментарий)
Экран AI-ревью — сразу после сдачи: score, разбор по критериям, советы. Анимированное появление (framer-motion)
Профиль студента / Паспорт опыта — список верифицированных кейсов, суммарная статистика (задач, средний балл, компаний), кнопки «Скопировать публичную ссылку» и «Экспорт в PDF»
Кабинет компании — «Опубликовать задачу» (текстовое поле ? AI оформляет ТЗ ? предпросмотр ? publish), список задач, по каждой — сдачи, отранжированные AI (топ-2 подсвечены)
Страница сдачи для компании — AI-ревью, код, три кнопки: «Принять» (? кейс у студента), «Пригласить на стажировку» (одной кнопкой), «Отклонить с фидбеком»


Сквозной демо-флоу (для жюри, один сценарий)


Компания вставляет черновик задачи ? AI за секунды делает ТЗ с критериями ? publish
Студент видит задачу в ленте ? берёт ? сдаёт ссылку на репо
Живьём на экране: AI-ревью появляется с оценкой 87/100 и разбором по критериям
Компания открывает сдачу ? жмёт «Принять»
В профиле студента мгновенно появляется верифицированный кейс
Компания жмёт «Пригласить на стажировку» ? студенту падает приглашение


Ничего лишнего вне этого сценария не строим.

Сид-данные


5–6 задач от 3 фиктивных компаний (одна — Selector.AI: реальный бэклог, «первым работодателем платформы стал мой собственный стартап»)
2 демо-студента с готовыми кейсами в профиле
Примеры: «перенести лендинг», «парсер прайс-листов», «покрыть модуль тестами», «сверстать 3 экрана по Figma»


Метрики (показать на дашборде-заглушке)


Верифицированные кейсы за месяц — главная метрика, «произведённый опыт»
Конверсия задачи ? приглашение на стажировку


Монетизация (страница «Тарифы», статичная)


Студенты — бесплатно навсегда
Компании: 2 задачи/мес бесплатно ? подписка 15–30k ?/мес + success fee за найм
Позже: вузы платят за дашборд трудоустраиваемости


Приоритеты сборки (24–48 ч)


Supabase: схема + RLS + auth (email)
Edge Function review-submission — сердце демо
Экраны 3–5 (лента ? задача ? ревью)
Кабинет компании + format-task
Профиль + generate-case + публичная ссылка
Лендинг + сид-данные
Полировка: анимации, пустые состояния, мобильная вёрстка
