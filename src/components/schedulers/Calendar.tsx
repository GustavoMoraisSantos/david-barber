// @ts-nocheck
import { Calendar, momentLocalizer } from "react-big-calendar";
import styles from "./Calendar.module.css";
import moment from "moment";
import "moment/locale/pt-br";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useState } from "react";
import { Footer } from "antd/es/layout/layout";
import CalendarForm from "./CalendarForm";
moment.locale("pt-br");
moment.updateLocale("pt-br", {
  week: {
    dow: 1,
    doy: 4,
  },
});
const localizer = momentLocalizer(moment);

moment.defineLocale("pt-br", {
  months:
    "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split(
      "_"
    ),
  monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
  weekdays:
    "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split(
      "_"
    ),
  weekdaysShort: "dom_seg_ter_qua_qui_sex_sáb".split("_"),
  weekdaysMin: "dom_2ª_3ª_4ª_5ª_6ª_sáb".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    L: "DD/MM/YYYY",
    LL: "D [de] MMMM [de] YYYY",
    LLL: "D [de] MMMM [de] YYYY [às] LT",
    LLLL: "dddd, D [de] MMMM [de] YYYY [às] LT",
  },
  calendar: {
    sameDay: "[Hoje às] LT",
    nextDay: "[Amanhã às] LT",
    nextWeek: "dddd [às] LT",
    lastDay: "[Ontem às] LT",
    lastWeek: function () {
      return this.day() === 0 || this.day() === 6
        ? "[Último] dddd [às] LT" // Saturday + Sunday
        : "[Última] dddd [às] LT"; // Monday - Friday
    },
    sameElse: "L",
  },
  relativeTime: {
    future: "em %s",
    past: "%s atrás",
    s: "segundos",
    m: "um minuto",
    mm: "%d minutos",
    h: "uma hora",
    hh: "%d horas",
    d: "um dia",
    dd: "%d dias",
    M: "um mês",
    MM: "%d meses",
    y: "um ano",
    yy: "%d anos",
  },
  ordinal: "%dº",
});

interface Event {
  start: Date;
  end: Date;
}

export default function SchedulerCalendar() {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [events, setEnvents] = useState<Event>([]);
  const [selectedSlot, setSelectedSlot] = useState({ start: null, end: null });

  const messages = {
    allDay: "Dia Inteiro",
    previous: "<",
    next: ">",
    today: "Hoje",
    month: "Mês",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    date: "Data",
    time: "Hora",
    event: "Evento",
    showMore: (total: any) => `+ (${total}) Eventos`,
    noEventsInRange: "Nenhum evento encontrado nesse período",
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
    setIsVisibleModal(true);
  };

  const handleCancel = () => {
    setIsVisibleModal(false);
  };

  const handleSubmit = (values) => {
    console.log("e", values);
  };

  return (
    <div className={styles.schedulerCalendarContainer}>
      <Calendar
        messages={messages}
        localizer={localizer}
        events={events}
        defaultView="week"
        selectable
        onSelectSlot={handleSelectSlot}
        culture={"pt-BR"}
        scrollToTime={moment().toDate()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}
      />

      <Modal
        destroyOnClose
        closable={false}
        title="Criar agendamento"
        open={isVisibleModal}
        footer={null}
      >
        <CalendarForm
          initialValues={{
            startTime: selectedSlot.start,
            endTime: selectedSlot.end,
          }}
          onSubmitForm={handleSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
