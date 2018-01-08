// Type definitions for react-big-calendar 0.17.0
// Project: https://github.com/intljusticemission/react-big-calendar
// Definitions by: Piotr Witek <http://piotrwitek.github.io>
//                 Austin Turner <https://github.com/paustint>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare module 'react-big-calendar' {
  import * as React from 'react';

  export type stringOrDate = string | Date;
  export type View = 'month' | 'week' | 'work_week' | 'day' | 'agenda';
  export type Navigate = 'PREV' | 'NEXT' | 'TODAY' | 'DATE';
  export interface Format {
    /**
     * Format for the day of the month heading in the Month view.
     * e.g. "01", "02", "03", etc
     */
    dateFormat?: string,

    /**
     * A day of the week format for Week and Day headings,
     * e.g. "Wed 01/04"
     *
     */
    dayFormat?: string,

    /**
     * Week day name format for the Month week day headings,
     * e.g: "Sun", "Mon", "Tue", etc
     *
     */
    weekdayFormat?: string,

    /**
     * The timestamp cell formats in Week and Time views, e.g. "4:00 AM"
     */
    timeGutterFormat?: string,

    /**
     * Toolbar header format for the Month view, e.g "2015 April"
     *
     */
    monthHeaderFormat?: string,

    /**
     * Toolbar header format for the Week views, e.g. "Mar 29 - Apr 04"
     */
    dayRangeHeaderFormat?: string,

    /**
     * Toolbar header format for the Day view, e.g. "Wednesday Apr 01"
     */
    dayHeaderFormat?: string,

    /**
     * Toolbar header format for the Agenda view, e.g. "4/1/2015 — 5/1/2015"
     */
    agendaHeaderFormat?: string,

    /**
     * A time range format for selecting time slots, e.g "8:00am — 2:00pm"
     */
    selectRangeFormat?: string,

    agendaDateFormat?: string,
    agendaTimeFormat?: string,
    agendaTimeRangeFormat?: string,

    /**
     * Time range displayed on events.
     */
    eventTimeRangeFormat?: string,

    /**
     * An optional event time range for events that continue onto another day
     */
    eventTimeRangeStartFormat?: string,

    /**
     * An optional event time range for events that continue from another day
     */
    eventTimeRangeEndFormat?: string,
  }
  export type ComponentType = React.SFC | React.Component | React.ComponentClass | JSX.Element;

  export interface Components {
      event?: ComponentType,
      eventWrapper?: ComponentType,
      dayWrapper?: ComponentType,
      dateCellWrapper?: ComponentType,
      toolbar?: ComponentType,
      agenda?: {
        date?: ComponentType,
        time?: ComponentType,
        event?: ComponentType,
      },
      day?: {
        header?: ComponentType,
        event?: ComponentType,
      },
      week?: {
        header?: ComponentType,
        event?: ComponentType,
      },
      month?: {
        header?: ComponentType,
        dateHeader?: ComponentType,
        event?: ComponentType,
      },
  }

  export interface Messages {
      allDay?: string;
      previous?: string;
      next?: string;
      today?: string;
      month?: string;
      week?: string;
      day?: string;
      agenda?: string;
      date?: string;
      time?: string;
      event?: string;
      showMore?: string;
  }

  interface BigCalendarProps extends React.Props<BigCalendar> {
      date?: stringOrDate;
      view?: View;
      events?: Object[];
      onNavigate?: (action: Navigate, newDate: Date) => void;
      onView?: (view: View) => void;
      onDrillDown?: (date: Date, view: View) => void;
      onSelectSlot?: (slotInfo: { start: stringOrDate, end: stringOrDate, slots: Date[] | string[], action: 'select' | 'click' | 'doubleClick' }) => void;
      onDoubleClickEvent?: (event: Object, e: React.SyntheticEvent<HTMLElement>) => void;
      onSelectEvent?: (event: Object, e: React.SyntheticEvent<HTMLElement>) => void;
      onSelecting?: (range: { start: stringOrDate, end: stringOrDate }) => boolean | undefined | null;
      selected?: any;
      views?: View[] | {
          month: boolean | React.SFC | React.Component,
          week: boolean | React.SFC | React.Component,
          myweek: boolean | React.SFC | React.Component,
      };
      drilldownView?: View | null;
      getDrilldownView?: ((targetDate: Date, currentViewName: View, configuredViewNames: View[]) => void) | null;
      length?: number;
      toolbar?: boolean;
      popup?: boolean;
      popupOffset?: number | { x: number, y: number };
      selectable?: boolean | 'ignoreEvents';
      longPressThreshold?: number;
      step?: number;
      timeslots?: number;
      rtl?: boolean;
      eventPropGetter?: (event: Object, start: stringOrDate, end: stringOrDate, isSelected: boolean) => { className?: string, style?: React.CSSProperties };
      slotPropGetter?: (date: Date) => { className?: string, style?: Object };
      dayPropGetter?: (date: Date) => { className?: string, style?: Object };
      showMultiDayTimes?: boolean;
      min?: stringOrDate;
      max?: stringOrDate;
      scrollToTime?: Date;
      culture?: string;
      formats?: Format;
      components?: Components;
      messages?: Messages;
      titleAccessor?: string | ((event: any) => string);
      allDayAccessor?: string | ((event: any) => boolean);
      startAccessor?: string | ((event: any) => Date);
      endAccessor?: string | ((event: any) => Date);
      resourceAccessor?: string | ((event: any) => any);
      resources?: any[];
      resourceIdAccessor?: string | ((event: any) => any);
      resourceTitleAccessor?: string | ((event: any) => string);
      defaultView?: View;
      defaultDate?: Date;
      className?: string;
      elementProps?: React.HTMLAttributes<HTMLElement>;
  }

  class BigCalendar extends React.Component<BigCalendarProps> {
      /**
       * Setup the localizer by providing the moment Object
       */
      static momentLocalizer(momentInstance: Object): void;
      /**
       * Setup the localizer by providing the globalize Object
       */
      static globalizeLocalizer(globalizeInstance: Object): void;
  }

  export default BigCalendar;
}