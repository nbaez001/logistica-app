package com.besoft.siserp.lgtc.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

	public static String formatDDMMYYYY(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat(ConstanteUtil.DD_MM_YYYY);
		if (date != null) {
			return sdf.format(date);
		} else {
			return null;
		}
	}

	public static Date parseDDMMYYYY(String date) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat(ConstanteUtil.DD_DD_YY);
		if (date != null && date.toUpperCase() != "NULL") {
			return sdf.parse(date);
		} else {
			return null;
		}
	}

	public static String formatGuionDDMMYYYY(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat(ConstanteUtil.guion_DDMMYYYY);
		if (date != null) {
			return sdf.format(date);
		} else {
			return null;
		}
	}
	
	public static String formatGuionYYYYMMDD(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat(ConstanteUtil.guion_YYYYMMDD);
		if (date != null) {
			return sdf.format(date);
		} else {
			return null;
		}
	}
	
	public static String slashDDMMYYYY(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat(ConstanteUtil.slashDDMMYYYY);
		if (date != null) {
			return sdf.format(date);
		} else {
			return null;
		}
	}

}
