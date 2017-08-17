package donghwa.control.json;

import java.io.FileOutputStream;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import donghwa.domain.CustPage;
import donghwa.service.CustPageService;

@RestController
@RequestMapping("/p-desktop/")
public class Controller24 {
	CustPage custPage;
	@Autowired CustPageService custPageService;
	@Autowired ServletContext ctx;
	
	@RequestMapping(path="upload3")
	public JsonResult upload3(CustPage custPage,String UrlEncode) throws Exception {
		String newFilename = this.getNewFilename();
		
		String UrlDecode = java.net.URLDecoder.decode(UrlEncode, "UTF-8");

		byte[] decoded = org.apache.commons.codec.binary.Base64.decodeBase64(UrlDecode.getBytes());

		String RecordingPath = "C:/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp3/wtpwebapps/FairyTale/upload/";
		FileOutputStream fos = new FileOutputStream(RecordingPath + newFilename +".ogg", false);
		fos.write(decoded, 0, decoded.length);
		fos.close();
		
		custPage.setCust_REC("/upload/" + newFilename + ".ogg");
		
//		custPageService.add(custPage);
		
		return new JsonResult(JsonResult.SUCCESS, "ok");
	}

	int count = 0;
	  synchronized private String getNewFilename() {
	    if (count > 100) {
	      count = 0;
	    }
	    return String.format("%d_%d", System.currentTimeMillis(), ++count); 
	  }
}
