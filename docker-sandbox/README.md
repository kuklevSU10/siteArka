# Docker Sandbox — Изолированный OpenClaw бот для студии

Отдельная среда разработки для второго пользователя.
Бот работает **только** с проектом `/workspace` (папка сайта).

## Изоляция

- ✅ Видит только `E:\test2\` (смонтирован как `/workspace`)
- ✅ Не видит `E:\RevitExpert` и другие папки хоста
- ✅ Не видит контейнеры pgvector, n8n (отдельная сеть)
- ✅ Инструменты ограничены workspace-only режимом
- ✅ Только свой Telegram бот (отдельный токен)

## Первый запуск

```powershell
cd E:\test2\docker-sandbox

# 1. Скопировать и заполнить секреты (уже заполнен)
cp .env.example .env

# 2. Собрать образ
docker compose build

# 3. Запустить
docker compose up -d

# 4. Проверить логи
docker compose logs -f
```

## Управление

```powershell
# Статус
docker compose ps

# Логи
docker compose logs -f studio-bot

# Остановить
docker compose down

# Перезапустить
docker compose restart studio-bot
```

## Проверка изоляции

```powershell
# Бот не видит хост-файлы
docker exec openclaw-studio-bot ls /

# Только /workspace и системные папки
docker exec openclaw-studio-bot ls /workspace
```

## Что может делать другой пользователь

- Разрабатывать сайт через своего Telegram бота
- Читать/писать файлы в `/workspace` (E:\test2)
- Делать git push (если настроен)
- НЕ может: выйти за пределы workspace, видеть RevitExpert, использовать твои API ключи (у него свои через .env)
