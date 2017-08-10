package donghwa.control.json;

import java.io.FileOutputStream;
import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/p-desktop/")
public class Controller24 {

	@Autowired ServletContext ctx;

	@RequestMapping(path="upload3")
	public Object upload3(String UrlEncode) throws Exception {

		String UrlDecode = java.net.URLDecoder.decode(UrlEncode, "UTF-8");

		byte[] decoded = org.apache.commons.codec.binary.Base64.decodeBase64(UrlDecode.getBytes());
		System.out.println(decoded);
		HashMap<String,Object> resultMap = new HashMap<>();

		FileOutputStream fos = new FileOutputStream("C:/filetest/record.ogg", false);
		fos.write(decoded, 0, decoded.length);
		fos.close();
		resultMap.put("decoded", decoded);
		resultMap.put("OK", "ok");
		return resultMap;
	}

}
