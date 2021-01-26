package com.besoft.siserp.lgtc.util;

import java.io.FileWriter;
import java.io.IOException;

import com.besoft.siserp.lgtc.dto.OutResponse;

public class FileUtil {

	public OutResponse<?> generarArchivo(String contenido, String ruta, String nombreArchivo) {
		OutResponse<?> out = new OutResponse<>();
		FileWriter file = null;

		try {
			file = new FileWriter(ruta + nombreArchivo);
			file.write(contenido);

			out.setRCodigo(0);
			out.setRMensaje("Exito al generar archivo");
		} catch (IOException e) {
			e.printStackTrace();

			out.setRCodigo(500);
			out.setRMensaje(e.getMessage());
		} finally {
			try {
				file.flush();
				file.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return out;
	}
}
