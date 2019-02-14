package com.kito.madina.cmmn.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
	
	public static SimpleDateFormat defaultDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
 	public static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
    public static SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
    public static SimpleDateFormat dateFormatDB = new SimpleDateFormat("yyyyMMdd");
    public static SimpleDateFormat logFormat = new SimpleDateFormat("MMddHHmm");
    public static SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy");
    public static SimpleDateFormat monthFormat = new SimpleDateFormat("MM");
    public static SimpleDateFormat dayFormat = new SimpleDateFormat("dd");
    public static SimpleDateFormat yearMonthFormat = new SimpleDateFormat("MM");    
    public static SimpleDateFormat dateSqlFormat_dash = new SimpleDateFormat("yyyy-MM-dd");

    public static boolean areEqual(Date date1, Date date2) {
        boolean result = false;
        if (date1 == null && date2 == null) {
            // Both dates are null
            result = true;
        } else if (date1 == null || date2 == null) {
            // One of the dates is not null
            result = false;
        } else {
            // Consider dates up to second resolution. 
            Calendar cal1 = Calendar.getInstance();
            Calendar cal2 = Calendar.getInstance();
            cal1.setTime(date1);
            cal2.setTime(date2);
            result = cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR)
                    && cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR)
                    && cal1.get(Calendar.HOUR_OF_DAY) == cal2.get(Calendar.HOUR_OF_DAY)
                    && cal1.get(Calendar.MINUTE) == cal2.get(Calendar.MINUTE)
                    && cal1.get(Calendar.SECOND) == cal2.get(Calendar.SECOND);
        }
        return result;

    }

    /**
     * Returns the last millisecond of the specified date.
     *
     * @param date Date to calculate end of day from
     * @return Last millisecond of <code>date</code>
     */
    public static Date endOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            calendar.setTime(date);
            calendar.set(Calendar.HOUR_OF_DAY, 23);
            calendar.set(Calendar.MILLISECOND, 0);
            calendar.set(Calendar.SECOND, 59);
            calendar.set(Calendar.MINUTE, 59);
            return calendar.getTime();
        }
    }

    /**
     * Returns a new Date with the hours, milliseconds, seconds and minutes
     * set to 0.
     *
     * @param date Date used in calculating start of day
     * @return Start of <code>date</code>
     */
    public static Date startOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            calendar.setTime(date);
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MILLISECOND, 0);
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MINUTE, 0);
            return calendar.getTime();
        }
    }

    /**
     * Returns day in millis with the hours, milliseconds, seconds and minutes
     * set to 0.
     *
     * @param date long used in calculating start of day
     * @return Start of <code>date</code>
     */
    public static long startOfDayInMillis(long date) {
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            calendar.setTimeInMillis(date);
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MILLISECOND, 0);
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MINUTE, 0);
            return calendar.getTimeInMillis();
        }
    }

    /**
     * Returns the last millisecond of the specified date.
     *
     * @param date long to calculate end of day from
     * @return Last millisecond of <code>date</code>
     */
    public static long endOfDayInMillis(long date) {
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            calendar.setTimeInMillis(date);
            calendar.set(Calendar.HOUR_OF_DAY, 23);
            calendar.set(Calendar.MILLISECOND, 999);
            calendar.set(Calendar.SECOND, 59);
            calendar.set(Calendar.MINUTE, 59);
            return calendar.getTimeInMillis();
        }
    }

    /**
     * Returns the day after <code>date</code>.
     *
     * @param date Date used in calculating next day
     * @return Day after <code>date</code>.
     */
    public static Date nextDay(Date date) {
        return new Date(addDays(date.getTime(), 1));
    }

    /**
     * Adds <code>amount</code> days to <code>time</code> and returns
     * the resulting time.
     *
     * @param time Base time
     * @param amount Amount of increment.
     * 
     * @return the <var>time</var> + <var>amount</var> days
     */
    public static long addDays(long time, int amount) {
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            calendar.setTimeInMillis(time);
            calendar.add(Calendar.DAY_OF_MONTH, amount);
            return calendar.getTimeInMillis();
        }
    }

    /**
     * Adds the specified number of days to todays date. If endOfDay is true, the date returned
     * is the end of the calculated date
     * @param amount Number of days to add. 
     * @param endOfDay flag to indicate the end of the day
     * @return the new date
     */
    public static Date addDays(int amount, boolean endOfDay) {
        Calendar cal = Calendar.getInstance();
        return addDays(cal.getTime(), amount, endOfDay);
    }

    /**
     * Adds the specified number of days to the stated. If endOfDay is true, the date returned
     * is the end of the calculated date
     * @param The date to add the specified number of days to. 
     * @param amount Number of days to add. 
     * @param endOfDay flag to indicate the end of the day
     * @return the new date
     */
    public static Date addDays(Date baseDate, int amount, boolean endOfDay) {
        Calendar cal = Calendar.getInstance();
        synchronized (cal) {
            cal.setTime(baseDate);
            cal.add(Calendar.DATE, amount);
        }
        if (endOfDay) {
            return endOfDay(cal.getTime());
        }
        return cal.getTime();
    }

    /** 
     * Returns the maximum value of 2 dates. 
     * @param date1
     * @param date2
     * @return The max of the 2 dates. If one date is null, the other date is returned. If 
     * both dates are null, null is returned. 
     */
    public static Date maxDate(Date date1, Date date2) {
        if ((date1 == null && date2 == null) || date2 == null) {
            return date1;
        }
        if (date1 != null && date1.compareTo(date2) < 0) {
            return date1;
        }
        return date2;
    }

    /**
     * Returns the current date time. 
     * @return 
     */
    public static Date now() {
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            return calendar.getTime();
        }
    }

    /**
     * Uses SimpleDateFormat to format the current datetime.
     * @param format The format to use for the date
     * @return The formatted date string.
     */
    public static String simpleFormat(String format) {
        return simpleFormat(now(), format);
    }

    /**
     * Uses SimpleDateFormat to format the specified datetime. 
     * @param date The date to format.
     * @param format The format to use for the date.
     * @return The formatted date string. 
     */
    public static String simpleFormat(Date date, String format) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return sdf.format(date);
    }

    /**
     * Returns the day after <code>date</code>.
     *
     * @param date Date used in calculating next day
     * @return Day after <code>date</code>.
     */
    public static long nextDay(long date) {
        return addDays(date, 1);
    }

    /**
     * Returns the week after <code>date</code>.
     *
     * @param date Date used in calculating next week
     * @return week after <code>date</code>.
     */
    public static long nextWeek(long date) {
        return addDays(date, 7);
    }

    /**
     * Returns the number of days difference between <code>t1</code> and
     * <code>t2</code>.
     *
     * @param t1 Time 1
     * @param t2 Time 2
     * @param checkOverflow indicates whether to check for overflow
     * @return Number of days between <code>start</code> and <code>end</code>
     */
    public static int getDaysDiff(long t1, long t2, boolean checkOverflow) {
        if (t1 > t2) {
            long tmp = t1;
            t1 = t2;
            t2 = tmp;
        }
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            calendar.setTimeInMillis(t1);
            int delta = 0;
            while (calendar.getTimeInMillis() < t2) {
                calendar.add(Calendar.DAY_OF_MONTH, 1);
                delta++;
            }
            if (checkOverflow && (calendar.getTimeInMillis() > t2)) {
                delta--;
            }
            return delta;
        }
    }

    /**
     * Returns the number of days difference between <code>t1</code> and
     * <code>t2</code>.
     *
     * @param t1 Time 1
     * @param t2 Time 2
     * @return Number of days between <code>start</code> and <code>end</code>
     */
    public static int getDaysDiff(long t1, long t2) {
        return getDaysDiff(t1, t2, true);
    }

    /**
     * Check, whether the date passed in is the first day of the year.
     *
     * @param date date to check in millis
     * @return <code>true</code> if <var>date</var> corresponds to the first
     *         day of a year
     * @see Date#getTime() 
     */
    public static boolean isFirstOfYear(long date) {
        boolean ret = false;
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            calendar.setTimeInMillis(date);
            int currentYear = calendar.get(Calendar.YEAR);
            // Check yesterday
            calendar.add(Calendar.DATE, -1);
            int yesterdayYear = calendar.get(Calendar.YEAR);
            ret = (currentYear != yesterdayYear);
        }
        return ret;
    }

    /**
     * Check, whether the date passed in is the first day of the month.
     *
     * @param date date to check in millis
     * @return <code>true</code> if <var>date</var> corresponds to the first
     *         day of a month
     * @see Date#getTime() 
     */
    public static boolean isFirstOfMonth(long date) {
        boolean ret = false;
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            calendar.setTimeInMillis(date);
            int currentMonth = calendar.get(Calendar.MONTH);
            // Check yesterday
            calendar.add(Calendar.DATE, -1);
            int yesterdayMonth = calendar.get(Calendar.MONTH);
            ret = (currentMonth != yesterdayMonth);
        }
        return ret;
    }

    /**
     * Returns the day before <code>date</code>.
     *
     * @param date Date used in calculating previous day
     * @return Day before <code>date</code>.
     */
    public static long previousDay(long date) {
        return addDays(date, -1);
    }

    /**
     * Returns the week before <code>date</code>.
     *
     * @param date Date used in calculating previous week
     * @return week before <code>date</code>.
     */
    public static long previousWeek(long date) {
        return addDays(date, -7);
    }

    /**
     * Returns the first day before <code>date</code> that has the
     * day of week matching <code>startOfWeek</code>.  For example, if you
     * want to find the previous monday relative to <code>date</code> you
     * would call <code>getPreviousDay(date, Calendar.MONDAY)</code>.
     *
     * @param date Base date
     * @param startOfWeek Calendar constant correspoding to start of week.
     * @return start of week, return value will have 0 hours, 0 minutes,
     *         0 seconds and 0 ms.
     * 
     */
    public static long getPreviousDay(long date, int startOfWeek) {
        return getDay(date, startOfWeek, -1);
    }

    /**
     * Returns the first day after <code>date</code> that has the
     * day of week matching <code>startOfWeek</code>.  For example, if you
     * want to find the next monday relative to <code>date</code> you
     * would call <code>getPreviousDay(date, Calendar.MONDAY)</code>.
     *
     * @param date Base date
     * @param startOfWeek Calendar constant correspoding to start of week.
     * @return start of week, return value will have 0 hours, 0 minutes,
     *         0 seconds and 0 ms.
     * 
     */
    public static long getNextDay(long date, int startOfWeek) {
        return getDay(date, startOfWeek, 1);
    }

    private static long getDay(long date, int startOfWeek, int increment) {
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            calendar.setTimeInMillis(date);
            int day = calendar.get(Calendar.DAY_OF_WEEK);
            // Normalize the view starting date to a week starting day
            while (day != startOfWeek) {
                calendar.add(Calendar.DATE, increment);
                day = calendar.get(Calendar.DAY_OF_WEEK);
            }
            return startOfDayInMillis(calendar.getTimeInMillis());
        }
    }

    /**
     * Returns the previous month.
     * 
     * @param date Base date
     * @return previous month
     */
    public static long getPreviousMonth(long date) {
        return incrementMonth(date, -1);
    }

    /**
     * Returns the next month.
     * 
     * @param date Base date
     * @return next month
     */
    public static long getNextMonth(long date) {
        return incrementMonth(date, 1);
    }

    private static long incrementMonth(long date, int increment) {
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            calendar.setTimeInMillis(date);
            calendar.add(Calendar.MONTH, increment);
            return calendar.getTimeInMillis();
        }
    }

    /**
     * Returns the date corresponding to the start of the month.
     *
     * @param date Base date
     * @return Start of month.
     */
    public static long getStartOfMonth(long date) {
        return getMonth(date, -1);
    }

    /**
     * Returns the date corresponding to the end of the month.
     *
     * @param date Base date
     * @return End of month.
     */
    public static long getEndOfMonth(long date) {
        return getMonth(date, 1);
    }

    private static long getMonth(long date, int increment) {
        long result;
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            calendar.setTimeInMillis(date);
            if (increment == -1) {
                calendar.set(Calendar.DAY_OF_MONTH, 1);
                result = startOfDayInMillis(calendar.getTimeInMillis());
            } else {
                calendar.add(Calendar.MONTH, 1);
                calendar.set(Calendar.DAY_OF_MONTH, 1);
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MILLISECOND, 0);
                calendar.set(Calendar.SECOND, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.add(Calendar.MILLISECOND, -1);
                result = calendar.getTimeInMillis();
            }
        }
        return result;
    }

    /**
     * Returns the day of the week.
     *
     * @param date date
     * @return day of week.
     */
    public static int getDayOfWeek(long date) {
        Calendar calendar = Calendar.getInstance();
        synchronized (calendar) {
            calendar.setTimeInMillis(date);
            return (calendar.get(Calendar.DAY_OF_WEEK));
        }
    }
    
    public static String getCurrentDate() {
        Date current = new Date(System.currentTimeMillis());
        return defaultDateFormat.format(current);
    }

    public static String getCurrentYear() {
        Date current = new Date(System.currentTimeMillis());
        return yearFormat.format(current);
    }

    public static String getCurrentMonth() {
        Date current = new Date(System.currentTimeMillis());
        return monthFormat.format(current);
    }
    
    public static String getCurrentDay() {
        Date current = new Date(System.currentTimeMillis());
        return dayFormat.format(current);
    }

    public static String getCurrentYearMonth() {
        Date current = new Date(System.currentTimeMillis());
        return yearMonthFormat.format(current);
    }
    public static float calculateHours(String statTime, String endTime){
    	
    	String sTime[] = statTime.split(" ");
		String eTime[] = endTime.split(" ");
		
		String sArr[] = sTime[0].split(":");
		String eArr[] = eTime[0].split(":");
		float sHours = Integer.parseInt(sArr[0].trim());
		float sMinis = Integer.parseInt(sArr[1].trim());
		float eHours = Integer.parseInt(eArr[0].trim());
		float eMinis = Integer.parseInt(eArr[1].trim());
		float minisTmp = 0;
		float hoursTotal = 0;
		if(eHours < sHours){
			minisTmp = (24 - sHours + eHours)*60 + eMinis - sMinis;
		}
		else {
			minisTmp = (eHours - sHours)*60 + eMinis - sMinis;
		} 
		
		hoursTotal = minisTmp/60;
		float abc = Math.round(hoursTotal*100);
		float hoursReturn =  abc/100;
		return hoursReturn;
    }
    public static String getVNDateFormatFromString(String dateStr){
    	String arrangeTime = null;
    	if(dateStr != null && dateStr.length() >= 10){
	    	arrangeTime = dateStr.substring(8, 10)
	    				+"/" + dateStr.substring(5, 7)
	    				+"/" + dateStr.substring(0, 4);
    	}
    	return arrangeTime;
    }
}