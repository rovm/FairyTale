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
@RequestMapping("/control/photozip/") 
public class PhotozipControl {

  @Autowired PhotozipService photozipService;
  @Autowired ServletContext ctx;

  @RequestMapping(path="upload")
  public JsonResult upload1(Photozip photozip, MultipartFile[] files) throws Exception {

      files[0].transferTo(new File(ctx.getRealPath("/upload/" + files[0].getOriginalFilename())));
      
      photozip.setFilePath("/upload/" + files[0].getOriginalFilename());
      photozip.setFileName(files[0].getOriginalFilename());
     
    photozipService.add(photozip);
    System.out.println(photozip);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }

}