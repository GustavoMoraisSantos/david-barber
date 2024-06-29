// @ts-nocheck
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "./calendar.css";
import moment from "moment";
import "moment/locale/pt-br";
import { Button, Modal, Radio, Tag } from "antd";
import { useCallback, useMemo, useState } from "react";
import CalendarForm from "./CalendarForm";
import { combineDateAndTime } from "../../utils";
import { VIEW_OPTIONS } from "../../constants";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
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
  // @ts-ignore
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
      // @ts-ignore
      return this.day() === 0 || this.day() === 6
        ? "[Último] dddd [às] LT"
        : "[Última] dddd [às] LT";
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
  // ordinal: "%dº",
  ordinal: function (number) {
    return number + "º";
  },
});

interface Event {
  start: Date;
  end: Date;
  title: string;
  services: string[];
  customer: string;
}

export default function SchedulerCalendar() {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);
  const [selectedTag, setSelectedTag] = useState<(typeof Views)[Keys]>(
    Views.WEEK
  );
  const [date, setDate] = useState(moment());
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
    const newEvent = {
      title: values?.title,
      services: values?.services,
      customer: values?.customer,
      start: combineDateAndTime(selectedSlot.start, values.startTime),
      end: combineDateAndTime(selectedSlot.end, values.endTime),
    };

    setEnvents([...events, newEvent]);
    setIsVisibleModal(false);
  };

  const handleChangeView = (id: string, checked: boolean) => {
    setSelectedTag(id);
    setView(id);
  };

  const onNextClick = useCallback(() => {
    if (view === Views.DAY) setDate(moment(date).add(1, "d").toDate());
    if (view === Views.WEEK) setDate(moment(date).add(1, "w").toDate());
    if (view === Views.MONTH) setDate(moment(date).add(1, "M").toDate());
  });

  const onPrevClick = useCallback(() => {
    if (view === Views.DAY) setDate(moment(date).subtract(1, "d").toDate());
    if (view === Views.WEEK) setDate(moment(date).subtract(1, "w").toDate());
    if (view === Views.MONTH) setDate(moment(date).subtract(1, "M").toDate());
  });

  const dateText = useMemo(() => {
    if (view === Views.DAY) return moment(date).format("dddd, DD - MMMM");
    if (view === Views.WEEK) {
      const from = moment(date)?.startOf("week");
      const to = moment(date)?.endOf("week");
      return `${from.format("MMMM DD")} até ${to.format("MMMM DD")}`;
    }
    if (view === Views.MONTH) return moment(date).format("MMMM YYYY");
  }, [view, date]);

  return (
    <>
      <header className="tollbar">
        <div>
          <Radio.Group size="small" onChange={(e) => setSize(e.target.value)}>
            <Radio.Button onClick={onPrevClick} value="prev">
              <ArrowLeftOutlined />
            </Radio.Button>
            <Radio.Button onClick={() => setDate(moment())} value="default">
              Hoje
            </Radio.Button>
            <Radio.Button onClick={onNextClick} value="next">
              <ArrowRightOutlined />
            </Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <p className="dateText">{dateText}</p>
        </div>
        <div className="customTollbar">
          {VIEW_OPTIONS.map(({ id, label }) => (
            <Tag.CheckableTag
              key={id}
              checked={selectedTag === id}
              onChange={(checked) => handleChangeView(id, checked)}
              style={{
                borderRadius: "10px",
                padding: ".3rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: `${selectedTag === id ? "#17405dac" : ""}`,
              }}
            >
              {label}
            </Tag.CheckableTag>
          ))}
        </div>
      </header>
      <div className={"schedulerCalendarContainer"}>
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
          className={"calendar"}
          toolbar={false}
          view={view}
          date={date}
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
    </>
  );
}
