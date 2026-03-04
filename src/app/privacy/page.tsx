import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности АРКА. Узнайте, как мы обрабатываем и защищаем ваши персональные данные в соответствии с 152-ФЗ.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "Политика конфиденциальности", href: "/privacy" },
        ]}
      />
      <Header />
      <main id="main-content" className="min-h-screen">
        <PageHeader
          title="Политика конфиденциальности"
          description="Защита персональных данных в соответствии с Федеральным законом No 152-ФЗ"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            {/* 1. Общие положения */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                1. Общие положения
              </h2>
              <p className="mb-4">
                Настоящая Политика конфиденциальности описывает принципы
                обработки и защиты персональных данных пользователей сайта АРКА
                (далее — Сайт).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Политика разработана в соответствии с Федеральным законом от 27.07.2006
                No 152-ФЗ «О персональных данных» и иными нормативными правовыми актами
                Российской Федерации в области персональных данных.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Используя сайт и предоставляя свои персональные данные, вы подтверждаете
                согласие с условиями настоящей Политики.
              </p>
            </section>

            {/* 2. Какие данные мы собираем */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                2. Какие данные мы собираем
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Мы собираем персональные данные, которые вы добровольно предоставляете
                при заполнении форм на сайте:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Имя (обязательно)</li>
                <li>Номер телефона (обязательно)</li>
                <li>Адрес электронной почты (по желанию)</li>
                <li>Интересующая услуга (по желанию)</li>
                <li>Бюджет проекта (по желанию)</li>
                <li>Текст сообщения с описанием проекта (по желанию)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Также автоматически собираются технические данные: IP-адрес, тип и версия
                браузера, страница обращения. Эти данные используются исключительно для
                обеспечения безопасности и предотвращения злоупотреблений.
              </p>
            </section>

            {/* 3. Цели обработки данных */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                3. Цели обработки персональных данных
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Мы обрабатываем ваши персональные данные для следующих целей:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Обработка заявок — связаться с вами для обсуждения проекта дизайна интерьера
                </li>
                <li>
                  Предоставление консультаций — проведение бесплатной первичной консультации
                </li>
                <li>
                  Подготовка коммерческих предложений — расчёт стоимости услуг на основе
                  предоставленной информации
                </li>
                <li>
                  Улучшение качества обслуживания — анализ обращений для повышения уровня
                  сервиса
                </li>
                <li>
                  Защита от злоупотреблений — предотвращение спама и автоматизированных
                  отправок
                </li>
              </ul>
            </section>

            {/* 4. Использование сторонних сервисов */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                4. Использование сторонних сервисов
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Для оперативной обработки заявок мы используем Telegram-уведомления.
                При отправке формы на сайте данные из заявки (имя, телефон, email, описание
                проекта) передаются в защищённый Telegram-чат нашей команды через
                Telegram Bot API.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Сайт размещён на платформе Vercel Inc. (Сан-Франциско, США), которая
                обеспечивает хостинг и обработку серверных запросов.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Мы не передаём ваши персональные данные третьим лицам для маркетинговых
                или рекламных целей. Данные могут быть переданы третьим лицам только
                в случаях, предусмотренных законодательством Российской Федерации.
              </p>
            </section>

            {/* 5. Хранение данных */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                5. Хранение и защита данных
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Персональные данные хранятся в течение срока, необходимого для достижения
                целей их обработки, но не более 3 (трёх) лет с момента последнего
                взаимодействия с вами, если иное не предусмотрено законодательством.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Мы принимаем необходимые организационные и технические меры для защиты
                персональных данных от несанкционированного доступа, уничтожения, изменения,
                блокирования, копирования, распространения, а также от иных неправомерных
                действий третьих лиц. В том числе: шифрование каналов передачи данных (HTTPS/TLS),
                ограничение доступа к данным, защита от спама и автоматизированных атак.
              </p>
            </section>

            {/* 6. Права пользователя */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                6. Ваши права
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                В соответствии с Федеральным законом No 152-ФЗ вы имеете право:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Получить информацию</strong> — запросить
                  сведения о том, какие ваши данные обрабатываются и с какой целью
                </li>
                <li>
                  <strong className="text-foreground">Изменить данные</strong> — потребовать
                  уточнения, блокирования или уничтожения персональных данных, если они
                  являются неполными, устаревшими, неточными
                </li>
                <li>
                  <strong className="text-foreground">Удалить данные</strong> — потребовать
                  полного удаления ваших персональных данных из наших систем
                </li>
                <li>
                  <strong className="text-foreground">Отозвать согласие</strong> — в любой
                  момент отозвать своё согласие на обработку персональных данных
                </li>
                <li>
                  <strong className="text-foreground">Обратиться в надзорный орган</strong> —
                  подать жалобу в Роскомнадзор (Федеральная служба по надзору в сфере связи,
                  информационных технологий и массовых коммуникаций)
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Для реализации указанных прав направьте запрос на электронную почту,
                указанную в разделе «Контактная информация». Мы обработаем ваш запрос
                в течение 30 дней с момента получения.
              </p>
            </section>

            {/* 7. Файлы cookie */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                7. Файлы cookie
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Сайт может использовать файлы cookie для обеспечения корректной работы
                (например, сохранение выбранной темы оформления). Мы не используем
                рекламные или отслеживающие cookie.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Вы можете управлять настройками cookie в вашем браузере, в том числе
                отключить их. Однако это может повлиять на функциональность сайта.
              </p>
            </section>

            {/* 8. Изменения в Политике */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                8. Изменения в Политике
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Оператор вправе вносить изменения в настоящую Политику. Новая редакция
                Политики вступает в силу с момента её размещения на сайте, если иное
                не предусмотрено новой редакцией. Рекомендуем периодически проверять
                эту страницу на наличие обновлений.
              </p>
            </section>

            {/* 9. Контактная информация */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                9. Контактная информация
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Если у вас есть вопросы относительно настоящей Политики конфиденциальности
                или обработки ваших персональных данных, свяжитесь с нами:
              </p>
              <ul className="list-none space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Команда:</strong> АРКА
                </p>
                <li>
                  <strong className="text-foreground">Город:</strong> Москва, Россия
                </li>
                <li>
                  <strong className="text-foreground">Телефон:</strong>{" "}
                  <a
                    href="tel:+7XXXXXXXXXX"
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    +7 (XXX) XXX-XX-XX
                  </a>
                </li>
                <li>
                  <strong className="text-foreground">Страница контактов:</strong>{" "}
                  <a
                    href="/contact"
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    /contact
                  </a>
                </li>
              </ul>
            </section>

            {/* Дата */}
            <section className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Дата последнего обновления: 7 февраля 2026 г.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
