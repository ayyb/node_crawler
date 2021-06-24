const request = require("request");
const cheerio = require("cheerio");
//const iconv = require("iconv-lite");

//지니차트 크롤링해서 가져오기
const getChart = () =>{
    request(
        {
          url: "https://www.genie.co.kr/chart/top200",
          method: "GET"
        },
        (error, response, body) => {
          if (error) {
            console.error(error);
            return;
          }
          if (response.statusCode === 200) {
            console.log("response ok");
            // cheerio를 활용하여 body에서 데이터 추출
            //console.log(body);
            const result = [];
            const $ = cheerio.load(body);
            //chart list title
            const chart_list_title = $("tbody").find('tr > .info > .title').toArray();
            chart_list_title.forEach((g)=>{
                const title = $(g).text().replace(/(\s*)/g, ""); //문자열 제거 정규식
                //console.log(title)
                result.push({'title':title})
            })
            //result.push({'title':''})
            console.log(result);
          }
        }
      );
}

getChart();

