/* Spring WebMVC: JSON 콘텐츠로 응답하기 + 파일 업로드
 * => AJAX 파일 업로드
 */
package donghwa.control.json;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import donghwa.domain.Photozip;
import donghwa.service.PhotozipService;

@RestController
@RequestMapping("/p-desktop/") 
public class CustPageControl {
//
//  @Autowired CustPageService custpageService;
//  @Autowired ServletContext ctx;
//
//  @RequestMapping(path="recUpload")
//  public JsonResult recUpload(Record record, MultipartFile[] files) throws Exception {
//
//      files[0].transferTo(new File(ctx.getRealPath("/recUpload/" + files[0].getOriginalFilename())));
//      
//      record.setFilePath("/recUpload/" + files[0].getOriginalFilename());
//      record.setFileName(files[0].getOriginalFilename());
//     
//      custpageService.add(record);
//    System.out.println(record);
//    return new JsonResult(JsonResult.SUCCESS, "ok");
//  }

}