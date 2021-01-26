package com.besoft.siserp.lgtc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SiserpLogisticaApplication {

	private static final Logger log = LoggerFactory.getLogger(SiserpLogisticaApplication.class);

	public static void main(String[] args) {
		log.info("---------Start class Application---------");
		SpringApplication.run(SiserpLogisticaApplication.class, args);
	}

}
