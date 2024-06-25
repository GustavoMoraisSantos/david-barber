import SchedulerCalendar from "./Calendar";
import styles from "./Calendar.module.css";

export default function Scheduler() {
  return (
    <div className={styles.mainContainer}>
      <SchedulerCalendar />
    </div>
  );
}
