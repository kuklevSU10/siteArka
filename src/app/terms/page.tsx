import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  description:
    "Пользовательское соглашение АРКА. Условия использования сайта и предоставления услуг дизайна интерьера.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "Пользовательское соглашение", href: "/terms" },
        ]}
      />
      <Header />
      <main id="main-content" className="min-h-screen">
        <PageHeader
          title="Пользовательское соглашение"
          description="Условия использования сайта АРКА"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            {/* 1. Общие положения */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                1. Общие положения
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Настоящее Пользовательское соглашение (далее — Соглашение) регулирует
                отношения между АРКА (далее — Студия, Администрация сайта)
                и пользователем сайта (далее — Пользователь).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Использование сайта означает безоговорочное принятие Пользователем
                настоящего Соглашения и его условий.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Если вы не согласны с каким-либо пунктом Соглашения, просим вас
                прекратить использование сайта.
              </p>
            </section>

            {/* 2. Правила использования сайта */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                2. Правила использования сайта
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Пользователь обязуется:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Использовать сайт исключительно в законных целях и способами, не
                  нарушающими права третьих лиц
                </li>
                <li>
                  Предоставлять достоверную информацию при заполнении форм обратной связи
                </li>
                <li>
                  Не совершать действия, направленные на нарушение нормальной работы сайта
                </li>
                <li>
                  Не использовать автоматизированные средства для массовой отправки запросов
                  или сбора данных с сайта
                </li>
                <li>
                  Не размещать и не распространять через формы сайта незаконный,
                  оскорбительный, вредоносный контент
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Администрация сайта оставляет за собой право ограничить доступ
                Пользователя к сайту в случае нарушения настоящего Соглашения.
              </p>
            </section>

            {/* 3. Интеллектуальная собственность */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                3. Интеллектуальная собственность
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Все материалы, размещённые на сайте, включая, но не ограничиваясь:
                тексты, фотографии, изображения, дизайн-проекты, 3D-визуализации,
                графические элементы, логотипы, фирменный стиль, а также структура
                и оформление сайта — являются объектами интеллектуальной собственности
                Студии и/или её партнёров.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Запрещается без письменного согласия Студии:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Копировать, воспроизводить или распространять материалы сайта</li>
                <li>
                  Использовать материалы сайта в коммерческих целях без согласования
                </li>
                <li>
                  Изменять, модифицировать или создавать производные работы на основе
                  материалов сайта
                </li>
                <li>
                  Удалять или изменять уведомления об авторских правах и товарных знаках
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Допускается цитирование материалов сайта с обязательным указанием
                источника и активной гиперссылки на сайт.
              </p>
            </section>

            {/* 4. Услуги и информация */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                4. Услуги и информация на сайте
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Информация на сайте, включая описания услуг, стоимость, сроки и условия
                работы, носит информационный характер и не является публичной офертой
                в соответствии со статьёй 437 Гражданского кодекса Российской Федерации.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Точные условия оказания услуг, стоимость и сроки определяются
                в индивидуальном договоре между Студией и Заказчиком.
              </p>
            </section>

            {/* 5. Ограничение ответственности */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                5. Ограничение ответственности
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Администрация сайта не несёт ответственности за:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Временную недоступность сайта вследствие технических работ, сбоев
                  в работе провайдеров или иных обстоятельств непреодолимой силы
                </li>
                <li>
                  Любые убытки, прямые или косвенные, возникшие в связи с использованием
                  или невозможностью использования сайта
                </li>
                <li>
                  Содержание и доступность сторонних сайтов, ссылки на которые могут
                  присутствовать на нашем сайте
                </li>
                <li>
                  Любые действия Пользователя, совершённые на основании информации,
                  размещённой на сайте
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Сайт предоставляется «как есть» (as is). Администрация не гарантирует,
                что сайт будет функционировать непрерывно, быстро, надёжно и без ошибок.
              </p>
            </section>

            {/* 6. Ссылки на сторонние ресурсы */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                6. Ссылки на сторонние ресурсы
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Сайт может содержать ссылки на сторонние веб-ресурсы (Instagram,
                Pinterest, LinkedIn и другие). Администрация сайта не контролирует
                и не несёт ответственности за содержание, политику конфиденциальности
                и практики сторонних сайтов. Переход по внешним ссылкам осуществляется
                Пользователем на свой страх и риск.
              </p>
            </section>

            {/* 7. Изменение Соглашения */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                7. Изменение условий Соглашения
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Администрация сайта вправе в одностороннем порядке вносить изменения
                в настоящее Соглашение. Изменения вступают в силу с момента публикации
                обновлённой версии на данной странице. Продолжение использования сайта
                после внесения изменений означает принятие этих изменений Пользователем.
              </p>
            </section>

            {/* 8. Применимое право */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                8. Применимое право и разрешение споров
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Настоящее Соглашение регулируется и толкуется в соответствии
                с законодательством Российской Федерации.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Все споры и разногласия, возникающие из настоящего Соглашения
                или в связи с ним, стороны будут стремиться разрешить путём переговоров.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                В случае невозможности урегулирования споров путём переговоров они
                подлежат рассмотрению в суде по месту нахождения Студии в соответствии
                с действующим законодательством Российской Федерации.
              </p>
            </section>

            {/* 9. Контактная информация */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                9. Контактная информация
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                По вопросам, связанным с настоящим Соглашением, обращайтесь:
              </p>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Команда:</strong> АРКА
                </li>
                <li>
                  <strong className="text-foreground">Город:</strong> Москва, Россия
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
