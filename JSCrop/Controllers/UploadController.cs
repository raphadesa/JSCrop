using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace JSCrop.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        [HttpPost("Save")]
        public async Task<IActionResult> Save()
        {
            string base64 = Request.Form["imgCropped"];
            string imageName = Request.Form["fileName"];
            string imageWidth = Request.Form["imgWidth"];
            string imageHeight = Request.Form["imgHeight"];
            var fileName = Path.GetFileNameWithoutExtension(imageName);
            var fileExt = Path.GetExtension(imageName);
            var finalFileName = $"{fileName}-{imageWidth}x{imageHeight}{fileExt}";
            var bytes = Convert.FromBase64String(base64.Split(',')[1]);            
            var path=Path.Combine(Directory.GetCurrentDirectory(),"Upload", finalFileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
               await stream.WriteAsync(bytes, 0, bytes.Length);
               stream.Flush();
            }
            return Redirect("/Success");
        }
        
    }
}
